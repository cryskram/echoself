"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";

async function resizeImage(file: File): Promise<File> {
  const img = document.createElement("img");
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d")!;

  const objectUrl = URL.createObjectURL(file);
  img.src = objectUrl;

  await new Promise((res) => (img.onload = res));

  const MAX = 512;
  let { width, height } = img;

  if (width > height && width > MAX) {
    height = Math.round((height * MAX) / width);
    width = MAX;
  } else if (height > MAX) {
    width = Math.round((width * MAX) / height);
    height = MAX;
  }

  canvas.width = width;
  canvas.height = height;
  ctx.drawImage(img, 0, 0, width, height);

  URL.revokeObjectURL(objectUrl);

  const blob = await new Promise<Blob>((res) =>
    canvas.toBlob((b) => res(b!), "image/jpeg", 0.8)
  );

  return new File([blob], "upload.jpg", { type: "image/jpeg" });
}

export default function ImageUpload({
  onSelect,
}: {
  onSelect: (f: File) => void;
}) {
  const [preview, setPreview] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  async function handleFile(file: File) {
    const resized = await resizeImage(file);
    if (preview) URL.revokeObjectURL(preview);
    const url = URL.createObjectURL(resized);
    setPreview(url);
    onSelect(resized);
  }

  function reset() {
    if (preview) URL.revokeObjectURL(preview);
    setPreview(null);
  }

  return (
    <div className="space-y-4">
      {!preview && (
        <label
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragging(false);
            const file = e.dataTransfer.files?.[0];
            if (file) handleFile(file);
          }}
          className={`flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed p-8 text-center transition ${
            dragging
              ? "border-zinc-900 bg-zinc-100"
              : "border-zinc-300 hover:border-zinc-400"
          }`}
        >
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFile(file);
            }}
          />

          <p className="font-medium text-zinc-800">
            Click to upload or drag & drop
          </p>
          <p className="mt-1 text-sm text-zinc-500">
            JPG / PNG · auto-optimized
          </p>
        </label>
      )}

      {preview && (
        <div className="relative mx-auto w-fit">
          <Image
            src={preview}
            width={256}
            height={256}
            alt="preview"
            className="rounded-xl shadow-lg"
          />

          <button
            onClick={reset}
            className="absolute -top-3 -right-3 rounded-full bg-zinc-900 px-3 py-1 text-xs font-medium text-white shadow hover:bg-zinc-800"
          >
            Change
          </button>
        </div>
      )}
    </div>
  );
}
