"use client";

import { useSearchParams } from "next/navigation";
import Image from "next/image";
import AudioPlayer from "@/components/AudioPlayer";

export default function ResultClient() {
  const params = useSearchParams();
  const img = params.get("img")!;
  const audio = params.get("audio")!;

  return (
    <main className="flex min-h-screen items-center justify-center bg-linear-to-br from-black to-zinc-900 p-6 text-white">
      <div className="w-full max-w-md space-y-6 text-center">
        <h2 className="text-2xl font-semibold">Your Echo</h2>

        <Image
          src={img}
          width={512}
          height={512}
          alt="Generated album art"
          className="rounded-2xl shadow-xl"
        />

        <AudioPlayer src={audio} />

        <p className="text-sm text-zinc-400">Generated locally using AI</p>
      </div>
    </main>
  );
}
