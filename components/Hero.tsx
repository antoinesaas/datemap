import Image from "next/image";

const titleWords = ["Trouve", "ton", "prochain", "spot", "pour", "ton", "date."];
const subtitleWords = [
  "Inscris-toi",
  "pour",
  "avoir",
  "un",
  "accès",
  "VIP",
  "à",
  "la",
  "bêta.",
];

export function Hero() {
  return (
    <header className="max-sm:shrink-0 text-center" style={{ perspective: "600px" }}>
      <div className="animate-reveal-up mx-auto mb-4 w-fit rounded-[1.45rem] border border-white/15 bg-white/[0.05] p-2 backdrop-blur-lg [animation-delay:0s] sm:mb-5 sm:p-2.5">
        <Image
          src="/datemap-logo.png"
          alt="Logo DateMap"
          width={200}
          height={200}
          className="h-16 w-16 rounded-2xl object-contain sm:h-24 sm:w-24"
          priority
        />
      </div>
      <p className="animate-reveal-up mb-3 inline-flex items-center rounded-full border border-white/15 bg-white/[0.05] px-3 py-1 text-xs font-medium tracking-wide text-white/65 backdrop-blur-md [animation-delay:0.1s] sm:mb-4">
        DateMap · Liste d’attente
      </p>

      <h1 className="mx-auto max-w-[22ch] bg-gradient-to-b from-white via-zinc-100 to-zinc-400 bg-clip-text text-3xl font-semibold leading-[1.12] tracking-tight text-transparent sm:max-w-[24ch] sm:text-5xl sm:leading-[1.08]">
        {titleWords.map((word, i) => (
          <span
            key={i}
            className="animate-word"
            style={{ animationDelay: `${0.2 + i * 0.07}s` }}
          >
            {word}
            {i < titleWords.length - 1 ? "\u00A0" : ""}
          </span>
        ))}
      </h1>

      <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-white/55 sm:mt-5 sm:text-lg">
        {subtitleWords.map((word, i) => (
          <span
            key={i}
            className="animate-word"
            style={{ animationDelay: `${0.65 + i * 0.06}s` }}
          >
            {word}
            {i < subtitleWords.length - 1 ? "\u00A0" : ""}
          </span>
        ))}
      </p>
    </header>
  );
}
