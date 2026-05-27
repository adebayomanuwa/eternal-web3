# £T€R₦AL W£₿3 — Elevated Design System & Architecture

**Project:** eternalweb3.com
**Version:** 2.2.1
**Date:** 2026-05-27
**Principles:** Zero Architecture Debt · No Tailwind · Purposeful Micro-Interactions · Maximum Sophistication · Separate Systems · Clean Data

> **What changed in 2.2:** Incorporates the **Supabase + Vercel Architecture Brief** as a first-class layer of the system. Adds §16 (Backend Architecture), §17 (Data Layer), §18 (Environment & Deployment), §19 (MVP Scope), §20 (Build Doctrine), §21 (Per-Page Notes). Clarifies the parallel-systems rule separating £T€R₦AL W£₿3 from 333BI. See **§0** for a complete side-by-side diff of every change from v2.1 → v2.2.
>
> **What changed in 2.2.1 (patch):** Two production corrections to §18 following review. (1) Supabase key naming — new projects use `sb_publishable_xxx` / `sb_secret_xxx` format; legacy `anon` / `service_role` still work until end of 2026 but new projects should use the new format. (2) Static HTML caveat — Vercel env vars do not automatically inject into plain HTML/JS files; the publishable key must be hardcoded as a JS constant for static builds; the secret key must never appear in static HTML under any circumstances.

---

## §0 · Version Diff — v2.1 → v2.2 (Side by Side)

Every meaningful change between versions. Read this first to understand exactly what was added, removed, or refined.

| # | Area | v2.1 (Previous) | v2.2 (Current) | Change type |
|---|------|-----------------|----------------|-------------|
| 1 | **Version** | 2.1.0 | 2.2.0 | Bump |
| 2 | **Principles** | Zero Architecture Debt · No Tailwind · Purposeful Micro-Interactions · Maximum Sophistication | + **Separate Systems · Clean Data** | Extended |
| 3 | **Backend** | Not documented. Entirely frontend-scoped. | §16 added: Supabase project strategy, 333BI separation rule, correct Vercel env vars, frontend build options | **New section** |
| 4 | **333BI relationship** | Not mentioned. | §16.1: £T€R₦AL W£₿3 and 333BI are parallel systems. Must not share databases, service keys, or business logic. Can share design discipline, portal UX thinking, clean data habits, deployment practices. | **New section** |
| 5 | **Audience model** | Not documented as a data layer. | §16.2: Four surfaces — Public Portal, Collector View, Creator/Vendor View, Admin View. Mirrors 333BI's operator/artist separation discipline. | **New section** |
| 6 | **Frontend options** | Single-file wireframe approach only. | §16.3: Two options — zero-debt static HTML folder shape and Next.js app-router shape. Both documented. | Extended |
| 7 | **Supabase schema** | Not documented. | §17.1: Full SQL — `portal_sections`, `creators`, `collections`, `artworks`, `marketplace_leads`, `waitlist`, `site_events`. | **New section** |
| 8 | **Row Level Security** | Not documented. | §17.2: RLS on all 7 tables. Public read = approved/active/published only. Public insert = waitlist and leads only. Admin writes server-side only. | **New section** |
| 9 | **Storage buckets** | Not documented. | §17.3: Four buckets — `artwork-media`, `collection-covers`, `creator-avatars`, `brand-assets`. All public for MVP. | **New section** |
| 10 | **Env variables** | Not documented. | §18.1: `NEXT_PUBLIC_ETERNAL_*` browser-safe. `ETERNAL_*` server-only. Never expose secret key in frontend. Full naming convention. **Patch 2.2.1:** Key value format corrected — new Supabase projects use `sb_publishable_xxx` / `sb_secret_xxx`; legacy `anon` / `service_role` values still accepted until end of 2026. Env var *names* unchanged. | **New + patched** |
| 11 | **Supabase client** | Not documented. | §18.2: Public browser client (publishable key). Server client (secret key, server routes only). **Patch 2.2.1:** Static HTML caveat added — Vercel env vars do NOT inject into plain HTML/JS. Publishable key must be hardcoded as a JS constant for static builds. Secret key must never appear in static HTML. Requires Next.js server route for any server-side operation. | **New + patched** |
| 12 | **API roadmap** | Not documented. | §18.3: Use now (Database, Storage, RLS, Vercel env). Use later (Realtime, Edge Functions, Vector, Auth, Stripe, Resend). Rule: do not overbuild now. | **New section** |
| 13 | **Setup steps** | Not documented. | §18.4: 9 zero-cost steps from Supabase project creation to first test. | **New section** |
| 14 | **MVP scope** | Implicit from wireframes. | §19: Explicit — 4 pages + 5 active Supabase tables. Nothing else until foundation is clean. | **New section** |
| 15 | **Build doctrine** | Zero-debt checklist (10 items). | §20: Extended prose doctrine + §22 checklist extended to 14 items including secret-key hygiene and Supabase CDN note. | Extended |
| 16 | **Design direction** | In §1 Design Philosophy (brief). | §20 extended: explicit avoid/use lists — avoids cartoon neon overload, NFT gimmicks, too many animations, Tailwind soup, database chaos. Uses deep near-black, warm off-white, controlled accents, glass, wide spacing, slow transitions. | Extended |
| 17 | **Hub page notes** | Not documented beyond architecture diagram. | §21.1: Eternal Noir variant tokens, ambient orb floats permitted, scroll-reveal IntersectionObserver, vendor filtering, mobile nav, `--neon-magenta #ff006e`, `--lux-gold #ffd700`. mailto CTA → Supabase replace in production. | **New section** |
| 18 | **W£₿3 page notes** | Not documented beyond architecture diagram. | §21.2: Ink/Canvas token variant, dual dark/light theme, GA4 `G-T4VZ54YSYQ`, violet `#7c5cff`, aqua `#63f3d8`, rose `#ff6f91`, tallest display type in system. | **New section** |
| 19 | **Footprints page notes** | §15 placeholder spec. | §21.3: Confirmed as implemented — gateway gold subset tokens, trail cards left inset border, mock ledger, static SVG atlas, waitlist JS success-swap. Replace with Supabase `waitlist` insert for production. | Confirmed |
| 20 | **Zero-debt checklist** | 10 items. | 14 items. Added: Supabase CDN = zero npm, no secret keys in frontend, £T€R₦AL Supabase project separate from 333BI, Vercel env namespaces separate. | Extended |

