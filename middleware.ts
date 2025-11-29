import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("access_token")?.value;
  const { pathname } = req.nextUrl;
  const authRoutes = ["/send-otp", "/verify-otp", "/create-profile"];
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));
  if (!token && !isAuthRoute) {
    return NextResponse.redirect(new URL("/send-otp", req.url));
  }
  if (token && isAuthRoute) {
    return NextResponse.redirect(new URL("/instructions", req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"],
};
