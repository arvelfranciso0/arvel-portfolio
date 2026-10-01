import "server-only";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";
import { getAdminById } from "@/db/queries";
import {
  SESSION_COOKIE,
  SESSION_TTL_SECONDS,
  signSession,
  verifySessionToken,
} from "./jwt";

export const LOGIN_PATH = "/my-profile/login";
const COOKIE_PATH = "/my-profile";

export async function createSession(adminId: number) {
  const token = await signSession(adminId);
  (await cookies()).set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: COOKIE_PATH,
    maxAge: SESSION_TTL_SECONDS,
  });
}

export async function deleteSession() {
  (await cookies()).delete({ name: SESSION_COOKIE, path: COOKIE_PATH });
}

/** The signed-in admin, or null. Deleting the admin row revokes its sessions. */
export const getSession = cache(async () => {
  const payload = await verifySessionToken(
    (await cookies()).get(SESSION_COOKIE)?.value,
  );
  const adminId = Number(payload?.sub);
  if (!Number.isInteger(adminId)) return null;
  return getAdminById(adminId);
});

/**
 * Call at the top of every admin page and server action. proxy.ts also
 * guards /my-profile, but server actions are reachable by direct POST, so
 * each one must check on its own.
 */
export async function requireAdmin() {
  const session = await getSession();
  if (!session) redirect(LOGIN_PATH);
  return session;
}
