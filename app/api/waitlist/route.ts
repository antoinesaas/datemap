import { NextResponse } from "next/server";
import { z } from "zod";
import { getResend } from "@/lib/resendClient";
import { rateLimit } from "@/lib/rateLimit";
import {
  fetchWaitlistSignupCountRest,
  getSupabaseAdmin,
} from "@/lib/supabaseAdmin";
import { WAITLIST_CAP } from "@/lib/waitlistCap";

const bodySchema = z.object({
  email: z.string().email().max(320),
  agreedToTerms: z.literal(true),
});

/** Compteur toujours calculé à la demande (pas de cache CDN / données). */
export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
  let supabase;
  try {
    supabase = getSupabaseAdmin();
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      {
        error:
          "Configuration Supabase manquante sur le serveur (URL + clé). Vérifie les variables sur Vercel.",
      },
      { status: 500, headers: { "Cache-Control": "no-store" } },
    );
  }

  let n: number | null = null;

  const rpc = await supabase.rpc("waitlist_signup_count", {});
  if (!rpc.error && rpc.data != null) {
    const v = typeof rpc.data === "number" ? rpc.data : Number(rpc.data);
    if (Number.isFinite(v)) n = v;
  }
  if (rpc.error) {
    console.warn("waitlist_signup_count client RPC:", rpc.error.message);
  }

  if (n == null) {
    const rest = await fetchWaitlistSignupCountRest();
    if (rest != null) n = rest;
  }

  if (n == null) {
    const { count, error } = await supabase
      .from("waitlist")
      .select("*", { count: "exact", head: true });

    if (error) {
      console.error("waitlist count head", error);
      return NextResponse.json(
        {
          error:
            "Impossible de joindre Supabase pour le compteur. Vérifie la migration waitlist_public_count.sql et SUPABASE_SERVICE_ROLE_KEY sur Vercel.",
        },
        {
          status: 500,
          headers: { "Cache-Control": "no-store" },
        },
      );
    }

    if (count == null) {
      console.error("waitlist count: PostgREST a renvoyé count=null");
      return NextResponse.json(
        {
          error:
            "Compteur indisponible. Déploie la fonction SQL waitlist_signup_count sur ton projet Supabase.",
        },
        { status: 500, headers: { "Cache-Control": "no-store" } },
      );
    }
    n = count;
  }
  const remaining = Math.max(0, WAITLIST_CAP - n);

  return NextResponse.json(
    { count: n, remaining, cap: WAITLIST_CAP },
    { headers: { "Cache-Control": "no-store, max-age=0" } },
  );
}

function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() || "unknown";
  }
  return request.headers.get("x-real-ip") || "unknown";
}

export async function POST(request: Request) {
  const ip = clientIp(request);
  if (!rateLimit(`waitlist:${ip}`)) {
    return NextResponse.json(
      { error: "Trop de requêtes. Réessayez dans une minute." },
      { status: 429 },
    );
  }

  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }

  const parsed = bodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Une adresse e-mail valide est requise." },
      { status: 400 },
    );
  }

  const email = parsed.data.email.trim().toLowerCase();

  let supabase;
  try {
    supabase = getSupabaseAdmin();
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Erreur de configuration serveur." },
      { status: 500 },
    );
  }

  const { error } = await supabase.from("waitlist").insert({ email });

  if (error?.code === "23505") {
    return NextResponse.json({ ok: true });
  }

  if (error) {
    console.error("waitlist insert", error);
    return NextResponse.json(
      { error: "Impossible d’enregistrer votre e-mail. Réessayez." },
      { status: 500 },
    );
  }

  const resend = getResend();
  const from = process.env.RESEND_FROM;
  if (resend && from) {
    try {
      await resend.emails.send({
        from,
        to: email,
        subject: "Vous êtes sur la liste d’attente DATEMAP",
        html: `
          <p>Merci de rejoindre <strong>DATEMAP</strong>.</p>
          <p>Vous découvrirez bientôt de vrais lieux de rendez-vous près de chez vous.</p>
          <p style="color:#666;font-size:14px;margin-top:24px">— L’équipe DATEMAP</p>
        `,
      });
    } catch (e) {
      console.error("resend", e);
    }
  }

  return NextResponse.json({ ok: true });
}
