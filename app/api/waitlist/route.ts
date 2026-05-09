import { NextResponse } from "next/server";
import { z } from "zod";
import { getResend } from "@/lib/resendClient";
import { rateLimit } from "@/lib/rateLimit";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

const bodySchema = z.object({
  email: z.string().email().max(320),
  agreedToTerms: z.literal(true),
});

export async function GET() {
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

  const { count, error } = await supabase
    .from("waitlist")
    .select("*", { count: "exact", head: true });

  if (error) {
    console.error("waitlist count", error);
    return NextResponse.json(
      { error: "Impossible de récupérer le nombre d’inscrits." },
      { status: 500 },
    );
  }

  return NextResponse.json({ count: count ?? 0 });
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
