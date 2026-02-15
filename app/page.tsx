"use client";

import { useState } from "react";
import Image from "next/image";
import { useQuery, useMutation } from "@apollo/client/react";

import ImageUpload from "@/components/ImageUpload";
import GenrePicker from "@/components/GenrePicker";
import Modal from "@/components/Modal";

import { GET_USERS, CONSUME_GENERATION } from "@/graphql/operations";

type User = {
  regid: string;
  name: string;
  generations: number;
};

type GetUsersQuery = {
  users: User[];
};

type ConsumeGenerationMutation = {
  consumeGeneration: {
    regid: string;
    generations: number;
  };
};

export default function Home() {
  const [image, setImage] = useState<File | null>(null);
  const [genre, setGenre] = useState<string | null>(null);
  const [selectedRegId, setSelectedRegId] = useState("");

  const [modal, setModal] = useState<{
    title: string;
    message: string;
  } | null>(null);

  const closeModal = () => setModal(null);

  const { data, loading: usersLoading } = useQuery<GetUsersQuery>(GET_USERS);

  const [consumeGeneration, { loading: consumeLoading }] =
    useMutation<ConsumeGenerationMutation>(CONSUME_GENERATION);

  const users = data?.users ?? [];
  const user = users.find((u) => u.regid === selectedRegId);

  async function generate() {
    if (!user) {
      setModal({
        title: "Registration ID required",
        message:
          "Please select your registration ID before generating your Echo.",
      });
      return;
    }

    if (user.generations >= 4) {
      setModal({
        title: "Generation limit reached",
        message:
          "You have already used all 4 available generations. Please contact the booth volunteer if you need help.",
      });
      return;
    }

    if (!image || !genre) return;

    try {
      await consumeGeneration({
        variables: { regid: user.regid },
        refetchQueries: [GET_USERS],
      });

      const fd = new FormData();
      fd.append("image", image);
      fd.append("genre", genre);

      const res = await fetch("/api/generate", {
        method: "POST",
        body: fd,
      });

      const data = await res.json();

      if (!data.img || !data.audio || !data.genre) {
        throw new Error("Invalid generation response");
      }

      window.location.href = `/result?img=${data.img}&audio=${data.audio}&genre=${data.genre}`;
    } catch {
      setModal({
        title: "Something went wrong",
        message:
          "We couldn’t generate your Echo right now. Please try again or contact the volunteer.",
      });
    }
  }

  const exhausted = user && user.generations >= 4;

  return (
    <main className="flex min-h-screen items-center justify-center bg-linear-to-br from-zinc-200 via-white to-zinc-200 p-6 text-zinc-900">
      <div className="w-full max-w-xl space-y-8">
        <div className="flex justify-center gap-8">
          <Image src="/images/apscon.png" alt="APSCon" width={90} height={45} />
          <Image src="/images/sc.png" alt="SPS" width={120} height={64} />
        </div>

        <div className="text-center">
          <h1 className="text-4xl font-bold uppercase">
            Echo
            <span className="rounded-xl bg-zinc-900 px-2 py-0.5 text-white">
              Self
            </span>
          </h1>
          <p className="mt-2 text-zinc-600">See yourself. Hear yourself.</p>
        </div>

        <div className="space-y-6 rounded-2xl bg-white p-6 shadow-xl ring-1 ring-zinc-200">
          <select
            className="w-full rounded-xl border p-3"
            disabled={usersLoading}
            value={selectedRegId}
            onChange={(e) => setSelectedRegId(e.target.value)}
          >
            <option value="">Select Registration ID</option>
            {users.map((u) => (
              <option key={u.regid} value={u.regid}>
                {u.regid} · {u.name}
              </option>
            ))}
          </select>

          {user && (
            <p className="text-center text-sm text-zinc-500">
              Remaining generations:{" "}
              <span className="font-semibold text-zinc-900">
                {4 - user.generations}
              </span>
            </p>
          )}

          <ImageUpload onSelect={setImage} />
          <GenrePicker value={genre} onPick={setGenre} />

          <button
            disabled={consumeLoading || !image || !genre}
            onClick={generate}
            className={`w-full rounded-xl py-3 font-semibold transition ${
              consumeLoading
                ? "cursor-not-allowed bg-zinc-200 text-zinc-400"
                : "bg-zinc-900 text-white hover:bg-zinc-800"
            }`}
          >
            {consumeLoading ? "Creating your echo…" : "Generate My Echo"}
          </button>

          {exhausted && (
            <p className="text-center text-sm text-red-500">
              You’ve reached the maximum of 4 generations.
            </p>
          )}
        </div>

        <p className="text-center text-xs text-zinc-400">
          Live AI demo · Conference preview build
        </p>
      </div>

      {modal && (
        <Modal
          open
          title={modal.title}
          message={modal.message}
          onClose={closeModal}
        />
      )}
    </main>
  );
}
