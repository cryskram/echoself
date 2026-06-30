"use client";

type Props = {
  open: boolean;
};

export default function GenerationOverlay({ open }: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-999 flex items-center justify-center bg-black/80 backdrop-blur-md">
      <div className="flex flex-col items-center">
        <div className="h-20 w-20 animate-spin rounded-full border-4 border-white/20 border-t-white" />

        <h2 className="mt-10 text-4xl font-bold text-white">
          Creating your Echo
        </h2>

        <p className="mt-4 max-w-md text-center text-zinc-300">
          EchoSelf is producing your personalized album artwork and soundtrack.
          This usually takes a few seconds to a minute.
        </p>
      </div>
    </div>
  );
}
