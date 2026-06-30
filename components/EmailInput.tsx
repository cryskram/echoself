"use client";

type Props = {
  value: string;
  onChange: (email: string) => void;
};

export default function EmailInput({ value, onChange }: Props) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-zinc-600">
        Email Address
      </label>

      <input
        type="email"
        required
        autoComplete="email"
        placeholder="name@example.com"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-zinc-300 p-3 transition outline-none focus:border-zinc-900"
      />

      <p className="mt-2 text-xs text-zinc-500">
        We'll email your generated image and music after it's ready.
      </p>
    </div>
  );
}
