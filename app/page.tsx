"use client";

import { useState } from "react";
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

    window.location.href = `/result?img=${data.imageFile}&audio=${data.audioFile}&genre=${data.genre}`;
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-linear-to-br from-black via-zinc-900 to-black p-6 text-white">
      <div className="w-full max-w-xl space-y-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight">EchoSelf</h1>
          <p className="mt-2 text-zinc-400">See yourself. Hear yourself.</p>
        </div>

        <div className="space-y-6 rounded-2xl bg-zinc-900/70 p-6 shadow-xl backdrop-blur">
          <ImageUpload onSelect={setImage} />
          <GenrePicker value={genre} onPick={setGenre} />

          {genre && (
            <p className="text-center text-sm text-zinc-400">
              Selected:{" "}
              <span className="font-medium text-white">
                {genre.toUpperCase()}
              </span>
            </p>
          )}

          <button
            disabled={loading}
            onClick={generate}
            className={`w-full rounded-xl py-3 font-semibold transition ${
              loading || !genre
                ? "cursor-not-allowed bg-zinc-700 text-zinc-400"
                : "bg-white text-black hover:bg-zinc-200"
            } `}
          >
            {loading ? "Creating your vibe…" : "Generate My Echo"}
          </button>

          {loading && (
            <p className="animate-pulse text-center text-sm text-zinc-400">
              Generating album art & music locally…
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