---

## 1. Design Philosophy

### Core Constraints
- **Zero Architecture Debt:** Vanilla HTML5/CSS3/JS. No build steps, no frameworks, no dependencies except analytics (async) and Supabase client (CDN for static, npm for Next.js).
- **No Tailwind:** Pure semantic CSS with custom properties. No utility-class frameworks.
- **Purposeful Motion Only:** No continuous rendering on content pages. Gateway and Hub are permitted exceptions (see §6).
- **Modern Sophistication:** Editorial luxury aesthetic. Dark, spacious, high-contrast typography. Refined palette.
- **Separate Systems:** £T€R₦AL W£₿3 runs on its own Supabase project, its own Vercel env vars, its own GitHub repo. Nothing shared with 333BI at infrastructure level.
- **Clean Data:** Every visible thing that can change traces to a clean Supabase row. No random static chaos.

### Aesthetic Direction
- **Influence:** High-end editorial meets Web3 native infrastructure. Lagos / London / Toronto futurism.
- **Mood:** Midnight observatory. Precise. Quiet authority. Digital permanence.

**Avoid:**
- Cartoon neon overload
- Random NFT gimmicks
- Too many animations
- Tailwind utility soup
- Database chaos
- AI-generated visual noise

**Use:**
- Deep near-black backgrounds
- Warm off-white typography
- Controlled cyan / magenta / gold accents
- Glass surfaces
- Wide spacing
- Slow deliberate transitions
- Clear portal hierarchy

---

## 2. Color System

### 2.1 Gateway Tokens (`/index.html`)

| Token | Value | Usage |
|-------|-------|-------|
| `--space-dark` | `#030305` | Page background |
| `--space-void` | `#08080b` | Gradient mid-stop |
| `--text-primary` | `#f7f2ea` | Headlines (warm off-white) |
| `--text-soft` | `#c7bfcd` | Sub-headlines |
| `--text-muted` | `#8b8594` | Captions |
| `--text-dim` | `#5f596b` | Timestamps |
| `--brand-cyan` | `#00f0ff` | **Hub** portal identity |
| `--brand-magenta` | `#ff2a8a` | **W£₿3** portal identity |
| `--brand-gold` | `#d8b56d` | **Footprints** portal identity |
| `--brand-green` | `#00ff88` | Gateway online pulse |
| `--glass-border` | `rgba(255,255,255,0.09)` | Bubble borders |
| `--glass-border-strong` | `rgba(255,255,255,0.18)` | Arrow buttons |
| `--glass-bg` | `rgba(255,255,255,0.035)` | Chips, pills |
| `--glass-bg-strong` | `rgba(255,255,255,0.07)` | Bubble surface |
| `--shadow-heavy` | `0 34px 90px rgba(0,0,0,0.52)` | Bubble shadow |

### 2.2 Hub Tokens (`/hub.html` — Eternal Noir variant)

