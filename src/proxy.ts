import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth/jwt";

const LOGIN_PATH = "/my-profile/login";

// First line of defense for /my-profile: bounce signed-out visitors to the
// login page (and signed-in ones away from it). Pages and server actions
// still verify the session themselves via requireAdmin().
export async function proxy(request: NextRequest) {
  const session = await verifySessionToken(
    request.cookies.get(SESSION_COOKIE)?.value,
  );
  const isLoginPage = request.nextUrl.pathname === LOGIN_PATH;

  if (!session && !isLoginPage) {
    return NextResponse.redirect(new URL(LOGIN_PATH, request.url));
  }
  if (session && isLoginPage) {
    return NextResponse.redirect(new URL("/my-profile", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/my-profile/:path*"],
};
