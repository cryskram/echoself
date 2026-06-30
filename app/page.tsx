"use client";

import { useEffect, useState } from "react";
// import { useQuery, useMutation } from "@apollo/client/react";

import ImageUpload from "@/components/ImageUpload";
import GenrePicker from "@/components/GenrePicker";
import Modal from "@/components/Modal";
import SponsorStrip from "@/components/SponsorStrip";

// import { GET_USERS, CONSUME_GENERATION } from "@/graphql/operations";
// import AdminResetPanel from "@/components/AdminResetPanel";
// import RegIdAutocomplete from "@/components/RegIdAutocomplete";

type User = {
  regId: string;
  name: string;
  generations: number;
};

type GetUsersQuery = {
  users: User[];
};

type ConsumeGenerationMutation = {
  consumeGeneration: {
    regId: string;
    generations: number;
  };
};

const ADMIN_REG_ID = process.env.NEXT_PUBLIC_ADMIN_REG_ID!;

export default function Home() {
  useEffect(() => {
    document.addEventListener("contextmenu", (e) => e.preventDefault());
    document.addEventListener("dragstart", (e) => e.preventDefault());
    document.addEventListener("selectstart", (e) => e.preventDefault());
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (
        e.key === "F12" ||
        (e.ctrlKey && e.shiftKey && ["I", "J", "C"].includes(e.key)) ||
        (e.ctrlKey && e.key.toLowerCase() === "u")
      ) {
        e.preventDefault();
      }
    };

    document.addEventListener("keydown", handler);

    return () => document.removeEventListener("keydown", handler);
  }, []);

  const [image, setImage] = useState<File | null>(null);
  const [genre, setGenre] = useState<string | null>(null);
  // const [selectedRegId, setSelectedRegId] = useState("");
  const [loading, setLoading] = useState(false);

  const [modal, setModal] = useState<{
    title: string;
    message: string;
  } | null>(null);

  const closeModal = () => setModal(null);

  // const { data, loading: usersLoading } = useQuery<GetUsersQuery>(GET_USERS);

  // const [consumeGeneration] =
  //   useMutation<ConsumeGenerationMutation>(CONSUME_GENERATION);

  // const users = data?.users ?? [];

  // const isAdmin =
  //   selectedRegId.trim().toUpperCase() === ADMIN_REG_ID.trim().toUpperCase();

  // const user = users.find((u) => u.regId === selectedRegId);

  async function generate() {
    setLoading(true);
    // console.log("SelectedRegId:", selectedRegId);

    // if (!selectedRegId.trim()) {
    //   setModal({
    //     title: "Registration ID required",
    //     message:
    //       "Please select or enter your registration ID before generating your Echo.",
    //   });
    //   setLoading(false);
    //   return;
    // }

    // if (!isAdmin && !user) {
    //   setModal({
    //     title: "Invalid Registration ID",
    //     message: "This registration ID was not found.",
    //   });
    //   setLoading(false);
    //   return;
    // }

    // if (!isAdmin && user && user.generations >= 4) {
    //   setModal({
    //     title: "Generation limit reached",
    //     message:
    //       "You have already used all 4 available generations. Please contact the booth volunteer if you need help.",
    //   });
    //   setLoading(false);
    //   return;
    // }

    if (!image || !genre) {
      setLoading(false);
      return;
    }

    try {
      const fd = new FormData();
      fd.append("image", image);
      fd.append("genre", genre);

      const res = await fetch("/api/generate", {
        method: "POST",
        body: fd,
      });

      const data = await res.json();

      if (res.status === 402 && data.error === "BILLING_LIMIT_REACHED") {
        setModal({
          title: "AI Credits Exhausted",
          message:
            "The AI generation credits for this booth have been fully used. Please contact the volunteer for assistance.",
        });
        setLoading(false);
        return;
      }

      if (!res.ok) {
        throw new Error(data?.message || "Generation failed");
      }

      // if (!isAdmin && user) {
      //   await consumeGeneration({
      //     variables: { regId: user.regId },
      //   });
      // }

      window.location.href = `/result?img=${data.img}&audio=${data.audio}&genre=${data.genre}`;
    } catch {
      setModal({
        title: "Something went wrong",
        message:
          "We couldn't generate your Echo right now. Please try again or contact the volunteer.",
      });
    } finally {
      setLoading(false);
    }
  }

  // const exhausted = !isAdmin && user && user.generations >= 4;

  return (
    <main className="min-h-screen bg-linear-to-br from-zinc-100 via-white to-zinc-100">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col px-8 py-8">
        <SponsorStrip />
        <div className="mt-10 flex flex-1 flex-col gap-10 lg:flex-row">
          <section className="flex flex-1 items-center justify-center">
            <ImageUpload onSelect={setImage} />
          </section>

          <section className="mx-auto flex w-full max-w-xl flex-col justify-center">
            <div>
              <h1 className="text-6xl font-black tracking-tight text-zinc-900">
                Echo
                <span className="ml-2 rounded-2xl bg-zinc-900 px-4 text-white">
                  Self
                </span>
              </h1>

              <p className="mt-5 max-w-md leading-relaxed text-zinc-600">
                Turn your portrait into a personalized music identity with
                AI-generated album artwork and a soundtrack inspired by your
                favorite genre.
              </p>
            </div>

            <div className="mt-10">
              <GenrePicker value={genre} onPick={setGenre} />
            </div>

            <button
              disabled={loading || !image || !genre}
              onClick={generate}
              className={`mt-10 rounded-2xl py-4 text-lg font-semibold transition ${
                loading
                  ? "cursor-not-allowed bg-zinc-300 text-zinc-500"
                  : "bg-zinc-900 text-white hover:bg-zinc-800"
              } `}
            >
              {loading ? "Creating Your Echo..." : "Generate My Echo"}
            </button>

            <div className="mt-10 rounded-2xl border border-zinc-200 bg-white p-5">
              <p className="text-sm font-semibold tracking-[0.25em] text-zinc-500 uppercase">
                How it works
              </p>

              <div className="mx-auto mt-5 grid grid-cols-3 gap-4">
                <div>
                  <div className="text-3xl">📸</div>

                  <p className="mt-2 text-sm font-semibold">Capture</p>
                </div>

                <div>
                  <div className="text-3xl">🎵</div>

                  <p className="mt-2 text-sm font-semibold">Choose</p>
                </div>

                <div>
                  <div className="text-3xl">✨</div>

                  <p className="mt-2 text-sm font-semibold">Generate</p>
                </div>
              </div>
            </div>
          </section>
        </div>

        <footer className="py-6 text-center">
          <p className="text-sm text-zinc-500">See yourself. Hear yourself.</p>
        </footer>
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