| Token | Value | Usage |
|-------|-------|-------|
| `--void-900` | `#030305` | Page background |
| `--void-850` | `#06060a` | Near-void |
| `--void-800` | `#0a0a0f` | Deep panels |
| `--void-700` | `#12121a` | Card backgrounds |
| `--void-600` | `#1e1e2e` | Glass surfaces |
| `--neon-cyan` | `#00f0ff` | Primary accent, CTAs, logo mark |
| `--neon-magenta` | `#ff006e` | Secondary accent (deeper than gateway `#ff2a8a`) |
| `--lux-gold` | `#ffd700` | Tertiary (brighter than Footprints `#d8b56d`) |
| `--glass-bg` | `rgba(18,18,26,0.55)` | Card/panel surfaces |
| `--blur-xl` | `50px` | Ambient orb blur |

### 2.3 W£₿3 Tokens (`/web3.html` — dual theme)

| Token | Dark | Light | Usage |
|-------|------|-------|-------|
| `--canvas` | `#070706` | `#f7f3eb` | Page background |
| `--canvas-2` | `#10100e` | `#ebe3d4` | Secondary surfaces |
| `--ink` | `#f3efe8` | `#17130e` | Primary text |
| `--ink-muted` | `#a9a196` | `#62594e` | Secondary text |
| `--ink-dim` | `#6f675f` | `#918779` | Tertiary text |
| `--surface` | `rgb(255 255 255 / 0.055)` | `rgb(255 255 255 / 0.62)` | Cards |
| `--line` | `rgb(255 255 255 / 0.12)` | `rgb(20 16 10 / 0.13)` | Borders |
| `--gold` | `#d8b56d` | `#9b6d1f` | Gold |
| `--violet` | `#7c5cff` | `#5d42d6` | Primary accent |
| `--aqua` | `#63f3d8` | `#008f7d` | Teal accent |
| `--rose` | `#ff6f91` | `#bd355b` | Rose accent |

### 2.4 Footprints Tokens (`/footprints.html`)
Inherits gateway tokens. Adds:

| Token | Value | Usage |
|-------|-------|-------|
| `--brand-gold-soft` | `#f0d99b` | Headline gradient, success states |
| `--brand-gold-deep` | `#a8884a` | Trail card left border at rest |
| `--border-glow` | `rgba(216,181,109,0.32)` | Hover borders, waitlist focus ring |

### 2.5 Content Pages (shared base — applies when building new pages)

| Token | Dark | Light | Usage |
|-------|------|-------|-------|
| `--bg-base` | `#030305` | `#fcfcfd` | Page background |
| `--bg-surface` | `rgba(255,255,255,0.02)` | `rgba(0,0,0,0.02)` | Cards |
| `--bg-elevated` | `rgba(255,255,255,0.05)` | `rgba(0,0,0,0.05)` | Hover states |
| `--border` | `rgba(255,255,255,0.08)` | `rgba(0,0,0,0.08)` | Dividers |
| `--primary` | `#8a6df8` | `#4f33d6` | Primary actions |
| `--secondary` | `#00e5bf` | `#00a68c` | Success, minting |
| `--accent` | `#ff3366` | `#e62e5c` | CTAs, pricing |

---

## 3. Typography

| Role | Font | Weights | Usage |
|------|------|---------|-------|
| **Display** | Space Grotesk | 400, 500, 600, 700 | H1, H2, Brand, Burst overlay |
| **Body** | Inter | 300, 400, 500, 600, 700 | Paragraphs, UI |
| **Mono** | JetBrains Mono | 300, 400, 500, 600 | Metadata, tags, ledger, nav |

### Fluid Scale by Page

| Page | H1 / Display | H2 | Notes |
|------|-------------|-----|-------|
| Gateway | `clamp(2.85rem, 7vw, 6.4rem)` | — | Bubble titles `clamp(2rem, 4vw, 2.72rem)` |
| Hub | `clamp(3rem, 8vw, 6.5rem)` | `clamp(1.5rem, 3vw, 2.25rem)` | H3 static `1.25rem` |
| W£₿3 | `clamp(3.25rem, 8vw, 7.75rem)` | `clamp(2.25rem, 5vw, 5.25rem)` | Tallest display in system |
| Footprints | `clamp(2.5rem, 6.4vw, 5rem)` | `clamp(1.75rem, 3.5vw, 2.5rem)` | Gold gradient on line 2 |

---

## 4. Spacing

### Gateway / Footprints (fluid)
`--space-xs` through `--space-3xl` — 7 `clamp()` steps from `0.25–0.5rem` to `6–8rem`.

### Hub (static scale)
`--space-3xs: 0.25rem` through `--space-4xl: 8rem` — 10 fixed steps. Easier to reason about for complex JS-driven components.

### W£₿3 (tight fluid)
`--space-1` through `--space-8` — 8 `clamp()` steps. Tighter minimum values for dense editorial layout.

---

## 5. Layout

| Page | Max-width | Hero grid | Card grid |
|------|-----------|-----------|-----------|
| Gateway | 1440px | — | `repeat(3, 1fr)` → single col ≤ 1040px |
| Hub | 1280px | `1fr 1fr` ≥ 1024px | `auto-fit minmax(280px, 1fr)` |
| W£₿3 | 1440px | `1.05fr 0.6fr` ≥ 900px | `auto-fit minmax(280px, 1fr)` |
| Footprints | 1440px | Single column | `auto-fit minmax(280px, 1fr)` |

