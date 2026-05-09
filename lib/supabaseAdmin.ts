import { createClient, type SupabaseClient } from "@supabase/supabase-js";

export function getSupabaseCredentials(): { url: string; key: string } {
  const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const url = rawUrl?.replace(/\/+$/, "") ?? "";
  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY?.trim() ||
    process.env.SUPABASE_ANON_KEY?.trim() ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();
  if (!url || !key) {
    throw new Error(
      "Missing Supabase config: NEXT_PUBLIC_SUPABASE_URL and a key (SUPABASE_SERVICE_ROLE_KEY, SUPABASE_ANON_KEY, or NEXT_PUBLIC_SUPABASE_ANON_KEY).",
    );
  }
  return { url, key };
}

export function getSupabaseAdmin(): SupabaseClient {
  const { url, key } = getSupabaseCredentials();
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

/**
 * Compteur via l’API REST PostgREST (même effet que .rpc(), utile si le client JS pose problème).
 */
export async function fetchWaitlistSignupCountRest(): Promise<number | null> {
  const { url, key } = getSupabaseCredentials();
  const res = await fetch(`${url}/rest/v1/rpc/waitlist_signup_count`, {
    method: "POST",
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: "{}",
    cache: "no-store",
  });
  if (!res.ok) {
    const text = await res.text();
    console.error("waitlist_signup_count REST:", res.status, text);
    return null;
  }
  const raw: unknown = await res.json();
  if (typeof raw === "number" && Number.isFinite(raw)) return raw;
  if (typeof raw === "string") {
    const n = Number(raw);
    return Number.isFinite(n) ? n : null;
  }
  return null;
}
