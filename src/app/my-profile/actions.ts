"use server";

import { eq, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { notFound, redirect } from "next/navigation";
import { db } from "@/db";
import { projects } from "@/db/schema";
import { deleteProjectImage, uploadProjectImage } from "@/lib/storage";
import { getAdminByEmail } from "@/db/queries";
import { hashPassword, verifyPassword } from "@/lib/auth/password";
import {
  createSession,
  deleteSession,
  LOGIN_PATH,
  requireAdmin,
} from "@/lib/auth/session";
import {
  ALLOWED_IMAGE_TYPES,
  MAX_IMAGE_BYTES,
  projectSchema,
} from "../schema/project";

let dummyHash: Promise<string> | undefined;
function getDummyHash() {
  dummyHash ??= hashPassword("timing-equalizer-not-a-real-password");
  return dummyHash;
}

export type LoginState = { error?: string; email?: string } | undefined;

export async function login(
  _prev: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");

  const admin = await getAdminByEmail(email);
  // Hash against a dummy when the email is unknown, so a wrong email takes as
  // long as a wrong password and doesn't reveal which accounts exist
  const passwordOk = await verifyPassword(
    password,
    admin?.passwordHash ?? (await getDummyHash()),
  );
  if (!admin || !passwordOk) {
    return { error: "Invalid email or password", email };
  }

  await createSession(admin.id);
  redirect("/my-profile");
}

export async function logout() {
  await deleteSession();
  redirect(LOGIN_PATH);
}

export type ProjectFormValues = {
  title: string;
  description: string;
  initials: string;
  previewLink: string;
  placeholderIcon: string;
  placeholderLabel: string;
  tags: string[];
};

export type ProjectFormState =
  | { error: string; values: ProjectFormValues }
  | undefined;

/**
 * Validates the shared project form fields and the optional thumbnail, and
 * uploads the thumbnail if one was chosen. Returns the error state to send
 * back to the form, or the parsed data plus the uploaded image URL (if any).
 */
async function readProjectForm(formData: FormData) {
  // Echoed back on error so the form can keep what was typed
  const values: ProjectFormValues = {
    title: String(formData.get("title") ?? ""),
    description: String(formData.get("description") ?? ""),
    initials: String(formData.get("initials") ?? ""),
    previewLink: String(formData.get("previewLink") ?? ""),
    placeholderIcon: String(formData.get("placeholderIcon") ?? ""),
    placeholderLabel: String(formData.get("placeholderLabel") ?? ""),
    tags: formData.getAll("tags").map(String),
  };

  const parsed = projectSchema.safeParse(values);
  if (!parsed.success) {
    return { state: { error: parsed.error.issues[0].message, values } } as const;
  }

  const file = formData.get("image");
  let uploadedImage: string | null = null;
  if (file instanceof File && file.size > 0) {
    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      return { state: { error: "Image must be PNG or JPEG", values } } as const;
    }
    if (file.size > MAX_IMAGE_BYTES) {
      return { state: { error: "Image must be 5 MB or smaller", values } } as const;
    }
    try {
      uploadedImage = await uploadProjectImage(
        Buffer.from(await file.arrayBuffer()),
        file.type,
      );
    } catch (err) {
      console.error("Thumbnail upload failed:", err);
      return {
        state: { error: "Couldn't upload the thumbnail. Try again.", values },
      } as const;
    }
  }

  return { data: parsed.data, uploadedImage } as const;
}

export async function createProject(
  _prev: ProjectFormState,
  formData: FormData,
): Promise<ProjectFormState> {
  await requireAdmin();

  const form = await readProjectForm(formData);
  if ("state" in form) return form.state;
  const image = form.uploadedImage;

  try {
    // New projects go to the top of the list (sortOrder is ascending)
    const [{ minOrder }] = await db
      .select({
        minOrder: sql<number>`coalesce(min(${projects.sortOrder}), 1)`.mapWith(
          Number,
        ),
      })
      .from(projects);

    await db
      .insert(projects)
      .values({ ...form.data, image, sortOrder: minOrder - 1 });
  } catch (err) {
    // Don't leave an orphaned file in the bucket
    if (image) await deleteProjectImage(image).catch(console.error);
    throw err;
  }

  revalidatePath("/");
  revalidatePath("/my-profile");
  redirect("/my-profile");
}

/** Bound to a project id by the edit page: updateProject.bind(null, id) */
export async function updateProject(
  id: number,
  _prev: ProjectFormState,
  formData: FormData,
): Promise<ProjectFormState> {
  await requireAdmin();
  if (!Number.isInteger(id)) notFound();

  const [existing] = await db
    .select({ image: projects.image })
    .from(projects)
    .where(eq(projects.id, id))
    .limit(1);
  if (!existing) notFound();

  const form = await readProjectForm(formData);
  if ("state" in form) return form.state;

  // A new upload replaces the thumbnail; otherwise keep it unless removed
  const removeImage = formData.get("removeImage") === "on";
  const image = form.uploadedImage ?? (removeImage ? null : existing.image);

  try {
    await db
      .update(projects)
      .set({ ...form.data, image })
      .where(eq(projects.id, id));
  } catch (err) {
    if (form.uploadedImage) {
      await deleteProjectImage(form.uploadedImage).catch(console.error);
    }
    throw err;
  }

  // The row no longer points at the old file, so clean it up (best-effort;
  // /public paths are ignored by deleteProjectImage)
  if (existing.image && existing.image !== image) {
    await deleteProjectImage(existing.image).catch((err) =>
      console.error("Old thumbnail delete failed:", err),
    );
  }

  revalidatePath("/");
  revalidatePath("/my-profile");
  redirect("/my-profile");
}

export async function deleteProject(id: number) {
  await requireAdmin();
  if (!Number.isInteger(id)) return;

  const [deleted] = await db
    .delete(projects)
    .where(eq(projects.id, id))
    .returning({ image: projects.image });

  // Remove the uploaded thumbnail too. The project is already gone, so a
  // storage failure here only leaves an unused file; log it, don't fail.
  if (deleted?.image) {
    await deleteProjectImage(deleted.image).catch((err) =>
      console.error("Thumbnail delete failed:", err),
    );
  }

  revalidatePath("/");
  revalidatePath("/my-profile");
}
