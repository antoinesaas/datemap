import Image from "next/image";

export function Hero() {
  return (
    <header className="text-center">
      <div className="animate-reveal-up mx-auto mb-5 w-fit rounded-[1.45rem] border border-white/15 bg-white/[0.05] p-2.5 backdrop-blur-lg [animation-delay:0.02s]">
        <Image
          src="/datemap-logo.png"
          alt="DateMap logo"
          width={156}
          height={156}
          className="h-16 w-16 rounded-2xl object-cover sm:h-20 sm:w-20"
          priority
        />
      </div>
      <p className="animate-reveal-up mb-4 inline-flex items-center rounded-full border border-white/15 bg-white/[0.05] px-3 py-1 text-xs font-medium tracking-wide text-white/65 backdrop-blur-md [animation-delay:0.1s]">
        DateMap · Waitlist
      </p>
      <h1 className="animate-reveal-up mx-auto max-w-[20ch] bg-gradient-to-b from-white via-zinc-100 to-zinc-400 bg-clip-text text-4xl font-semibold leading-[1.1] tracking-tight text-transparent [animation-delay:0.16s] sm:text-5xl sm:leading-[1.08]">
        Find the best date spots around you.
      </h1>
      <p className="animate-reveal-up mx-auto mt-5 max-w-md text-base leading-relaxed text-white/55 [animation-delay:0.24s] sm:text-lg">
        Real places. Real experiences. No tourist traps.
      </p>
    </header>
  );
}
