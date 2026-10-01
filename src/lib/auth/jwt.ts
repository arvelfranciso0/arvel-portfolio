import { jwtVerify, SignJWT, type JWTPayload } from "jose";

// Kept free of next/headers and server-only so proxy.ts can import it too.

export const SESSION_COOKIE = "session";
export const SESSION_TTL_SECONDS = 60 * 60 * 24 * 7; // 7 days

function getKey() {
  const secret = process.env.SESSION_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error("SESSION_SECRET must be set to at least 32 characters");
  }
  return new TextEncoder().encode(secret);
}

/** `adminId` is the admin_users row id */
export function signSession(adminId: number): Promise<string> {
  return new SignJWT({})
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(String(adminId))
    .setIssuedAt()
    .setExpirationTime(`${SESSION_TTL_SECONDS}s`)
    .sign(getKey());
}

/**
 * Returns the payload if the token is validly signed and unexpired, otherwise
 * null. Signature check only — requireAdmin() also confirms the admin row
 * still exists.
 */
export async function verifySessionToken(
  token: string | undefined,
): Promise<JWTPayload | null> {
  const key = getKey();
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, key, { algorithms: ["HS256"] });
    return payload.sub ? payload : null;
  } catch {
    return null;
  }
}
