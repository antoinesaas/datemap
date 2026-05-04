import { Hero } from "@/components/Hero";
import { WaitlistForm } from "@/components/WaitlistForm";

export default function Home() {
  return (
    <div className="relative flex min-h-full flex-1 flex-col overflow-hidden">
      <div
        className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(ellipse_120%_80%_at_50%_-20%,rgba(255,61,242,0.14),transparent_50%),radial-gradient(ellipse_90%_60%_at_100%_50%,rgba(147,51,234,0.08),transparent_45%),radial-gradient(ellipse_70%_50%_at_0%_80%,rgba(59,130,246,0.06),transparent_40%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none fixed -left-32 top-1/4 -z-10 size-[min(90vw,520px)] rounded-full bg-[#ff3df2]/15 blur-[100px] animate-gradient-drift"
        aria-hidden
      />
      <div
        className="pointer-events-none fixed -right-24 bottom-0 -z-10 size-[min(85vw,480px)] rounded-full bg-violet-600/20 blur-[110px] animate-gradient-drift [animation-delay:-8s]"
        aria-hidden
      />

      <main className="mx-auto flex w-full max-w-lg flex-1 flex-col justify-center px-5 py-16 sm:px-6 sm:py-24">
        <div className="flex flex-col gap-10 sm:gap-12">
          <Hero />
          <div className="animate-fade-in [animation-delay:0.18s] [animation-fill-mode:backwards]">
            <WaitlistForm />
          </div>
        </div>
        <p className="mt-12 text-center text-xs text-white/30">
          Restaurants, parks, beaches &amp; more — curated by people who actually go.
        </p>
      </main>
    </div>
  );
}
