import Link from "next/link";
import type { Metadata } from "next";
import { GlassCard } from "@/components/GlassCard";

export const metadata: Metadata = {
  title: "Politique de confidentialité — DATEMAP",
  description: "Comment DATEMAP traite les données de la liste d’attente (aligné RGPD).",
};

export default function PrivacyPage() {
  return (
    <div className="relative min-h-full flex-1 px-5 py-14 sm:px-6 sm:py-20">
      <div
        className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(ellipse_100%_60%_at_50%_-10%,rgba(255,61,242,0.1),transparent_50%)]"
        aria-hidden
      />
      <div className="mx-auto max-w-2xl">
        <Link
          href="/"
          className="mb-8 inline-block text-sm text-accent/90 hover:text-accent"
        >
          ← Retour
        </Link>
        <GlassCard className="px-6 py-8 sm:px-10 sm:py-10">
          <h1 className="text-2xl font-semibold text-white">Privacy Policy</h1>
          <p className="mt-2 text-sm text-white/45">Last updated: 4 May 2026 · France / EU</p>
          <div className="mt-8 max-w-none space-y-4 text-sm leading-relaxed text-white/65">
            <p>
              This policy describes how DATEMAP (&quot;we&quot;, &quot;us&quot;) processes personal
              data when you use our waitlist landing page. We aim to comply with the GDPR and
              applicable French and EU law.
            </p>
            <h2 className="!mt-8 text-base font-medium text-white/90">1. Data controller</h2>
            <p>
              The controller is the legal entity operating DATEMAP (startup). Contact details will
              be published on the product website as it matures.
            </p>
            <h2 className="!mt-8 text-base font-medium text-white/90">2. What we collect</h2>
            <p>
              <strong className="text-white/85">Waitlist:</strong> email address only, and a
              creation timestamp. We do not collect city, profile information, or analytics
              identifiers beyond what your browser and hosting provider may log for security (e.g.
              IP in server logs — kept minimal and short-term where possible).
            </p>
            <h2 className="!mt-8 text-base font-medium text-white/90">3. Purpose &amp; legal basis</h2>
            <p>
              We process your email to manage the waitlist and send you a confirmation email, plus
              occasional updates about DATEMAP if you remain subscribed. Legal bases: your consent
              (Article 6(1)(a) GDPR) when you submit the form and tick the consent box; and, where
              applicable, our legitimate interest in securing the service and preventing abuse
              (Article 6(1)(f) GDPR).
            </p>
            <h2 className="!mt-8 text-base font-medium text-white/90">4. Storage (Supabase)</h2>
            <p>
              Waitlist data is stored in Supabase (PostgreSQL). Data may be processed in the EU or
              under appropriate safeguards if providers use non-EU regions — we select
              configurations aligned with GDPR expectations for a startup MVP.
            </p>
            <h2 className="!mt-8 text-base font-medium text-white/90">5. Email delivery (Resend)</h2>
            <p>
              Transactional emails (e.g. waitlist confirmation) are sent via Resend. Resend acts as a
              processor under our instructions.
            </p>
            <h2 className="!mt-8 text-base font-medium text-white/90">6. Retention</h2>
            <p>
              We keep waitlist emails until you withdraw consent or we delete the list as the
              product launches, unless a longer period is required by law. You may request deletion
              at any time (see below).
            </p>
            <h2 className="!mt-8 text-base font-medium text-white/90">7. Sharing &amp; selling</h2>
            <p>
              We do not sell your data. We share it only with infrastructure providers strictly
              necessary to run the waitlist (e.g. Supabase, Resend, hosting on Vercel).
            </p>
            <h2 className="!mt-8 text-base font-medium text-white/90">8. Your rights</h2>
            <p>
              Under the GDPR you may request access, rectification, erasure, restriction,
              portability, and objection where applicable. You may withdraw consent at any time
              without affecting prior lawful processing. You may lodge a complaint with a supervisory
              authority (e.g. CNIL in France).
            </p>
            <h2 className="!mt-8 text-base font-medium text-white/90">9. Security</h2>
            <p>
              We use reasonable technical and organizational measures appropriate to an early-stage
              product, including access-controlled database keys on the server and HTTPS for
              transport.
            </p>
            <p className="!mt-6 text-white/50">
              For the full legal context, also read our{" "}
              <Link href="/legal/terms" className="text-accent/90 underline underline-offset-2">
                Terms &amp; Conditions
              </Link>
              .
            </p>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
