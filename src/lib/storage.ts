import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { randomUUID } from "node:crypto";
import { ALLOWED_IMAGE_TYPES, MAX_IMAGE_BYTES } from "@/app/schema/project";

// Project thumbnails live in a public Supabase Storage bucket; the project's
// `image` column stores the object's public URL.
//
// Server-side only: it uses the secret key, which bypasses Storage RLS. The
// key isn't NEXT_PUBLIC_, so it can't end up in a client bundle, but keep
// this module out of "use client" files anyway. Not marked `server-only`
// because the seed script imports it too.

/** Bucket name from SUPABASE_STORAGE_BUCKET, defaulting to "project-images" */
export function getBucketName() {
  return process.env.SUPABASE_STORAGE_BUCKET?.trim() || "project-images";
}

const EXTENSIONS: Record<string, string> = {
  "image/png": "png",
  "image/jpeg": "jpg",
};

let client: SupabaseClient | undefined;

function getClient() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SECRET_KEY;
  if (!url || !key) {
    throw new Error("SUPABASE_URL and SUPABASE_SECRET_KEY must be set");
  }
  client ??= createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return client;
}

function bucket() {
  return getClient().storage.from(getBucketName());
}

/** Creates the bucket if it doesn't exist and (re)applies its limits */
export async function ensureProjectImagesBucket() {
  const storage = getClient().storage;
  const name = getBucketName();
  const options = {
    public: true,
    fileSizeLimit: MAX_IMAGE_BYTES,
    allowedMimeTypes: ALLOWED_IMAGE_TYPES,
  };

  const { error: getError } = await storage.getBucket(name);
  const { error } = getError
    ? await storage.createBucket(name, options)
    : await storage.updateBucket(name, options);
  if (error) throw error;
}

/** Uploads an image under a fresh random name and returns its public URL */
export async function uploadProjectImage(
  data: Buffer,
  contentType: string,
): Promise<string> {
  const path = `projects/${randomUUID()}.${EXTENSIONS[contentType] ?? "bin"}`;
  const { error } = await bucket().upload(path, data, {
    contentType,
    // Names are never reused, so the object can be cached forever
    cacheControl: "31536000",
    upsert: false,
  });
  if (error) throw error;
  return bucket().getPublicUrl(path).data.publicUrl;
}

/**
 * Deletes an image previously returned by uploadProjectImage. URLs that
 * don't point into our bucket (e.g. /public files) are ignored.
 */
export async function deleteProjectImage(publicUrl: string) {
  const supabaseUrl = process.env.SUPABASE_URL;
  if (!supabaseUrl || !publicUrl.startsWith(supabaseUrl)) return;

  const prefix = bucket().getPublicUrl("").data.publicUrl;
  if (!publicUrl.startsWith(prefix)) return;

  const { error } = await bucket().remove([publicUrl.slice(prefix.length)]);
  if (error) throw error;
}
