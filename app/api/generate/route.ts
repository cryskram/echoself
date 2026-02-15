import { generateImage } from "@/lib/image";
import { getRandomMusic } from "@/lib/music";
import { imagePrompt } from "@/lib/helpers";

function extractFilename(url: string) {
  return url.split("/").pop()?.split("?")[0]!;
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const image = formData.get("image") as File | null;
    const genre = formData.get("genre") as string | null;

    if (!image || !genre) {
      return Response.json({ error: "Missing inputs" }, { status: 400 });
    }

    // const musicRes = await fetch("http:///localhost:8001/generate", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ prompt: musicPrompt(genre) }),
    // });

    // const { audioUrl } = await musicRes.json();

    const imageUrl = await generateImage(image, imagePrompt(genre));
    const imageFile = extractFilename(imageUrl);

    const music = getRandomMusic(genre);
    if (!music) {
      return Response.json({ error: "Invalid genre" }, { status: 400 });
    }

    return Response.json({
      img: imageFile,
      audio: music.file,
      genre,
    });
  } catch (error: any) {
    if (error.message === "OPENAI_BILLING_LIMIT") {
      return Response.json(
        {
          error: "BILLING_LIMIT_REACHED",
          message:
            "AI generation credits have been exhausted. Please contact the booth volunteer.",
        },
        { status: 402 }
      );
    }

    return Response.json(
      {
        error: "INTERNAL_ERROR",
        message: "Something went wrong during generation.",
      },
      { status: 500 }
    );
  }
}