---

## 6. Motion

### Policy by Page

| Page | Continuous animation | Reason |
|------|---------------------|--------|
| Gateway `index.html` | **Permitted** — orb spin (12s), bubble float (6–7s), implode-burst (one-shot) | Front door; cinema transition is intentional |
| Hub `hub.html` | **Permitted** — ambient orb floats (20–30s), scroll-reveal | Commerce energy; movement signals activity |
| W£₿3 `web3.html` | **None** — hover transitions only | Editorial restraint |
| Footprints `footprints.html` | **None** — hover + smooth scroll only | Preview layer; stillness = permanence |

### Easing Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `--ease-cinematic` / `--ease-out-expo` | `cubic-bezier(0.16, 1, 0.3, 1)` | Universal hover/state transitions |
| `--ease-bounce` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Arrow buttons, bubble orb pop |
| `--ease-out-quart` | `cubic-bezier(0.25, 1, 0.5, 1)` | Hub card transitions |
| `--ease-elastic` | `cubic-bezier(0.68, -0.55, 0.265, 1.55)` | Hub interactive moments |

**Reduced motion:** all animations resolve to `0.01ms`. Gateway burst bypassed (immediate navigate). Hub orbs halted.

---

## 7. Glassmorphism & Depth

| Surface | Properties |
|---------|------------|
| Gateway Bubbles | `backdrop-filter: blur(22px) saturate(150%)` + radial accent wash + dual inset shadows |
| Gateway Chip | `backdrop-filter: blur(16px)` + `--glass-border` + `--glass-bg` |
| Hub Cards | `backdrop-filter: blur(16px) saturate(140%)` + `rgba(18,18,26,0.55)` |
| Hub Header (scrolled) | `backdrop-filter: blur(28px)` + `rgba(3,3,5,0.8)` |
| W£₿3 Header | `backdrop-filter: blur(18px)` + `color-mix(in srgb, --canvas, transparent 14%)` |
| Footprints Header | `backdrop-filter: blur(16px) saturate(150%)` + `rgba(3,3,5,0.72)` |
| Footprints Waitlist | Radial gold wash at 0% 0% + `--bg-surface` |

---

## 8. Component Specifications

### 8.1 Gateway Header
- Brand orb: `34px` conic-gradient (cyan→magenta→gold→cyan), `12s` slow-spin
- Right: `Gateway online` mono caption + 7px `--brand-green` glow dot

### 8.2 Hub Header
- `position: fixed`, scroll-triggered glassmorphism (`is-scrolled` class adds `backdrop-filter: blur(28px)`)
- Logo: `36px` square with cyan→magenta gradient fill + `£T€R₦AL Hub` text
- Mobile: hamburger → X animation, full-screen slide-in nav from right

### 8.3 W£₿3 Header
- `position: sticky`, `76px` min-height, `backdrop-filter: blur(18px)`
- Brand mark: `34px` circle, radial gold highlight, inner `10px` circle border
- Theme toggle: JS `data-theme` attribute swap
- Connect Wallet button

### 8.4 Footprints Header
- `position: sticky`, `backdrop-filter: blur(16px) saturate(150%)`
- Left: back-arrow pill → Gateway
- Center: section nav (Pillars · Trails · Provenance · Movement · Waitlist)
- Right: `Preview · 03` gold dot status pill

### 8.5 Gateway Bubbles
- Three per row (Hub / W£₿3 / Footprints), each with its own `--accent` color var
- `::before` orb: specular-lit sphere, accent glow, lifts on hover
- `::after`: diagonal sheen sweeps left → right on hover
- Hover: `translateY(-16px) scale(1.018) rotateX(2deg)` + accent border bloom
- Click: implode keyframe + full-viewport burst overlay radial from click origin
- Float: phases at 0s / 1s / 2s — never sync

### 8.6 Hub Vendor Cards
- `data-name`, `data-category`, `data-location` attributes
- Live JS filter, 150ms debounce
- `tabindex=0`, `role=article`, Enter/Space activates inner link
- Empty state shown when filter returns zero results

### 8.7 W£₿3 Article Cards
- `auto-fit minmax(280px, 1fr)`, `--surface` background, `--radius-md 20px`
- Virtual gallery: `perspective: 2000px`, `preserve-3d`, `translateZ(20px) rotateY(-2deg) rotateX(2deg)` on hover only

### 8.8 Footprints Trail Cards
- `border-left: 3px solid --brand-gold-deep` → `--brand-gold` on hover
- `grid-template-columns: 1fr auto`, collapses ≤ 680px
- CTA label `translateX(4px)` on hover

