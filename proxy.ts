import { NextRequest, NextResponse } from "next/server";

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const publicRoutes = [
    "/login",
    "/share",
    "/api/login",
    "/api/send-email",
    "/api/share-token",
    "/favicon.ico",
  ];

  if (pathname.startsWith("/_next") || pathname.startsWith("/images")) {
    return NextResponse.next();
  }

  if (publicRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  const cookie = req.cookies.get("echoself-kiosk");

  if (cookie?.value === "true") {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL("/login", req.url));
}
