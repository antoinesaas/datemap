export function Hero() {
  return (
    <header className="animate-fade-in text-center">
      <p className="mb-4 inline-flex items-center rounded-full border border-white/15 bg-white/[0.05] px-3 py-1 text-xs font-medium tracking-wide text-white/60 backdrop-blur-md">
        DATEMAP · Waitlist
      </p>
      <h1 className="mx-auto max-w-[20ch] bg-gradient-to-b from-white via-zinc-100 to-zinc-400 bg-clip-text text-4xl font-semibold leading-[1.1] tracking-tight text-transparent sm:text-5xl sm:leading-[1.08]">
        Find the best date spots around you.
      </h1>
      <p className="mx-auto mt-5 max-w-md text-base leading-relaxed text-white/55 sm:text-lg">
        Real places. Real experiences. No tourist traps.
      </p>
    </header>
  );
}
