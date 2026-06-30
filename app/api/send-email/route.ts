import { NextRequest, NextResponse } from "next/server";
import { sendEchoEmail } from "@/lib/sendEmail";
import { createShareToken } from "@/lib/share";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { email, image, genre, audio } = body;

    if (!email || !image || !genre) {
      return NextResponse.json(
        {
          error: "Missing fields",
        },
        {
          status: 400,
        }
      );
    }

    const token = createShareToken({
      img: image,
      genre,
      audio,
    });

    const shareUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/share?t=${token}`;

    try {
      await sendEchoEmail({
        email,
        image,
        genre,
        shareUrl,
      });

      return NextResponse.json({
        success: true,
      });
    } catch (err) {
      console.error(err);

      return NextResponse.json(
        {
          success: false,
          error: "Email failed",
        },
        {
          status: 500,
        }
      );
    }
  } catch (err) {
    console.error(err);

    return NextResponse.json(
      {
        error: "Failed to send email",
      },
      {
        status: 500,
      }
    );
  }
}
