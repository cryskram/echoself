"use client";

import { useState } from "react";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function unlock() {
    setLoading(true);
    setError("");

    const res = await fetch("/api/login", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        password,
      }),
    });

    if (!res.ok) {
      setLoading(false);
      setError("Incorrect password.");
      return;
    }

    window.location.href = "/";
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-100">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl">
        <h1 className="text-center text-4xl font-bold">
          Echo
          <span className="rounded-xl bg-black px-2 text-white">Self</span>
        </h1>

        <p className="mt-4 text-center text-zinc-500">Volunteer Access</p>

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="mt-8 w-full rounded-xl border p-3"
        />

        {error && <p className="mt-3 text-sm text-red-500">{error}</p>}

        <button
          onClick={unlock}
          disabled={loading}
          className="mt-6 w-full rounded-xl bg-black py-3 font-semibold text-white"
        >
          {loading ? "Unlocking..." : "Unlock"}
        </button>
      </div>
    </main>
  );
}
