"use client";

import { useState } from "react";
import { useMutation } from "@apollo/client/react";
import { RESET_GENERATIONS, GET_USERS } from "@/graphql/operations";

const ADMIN_PIN = process.env.ADMIN_PIN as string;

type Props = {
  regId: string;
  name: string;
};

export default function AdminResetPanel({ regId, name }: Props) {
  const [pin, setPin] = useState("");
  const [unlocked, setUnlocked] = useState(false);

  const [resetGenerations, { loading }] = useMutation(RESET_GENERATIONS, {
    refetchQueries: [GET_USERS],
  });

  function unlock() {
    if (pin === ADMIN_PIN) {
      setUnlocked(true);
    } else {
      alert("Invalid admin PIN");
    }
  }

  async function reset() {
    await resetGenerations({ variables: { regId } });
    alert(`Generations reset for ${name}`);
    setUnlocked(false);
    setPin("");
  }

  return (
    <div className="mt-4 rounded-xl border border-dashed border-zinc-300 p-4">
      {!unlocked ? (
        <>
          <p className="mb-2 text-sm text-zinc-600">Volunteer access</p>
          <input
            type="password"
            placeholder="Enter admin PIN"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            className="w-full rounded-lg border p-2"
          />
          <button
            onClick={unlock}
            className="mt-2 w-full rounded-lg bg-zinc-900 py-2 text-white"
          >
            Unlock
          </button>
        </>
      ) : (
        <>
          <p className="text-sm font-medium text-red-600">
            Reset generations for {name}
          </p>
          <button
            disabled={loading}
            onClick={reset}
            className="mt-2 w-full rounded-lg bg-red-600 py-2 text-white hover:bg-red-700"
          >
            Reset to 0
          </button>
        </>
      )}
    </div>
  );
}
