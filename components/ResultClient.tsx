"use client";

import { useSearchParams } from "next/navigation";
import { QRCodeSVG } from "qrcode.react";
import { useEffect, useRef, useState } from "react";
import { toPng } from "html-to-image";

import AlbumCard from "./AlbumCard";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ResultClient() {
  const params = useSearchParams();

  const img = params.get("img");
  const audio = params.get("audio");
  const genre = params.get("genre");

  const [secondsLeft, setSecondsLeft] = useState(100);

  const [shareUrl, setShareUrl] = useState("");

  const [email, setEmail] = useState("");

  const [sending, setSending] = useState(false);

  const [sent, setSent] = useState(false);

  const [emailError, setEmailError] = useState("");

  const cardRef = useRef<HTMLDivElement>(null);

  if (!img || !genre) {
    return null;
  }

  const imageUrl = `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/echoself/${img}`;

  const audioUrl = audio
    ? `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/video/upload/echoself/music/${genre}/${audio}`
    : null;

  useEffect(() => {
    async function createToken() {
      try {
        const res = await fetch("/api/share-token", {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            img,
            genre,
            audio,
          }),
        });

        const data = await res.json();

        setShareUrl(`${window.location.origin}/share?t=${data.token}`);
      } catch {
        console.error("Failed to generate share URL");
      }
    }

    createToken();
  }, [img, genre, audio]);

  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);

          window.location.replace("/");

          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  async function downloadAlbum() {
    if (!cardRef.current) return;

    try {
      const dataUrl = await toPng(cardRef.current, {
        cacheBust: true,
        pixelRatio: 3,
      });

      const link = document.createElement("a");

      link.download = `EchoSelf-${genre}.png`;

      link.href = dataUrl;

      link.click();
    } catch {
      console.error("Download failed");
    }
  }

  async function sendEmail() {
    if (!EMAIL_REGEX.test(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    try {
      setSending(true);

      setEmailError("");

      const res = await fetch("/api/send-email", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          email,
          image: img,
          genre,
          audio,
        }),
      });

      if (!res.ok) {
        throw new Error();
      }

      setSent(true);
    } catch {
      setEmailError(
        "Couldn't send the email. You can still use the QR code below."
      );
    } finally {
      setSending(false);
    }
  }

  return (
    <main className="min-h-screen bg-linear-to-br from-zinc-100 via-white to-zinc-100 py-10">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-6 lg:flex-row lg:items-start">
        <div className="flex flex-1 justify-center">
          <AlbumCard
            ref={cardRef}
            imageUrl={imageUrl}
            genre={genre}
            className="w-full max-w-162.5"
          />
        </div>

        <div className="mx-auto w-full max-w-xl space-y-6">
          <section className="rounded-3xl bg-white p-6 shadow-lg ring-1 ring-zinc-200">
            <h2 className="mb-5 text-xl font-bold text-zinc-900">
              Listen to your soundtrack
            </h2>

            {audioUrl ? (
              <audio controls src={audioUrl} className="w-full rounded-xl" />
            ) : (
              <p className="text-zinc-500">No soundtrack available.</p>
            )}

            <button
              onClick={downloadAlbum}
              className="mt-6 w-full rounded-xl bg-zinc-900 py-3 font-semibold text-white transition hover:bg-zinc-800"
            >
              Download Album Cover
            </button>
          </section>

          <section className="rounded-3xl bg-white p-6 shadow-lg ring-1 ring-zinc-200">
            <h2 className="text-xl font-bold text-zinc-900">Keep your Echo</h2>

            <p className="mt-2 text-sm leading-relaxed text-zinc-600">
              We'll send you a private link so you can revisit your Echo
              anytime.
            </p>

            <input
              type="email"
              value={email}
              disabled={sending || sent}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="mt-5 w-full rounded-xl border border-zinc-300 px-4 py-3 transition outline-none focus:border-zinc-900"
            />

            {emailError && (
              <p className="mt-3 text-sm text-red-500">{emailError}</p>
            )}

            {sent ? (
              <div className="mt-5 rounded-xl bg-emerald-50 p-4 text-center text-emerald-700 ring-1 ring-emerald-200">
                <p className="font-semibold">✅ Check your inbox!</p>

                <p className="mt-1 text-sm">Your Echo is on its way.</p>
              </div>
            ) : (
              <button
                onClick={sendEmail}
                disabled={sending}
                className="mt-5 w-full rounded-xl bg-zinc-900 py-3 font-semibold text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {sending ? "Sending..." : "📧 Email My Echo"}
              </button>
            )}
          </section>

          <section className="rounded-3xl bg-white p-6 shadow-lg ring-1 ring-zinc-200">
            <h2 className="text-xl font-bold text-zinc-900">
              Continue on your phone
            </h2>

            <p className="mt-2 text-sm text-zinc-600">
              Scan this QR code to listen, download and share your Echo.
            </p>

            <div className="mt-6 flex justify-center">
              <div className="rounded-2xl bg-white p-4 shadow ring-1 ring-zinc-200">
                {shareUrl && (
                  <QRCodeSVG value={shareUrl} size={220} includeMargin />
                )}
              </div>
            </div>
          </section>

          <section className="rounded-3xl bg-white p-6 text-center shadow-lg ring-1 ring-zinc-200">
            <p className="text-sm tracking-[0.3em] text-zinc-500 uppercase">
              Session Ends In
            </p>

            <p className="mt-3 text-6xl font-black text-zinc-900">
              {secondsLeft}
            </p>

            <p className="mt-2 text-zinc-500">seconds</p>
          </section>
        </div>
      </div>
    </main>
  );
}
