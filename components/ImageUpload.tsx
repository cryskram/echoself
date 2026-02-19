"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

async function resizeFromCanvas(canvas: HTMLCanvasElement): Promise<File> {
  const MAX = 512;
  let { width, height } = canvas;

  if (width > height && width > MAX) {
    height = Math.round((height * MAX) / width);
    width = MAX;
  } else if (height > MAX) {
    width = Math.round((width * MAX) / height);
    height = MAX;
  }

  const resized = document.createElement("canvas");
  const ctx = resized.getContext("2d")!;

  resized.width = width;
  resized.height = height;
  ctx.drawImage(canvas, 0, 0, width, height);

  const blob = await new Promise<Blob>((res) =>
    resized.toBlob((b) => res(b!), "image/jpeg", 0.8)
  );

  return new File([blob], "capture.jpg", { type: "image/jpeg" });
}

export default function ImageUpload({
  onSelect,
}: {
  onSelect: (f: File) => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [preview, setPreview] = useState<string | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [flash, setFlash] = useState(false);

  async function startCamera() {
    const mediaStream = await navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: "user",
        width: { ideal: 1024 },
        height: { ideal: 1024 },
      },
    });

    setStream(mediaStream);

    if (videoRef.current) {
      videoRef.current.srcObject = mediaStream;
    }
  }

  function stopCamera() {
    stream?.getTracks().forEach((t) => t.stop());
    setStream(null);
  }

  useEffect(() => {
    startCamera();
    return () => stopCamera();
  }, []);

  async function capture() {
    if (!videoRef.current || !canvasRef.current) return;

    setFlash(true);
    setTimeout(() => setFlash(false), 150);

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d")!;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0);

    const file = await resizeFromCanvas(canvas);
    const url = URL.createObjectURL(file);

    setPreview(url);
    onSelect(file);
    stopCamera();
  }

  function retake() {
    if (preview) URL.revokeObjectURL(preview);
    setPreview(null);
    startCamera();
  }

  return (
    <div className="space-y-4 text-center">
      {!preview && (
        <div className="relative mx-auto w-[320px]">
          <div className="relative h-80 w-[320px] overflow-hidden rounded-full shadow-2xl ring-4 ring-zinc-200">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="h-full w-full object-cover"
            />

            {flash && (
              <div className="animate-flash absolute inset-0 rounded-full bg-white" />
            )}
          </div>

          <button
            onClick={capture}
            className="mt-5 rounded-xl bg-zinc-900 px-6 py-2 text-sm font-medium text-white shadow hover:bg-zinc-800"
          >
            Capture
          </button>
        </div>
      )}

      {preview && (
        <div className="relative mx-auto w-fit">
          <Image
            src={preview}
            width={256}
            height={256}
            alt="preview"
            className="rounded-full shadow-xl"
          />

          <button
            onClick={retake}
            className="absolute -top-3 -right-3 rounded-full bg-zinc-900 px-3 py-1 text-xs font-medium text-white shadow hover:bg-zinc-800"
          >
            Retake
          </button>
        </div>
      )}

      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}