### 8.9 Provenance Ledger
- `JetBrains Mono`, `0.78rem`. Column headers `0.68rem`, uppercase, `0.16em` ls
- `:nth-child(odd)` alternating tint
- Hash truncation: `0x4f3a…b1c9`
- "Verify on chain ↗" link (placeholder)

### 8.10 Creator Atlas (SVG Map)
- Single `<svg viewBox="0 0 1000 500">` inline
- Continent outline strokes: `1.2px --glass-border-strong`, no fill
- Creator dots: `<circle r="3–6">`, gold fill, `drop-shadow(0 0 6px gold)`, `<title>` tooltip
- No animation. `r` scales on hover via CSS.

### 8.11 Footprints Waitlist
- Rounded pill wrapper, `grid-template-columns: 1fr auto`
- `:focus-within` shifts border to `--brand-gold`
- JS success-swap on valid submit. Supabase `waitlist` insert in production.

### 8.12 Hub Lead Form
- `mailto:info@eternalmraltd.com` CTA for MVP
- Replace with Supabase `marketplace_leads` insert in production

---

## 9. Page Architecture

```
eternalweb3.com/
│
├── /index.html     GATEWAY — 3 portal bubbles
├── /hub.html       HUB — commerce, vendor directory, lead form
├── /web3.html      W£₿3 — editorial, collections, gallery, theme toggle
└── /footprints.html  FOOTPRINTS (preview) — trails, provenance, atlas, waitlist
```

---

## 10. Technical Standards

### HTML
- Semantic HTML5: `header`, `nav`, `main`, `section`, `article`, `footer`
- ARIA labels on all `nav` and interactive regions
- `<button>` for JS transitions, `<a>` for href navigation
- `skip-link` on every page

### CSS
- `@layer reset, tokens, base, layout, components, motion, utilities`
- BEM-inspired: `.component`, `.component__element`, `.component--modifier`
- All theming via custom properties; no `!important` except motion/implode overrides
- Mobile-first; structural breakpoints at 680px, 860px, 900px, 1024px, 1040px

### JavaScript
| Module | Purpose |
|--------|---------|
| `gateway.js` | Burst transition, prefetch on hover |
| `supabase-client.js` | Browser-safe public client (publishable key only) |
| `waitlist.js` | Form validation, Supabase `waitlist` insert |
| `leads.js` | Hub form, Supabase `marketplace_leads` insert |

No frameworks. No jQuery. No React/Vue for static build.

### Performance
- Google Fonts: `preconnect` + single combined request
- Portal prefetch: `<link rel="prefetch">` on bubble `pointerenter`
- GA4 async: W£₿3 only (`G-T4VZ54YSYQ`)
- Scripts at end of `<body>`

---

## 11. Accessibility

- WCAG AA contrast minimum (4.5:1)
- Focus: `2px solid --brand-cyan` (Gateway) / `--gold` (W£₿3, Footprints) / `outline: 2px` (Hub)
- `prefers-reduced-motion`: all animations to `0.01ms`, burst bypassed
- Strict h1→h2→h3 hierarchy
- Alt text mandatory on all gallery/artwork images
- Decorative elements: `aria-hidden="true"`

---

## 16. Backend Architecture

### 16.1 Parallel Systems Rule

£T€R₦AL W£₿3 and 333BI are parallel products. They must stay fully separate.

| | 333BI | £T€R₦AL W£₿3 |
|---|-------|----------------|
| **Product** | Intelligence, evidence, advisory engine | Art-commerce, culture, creator portal |
| **GitHub repo** | Separate | Separate |
| **Supabase project** | Separate | `eternal-web3-production` |
| **Vercel env vars** | `333BI_*` namespace | `ETERNAL_*` namespace |
| **Database tables** | Its own schema | Its own schema |
| **Service-role keys** | Never shared | Never shared |
| **Stripe products** | Its own | Its own |
| **AI pipeline** | 333BI only | Not applicable |

**What they share (philosophy level only):**
design discipline · portal UX patterns · clean database habits · evidence-first data structure thinking · deployment discipline on Vercel

> £T€R₦AL W£₿3 should benefit from 333BI the way a younger luxury house benefits from an older engineering lab — not by wearing the same uniform, but by inheriting the discipline.

### 16.2 Portal Audience Model

| Surface | Audience | Status |
|---------|----------|--------|
| Public Portal | Visitors | Live — all four HTML pages |
| Collector View | Buyers, collectors | Planned — Supabase Auth + saved items |
| Creator/Vendor View | Creators, sellers | Planned — submission + approval flow |
| Admin View | Internal operator | Planned — server-only writes, approve creators, manage drops |

### 16.3 Frontend Build Options

