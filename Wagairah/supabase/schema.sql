create table if not exists public.fragments (
  id bigint generated always as identity primary key,
  content text not null check (char_length(trim(content)) > 0),
  created_at timestamptz not null default timezone('utc'::text, now())
);

alter table public.fragments enable row level security;

drop policy if exists "Public can insert fragments" on public.fragments;
create policy "Public can insert fragments"
on public.fragments
for insert
to anon
with check (true);

drop policy if exists "Public can read fragments" on public.fragments;
create policy "Public can read fragments"
on public.fragments
for select
to anon
using (true);

