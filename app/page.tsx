"use client";

import { useState } from "react";
import Image from "next/image";
import ImageUpload from "@/components/ImageUpload";
import GenrePicker from "@/components/GenrePicker";

export default function Home() {
  const [image, setImage] = useState<File | null>(null);
  const [genre, setGenre] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function generate() {
    if (!image || !genre) return;
    setLoading(true);

    const fd = new FormData();
    fd.append("image", image);
    fd.append("genre", genre);

    const res = await fetch("/api/generate", {
      method: "POST",
      body: fd,
    });

    const data = await res.json();

    if (!data.img || !data.audio || !data.genre) {
      console.error("Invalid API response", data);
      setLoading(false);
      alert("Generation failed. Please try again.");
      return;
    }

    window.location.href = `/result?img=${data.img}&audio=${data.audio}&genre=${data.genre}`;
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-linear-to-br from-zinc-200 via-white to-zinc-200 p-6 text-zinc-900">
      <div className="w-full max-w-xl space-y-8">
        <div className="flex justify-center gap-8">
          <Image
            src="/images/apscon.png"
            alt="APSCon"
            width={90}
            height={45}
            className="object-contain"
          />
          <Image
            src="/images/sc.png"
            alt="Signal Processing Society"
            width={120}
            height={64}
            className="object-contain"
          />
        </div>

        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight uppercase">
            Echo
            <span className="rounded-xl bg-zinc-900 px-2 py-0.5 text-white">
              Self
            </span>
          </h1>
          <p className="mt-2 text-zinc-600">See yourself. Hear yourself.</p>
        </div>

        <div className="space-y-6 rounded-2xl bg-white p-6 shadow-xl ring-1 ring-zinc-200">
          <ImageUpload onSelect={setImage} />
          <GenrePicker value={genre} onPick={setGenre} />

          {genre && (
            <p className="text-center text-sm text-zinc-500">
              Selected:{" "}
              <span className="font-medium text-zinc-900">
                {genre.toUpperCase()}
              </span>
            </p>
          )}

          <button
            disabled={loading || !genre}
            onClick={generate}
            className={`w-full rounded-xl py-3 font-semibold transition ${
              loading || !genre
                ? "cursor-not-allowed bg-zinc-200 text-zinc-400"
                : "bg-zinc-900 text-white hover:bg-zinc-800"
            }`}
          >
            {loading ? "Creating your echo…" : "Generate My Echo"}
          </button>

          {loading && (
            <p className="animate-pulse text-center text-sm text-zinc-500">
              Generating album art & music…
            </p>
          )}
        </div>

        <p className="text-center text-xs text-zinc-400">
          Live AI demo · Conference preview build
        </p>
      </div>
    </main>
  );
}
