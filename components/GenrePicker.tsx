"use client";
import { GENRES } from "@/lib/prompts";

export default function GenrePicker({
  onPick,
}: {
  onPick: (g: string) => void;
}) {
  return (
    <div>
      <p className="mb-2 text-sm text-zinc-400">Choose a genre</p>
      <div className="grid grid-cols-2 gap-3">
        {GENRES.map((g) => (
          <button
            key={g}
            onClick={() => onPick(g)}
            className="rounded-xl border border-zinc-700 p-3 text-sm transition hover:bg-white hover:text-black"
          >
            {g}
          </button>
        ))}
      </div>
    </div>
  );
}
