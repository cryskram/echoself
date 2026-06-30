"use client";

import { useSearchParams } from "next/navigation";
import { QRCodeSVG } from "qrcode.react";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";

export default function ResultClient() {
  const params = useSearchParams();

  const [secondsLeft, setSecondsLeft] = useState(60);
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [emailError, setEmailError] = useState(false);

  const emailRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const countdown = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          clearInterval(countdown);
          window.location.replace("/");
          return 0;
        }

        return s - 1;
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, []);

  const img = params.get("img");
  const audio = params.get("audio");
  const genre = params.get("genre");

  if (!img || !genre) return null;

  const imageUrl = `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/echoself/${img}`;
  const audioUrl = audio
    ? `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/video/upload/echoself/music/${genre}/${audio}`
    : null;

  const [shareUrl, setShareUrl] = useState("");

  useEffect(() => {
    async function generateToken() {
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
    }

    generateToken();
  }, [img, genre, audio]);

  async function sendEmail() {
    if (!email) return;

    try {
      setSending(true);

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
      setSent(false);
      setEmailError(true);
      console.log("Couldnt send email");
    } finally {
      setSending(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-50 p-6">
      <div className="w-full max-w-xl space-y-6 rounded-2xl bg-white p-6 text-center shadow-lg ring-1 ring-zinc-200">
        <div className="mb-8 flex w-full flex-col items-center gap-6">
          <div className="flex w-full items-center justify-center gap-10">
            <Image
              src="/images/bangaloresec.png"
              alt="IEEE Bangalore Section"
              width={190}
              height={50}
              className="h-12 w-auto object-contain"
            />

            <Image
              src="/images/bangalore50.png"
              alt="IEEE Bangalore 50"
              width={200}
              height={50}
              className="h-16 w-auto object-contain"
            />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-8">
            <Image
              src="/images/dataport.png"
              alt="IEEE DataPort"
              width={150}
              height={40}
              className="h-8 w-auto object-contain"
            />

            <Image
              src="/images/conecct.png"
              alt="Conecct"
              width={150}
              height={40}
              className="h-12 w-auto object-contain"
            />

            <Image
              src="/images/csbc.png"
              alt="CSBC"
              width={150}
              height={40}
              className="h-16 w-auto object-contain"
            />
          </div>
        </div>

        <h1 className="text-2xl font-bold text-zinc-900 uppercase">
          Echo
          <span className="rounded-xl bg-zinc-900 px-2 py-1 text-white">
            Self
          </span>
        </h1>

        <img
          src={imageUrl}
          alt="Generated album art"
          className="mx-auto rounded-2xl shadow-md"
        />

        {audioUrl && (
          <audio
            controls
            src={audioUrl}
            className="w-full rounded-xl border border-zinc-200 bg-zinc-100 p-2"
          />
        )}

        <div className="space-y-4 rounded-2xl border border-zinc-200 bg-zinc-50 p-5">
          <h2 className="text-lg font-semibold">Get a copy of your Echo</h2>

          <p className="text-sm text-zinc-500">
            Enter your email and we'll send you your album art and soundtrack.
          </p>

          <input
            ref={emailRef}
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border border-zinc-300 p-3 outline-none focus:border-zinc-900"
          />

          <button
            onClick={sendEmail}
            disabled={sending || sent || !email}
            className="w-full rounded-xl bg-zinc-900 py-3 font-semibold text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {sent ? "✓ Email Sent" : sending ? "Sending..." : "Send me my Echo"}
          </button>

          {sent && (
            <p className="text-sm text-green-600">
              🎉 Your Echo has been emailed.
            </p>
          )}

          {emailError && (
            <p className="text-sm text-red-500">
              Couldn't send email. Please use the QR code instead.
            </p>
          )}
        </div>

        <h2 className="text-lg font-semibold">📱 Scan & Save</h2>

        <p className="text-sm text-zinc-500">
          Open your Echo on your own device.
        </p>

        <div className="flex flex-col items-center gap-2 pt-4">
          <QRCodeSVG
            value={shareUrl}
            size={160}
            bgColor="#ffffff"
            fgColor="#000000"
          />
          <div
            className={`rounded-xl border p-5 transition-all duration-700 ${
              secondsLeft <= 10
                ? "border-red-200 bg-red-50"
                : "border-zinc-200 bg-zinc-100"
            }`}
          >
            <p className="text-sm text-zinc-500">Returning to Home</p>
            <p className="text-5xl font-bold">{secondsLeft}</p>
          </div>
        </div>
      </div>
    </main>
  );
}
