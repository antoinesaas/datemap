import { Hero } from "@/components/Hero";
import { WaitlistForm } from "@/components/WaitlistForm";

export default function Home() {
  return (
    <div className="relative flex min-h-full flex-1 flex-col overflow-hidden">
      <div
        className="pointer-events-none fixed inset-0 -z-20 bg-[url('/topo-relief.png')] bg-[length:420px_240px] bg-repeat opacity-[0.18] mix-blend-soft-light"
        aria-hidden
      />
      <div
        className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(ellipse_120%_90%_at_50%_-25%,rgba(255,255,255,0.1),transparent_52%),radial-gradient(ellipse_90%_70%_at_100%_50%,rgba(148,163,184,0.09),transparent_48%),radial-gradient(ellipse_70%_55%_at_0%_85%,rgba(255,255,255,0.06),transparent_45%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none fixed -left-32 top-1/4 -z-10 size-[min(90vw,520px)] rounded-full bg-white/10 blur-[100px] animate-gradient-drift"
        aria-hidden
      />
      <div
        className="pointer-events-none fixed -right-24 bottom-0 -z-10 size-[min(85vw,480px)] rounded-full bg-slate-400/15 blur-[110px] animate-gradient-drift [animation-delay:-8s]"
        aria-hidden
      />

      <main className="mx-auto flex w-full max-w-lg flex-1 flex-col justify-center px-5 py-16 sm:px-6 sm:py-24">
        <div className="flex flex-col gap-10 sm:gap-12">
          <Hero />
          <div className="animate-reveal-up [animation-delay:0.85s]">
            <WaitlistForm />
          </div>
        </div>
        <p className="animate-reveal-up mt-12 text-center text-xs text-white/35 [animation-delay:1.05s]">
          Restaurants, parks, beaches &amp; more — curated by people who actually go.
        </p>
      </main>
    </div>
  );
}
