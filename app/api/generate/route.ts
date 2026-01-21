import { generateImage } from "@/lib/image";
import { getRandomMusic } from "@/lib/music";
import { imagePrompt, musicPrompt } from "@/lib/helpers";

export async function POST(req: Request) {
  const formData = await req.formData();
  const image = formData.get("image") as File;
  const genre = formData.get("genre") as string;

  if (!image || !genre) {
    return Response.json({ error: "Missing inputs" }, { status: 400 });
  }

  const imageUrl = await generateImage(image, imagePrompt(genre));

  // const musicRes = await fetch("http:///localhost:8001/generate", {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify({ prompt: musicPrompt(genre) }),
  // });

  // const { audioUrl } = await musicRes.json();

  const audioUrl = getRandomMusic(genre);
  if (!audioUrl) {
    return Response.json({ error: "Invalid genre" }, { status: 400 });
  }

  return Response.json({ imageUrl, audioUrl });
}
