export default function AudioPlayer({ src }: { src: string }) {
  return (
    <audio
      controls
      autoPlay
      src={src}
      className="mt-4 w-full rounded-xl border border-zinc-200 bg-zinc-100 p-2 shadow-sm"
    />
  );
}
