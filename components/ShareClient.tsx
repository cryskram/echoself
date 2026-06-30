"use client";

import { useSearchParams } from "next/navigation";
import Image from "next/image";

export default function ShareClient() {
  const params = useSearchParams();

  const img = params.get("img");
  const audio = params.get("audio");
  const genre = params.get("genre");

  if (!img || !genre) return null;

  const imageUrl = `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/echoself/${img}`;
  const audioUrl = audio
    ? `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/video/upload/echoself/music/${genre}/${audio}`
    : null;

  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-50 p-6">
      <div className="w-full max-w-md space-y-4 rounded-2xl bg-white p-6 text-center shadow-lg ring-1 ring-zinc-200">
        <div className="mb-8 flex flex-col items-center gap-6">
          <div className="flex w-full items-center justify-center gap-10 md:gap-20">
            <Image
              src="/images/bangaloresec.png"
              alt="IEEE Bangalore Section"
              width={190}
              height={50}
              className="h-12 w-auto object-contain"
            />

            <Image
              src="/images/bangalore50.png"
              alt="IEEE Bangalore 50"
              width={200}
              height={50}
              className="h-16 w-auto object-contain"
            />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-14">
            <Image
              src="/images/dataport.png"
              alt="IEEE DataPort"
              width={150}
              height={40}
              className="h-8 w-auto object-contain"
            />

            <Image
              src="/images/conecct.png"
              alt="Conecct"
              width={150}
              height={40}
              className="h-12 w-auto object-contain"
            />

            <Image
              src="/images/csbc.png"
              alt="CSBC"
              width={150}
              height={40}
              className="h-16 w-auto object-contain"
            />
          </div>
        </div>

        <h1 className="text-2xl font-semibold text-zinc-900 uppercase">
          Echo
          <span className="rounded-xl bg-zinc-900 px-2 py-1 text-white">
            Self
          </span>
        </h1>

        <img
          src={imageUrl}
          alt="Shared album art"
          className="mx-auto rounded-xl shadow-md"
        />

        {audioUrl && (
          <audio
            controls
            src={audioUrl}
            className="w-full rounded-xl border border-zinc-200 bg-zinc-100 p-2"
          />
        )}

        <a
          href={imageUrl}
          download
          className="block rounded-xl bg-zinc-900 py-2 font-semibold text-white transition hover:bg-zinc-800"
        >
          Download Image
        </a>

        <p className="text-xs text-zinc-500">Generated using EchoSelf</p>
      </div>
    </main>
  );
}
