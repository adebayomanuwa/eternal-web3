# £T€R₦AL W£₿3 — Supabase + Vercel Architecture Brief

**Project:** eternalweb3.com  
**Purpose:** Separate but design-aligned infrastructure for £T€R₦AL W£₿3, borrowing discipline from 333BI without mixing product logic.  
**Stack:** Supabase · Vercel · Vanilla HTML/CSS/JS or Next.js frontend · No Tailwind  
**Principles:** Zero Architecture Debt · Subtle Sophistication · Clean Data · Separate Systems

---

## 1. Core Positioning

£T€R₦AL W£₿3 and 333BI are parallel systems.

- **333BI** is an intelligence, evidence, and advisory engine.
- **£T€R₦AL W£₿3** is an immersive art-commerce, culture, and creator portal.

They should not share databases, service keys, business logic, or internal pipelines.

They can share:

- design discipline
- portal UX thinking
- clean database habits
- operator/admin separation
- evidence-first structure
- deployment discipline

The goal is not to copy 333BI.  
The goal is to let £T€R₦AL W£₿3 inherit 333BI’s maturity.

---

## 2. What £T€R₦AL W£₿3 Can Borrow From 333BI

### 2.1 Evidence-First Structure

Every major surface should have a clean record:

- creators
- collections
- artworks
- marketplace leads
- portal sections
- waitlist users
- site events

No random static chaos.  
Every visible thing should be traceable to a clean Supabase row where needed.

### 2.2 Portal Separation

333BI separates artist and operator views.  
£T€R₦AL W£₿3 can use the same thinking:

| Surface | Audience | Purpose |
|---|---|---|
| Public Portal | Visitors | Browse Hub, W£₿3, Footprints |
| Collector View | Buyers / collectors | Save interest, request access, browse collections |
| Creator/Vendor View | Creators / sellers | Submit profile, collections, products |
| Admin View | Internal operator | Approve creators, manage drops, review leads |

### 2.3 Zero Architecture Debt

The design system already defines the right foundation:

- no Tailwind
- semantic CSS variables
- no framework dependency for static pages
- no animation libraries
- purposeful motion only
- dark editorial luxury
- clean glassmorphism
- subtle cyber-marketplace energy

£T€R₦AL W£₿3 should feel like a premium cultural operating system, not a noisy Web3 poster.

---

## 3. Recommended Supabase Project Strategy

Create a **new Supabase project** only for £T€R₦AL W£₿3.

Do not place Eternal Web3 tables inside the 333BI Supabase project.

### Correct separation

```txt
333BI
├─ separate GitHub repo or app folder
├─ separate Supabase project
├─ separate Vercel env vars
└─ intelligence / reporting / advisory product

£T€R₦AL W£₿3
├─ separate GitHub repo or app folder
├─ separate Supabase project
├─ separate Vercel env vars
└─ art-commerce / culture / marketplace portal
```

### Shared only at philosophy level

```txt
design standards
portal UX patterns
admin/operator discipline
data cleanliness
deployment practices
```

### Never share

```txt
service-role keys
secret keys
database tables
AI report pipeline
333BI engine logic
artist intelligence logic
Stripe product logic
```

---

## 4. Fresh Supabase Schema

Run this in the Supabase SQL Editor.

```sql
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
```

---

## 5. Optional Storage Buckets

Create these Supabase Storage buckets:

```txt
artwork-media
collection-covers
creator-avatars
brand-assets
```

Recommended access:

| Bucket | Public? | Use |
|---|---:|---|
| artwork-media | Yes | Public artwork previews |
| collection-covers | Yes | Collection cover images |
| creator-avatars | Yes | Creator profile images |
| brand-assets | Yes | Logos, gateway visuals, static brand assets |

Private storage can come later for gated collector files.

---

## 6. Row Level Security Direction

Enable RLS on every table.

```sql
alter table public.portal_sections enable row level security;
alter table public.creators enable row level security;
alter table public.collections enable row level security;
alter table public.artworks enable row level security;
alter table public.marketplace_leads enable row level security;
alter table public.waitlist enable row level security;
alter table public.site_events enable row level security;
```

Public read policies should only expose approved/active content.

Example:

```sql
create policy "Public can read active portal sections"
on public.portal_sections
for select
using (status = 'active');

create policy "Public can read approved creators"
on public.creators
for select
using (status = 'approved');

create policy "Public can read published collections"
on public.collections
for select
using (status = 'published');

create policy "Public can read available artworks"
on public.artworks
for select
using (availability in ('available', 'sold', 'preview'));
```

For inserts like waitlist and leads:

```sql
create policy "Public can join waitlist"
on public.waitlist
for insert
with check (true);

create policy "Public can submit marketplace leads"
on public.marketplace_leads
for insert
with check (true);
```

Admin write access should happen server-side only using secure server environment variables.

---

## 7. Vercel Environment Variables

Use separate variables from 333BI.

```env
NEXT_PUBLIC_ETERNAL_SUPABASE_URL=
NEXT_PUBLIC_ETERNAL_SUPABASE_PUBLISHABLE_KEY=

ETERNAL_SUPABASE_SECRET_KEY=
ETERNAL_ADMIN_EMAIL=
ETERNAL_SITE_URL=https://eternalweb3.com
```

