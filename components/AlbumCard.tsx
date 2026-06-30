"use client";

import { forwardRef } from "react";

import LogoStrip from "./LogoStrip";
import AlbumFooter from "./AlbumFooter";

type Props = {
  imageUrl: string;
  genre: string;
  className?: string;
};

const genreAccent: Record<string, string> = {
  rock: "from-red-500/10",
  edm: "from-cyan-500/10",
  chill: "from-emerald-500/10",
  jazz: "from-amber-500/10",
  hindustani: "from-orange-500/10",
  carnatic: "from-yellow-500/10",
  indian: "from-blue-500/10",
  bollywood: "from-pink-500/10",
};

const releaseDate = new Intl.DateTimeFormat("en-US", {
  month: "long",
  year: "numeric",
}).format(new Date());

const AlbumCard = forwardRef<HTMLDivElement, Props>(
  ({ imageUrl, genre, className = "" }, ref) => {
    return (
      <div
        ref={ref}
        className={`relative overflow-hidden rounded-[36px] border border-zinc-800 bg-linear-to-b from-[#101010] via-[#171717] to-[#0d0d0d] shadow-[0_40px_80px_rgba(0,0,0,.35)] ${className} `}
      >
        <div
          className={`absolute inset-0 bg-linear-to-br ${genreAccent[genre] ?? "from-white/5"} pointer-events-none to-transparent`}
        />

        <div className="p-6">
          <LogoStrip />
        </div>

        <div className="px-8">
          <div className="relative">
            <div className="absolute inset-0 scale-95 rounded-[30px] bg-white/5 blur-3xl" />

            <img
              src={imageUrl}
              draggable={false}
              alt="Album Cover"
              className="relative aspect-square w-full rounded-[28px] object-cover shadow-[0_20px_60px_rgba(0,0,0,.45)] ring-1 ring-white/10 select-none"
            />
          </div>
        </div>

        <div className="px-10 py-8">
          <p className="text-xs font-medium tracking-[0.35em] text-zinc-500 uppercase">
            EchoSelf Original
          </p>

          <p className="mt-1 text-xs tracking-[0.3em] text-zinc-600 uppercase">
            Your {genre} Identity
          </p>

          <h2 className="mt-5 text-4xl font-extrabold tracking-tight text-white">
            Echo
            <span className="ml-2 rounded-xl bg-white px-3 py-1 text-zinc-900">
              Self
            </span>
          </h2>

          <div className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-900/80 p-6">
            <div className="grid grid-cols-3 divide-x divide-zinc-700 text-center">
              <div>
                <p className="text-[11px] tracking-[0.35em] text-zinc-500 uppercase">
                  Listener
                </p>

                <p className="mt-2 text-lg font-bold text-white">YOU</p>
              </div>

              <div>
                <p className="text-[11px] tracking-[0.35em] text-zinc-500 uppercase">
                  Released
                </p>

                <p className="mt-2 text-lg font-bold text-white">
                  {releaseDate}
                </p>
              </div>

              <div>
                <p className="text-[11px] tracking-[0.35em] text-zinc-500 uppercase">
                  Genre
                </p>

                <p className="mt-2 text-lg font-bold text-white uppercase">
                  {genre}
                </p>
              </div>
            </div>
          </div>
        </div>

        <AlbumFooter />
      </div>
    );
  }
);

AlbumCard.displayName = "AlbumCard";

export default AlbumCard;
