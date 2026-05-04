import { NextResponse } from "next/server";
import { z } from "zod";
import { getResend } from "@/lib/resendClient";
import { rateLimit } from "@/lib/rateLimit";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

const bodySchema = z.object({
  email: z.string().email().max(320),
  agreedToTerms: z.literal(true),
});

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
      { error: "Too many requests. Try again in a minute." },
      { status: 429 },
    );
  }

  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const parsed = bodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "A valid email and acceptance of the terms are required." },
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
      {
        error:
          "Server configuration error: missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY.",
      },
      { status: 500 },
    );
  }

  const { error } = await supabase.from("waitlist").insert({ email });

  if (error?.code === "23505") {
    return NextResponse.json({ ok: true });
  }

  if (error) {
    console.error("waitlist insert", error);
    if (error.code === "42P01") {
      return NextResponse.json(
        { error: "Database table 'waitlist' not found. Please run migration." },
        { status: 500 },
      );
    }
    return NextResponse.json(
      { error: "Could not save your email. Please try again." },
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
        subject: "You're on the DATEMAP waitlist",
        html: `
          <p>Thanks for joining <strong>DATEMAP</strong>.</p>
          <p>You’ll discover real date spots near you soon.</p>
          <p style="color:#666;font-size:14px;margin-top:24px">— The DATEMAP team</p>
        `,
      });
    } catch (e) {
      console.error("resend", e);
    }
  }

  return NextResponse.json({ ok: true });
}
