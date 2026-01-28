import crypto from "crypto";

export async function uploadToCloudinary(base64: string) {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!;
  const apiKey = process.env.CLOUDINARY_API_KEY!;
  const apiSecret = process.env.CLOUDINARY_API_SECRET!;

  const timestamp = Math.floor(Date.now() / 1000);
  const publicId = `echoself/${crypto.randomUUID()}`;

  const transformation = [
    "l_echoself:logo-left,w_120,c_fit,g_north_west,x_24,y_24",
    "l_echoself:logo-right,w_120,c_fit,g_north_east,x_24,y_24",
  ].join("/");

  const signature = crypto
    .createHash("sha1")
    .update(
      `public_id=${publicId}&timestamp=${timestamp}&transformation=${transformation}${apiSecret}`
    )
    .digest("hex");

  const form = new FormData();
  form.append("file", `data:image/png;base64,${base64}`);
  form.append("api_key", apiKey);
  form.append("timestamp", String(timestamp));
  form.append("public_id", publicId);
  form.append("transformation", transformation);
  form.append("signature", signature);

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    {
      method: "POST",
      body: form,
    }
  );

  const json = await res.json();

  if (!json.secure_url) {
    console.error("Cloudinary error:", json);
    throw new Error("Cloudinary upload failed");
  }

  return json.secure_url as string;
}
