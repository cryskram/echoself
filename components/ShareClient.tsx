"use client";

import { useSearchParams } from "next/navigation";

const CLOUDINARY_BASE = `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/echoself`;

export default function ShareClient() {
  const params = useSearchParams();

  const img = params.get("img");
  const audio = params.get("audio");
  const genre = params.get("genre");

  if (!img || !genre) return null;

  if (!/^[a-zA-Z0-9-_]+\.(png|jpg|jpeg)$/.test(img)) return null;
  if (audio && !/^[a-zA-Z0-9-_]+\.wav$/.test(audio)) return null;

  const imageUrl = `${CLOUDINARY_BASE}/${img}`;
  const audioUrl = audio ? `/music/${genre}/${audio}` : null;

  return (
    <main className="flex min-h-screen items-center justify-center bg-black p-6 text-white">
      <div className="max-w-md space-y-4 text-center">
        <h1 className="text-2xl font-semibold">EchoSelf</h1>

        <img
          src={imageUrl}
          alt="Shared album art"
          className="rounded-xl shadow-xl"
        />

        {audioUrl && <audio controls src={audioUrl} className="w-full" />}

        <a
          href={imageUrl}
          download
          className="block rounded-xl bg-white py-2 font-semibold text-black transition hover:bg-zinc-200"
        >
          Download Image
        </a>

        <p className="text-xs text-zinc-400">Generated using EchoSelf</p>
      </div>
    </main>
  );
}
