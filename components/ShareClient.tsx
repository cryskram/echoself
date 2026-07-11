"use client";

import { useRef } from "react";
import { toPng } from "html-to-image";

import AlbumCard from "./AlbumCard";
import { toast } from "sonner";

type Props = {
  img: string;
  genre: string;
  audio: string;
};

export default function ShareClient({ img, genre, audio }: Props) {
  const cardRef = useRef<HTMLDivElement>(null);

  const imageUrl = `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/echoself/${img}`;

  const audioUrl = audio
    ? `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/video/upload/echoself/music/${genre}/${audio}`
    : null;

  async function downloadAlbum() {
    if (!cardRef.current) return;

    try {
      const dataUrl = await toPng(cardRef.current, {
        cacheBust: true,
        pixelRatio: 3,
      });

      const link = document.createElement("a");

      link.download = `EchoSelf-${genre}.png`;

      link.href = dataUrl;

      link.click();
    } catch (err) {
      console.error(err);
    }
  }

  const caption = `Just discovered my AI-generated music identity with EchoSelf! 🎵✨

Created my own personalized album cover and soundtrack at Karnataka CS Student Congress 2026.

Tag:
• IEEE Bangalore Section
• IEEE Computer Society Bangalore Chapter

#EchoSelf #AI #Music #IEEE #StudentCongress #ComputerSociety`;

  async function generateAlbumFile() {
    if (!cardRef.current) return null;

    const dataUrl = await toPng(cardRef.current, {
      cacheBust: true,
      pixelRatio: 3,
    });

    const blob = await (await fetch(dataUrl)).blob();

    return new File([blob], `EchoSelf-${genre}.png`, {
      type: "image/png",
    });
  }

  async function shareEcho() {
    try {
      const file = await generateAlbumFile();

      if (!file) return;

      if (
        navigator.canShare &&
        navigator.canShare({
          files: [file],
        })
      ) {
        await navigator.share({
          title: "My EchoSelf",
          text: caption,
          url: window.location.href,
          files: [file],
        });

        return;
      }

      await downloadAlbum();

      await navigator.clipboard.writeText(caption);

      toast.success(
        "Album downloaded! Caption copied. Open your favorite social app and post it."
      );
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <main className="min-h-screen bg-linear-to-br from-zinc-100 via-white to-zinc-100 py-10">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-6 lg:flex-row lg:items-start">
        <div className="flex flex-1 justify-center">
          <AlbumCard
            ref={cardRef}
            imageUrl={imageUrl}
            genre={genre}
            className="w-full max-w-162.5"
          />
        </div>

        <div className="mx-auto w-full max-w-xl space-y-6">
          <section className="rounded-3xl bg-white p-6 shadow-lg ring-1 ring-zinc-200">
            <h2 className="mb-5 text-xl font-bold text-zinc-900">
              🎵 Now Playing
            </h2>

            <p className="mb-4 text-sm tracking-[0.25em] text-zinc-500 uppercase">
              {genre} Identity
            </p>

            {audioUrl ? (
              <audio controls src={audioUrl} className="w-full rounded-xl" />
            ) : (
              <p className="text-zinc-500">No soundtrack available.</p>
            )}
          </section>

          <section className="rounded-3xl bg-white p-6 shadow-lg ring-1 ring-zinc-200">
            <h2 className="text-xl font-bold text-zinc-900">
              📥 Download Album Cover
            </h2>

            <p className="mt-2 text-sm leading-relaxed text-zinc-600">
              Download your personalized Echo album exactly as shown.
            </p>

            <button
              onClick={downloadAlbum}
              className="mt-6 w-full rounded-xl bg-zinc-900 py-3 font-semibold text-white transition hover:bg-zinc-800"
            >
              Download Album Cover
            </button>
          </section>

          <section className="rounded-3xl bg-white p-6 shadow-lg ring-1 ring-zinc-200">
            <h2 className="text-xl font-bold text-zinc-900">
              🚀 Share Your Echo
            </h2>

            <p className="mt-3 leading-relaxed text-zinc-600">
              Share your personalized Echo on social media and inspire others to
              discover their own music identity.
            </p>

            <button
              onClick={shareEcho}
              className="mt-6 w-full rounded-xl bg-zinc-900 py-3 font-semibold text-white transition hover:bg-zinc-800"
            >
              Share My Echo
            </button>

            <div className="mt-5 rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
              <p className="text-sm font-semibold text-zinc-800">
                Don't forget to tag
              </p>

              <div className="mt-3 flex flex-wrap gap-2">
                {[
                  "IEEE Computer Society Bangalore Chapter",
                  "IEEE Bangalore Section",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-zinc-900 px-3 py-1 text-sm font-medium text-white"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </section>

          <section className="rounded-3xl bg-white p-6 shadow-lg ring-1 ring-zinc-200">
            <h2 className="text-xl font-bold text-zinc-900">About EchoSelf</h2>

            <p className="mt-3 leading-relaxed text-zinc-600">
              EchoSelf transforms your selfie into a personalized music identity
              using AI-generated album artwork and a curated soundtrack inspired
              by your chosen genre.
            </p>

            <a
              href="/"
              className="mt-6 block w-full rounded-xl bg-zinc-900 py-3 text-center font-semibold text-white transition hover:bg-zinc-800"
            >
              Create Your Own Echo
            </a>
          </section>
        </div>
      </div>
    </main>
  );
}
