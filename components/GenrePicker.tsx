"use client";

import { GENRES } from "@/lib/helpers";

export default function GenrePicker({
  value,
  onPick,
}: {
  value: string | null;
  onPick: (g: string) => void;
}) {
  return (
    <div>
      <p className="mb-2 text-sm text-zinc-400">Choose a genre</p>

      <div className="grid grid-cols-2 gap-3">
        {GENRES.map((g) => {
          const selected = value === g;

          return (
            <button
              key={g}
              onClick={() => onPick(g)}
              className={`rounded-xl border p-3 text-sm font-medium transition ${
                selected
                  ? "border-white bg-white text-black shadow-lg"
                  : "border-zinc-700 text-white hover:bg-white hover:text-black"
              } `}
            >
              {g.toUpperCase()}
            </button>
          );
        })}
      </div>
    </div>
  );
}
