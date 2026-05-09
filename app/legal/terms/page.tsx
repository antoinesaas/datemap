import Link from "next/link";
import type { Metadata } from "next";
import { GlassCard } from "@/components/GlassCard";

export const metadata: Metadata = {
  title: "Conditions d’utilisation — DATEMAP",
  description: "Conditions pour la liste d’attente et le site DATEMAP.",
};

export default function TermsPage() {
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
          <h1 className="text-2xl font-semibold text-white">Terms &amp; Conditions</h1>
          <p className="mt-2 text-sm text-white/45">Last updated: 4 May 2026</p>
          <div className="mt-8 max-w-none space-y-4 text-sm leading-relaxed text-white/65">
            <p>
              These Terms &amp; Conditions (&quot;Terms&quot;) govern your use of the DATEMAP
              website and participation in our waitlist, operated for users in France and the
              European Union.
            </p>
            <h2 className="!mt-8 text-base font-medium text-white/90">1. Waitlist</h2>
            <p>
              By joining the waitlist, you request to be notified about DATEMAP early access and
              related product updates. Submitting your email does not create an account and does
              not guarantee access to any future service.
            </p>
            <h2 className="!mt-8 text-base font-medium text-white/90">2. Email collection</h2>
            <p>
              We collect only the email address you provide, plus a technical timestamp, stored in
              Supabase (hosted infrastructure). We do not ask for your city, profile, or other
              personal details on this waitlist page.
            </p>
            <h2 className="!mt-8 text-base font-medium text-white/90">3. Acceptable use</h2>
            <p>
              You agree not to misuse the site, attempt unauthorized access, or submit false or
              third-party email addresses without consent.
            </p>
            <h2 className="!mt-8 text-base font-medium text-white/90">4. No sale of data</h2>
            <p>
              We do not sell your email address. Processing is limited to operating the waitlist
              and sending transactional or product-related messages you can reasonably expect. See
              our{" "}
              <Link href="/legal/privacy" className="text-accent/90 underline underline-offset-2">
                Privacy Policy
              </Link>{" "}
              for details.
            </p>
            <h2 className="!mt-8 text-base font-medium text-white/90">5. Changes</h2>
            <p>
              We may update these Terms. Material changes will be reflected on this page with an
              updated date. Continued use after changes means you accept the revised Terms.
            </p>
            <h2 className="!mt-8 text-base font-medium text-white/90">6. Contact</h2>
            <p>
              For questions about these Terms, contact us at the address provided on our main site
              or in future DATEMAP communications.
            </p>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
