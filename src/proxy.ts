import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/checkout", "/allorders", "/profile"];
const authRoutes = ["/login", "/signup", "/register", "/forgot-password"];

export async function proxy(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });
  const { pathname } = request.nextUrl;

  if (token) {
    if (authRoutes.some((r) => pathname.startsWith(r))) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  }

  if (protectedRoutes.some((r) => pathname.startsWith(r))) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/checkout/:path*",
    "/allorders",
    "/profile/:path*",
    "/login",
    "/signup",
    "/register",
    "/forgot-password",
  ],
};
