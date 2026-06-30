export default function AlbumFooter() {
  return (
    <footer className="border-t border-zinc-800 bg-zinc-900">
      <div className="px-10 py-8 text-center">
        <h2 className="text-3xl font-extrabold tracking-tight text-white">
          Echo
          <span className="ml-1 rounded-lg bg-white px-2 py-1 text-zinc-900">
            Self
          </span>
        </h2>

        <p className="mt-3 text-xs tracking-[0.45em] text-zinc-500 uppercase">
          See yourself. Hear yourself.
        </p>

        <div className="mx-auto mt-6 h-px w-24 bg-zinc-700" />

        <p className="mt-6 text-sm text-zinc-500">
          Every Echo is uniquely yours.
        </p>
      </div>
    </footer>
  );
}
