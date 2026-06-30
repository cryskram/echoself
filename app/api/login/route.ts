import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();

  if (body.password !== process.env.KIOSK_PASSWORD) {
    return NextResponse.json(
      {
        error: "Invalid password",
      },
      {
        status: 401,
      }
    );
  }

  const response = NextResponse.json({
    success: true,
  });

  response.cookies.set({
    name: "echoself-kiosk",
    value: "true",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24 * 3,
  });

  return response;
}
