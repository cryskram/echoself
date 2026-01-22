import { generateImage } from "@/lib/image";
import { getRandomMusic } from "@/lib/music";
import { imagePrompt } from "@/lib/helpers";

function extractFilename(url: string) {
  return url.split("/").pop()?.split("?")[0]!;
}

export async function POST(req: Request) {
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

  const audioUrl = getRandomMusic(genre);

  if (!audioUrl) {
    return Response.json({ error: "Invalid genre" }, { status: 400 });
  }

  const imageFilename = extractFilename(imageUrl);
  const audioFilename = extractFilename(audioUrl);

  return Response.json({
    imageFile: imageFilename,
    audioFile: audioFilename,
    genre,
  });
}
