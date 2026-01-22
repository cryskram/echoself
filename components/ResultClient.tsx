"use client";

import { useSearchParams } from "next/navigation";
import { QRCodeSVG } from "qrcode.react";

const CLOUDINARY_BASE = `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/echoself`;

export default function ResultClient() {
  const params = useSearchParams();

  const img = params.get("img");
  const audio = params.get("audio");
  const genre = params.get("genre");

  if (!img || !genre) return null;

  if (!/^[a-zA-Z0-9-_]+\.(png|jpg|jpeg)$/.test(img)) return null;
  if (audio && !/^[a-zA-Z0-9-_]+\.wav$/.test(audio)) return null;

  const imageUrl = `${CLOUDINARY_BASE}/${img}`;
  const audioUrl = audio ? `/music/${genre}/${audio}` : null;

  const shareUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/share?img=${encodeURIComponent(
          img
        )}&genre=${encodeURIComponent(genre)}${
          audio ? `&audio=${encodeURIComponent(audio)}` : ""
        }`
      : "";

  return (
    <main className="flex min-h-screen items-center justify-center bg-black p-6 text-white">
      <div className="max-w-md space-y-6 text-center">
        <h2 className="text-2xl font-semibold">Your Echo</h2>

        <img
          src={imageUrl}
          alt="Generated album art"
          className="rounded-2xl shadow-xl"
        />

        {audioUrl && <audio controls src={audioUrl} className="w-full" />}

        <div className="flex flex-col items-center gap-2 pt-4">
          <QRCodeSVG
            value={shareUrl}
            size={160}
            bgColor="#000"
            fgColor="#fff"
          />
          <p className="text-xs text-zinc-400">Scan to view & download</p>
        </div>
      </div>
    </main>
  );
}
