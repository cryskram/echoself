import OpenAI from "openai";
import { uploadToCloudinary } from "./upload";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateImage(file: File, prompt: string) {
  const res = await openai.images.edit({
    model: "gpt-image-1",
    image: file,
    prompt,
    size: "1024x1024",
  });

  const base64 = res.data?.[0]?.b64_json;
  if (!base64) {
    throw new Error("No image returned from OpenAI");
  }

  return await uploadToCloudinary(base64);
}
