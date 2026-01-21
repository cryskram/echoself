export default function AudioPlayer({ src }: { src: string }) {
  return <audio controls src={src} className="mt-4 w-full rounded-lg" />;
}
