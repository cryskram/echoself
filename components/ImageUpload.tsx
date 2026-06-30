"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { FaCamera, FaRotate } from "react-icons/fa6";

async function resizeFromCanvas(canvas: HTMLCanvasElement): Promise<File> {
  const MAX = 768;

  let { width, height } = canvas;

  if (width > height && width > MAX) {
    height = Math.round((height * MAX) / width);
    width = MAX;
  } else if (height > MAX) {
    width = Math.round((width * MAX) / height);
    height = MAX;
  }

  const resized = document.createElement("canvas");

  resized.width = width;
  resized.height = height;

  const ctx = resized.getContext("2d")!;

  ctx.drawImage(canvas, 0, 0, width, height);

  const blob = await new Promise<Blob>((resolve) =>
    resized.toBlob((b) => resolve(b!), "image/jpeg", 0.9)
  );

  return new File([blob], "capture.jpg", {
    type: "image/jpeg",
  });
}

export default function ImageUpload({
  onSelect,
}: {
  onSelect: (file: File) => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [preview, setPreview] = useState<string | null>(null);

  const [stream, setStream] = useState<MediaStream | null>(null);

  const [flash, setFlash] = useState(false);

  async function startCamera() {
    const media = await navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: "user",
        width: {
          ideal: 1280,
        },
        height: {
          ideal: 1280,
        },
      },
    });

    setStream(media);

    if (videoRef.current) {
      videoRef.current.srcObject = media;
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

    setTimeout(() => setFlash(false), 120);

    const canvas = canvasRef.current;

    const video = videoRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    canvas.getContext("2d")!.drawImage(video, 0, 0);

    const file = await resizeFromCanvas(canvas);

    setPreview(URL.createObjectURL(file));

    onSelect(file);

    stopCamera();
  }

  function retake() {
    if (preview) URL.revokeObjectURL(preview);

    setPreview(null);

    startCamera();
  }

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-full max-w-md">
        <div className="overflow-hidden rounded-4xl border border-zinc-200 bg-black shadow-2xl">
          {!preview ? (
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="aspect-3/4 w-full object-cover"
            />
          ) : (
            <Image
              src={preview}
              alt="Preview"
              width={600}
              height={800}
              className="aspect-3/4 w-full object-cover"
            />
          )}

          {flash && (
            <div className="absolute inset-0 animate-pulse bg-white/80" />
          )}
        </div>

        {!preview && (
          <div className="absolute top-5 left-5 rounded-full bg-red-500 px-3 py-1 text-xs font-semibold tracking-wider text-white shadow-lg">
            ● LIVE
          </div>
        )}
      </div>

      <div className="mt-8 flex items-center gap-5">
        {!preview ? (
          <button
            onClick={capture}
            className="group flex items-center gap-3 rounded-full bg-zinc-900 px-8 py-4 text-white shadow-xl transition hover:scale-105"
          >
            <FaCamera size={22} />

            <span className="font-semibold">Capture Photo</span>
          </button>
        ) : (
          <button
            onClick={retake}
            className="group flex items-center gap-3 rounded-full border border-zinc-300 bg-white px-8 py-4 shadow-lg transition hover:bg-zinc-100"
          >
            <FaRotate size={20} />

            <span className="font-semibold">Retake</span>
          </button>
        )}
      </div>

      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}
