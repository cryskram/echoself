"use client";

import { useSearchParams } from "next/navigation";

export default function ShareClient() {
  const params = useSearchParams();
  const img = params.get("img");
  const audio = params.get("audio");

  if (!img) return null;

  return (
    <main className="flex min-h-screen items-center justify-center bg-black p-6 text-white">
      <div className="max-w-md space-y-4 text-center">
        <img src={img} className="rounded-xl" />

        {audio && <audio controls src={audio} className="w-full" />}

        <a
          href={img}
          download
          className="block rounded-xl bg-white py-2 font-semibold text-black"
        >
          Download Image
        </a>
      </div>
    </main>
  );
}
