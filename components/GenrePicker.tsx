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
      <p className="mb-2 text-sm font-medium text-zinc-600">Choose a genre</p>

      <div className="grid grid-cols-2 gap-3">
        {GENRES.map((g) => {
          const selected = value === g;

          return (
            <button
              key={g}
              onClick={() => onPick(g)}
              className={`rounded-xl border px-4 py-3 text-sm font-medium transition ${
                selected
                  ? "border-zinc-900 bg-zinc-900 text-white shadow"
                  : "border-zinc-200 bg-white text-zinc-800 hover:bg-zinc-100"
              }`}
            >
              {g.toUpperCase()}
            </button>
          );
        })}
      </div>
    </div>
  );
}
