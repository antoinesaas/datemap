"use client";

import Link from "next/link";
import { useState } from "react";
import { GlassCard } from "./GlassCard";

export function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!email.trim()) {
      setError("Please enter your email.");
      return;
    }
    if (!agreed) {
      setError("Please accept the Terms & Conditions and Privacy Policy.");
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
        setError(data.error || "Something went wrong.");
        return;
      }
      setDone(true);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (done) {
    return (
      <GlassCard className="px-8 py-10 sm:px-10">
        <div className="text-center">
          <p className="text-xl font-medium text-white sm:text-2xl">
            You&apos;re on the list ❤️
          </p>
          <p className="mt-3 text-white/50">Early access coming soon</p>
        </div>
      </GlassCard>
    );
  }

  return (
    <GlassCard className="px-6 py-8 sm:px-9 sm:py-9">
      <form onSubmit={onSubmit} className="flex flex-col gap-5" noValidate>
        <label className="block text-left text-sm font-medium text-white/70">
          Email
          <input
            type="email"
            name="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="mt-2 w-full rounded-xl border border-white/10 bg-black/25 px-4 py-3 text-white placeholder:text-white/25 outline-none ring-accent/0 transition-[box-shadow,border-color] focus:border-accent/40 focus:ring-2 focus:ring-accent/25"
          />
        </label>

        <label className="flex cursor-pointer items-start gap-3 text-left text-sm text-white/60">
          <input
            type="checkbox"
            required
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="mt-1 size-4 shrink-0 rounded border-white/20 bg-black/30 text-accent accent-[#ff3df2] focus:ring-accent/40"
          />
          <span>
            I agree to the{" "}
            <Link
              href="/legal/terms"
              className="text-accent/90 underline decoration-white/15 underline-offset-2 hover:decoration-accent/60"
            >
              Terms &amp; Conditions
            </Link>{" "}
            and{" "}
            <Link
              href="/legal/privacy"
              className="text-accent/90 underline decoration-white/15 underline-offset-2 hover:decoration-accent/60"
            >
              Privacy Policy
            </Link>
          </span>
        </label>

        {error ? (
          <p className="text-sm text-red-400/90" role="alert">
            {error}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={loading}
          className="group relative mt-1 w-full overflow-hidden rounded-xl bg-gradient-to-r from-[#ff3df2]/90 via-[#e93dcb]/90 to-[#c026d3]/90 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#ff3df2]/20 transition-[transform,box-shadow] hover:shadow-[0_0_28px_rgba(255,61,242,0.45)] active:scale-[0.98] disabled:opacity-60"
        >
          <span className="relative z-10">{loading ? "Joining…" : "Join the waitlist"}</span>
          <span
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100"
            style={{
              background:
                "radial-gradient(120% 80% at 50% 0%, rgba(255,255,255,0.25), transparent 55%)",
            }}
          />
        </button>
      </form>
    </GlassCard>
  );
}
