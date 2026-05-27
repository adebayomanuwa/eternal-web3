create table public.portal_sections (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  status text default 'active',
  display_order int default 0,
  created_at timestamptz default now()
);

create table public.creators (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  handle text unique,
  bio text,
  avatar_url text,
  website_url text,
  status text default 'pending',
  created_at timestamptz default now()
);

create table public.collections (
  id uuid primary key default gen_random_uuid(),
  creator_id uuid references public.creators(id) on delete set null,
  title text not null,
  slug text unique not null,
  description text,
  cover_image_url text,
  status text default 'draft',
  created_at timestamptz default now()
);

create table public.artworks (
  id uuid primary key default gen_random_uuid(),
  collection_id uuid references public.collections(id) on delete set null,
  creator_id uuid references public.creators(id) on delete set null,
  title text not null,
  slug text unique not null,
  description text,
  media_url text,
  media_type text,
  price numeric,
  currency text default 'CAD',
  availability text default 'available',
  metadata jsonb default '{}'::jsonb,
  created_at timestamptz default now()
);

create table public.marketplace_leads (
  id uuid primary key default gen_random_uuid(),
  name text,
  email text not null,
  interest_type text,
  message text,
  source_page text,
  created_at timestamptz default now()
);

create table public.waitlist (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  segment text,
  created_at timestamptz default now()
);

create table public.site_events (
  id uuid primary key default gen_random_uuid(),
  event_type text not null,
  page_slug text,
  payload jsonb default '{}'::jsonb,
  created_at timestamptz default now()
);

alter table public.portal_sections enable row level security;
alter table public.creators enable row level security;
alter table public.collections enable row level security;
alter table public.artworks enable row level security;
alter table public.marketplace_leads enable row level security;
alter table public.waitlist enable row level security;
alter table public.site_events enable row level security;

create policy "Public can read active portal sections"
  on public.portal_sections for select using (status = 'active');

create policy "Public can read approved creators"
  on public.creators for select using (status = 'approved');

create policy "Public can read published collections"
  on public.collections for select using (status = 'published');

create policy "Public can read available artworks"
  on public.artworks for select
  using (availability in ('available', 'sold', 'preview'));

create policy "Public can join waitlist"
  on public.waitlist for insert with check (true);

create policy "Public can submit marketplace leads"
  on public.marketplace_leads for insert with check (true);

insert into storage.buckets (id, name, public)
values
  ('artwork-media', 'artwork-media', true),
  ('collection-covers', 'collection-covers', true),
  ('creator-avatars', 'creator-avatars', true),
  ('brand-assets', 'brand-assets', true)
on conflict (id) do update set public = excluded.public;
