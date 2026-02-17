"use client";

import { useEffect, useRef, useState } from "react";

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

export default function RegIdAutocomplete({
  users,
  value,
  onChange,
  disabled,
}: Props) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (value) {
      setQuery(value);
    }
  }, [value]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filtered =
    query.trim() === ""
      ? users
      : users.filter(
          (u) =>
            u.regId.toLowerCase().includes(query.toLowerCase()) ||
            u.name.toLowerCase().includes(query.toLowerCase())
        );

  return (
    <div ref={containerRef} className="relative">
      <input
        type="text"
        disabled={disabled}
        value={query}
        placeholder="Enter Registration ID or Name"
        onFocus={() => setOpen(true)}
        onChange={(e) => {
          const val = e.target.value;
          setQuery(val);
          onChange(val);
          setOpen(true);
        }}
        className="w-full rounded-xl border p-3 outline-none focus:border-zinc-500 disabled:opacity-50"
      />

      {open && filtered.length > 0 && (
        <div className="absolute z-20 mt-2 max-h-64 w-full overflow-auto rounded-xl border bg-white shadow-lg">
          {filtered.map((u) => (
            <button
              key={u.regId}
              type="button"
              onClick={() => {
                onChange(u.regId);
                setQuery(u.regId);
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
