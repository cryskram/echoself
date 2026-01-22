"use client";

import { useSearchParams } from "next/navigation";
import { QRCodeSVG } from "qrcode.react";

export default function ResultClient() {
  const params = useSearchParams();
  const img = params.get("img");
  const audio = params.get("audio");

  if (!img) return null;

  const shareUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/share?img=${encodeURIComponent(
          img
        )}&audio=${encodeURIComponent(audio ?? "")}`
      : "";

  return (
    <main className="flex min-h-screen items-center justify-center bg-black p-6 text-white">
      <div className="max-w-md space-y-6 text-center">
        <h2 className="text-2xl font-semibold">Your Echo</h2>

        <img src={img} className="rounded-2xl shadow-xl" />

        {audio && <audio controls src={audio} className="w-full" />}

        <div className="flex flex-col items-center gap-2">
          <QRCodeSVG
            value={shareUrl}
            size={160}
            bgColor="#000"
            fgColor="#fff"
          />
          <p className="text-xs text-zinc-400">Scan to view & download</p>
        </div>
      </div>
    </main>
  );
}
