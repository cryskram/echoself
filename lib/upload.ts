import crypto from "crypto";

export async function uploadToCloudinary(base64: string) {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!;
  const apiSecret = process.env.CLOUDINARY_API_SECRET!;
  const apiKey = process.env.CLOUDINARY_API_KEY!;

  const timestamp = Math.floor(Date.now() / 1000);
  const publicId = `echoself/${crypto.randomUUID()}`;

  const transformation = [
    "b_black",
    "c_pad,h_1280,w_1024",
    "g_south",
    "l_echoself:banner",
    "w_600",
    "c_fit",
    "y_80",
  ].join(",");

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
  return json.secure_url as string;
}
