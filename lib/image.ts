import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateImage(file: File, prompt: string) {
  const res = await openai.images.edit({
    model: "gpt-image-1",
    prompt,
    size: "1024x1024",
    image: file,
  });

  if (!res.data || res.data.length === 0) {
    throw new Error("No image data returned");
  }

  return res.data[0].url;
}
