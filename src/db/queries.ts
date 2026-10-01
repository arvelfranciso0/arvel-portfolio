import "server-only";
import { asc, eq } from "drizzle-orm";
import { cache } from "react";
import { db } from ".";
import {
  adminUsers,
  profile,
  projects,
  skills,
} from "./schema";

// Wrapped in React `cache` so the layout and page share one query per request.

export const getProfile = cache(async () => {
  const [row] = await db.select().from(profile).limit(1);
  if (!row) {
    throw new Error("No profile row found. Run `npm run db:seed`.");
  }
  return row;
});

export const getProjects = cache(() =>
  db
    .select()
    .from(projects)
    .orderBy(asc(projects.sortOrder), asc(projects.id)),
);

export const getSkills = cache(() =>
  db.select().from(skills).orderBy(asc(skills.sortOrder), asc(skills.id)),
);


/** For login only — includes the password hash */
export async function getAdminByEmail(email: string) {
  const [row] = await db
    .select()
    .from(adminUsers)
    .where(eq(adminUsers.email, email.trim().toLowerCase()))
    .limit(1);
  return row ?? null;
}

/** For session checks — never returns the password hash */
export async function getAdminById(id: number) {
  const [row] = await db
    .select({ id: adminUsers.id, email: adminUsers.email })
    .from(adminUsers)
    .where(eq(adminUsers.id, id))
    .limit(1);
  return row ?? null;
}

export async function getProjectById(id: number) {
  const [row] = await db
    .select()
    .from(projects)
    .where(eq(projects.id, id))
    .limit(1);
  return row ?? null;
}