**Option A — Zero-debt static HTML (current)**
```
eternalweb3/
├── index.html
├── hub.html
├── web3.html
├── footprints.html
├── assets/
│   ├── images/
│   ├── icons/
│   └── brand/
├── css/
│   ├── tokens.css
│   ├── base.css
│   ├── components.css
│   └── gateway.css
└── js/
    ├── supabase-client.js  ← CDN import, publishable key only
    ├── gateway.js
    ├── waitlist.js
    └── leads.js
```

**Option B — Next.js app-router**
```
app/
├── page.tsx               (gateway)
├── hub/page.tsx
├── web3/page.tsx
├── footprints/page.tsx
├── api/waitlist/route.ts  ← server route, uses secret key
├── api/leads/route.ts
lib/
├── eternal-supabase.ts
├── eternal-types.ts
components/
├── Gateway.tsx
├── PortalCard.tsx
├── ArtworkGrid.tsx
└── WaitlistForm.tsx
```

Use Option A for pure zero-debt. Use Option B for server routes, protected admin actions, and cleaner Vercel integration with secret keys.

---

## 17. Data Layer — Supabase Schema

### 17.1 Tables (run in SQL Editor on `eternal-web3-production`)

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

### 17.2 Row Level Security

```sql
-- Enable RLS on all tables
alter table public.portal_sections enable row level security;
alter table public.creators enable row level security;
alter table public.collections enable row level security;
alter table public.artworks enable row level security;
alter table public.marketplace_leads enable row level security;
alter table public.waitlist enable row level security;
alter table public.site_events enable row level security;

-- Public reads: approved/active/published content only
create policy "Public can read active portal sections"
  on public.portal_sections for select using (status = 'active');

create policy "Public can read approved creators"
  on public.creators for select using (status = 'approved');

create policy "Public can read published collections"
  on public.collections for select using (status = 'published');

create policy "Public can read available artworks"
  on public.artworks for select
  using (availability in ('available', 'sold', 'preview'));

-- Public inserts: waitlist and leads only
create policy "Public can join waitlist"
  on public.waitlist for insert with check (true);

create policy "Public can submit marketplace leads"
  on public.marketplace_leads for insert with check (true);
```

Admin writes use `ETERNAL_SUPABASE_SECRET_KEY` in server routes only. Never expose this key in HTML, JS, GitHub, or any browser-visible code.

### 17.3 Storage Buckets

| Bucket | Public | Use |
|--------|--------|-----|
| `artwork-media` | Yes | Public artwork previews |
| `collection-covers` | Yes | Collection cover images |
| `creator-avatars` | Yes | Creator profile images |
| `brand-assets` | Yes | Logos, gateway visuals, static brand |

Private gated collector files: later.

---

## 18. Environment & Deployment

### 18.1 Vercel Environment Variables

```env
# Browser-safe — Next.js injects these into the client bundle
NEXT_PUBLIC_ETERNAL_SUPABASE_URL=
NEXT_PUBLIC_ETERNAL_SUPABASE_PUBLISHABLE_KEY=

# Server-only — never in frontend HTML/JS/GitHub/browser code
ETERNAL_SUPABASE_SECRET_KEY=
ETERNAL_ADMIN_EMAIL=
ETERNAL_SITE_URL=https://eternalweb3.com
```

**Rules:**
- `NEXT_PUBLIC_*` = browser-safe. Next.js injects these at build time into the client bundle.
- No prefix = server-only. Never in any file that runs in the browser.
- `ETERNAL_*` namespace is completely separate from any `333BI_*` vars.
- After adding or changing env vars in Vercel, you must redeploy — env changes only apply to new deployments.

**⚠ Key value format (patch 2.2.1):**
New Supabase projects issue keys in the format `sb_publishable_xxx` and `sb_secret_xxx`.
Legacy `anon` / `service_role` key values still work until end of 2026 but new projects should use the new format.
The env var *names* above do not change — only the *values* you paste in differ.

| Key type | Legacy value format | New value format |
|----------|--------------------|--------------------|
| Publishable / anon | `eyJhbGciOi...` (JWT) | `sb_publishable_xxx` |
| Secret / service-role | `eyJhbGciOi...` (JWT) | `sb_secret_xxx` |

Check your project's API settings in the Supabase dashboard to confirm which format your project uses.

### 18.2 Supabase Client Pattern

**Next.js (env vars work correctly):**

```ts
// lib/eternal-supabase-public.ts — browser-safe reads
// Use in React components, pages, client-side forms
import { createClient } from '@supabase/supabase-js';

export const eternalPublicSupabase = createClient(
  process.env.NEXT_PUBLIC_ETERNAL_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_ETERNAL_SUPABASE_PUBLISHABLE_KEY!
);
```

```ts
// lib/eternal-supabase-server.ts — server-only writes
// Use ONLY in app/api/*/route.ts, server actions, Edge Functions
// Never import this file into a component or page
import { createClient } from '@supabase/supabase-js';

export const eternalSupabase = createClient(
  process.env.NEXT_PUBLIC_ETERNAL_SUPABASE_URL!,
  process.env.ETERNAL_SUPABASE_SECRET_KEY!  // safe — server bundle only
);
```

