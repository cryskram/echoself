"use client";

import Image from "next/image";
import { useState } from "react";

export default function ImageUpload({
  onSelect,
}: {
  onSelect: (f: File) => void;
}) {
  const [preview, setPreview] = useState<string | null>(null);

  return (
    <div>
      <p className="mb-2 text-sm text-zinc-400">Upload your photo</p>

      <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-zinc-700 p-6 transition hover:border-white">
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (!file) return;
            setPreview(URL.createObjectURL(file));
            onSelect(file);
          }}
        />

        {preview ? (
          <Image
            src={preview}
            width={200}
            height={200}
            alt="preview"
            className="rounded-lg"
          />
        ) : (
          <span className="text-sm text-zinc-400">Click to upload image</span>
        )}
      </label>
    </div>
  );
}
