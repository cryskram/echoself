"use client";

import { useSearchParams } from "next/navigation";
import { QRCodeSVG } from "qrcode.react";
import Image from "next/image";

export default function ResultClient() {
  const params = useSearchParams();

  const img = params.get("img");
  const audio = params.get("audio");
  const genre = params.get("genre");

  if (!img || !genre) return null;

  const imageUrl = `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/echoself/${img}`;
  const audioUrl = audio
    ? `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/video/upload/echoself/music/${genre}/${audio}`
    : null;

  const shareUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/share?img=${img}&genre=${genre}&audio=${audio ?? ""}`
      : "";

  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-50 p-6">
      <div className="w-full max-w-md space-y-6 rounded-2xl bg-white p-6 text-center shadow-lg ring-1 ring-zinc-200">
        <div className="flex justify-center gap-6">
          <Image src="/images/apscon.png" alt="APSCon" width={80} height={40} />
          <Image src="/images/sc.png" alt="SC" width={120} height={64} />
        </div>

        <h1 className="text-2xl font-bold text-zinc-900 uppercase">
          Echo
          <span className="rounded-xl bg-zinc-900 px-2 py-1 text-white">
            Self
          </span>
        </h1>

        <img
          src={imageUrl}
          alt="Generated album art"
          className="mx-auto rounded-2xl shadow-md"
        />

        {audioUrl && (
          <audio
            controls
            src={audioUrl}
            className="w-full rounded-xl border border-zinc-200 bg-zinc-100 p-2"
          />
        )}

        <div className="flex flex-col items-center gap-2 pt-4">
          <QRCodeSVG
            value={shareUrl}
            size={160}
            bgColor="#ffffff"
            fgColor="#000000"
          />
          <p className="text-xs text-zinc-500">Scan to view & download</p>
        </div>
      </div>
    </main>
  );
}