**⚠ Static HTML caveat (patch 2.2.1):**
Vercel env vars do **not** automatically inject into plain `.html` or `.js` files.
There is no build step to substitute `process.env.*` values.

For static HTML + CDN Supabase, the publishable key must be hardcoded as a JS constant:

```js
// js/supabase-client.js — static HTML only
// Publishable key only. This is intentionally public — that is safe.
const SUPABASE_URL = "https://xxxxx.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_xxxxx";

const { createClient } = supabase; // loaded via CDN <script> tag
const eternalPublicSupabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
```

The secret key must **never** appear in static HTML under any circumstances.
If you need server-side operations (admin writes, protected routes), you need Next.js server routes — not static HTML.

| Build type | Publishable key | Secret key |
|------------|----------------|------------|
| Next.js | `process.env.NEXT_PUBLIC_*` | `process.env.ETERNAL_*` in server routes only |
| Static HTML | Hardcoded JS constant — acceptable | **Never** — requires a server route |

### 18.3 API Roadmap

**Use now:**
- Supabase Database — creators, artworks, collections, leads
- Supabase Storage — images and media
- Supabase RLS — protect all reads and writes
- Vercel env vars — credential separation

**Use later (do not overbuild now):**
- Supabase Realtime — live drops, auctions, marketplace activity
- Supabase Edge Functions — payment callbacks, moderation, automations
- Supabase Vector — semantic art/collection search
- Supabase Auth — creator/vendor/collector/admin login
- Stripe — paid drops, vendor fees, collector purchases
- Resend — waitlist confirmation, creator onboarding emails

### 18.4 Zero-Cost Setup Steps

1. supabase.com → New project → name: `eternal-web3-production`
2. Choose region closest to users
3. SQL Editor → paste and run §17.1 schema
4. Run §17.2 RLS policies
5. Storage → create four buckets from §17.3, set public access
6. Copy Project URL and publishable key (`sb_publishable_xxx` for new projects, `anon` JWT for legacy)
7. Vercel Dashboard → Settings → Environment Variables → add `ETERNAL_*` vars
8. Redeploy Vercel project
9. Test: one `waitlist` insert, one `artworks` read

---

## 19. MVP Scope

Launch with exactly this. Nothing else until the foundation is clean.

**Four pages:**
1. `index.html` — Gateway (three portal bubbles)
2. `web3.html` — W£₿3 (hero, featured collections, artwork grid, waitlist)
3. `hub.html` — Hub (marketplace positioning, vendor paths, lead form)
4. `footprints.html` — Footprints (preview, trails concept, waitlist)

**Five Supabase tables (active for MVP):**
1. `creators` — public read
2. `collections` — public read
3. `artworks` — public read
4. `marketplace_leads` — public insert from Hub form
5. `waitlist` — public insert from Footprints + W£₿3 forms

`portal_sections` and `site_events` are created but not wired to UI in MVP.

---

## 20. Build Doctrine

```
Separate systems.
Shared taste.
Clean schema.
No Tailwind.
No bloated Web3 theatre.
No secret leakage.
No copied 333BI logic.
No architecture debt.
```

**Portal hierarchy:**
```
eternalweb3.com = cultural operating system
├── Hub        = commerce layer     (cyan)
├── W£₿3       = editorial/art layer (magenta)
└── Footprints = trails layer       (gold · preview)
```

---

## 21. Per-Page Design Notes

### 21.1 Hub (`hub.html`)
- Token variant: **Eternal Noir** — heavy void palette, ambient orb floats
- Continuous animation **permitted**: `orbFloat` keyframe (20–30s) — commerce energy justifies movement
- Scroll-reveal: `IntersectionObserver` threshold `0.08`, rootMargin `0px 0px -60px 0px`
- Vendor filter: live JS on `data-name`, `data-category`, `data-location`, 150ms debounce
- Mobile nav: full-screen slide-in from right (`translateX(100%) → translateX(0)`)
- `--neon-magenta: #ff006e` — slightly deeper than gateway `#ff2a8a`
- `--lux-gold: #ffd700` — brighter than Footprints `#d8b56d`; commerce context warrants richer gold
- Lead CTA: `mailto:` for MVP → replace with Supabase `marketplace_leads` insert

### 21.2 W£₿3 (`web3.html`)
- Token variant: **Ink/Canvas** — warm-shifted palette, semantic ink/canvas naming
- Dual theme: `[data-theme='dark']` / `[data-theme='light']`, full light-mode palette production-ready
- Google Analytics: `G-T4VZ54YSYQ` — async `<script>` in `<head>`. Only page in the set with GA wired.
- Warm canvas base: `#070706` (slightly warmer than gateway void `#030305`)
- Accent set: violet `#7c5cff`, aqua `#63f3d8`, rose `#ff6f91`, gold `#d8b56d`
- Hero: tallest display type in the system at `clamp(3.25rem, 8vw, 7.75rem)`
- Background grid: `72px` base, fades to transparent via `mask-image: linear-gradient to bottom`
- No continuous animation on this page

