"use client";

import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

type User = {
  regId: string;
  name: string;
  generations: number;
};

type Props = {
  users: User[];
  value: string;
  onChange: (regId: string) => void;
  disabled?: boolean;
};

export default function RegIdDropdown({
  users,
  value,
  onChange,
  disabled,
}: Props) {
  const [open, setOpen] = useState(false);

  const selected = users.find((u) => u.regId === value);

  return (
    <div className="relative">
      <button
        type="button"
        disabled={disabled}
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between rounded-xl border bg-white p-3 text-left hover:border-zinc-400 disabled:opacity-50"
      >
        {selected ? (
          <div>
            <p className="font-medium">{selected.regId}</p>
            <p className="text-xs text-zinc-500">
              {selected.name} · {4 - selected.generations} left
            </p>
          </div>
        ) : (
          <span className="text-zinc-400">Select Registration ID</span>
        )}
        <FaChevronDown className="h-4 w-4 text-zinc-500" />
      </button>

      {open && (
        <div className="absolute z-20 mt-2 max-h-64 w-full overflow-auto rounded-xl border bg-white shadow-lg">
          {users.map((u) => (
            <button
              key={u.regId}
              onClick={() => {
                onChange(u.regId);
                setOpen(false);
              }}
              className="w-full px-4 py-3 text-left hover:bg-zinc-100"
            >
              <p className="font-medium">{u.regId}</p>
              <p className="text-xs text-zinc-500">
                {u.name} · {4 - u.generations} remaining
              </p>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
