"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { GlassCard } from "./GlassCard";
import { RollingNumber } from "./RollingNumber";
import { WAITLIST_CAP } from "@/lib/waitlistCap";

async function fetchWaitlistStats(): Promise<{
  remaining: number;
  cap: number;
} | null> {
  const res = await fetch("/api/waitlist", { cache: "no-store" });
  const data = (await res.json()) as {
    remaining?: number;
    cap?: number;
    error?: string;
  };
  if (!res.ok || typeof data.remaining !== "number") {
    return null;
  }
  return { remaining: data.remaining, cap: data.cap ?? WAITLIST_CAP };
}

export function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [placesLeft, setPlacesLeft] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const stats = await fetchWaitlistStats();
      if (!cancelled && stats) setPlacesLeft(stats.remaining);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!email.trim()) {
      setError("Indique ton e-mail.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          agreedToTerms: true as const,
        }),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) {
        setError(data.error || "Une erreur s’est produite.");
        return;
      }
      setDone(true);
      const stats = await fetchWaitlistStats();
      if (stats) setPlacesLeft(stats.remaining);
    } catch {
      setError("Problème réseau. Réessaie.");
    } finally {
      setLoading(false);
    }
  }

  if (done) {
    return (
      <GlassCard className="px-8 py-10 sm:px-10">
        <div className="text-center">
          <p className="text-xl font-medium text-white sm:text-2xl">
            Tu es sur la liste ❤️
          </p>
          <p className="mt-3 text-white/60">L’accès anticipé arrive bientôt</p>
        </div>
      </GlassCard>
    );
  }

  const placesSuffix =
    placesLeft === 1
      ? ` place restante sur ${WAITLIST_CAP}`
      : ` places restantes sur ${WAITLIST_CAP}`;

  return (
    <GlassCard className="px-6 py-8 sm:px-9 sm:py-9">
      <form onSubmit={onSubmit} className="flex flex-col gap-5" noValidate>
        <p className="flex flex-wrap items-baseline justify-center gap-x-0.5 text-center text-sm font-medium tracking-tight text-white/70">
          <span className="inline-flex items-baseline text-base font-semibold text-white/90">
            <RollingNumber key={placesLeft ?? "pending"} value={placesLeft} />
          </span>
          <span className="tabular-nums">{placesSuffix}</span>
        </p>

        <label className="block text-left text-sm font-medium text-white/75">
          E-mail
          <input
            type="email"
            name="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="toi@exemple.com"
            className="mt-2 w-full rounded-xl border border-white/20 bg-black/25 px-4 py-3 text-white placeholder:text-white/35 outline-none ring-accent/0 transition-[box-shadow,border-color] focus:border-accent/60 focus:ring-2 focus:ring-accent/30"
          />
        </label>

        <p className="text-left text-sm text-white/55">
          En t’inscrivant, tu acceptes les{" "}
          <Link
            href="/legal/terms"
            className="text-accent underline decoration-white/20 underline-offset-2 hover:decoration-accent/80"
          >
            conditions d’utilisation
          </Link>
          .
        </p>

        {error ? (
          <p className="text-sm text-red-300/90" role="alert">
            {error}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={loading}
          className="group relative mt-1 w-full overflow-hidden rounded-xl bg-gradient-to-r from-[#5c1622] via-[#6f1d2a] to-[#7d2433] py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#6f1d2a]/35 transition-[transform,box-shadow] hover:shadow-[0_0_24px_rgba(111,29,42,0.7)] active:scale-[0.98] disabled:opacity-60"
        >
          <span className="relative z-10">
            {loading ? "Envoi…" : "Je veux mon accès"}
          </span>
          <span
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100"
            style={{
              background:
                "radial-gradient(120% 80% at 50% 0%, rgba(255,255,255,0.25), transparent 55%)",
            }}
          />
        </button>
        <p className="mx-auto mt-1 max-w-[32ch] text-center text-[13px] leading-snug text-white/50">
          Inscris-toi pour avoir un accès VIP à la bêta
        </p>
      </form>
    </GlassCard>
  );
}
