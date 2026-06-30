import crypto from "crypto";

const SECRET = process.env.SHARE_SECRET!;

export function createShareToken(payload: {
  img: string;
  genre: string;
  audio: string;
}) {
  const json = JSON.stringify(payload);

  const encoded = Buffer.from(json).toString("base64url");

  const signature = crypto
    .createHmac("sha256", SECRET)
    .update(encoded)
    .digest("base64url");

  return `${encoded}.${signature}`;
}

export function verifyShareToken(token: string) {
  const [encoded, signature] = token.split(".");

  if (!encoded || !signature) {
    return null;
  }

  const expected = crypto
    .createHmac("sha256", SECRET)
    .update(encoded)
    .digest("base64url");

  if (expected !== signature) {
    return null;
  }

  return JSON.parse(Buffer.from(encoded, "base64url").toString()) as {
    img: string;
    genre: string;
    audio: string;
  };
}
