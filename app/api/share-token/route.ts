import { NextRequest, NextResponse } from "next/server";
import { createShareToken } from "@/lib/share";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const token = createShareToken({
    img: body.img,
    genre: body.genre,
    audio: body.audio,
  });

  return NextResponse.json({
    token,
  });
}
