export default function AlbumFooter() {
  return (
    <footer className="border-t border-zinc-800 bg-zinc-900">
      <div className="px-5 py-6 text-center sm:px-10 sm:py-8">
        <h2 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
          Echo
          <span className="ml-2 rounded-lg bg-white px-2 py-1 text-zinc-900">
            Self
          </span>
        </h2>

        <p className="mt-3 text-[10px] tracking-[0.28em] text-zinc-500 uppercase sm:text-xs sm:tracking-[0.45em]">
          See yourself. Hear yourself.
        </p>

        <div className="mx-auto mt-5 h-px w-16 bg-zinc-700 sm:mt-6 sm:w-24" />

        <p className="mt-5 text-xs text-zinc-500 sm:mt-6 sm:text-sm">
          Every Echo is uniquely yours.
        </p>
      </div>
    </footer>
  );
}
