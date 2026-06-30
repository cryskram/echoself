"use client";

import { GENRES } from "@/lib/helpers";
import { FaRegCheckCircle } from "react-icons/fa";
import { FaCircleCheck } from "react-icons/fa6";

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
  onPick: (genre: string) => void;
}) {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-bold text-zinc-900">
          Choose your music identity
        </h2>

        <p className="mt-1 text-sm text-zinc-500">
          Select a genre to transform your portrait.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        {GENRES.map((genre) => {
          const selected = value === genre;

          return (
            <button
              key={genre}
              onClick={() => onPick(genre)}
              style={{
                backgroundImage: `url(${GENRE_BACKGROUNDS[genre]})`,
              }}
              className={`group relative aspect-square overflow-hidden rounded-2xl border bg-cover bg-center transition-all duration-300 ${
                selected
                  ? "scale-[1.03] border-zinc-900 ring-4 ring-zinc-900/15"
                  : "border-zinc-200 hover:scale-[1.02]"
              } `}
            >
              <div
                className={`absolute inset-0 transition ${
                  selected
                    ? "bg-black/45"
                    : "bg-black/55 group-hover:bg-black/40"
                } `}
              />

              {selected && (
                <div className="absolute top-3 right-3 z-20 rounded-full bg-white p-1 shadow-lg">
                  <FaCircleCheck className="text-zinc-900" size={20} />
                </div>
              )}

              <div className="absolute inset-x-0 bottom-0 z-10 p-4 text-left">
                <p className="text-lg font-bold tracking-wide text-white uppercase">
                  {genre}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