### Rules

```txt
NEXT_PUBLIC_* = browser-safe
NO PREFIX = server-only
```

Never expose secret keys inside frontend HTML, JS, GitHub, or browser code.

---

## 8. APIs £T€R₦AL W£₿3 Can Use

### Use now

| API / Feature | Purpose |
|---|---|
| Supabase Database | Store creators, artworks, collections, leads |
| Supabase Storage | Store images and media assets |
| Supabase Auth | Later for creator/vendor/admin login |
| Supabase RLS | Protect reads/writes properly |
| Vercel Environment Variables | Keep frontend and backend credentials separate |

### Use later

| API / Feature | When to use |
|---|---|
| Supabase Realtime | Live marketplace activity, live drops, auctions |
| Supabase Edge Functions | Payment callbacks, moderation, admin automations |
| Supabase Vector | Semantic art/collection search |
| Stripe | Paid drops, vendor fees, collector purchases |
| Resend | Waitlist confirmation and creator onboarding emails |

Do not overbuild now.  
Launch clean first.

---

## 9. Zero-Cost Setup Steps

1. Go to Supabase.
2. Create a new project.
3. Name it `eternal-web3-production`.
4. Choose the closest region to your users.
5. Open SQL Editor.
6. Paste and run the schema from Section 4.
7. Enable RLS using Section 6.
8. Create the storage buckets from Section 5.
9. Copy the project URL and publishable key.
10. Add them to Vercel Environment Variables.
11. Redeploy your Vercel project.
12. Test read/write flows with one waitlist form and one artwork record.

---

## 10. Recommended Frontend Folder Shape

For a zero-debt static build:

```txt
eternalweb3/
├─ index.html
├─ hub.html
├─ web3.html
├─ footprints.html
├─ assets/
│  ├─ images/
│  ├─ icons/
│  └─ brand/
├─ css/
│  ├─ tokens.css
│  ├─ base.css
│  ├─ components.css
│  └─ gateway.css
└─ js/
   ├─ supabase-client.js
   ├─ gateway.js
   ├─ waitlist.js
   └─ leads.js
```

For a Next.js version:

```txt
app/
├─ page.tsx
├─ hub/page.tsx
├─ web3/page.tsx
├─ footprints/page.tsx
├─ api/waitlist/route.ts
├─ api/leads/route.ts
lib/
├─ eternal-supabase.ts
├─ eternal-types.ts
components/
├─ Gateway.tsx
├─ PortalCard.tsx
├─ ArtworkGrid.tsx
└─ WaitlistForm.tsx
```

Use static HTML if you want pure zero-debt.  
Use Next.js if you want server routes, protected admin actions, and cleaner Vercel integration.

---

## 11. Minimal Server Client Pattern

```ts
import { createClient } from '@supabase/supabase-js';

export const eternalSupabase = createClient(
  process.env.NEXT_PUBLIC_ETERNAL_SUPABASE_URL!,
  process.env.ETERNAL_SUPABASE_SECRET_KEY!
);
```

Use this only in server routes.

For browser-safe reads:

```ts
import { createClient } from '@supabase/supabase-js';

export const eternalPublicSupabase = createClient(
  process.env.NEXT_PUBLIC_ETERNAL_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_ETERNAL_SUPABASE_PUBLISHABLE_KEY!
);
```

---

## 12. Design Direction

£T€R₦AL W£₿3 should feel like:

```txt
museum-grade marketplace
cinematic cultural portal
luxury cyber-commerce
quiet Web3 infrastructure
Lagos / London / Toronto futurism
```

Avoid:

```txt
cartoon neon overload
random NFT gimmicks
too many animations
Tailwind utility soup
database chaos
AI-generated visual noise
```

Use:

```txt
deep near-black backgrounds
warm off-white typography
controlled cyan / magenta / gold accents
glass surfaces
wide spacing
slow deliberate transitions
clear portal hierarchy
```

---

## 13. Practical MVP Scope

Launch with only this:

1. Gateway page with three portals:
   - £T€R₦AL Hub
   - W£₿3
   - Footprints

2. W£₿3 page:
   - hero
   - featured collections
   - artwork grid
   - waitlist

3. Hub page:
   - marketplace positioning
   - vendor/customer paths
   - lead form

4. Footprints page:
   - preview page
   - cultural trails concept
   - waitlist

5. Supabase:
   - creators
   - collections
   - artworks
   - leads
   - waitlist

Nothing else until the foundation is clean.

---

## 14. Build Doctrine

```txt
Separate systems.
Shared taste.
Clean schema.
No Tailwind.
No bloated Web3 theatre.
No secret leakage.
No copied 333BI logic.
No architecture debt.
```

£T€R₦AL W£₿3 should benefit from 333BI the way a younger luxury house benefits from an older engineering lab:

not by wearing the same uniform,  
but by inheriting the discipline.

---

## 15. Final Recommendation

Use Supabase Free for the first version.
Use a separate project.
Use Vercel environment variables.
Keep public reads simple.
Keep admin writes server-only.
Keep the design subtle.
Keep 333BI and £T€R₦AL W£₿3 parallel.

That gives you sophistication without contamination.
