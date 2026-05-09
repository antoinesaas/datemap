-- Compteur public pour la liste d’attente (sans exposer les e-mails).
-- À exécuter sur le projet Supabase (CLI ou SQL Editor) pour que GET /api/waitlist reflète les vrais inscrits avec la clé anon ou sous RLS.

create or replace function public.waitlist_signup_count()
returns bigint
language sql
security definer
set search_path = public
stable
as $$
  select coalesce(count(*)::bigint, 0) from public.waitlist;
$$;

comment on function public.waitlist_signup_count() is 'Nombre de lignes waitlist ; callable par anon pour l’affichage du compteur.';

revoke all on function public.waitlist_signup_count() from public;
grant execute on function public.waitlist_signup_count() to anon, authenticated, service_role;
