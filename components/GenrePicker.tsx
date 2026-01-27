"use client";

import { GENRES } from "@/lib/helpers";
import { FaCheckCircle } from "react-icons/fa";

const GENRE_BACKGROUNDS: Record<string, string> = {
  rock: "/genres/rock.jpg",
  edm: "/genres/edm.jpg",
  chill: "/genres/chill.jpg",
  jazz: "/genres/jazz.jpg",
  hindustani: "/genres/hindustani.jpg",
  carnatic: "/genres/carnatic.jpg",
  indian: "/genres/indian.jpg",
  bollywood: "/genres/bollywood.jpg",
};

export default function GenrePicker({
  value,
  onPick,
}: {
  value: string | null;
  onPick: (g: string) => void;
}) {
  return (
    <div>
      <p className="mb-2 text-sm font-medium text-zinc-600">Choose a genre</p>

      <div className="grid grid-cols-2 gap-3">
        {GENRES.map((g) => {
          const selected = value === g;

          return (
            <button
              key={g}
              onClick={() => onPick(g)}
              style={{
                backgroundImage: `url(${GENRE_BACKGROUNDS[g]})`,
              }}
              className={`relative h-20 overflow-hidden rounded-xl border bg-cover bg-center transition ${
                selected
                  ? "scale-[1.02] border-zinc-900 ring-2 ring-zinc-900"
                  : "border-zinc-200 hover:scale-[1.01]"
              } `}
            >
              <div
                className={`absolute inset-0 transition ${
                  selected ? "bg-black/55" : "bg-black/45 hover:bg-black/55"
                }`}
              />

              {selected && (
                <div className="absolute top-2 right-2 z-20 flex h-6 w-6 items-center justify-center rounded-full bg-white text-zinc-900 shadow">
                  <FaCheckCircle size={14} strokeWidth={3} />
                </div>
              )}

              <span className="relative z-10 flex h-full items-center justify-center text-sm font-semibold tracking-wide text-white">
                {g.toUpperCase()}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
