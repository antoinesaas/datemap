-- DATEMAP waitlist — run in SQL editor or via Supabase migrations on a new project
create table if not exists public.waitlist (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  created_at timestamptz not null default now()
);

alter table public.waitlist enable row level security;

comment on table public.waitlist is 'DATEMAP waitlist signups (email only)';

-- Inserts from Next.js API route use the service role key (bypasses RLS).
-- Compteur public : voir migration waitlist_public_count (RPC waitlist_signup_count).
