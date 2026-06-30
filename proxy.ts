import { NextRequest, NextResponse } from "next/server";

const PUBLIC_ROUTES = ["/share", "/api/share-token", "/api/send-email"];

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/images") ||
    pathname === "/favicon.ico"
  ) {
    return NextResponse.next();
  }

  if (PUBLIC_ROUTES.some((route) => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  const unlocked = req.cookies.get("echoself-kiosk")?.value === "true";

  if (unlocked) {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL("/unlock", req.url));
}