### 21.3 Footprints (`footprints.html`)
- Token variant: **Gateway gold subset** — extends gateway tokens with soft/deep gold + border-glow
- Status: Preview — `"Footprints v0.1 · Preview · Illustrative content"` in footer bar
- Trail cards: `border-left: 3px solid --brand-gold-deep` → `--brand-gold` on hover
- Provenance ledger: mock data, column widths `1.2fr 2fr 1fr 1.4fr 1fr`
- Creator atlas: 14 regional dots, static SVG, no animation, `<title>` hover tooltips
- Waitlist: JS success-swap (preview only) → replace with Supabase `waitlist` insert for production
- No continuous animation on this page

**Promotion to production:**
1. Drop `Preview · 03` status pill from header
2. Drop footer disclaimer
3. Wire waitlist form to Supabase `waitlist` table
4. Replace mock trail/ledger/map data with live data sources
5. Update Gateway bubble tag from `Coming Soon` to reflect live status

---

## 22. Zero-Debt Checklist

- [x] No `npm install` required (static HTML build)
- [x] No build step (Vite, Webpack, etc.) — static build
- [x] No CSS framework (Tailwind, Bootstrap)
- [x] No JS framework (React, Vue, Next) — static build
- [x] No animation library (GSAP, Three.js, Lottie)
- [x] No continuous rendering (Canvas, WebGL loops) on content pages
- [x] No parallax or scroll-jacking
- [x] No utility classes
- [x] Single HTML file per page
- [x] Core functionality works without JS (except theme toggle, burst, analytics, form inserts)
- [x] Supabase client via CDN `<script>` — zero `npm install` for static build
- [x] No secret keys in frontend HTML, JS, or GitHub
- [x] £T€R₦AL W£₿3 Supabase project is separate from 333BI Supabase project
- [x] Vercel `ETERNAL_*` env vars are separate from any `333BI_*` vars

---

## 23. Source Document Attribution

| Source | Element Used | How Adapted |
|--------|-------------|-------------|
| **eternal-web3-supabase-architecture.md** | Supabase schema, RLS policies, env vars, parallel-systems rule, audience model, MVP scope, build doctrine, API roadmap, storage buckets, frontend folder shape | Integrated verbatim-precise into §16–21. No deviation from stated rules. |
| **design-system.md v2.1** | All frontend design tokens, typography, motion philosophy, component specs, page architecture | Carried forward and extended in every section. |
| **index.html** (user's original) | Gateway portal with 3 bubbles, implode-burst transition, brand orb, float animation | Authoritative. No changes made. |
| **eternal_hub_wireframe.html** | Eternal Noir tokens, ambient orbs, scroll-reveal, vendor filtering, mobile nav | Per-page notes in §21.1. Hub form → Supabase migration path documented. |
| **web3_wireframe.html** | Ink/Canvas tokens, dual theme, GA4, hero grid, gallery perspective | Per-page notes in §21.2. |
| **footprints.html** (user's version) | Gold token subset, trail cards, ledger, SVG atlas, waitlist | Per-page notes in §21.3. Supabase migration path documented. |
| **£T€R₦AL Hub docs** | Marketplace value prop, vendor/creator/consumer paths, tagline | Hub component specs §8.12 and Hub notes §21.1. |
| **£T€R₦AL W£₿3 branding docs** | Stylized mark, tri-color identity, ART×WEB3×METAVERSE narrative | Gateway chip copy, bubble tags, portal identity mapping §2.1. |

---

## 24. Version History

| Version | Date | Summary |
|---------|------|---------|
| 2.0.0 | 2026-05-26 | Initial elevated system. Content-page architecture, refined palette, fluid typography, glassmorphism, motion philosophy. |
| 2.1.0 | 2026-05-27 | Gateway architecture (3-bubble portal), tri-portal identity mapping, Footprints Layer specification. |
| 2.2.0 | 2026-05-27 | Supabase + Vercel architecture integrated (§16–19). Per-page notes for all four wireframes (§21). 333BI parallel-systems rule documented. Build doctrine extended. Zero-debt checklist extended to 14 items. Side-by-side v2.1→v2.2 diff table added (§0). |
| 2.2.1 | 2026-05-27 | **Patch.** Two production corrections to §18: (1) Supabase key value format — new projects use `sb_publishable_xxx` / `sb_secret_xxx`; legacy JWT values work until end of 2026. (2) Static HTML caveat — Vercel env vars do not inject into plain HTML/JS; publishable key must be hardcoded as a JS constant; secret key requires Next.js server route. §0 diff rows 10–11 updated. |
