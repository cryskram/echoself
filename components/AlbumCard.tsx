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
        className={`relative overflow-hidden rounded-[28px] border border-zinc-800 bg-linear-to-b from-[#101010] via-[#171717] to-[#0d0d0d] shadow-[0_25px_60px_rgba(0,0,0,.30)] sm:rounded-[36px] sm:shadow-[0_40px_80px_rgba(0,0,0,.35)] ${className} `}
      >
        <div
          className={`pointer-events-none absolute inset-0 bg-linear-to-br ${
            genreAccent[genre] ?? "from-white/5"
          } to-transparent`}
        />

        <div className="p-4 sm:p-6">
          <LogoStrip />
        </div>

        <div className="px-4 sm:px-8">
          <div className="relative">
            <div className="absolute inset-0 scale-95 rounded-3xl bg-white/5 blur-3xl sm:rounded-[30px]" />

            <img
              src={imageUrl}
              draggable={false}
              alt="Album Cover"
              className="relative aspect-square w-full rounded-[22px] object-cover shadow-[0_16px_40px_rgba(0,0,0,.45)] ring-1 ring-white/10 select-none sm:rounded-[28px] sm:shadow-[0_20px_60px_rgba(0,0,0,.45)]"
            />
          </div>
        </div>

        <div className="px-5 py-6 sm:px-10 sm:py-8">
          <p className="text-[10px] font-medium tracking-[0.28em] text-zinc-500 uppercase sm:text-xs sm:tracking-[0.35em]">
            EchoSelf Original
          </p>

          <p className="mt-1 text-[10px] tracking-[0.25em] text-zinc-600 uppercase sm:text-xs sm:tracking-[0.3em]">
            Your {genre} Identity
          </p>

          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:mt-5 sm:text-4xl">
            Echo
            <span className="ml-2 rounded-lg bg-white px-2 py-1 text-zinc-900 sm:rounded-xl sm:px-3">
              Self
            </span>
          </h2>

          <div className="mt-6 rounded-2xl border border-zinc-800 bg-zinc-900/80 p-4 sm:mt-8 sm:p-6">
            <div className="grid grid-cols-3 divide-x divide-zinc-700 text-center">
              <div className="px-2">
                <p className="text-[9px] tracking-[0.22em] text-zinc-500 uppercase sm:text-[11px] sm:tracking-[0.35em]">
                  Listener
                </p>

                <p className="mt-2 text-sm font-bold text-white sm:text-lg">
                  YOU
                </p>
              </div>

              <div className="px-2">
                <p className="text-[9px] tracking-[0.22em] text-zinc-500 uppercase sm:text-[11px] sm:tracking-[0.35em]">
                  Released
                </p>

                <p className="mt-2 text-xs font-bold text-white sm:text-lg">
                  {releaseDate}
                </p>
              </div>

              <div className="px-2">
                <p className="text-[9px] tracking-[0.22em] text-zinc-500 uppercase sm:text-[11px] sm:tracking-[0.35em]">
                  Genre
                </p>

                <p className="mt-2 text-xs font-bold text-white uppercase sm:text-lg">
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
