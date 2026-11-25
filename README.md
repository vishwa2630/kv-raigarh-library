# PM SHRI KV Raigarh Library — Digital Library Website & Blog

**Tagline:** *"A Gateway to Knowledge, Imagination and Lifelong Learning"*  
**Institution:** PM SHRI Kendriya Vidyalaya Raigarh, KVS Raipur Region, Chhattisgarh, India

Designed and maintained by Vishwa Nand Chandra, PGT (Computer Science) & Website In-Charge, PM SHRI KV Raigarh.

---

## 1. Overview & Features
- **Public Editorial Portal:** Homepage (12 structured sections A–L), Books & Reading recommendations with URL-synced filters, full Library Blog (Markdown, TOC, WhatsApp-first sharing, scheduled publishing), Activities & Events (list + month calendar + `.ics` downloads), Research & Learning (10 subjects, CRAAP website evaluation, APA/MLA citations, Cyber Safety), Digital Resources directory, Library Services + Book Request form, Contact the Librarian.
- **Student Corner (DPDP Act 2023 Safeguarding First):** Reading Challenge milestones, interactive Reading Quiz, **on-device Reading Passport** (`localStorage`, zero server student accounts), and a moderated submission queue with automated PII/profanity flagging.
- **Bilingual Ready:** English (`en-IN`, Indian English, `DD Month YYYY` dates, IST) and Hindi (`hi`, self-hosted Devanagari typography) language switcher in the header.
- **Real Librarian Admin Dashboard (`/admin`):** Protected by Supabase Auth + Row Level Security (`admin` and `editor` roles), Markdown post editor with live preview + autosave + WebP image compression + mandatory alt text, Book CSV import, Event/Resource link checker, Moderation queue, Announcements manager, Site Settings editor for all `[PLACEHOLDER]` fields, and Audit Log.
- **Dual Host Support:** Built primarily for **Cloudflare Pages** (+ Pages Functions + Turnstile) with full **Netlify** (`netlify.toml` + Netlify Functions) configuration included.

---

## 2. Tech Stack & Folder Structure
- **Frontend:** React 18, TypeScript, Vite 6, React Router, Tailwind CSS, Radix UI (`Dialog`, `Tabs`, `Accordion`, `DropdownMenu`), `lucide-react`, `@fontsource/fraunces`, `@fontsource/inter`, `@fontsource/noto-sans-devanagari`
- **Database / Auth / Storage:** Supabase (PostgreSQL + RLS + Supabase Auth + Storage)
- **Validation & Security:** Zod (shared client/server schemas), `marked` + `DOMPurify`, Cloudflare Turnstile, strict CSP headers (`public/_headers`)
- **Search & SEO:** MiniSearch unified site search, `react-helmet-async`, JSON-LD, dynamic `/sitemap.xml` function, post-build `scripts/prerender.mjs`

```text
school_library/
├── functions/                  # Cloudflare Pages Functions (/api/*, /sitemap.xml)
├── netlify/functions/          # Netlify Functions adapters
├── public/
│   ├── brand/logo-placeholder.svg
│   ├── illustrations/          # Custom project-owned SVG artwork
│   ├── _headers, _redirects, _routes.json, robots.txt
├── scripts/
│   ├── prerender.mjs           # Post-build static route HTML meta shell generator
│   └── seed.mjs                # Seeds live Supabase using SUPABASE_SERVICE_ROLE_KEY
├── server/                     # Host-agnostic serverless handlers, Turnstile & sitemap
├── src/
│   ├── components/             # UI primitives, layout, books, admin dashboard modules
│   ├── data/seedData.ts        # Meaningful Indian school-context demo content
│   ├── i18n/                   # en.ts, hi.ts, I18nProvider.tsx
│   ├── lib/                    # Supabase client, CatalogueProvider, repository, search, moderation
│   ├── pages/                  # All public routes + /admin + 404
│   └── shared/                 # Shared TypeScript types & Zod schemas
├── supabase/
│   ├── migrations/0001_initial_schema.sql
│   └── seed.sql
└── tests/                      # Vitest unit/security tests & Playwright + axe E2E tests
```

---

## 3. Local Development Setup

### Prerequisites
- Node.js 20+ (`npm`)

### Steps
1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy `.env.example` to `.env` (optional for local preview; required for live Supabase):
   ```bash
   cp .env.example .env
   ```
3. Start the local dev server:
   ```bash
   npm run dev
   ```
   > **Note on Local Preview Mode:** When `VITE_SUPABASE_URL` is blank, the app runs in an isolated browser-persisted preview mode so you can test every page and the `/admin` dashboard immediately without shipping any default passwords in code.

### Available Scripts
- `npm run dev` — Run Vite dev server
- `npm run build` — Typecheck, build production bundle, and prerender static route shells
- `npm run preview` — Preview the production `dist/` build locally
- `npm run lint` — Run ESLint
- `npm run typecheck` — Run TypeScript compiler checks
- `npm run test` — Run Vitest unit & RLS/security tests
- `npm run test:e2e` — Run Playwright browser & axe-core accessibility tests
- `npm run seed` — Seed a live Supabase database (requires `.env` service-role key)

---

## 4. Setting Up Supabase (Step-by-Step for Teachers)

1. **Create a free Supabase account & project** at [https://supabase.com](https://supabase.com). Choose the **Mumbai (`ap-south-1`)** region for fastest access across India.
2. **Run the Database Schema & RLS Migration:**
   - Open your Supabase Project → **SQL Editor** → **New Query**.
   - Copy and paste the full contents of `supabase/migrations/0001_initial_schema.sql` and click **Run**.
   - This creates all 13 tables, full-text search indexes, the `library-media` Storage bucket (images ≤ 2 MB), and **Row Level Security** on every table.
3. **Seed Initial Content (Optional Demo Data):**
   - Put `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` into your local `.env` (never commit `.env`), then run `npm run seed`, OR run `supabase/seed.sql` in the SQL Editor.
4. **Create the First Admin Account Securely (No Default Password):**
   - In Supabase Dashboard → **Authentication** → **Users** → **Add user** → **Create new user**.
   - Enter the Librarian's official email and a strong password (or invite by email).
   - Copy the new user's **UUID** from the Users table.
   - Open **SQL Editor** and run:
     ```sql
     INSERT INTO public.user_roles (user_id, role, display_name)
     VALUES ('PASTE-USER-UUID-HERE', 'admin', 'Vidyalaya Librarian');
     ```
   - Encourage the Librarian to enable **MFA (Two-Factor Authentication)** in Supabase / account settings.
5. **Configure Auth Redirect URLs:**
   - Go to **Authentication** → **URL Configuration**.
   - Set **Site URL** to your live domain (e.g. `https://library.example.edu.in`).
   - Add `https://library.example.edu.in/admin` (and your preview URLs) to **Redirect URLs**.
6. **Enable Backups:** Supabase includes daily automatic backups on Pro plans; for the Free tier, periodically export tables or CSVs from Admin Dashboard and Supabase Table Editor.

---

## 5. Deploying to Cloudflare Pages (Primary Target)

1. Push this repository to a private or school GitHub account.
2. Log in to **Cloudflare Dashboard** → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.
3. Select the repository and enter these **exact build settings**:
   - **Framework preset:** `None` (or `Vite`)
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Environment variables (Build & Runtime):**
     - `NODE_VERSION` = `20`
     - `VITE_SITE_URL` = `https://your-library-domain`
     - `VITE_SUPABASE_URL` = *(from Supabase Project Settings → API)*
     - `VITE_SUPABASE_ANON_KEY` = *(from Supabase Project Settings → API)*
     - `VITE_TURNSTILE_SITE_KEY` = *(from Cloudflare Turnstile)*
     - `VITE_CF_ANALYTICS_TOKEN` = *(optional, cookie-less Web Analytics)*
   - **Runtime Secrets for Pages Functions (NEVER prefix with `VITE_`):**
     - `SUPABASE_URL`
     - `SUPABASE_SERVICE_ROLE_KEY`
     - `TURNSTILE_SECRET_KEY`
     - `ALLOWED_ORIGIN` = `https://your-library-domain`
4. **Cloudflare Turnstile Setup:** In Cloudflare Dashboard → **Turnstile** → **Add Widget**, add your domain, choose *Managed*, and paste the Site Key & Secret Key above.
5. **Functions & Headers:** Cloudflare Pages automatically detects `/functions/api/[[route]].ts`, `/functions/sitemap.xml.ts`, `public/_headers`, `public/_redirects`, and `public/_routes.json`.
6. **Custom Domain & SSL:** Under **Custom domains** in Cloudflare Pages, add your subdomain (e.g. `library.kvraigarh.example.in`) and point the DNS `CNAME` record as instructed. SSL/HTTPS is provisioned automatically.
   > **KVS Approval Reminder:** Confirm with the Vidyalaya Principal / KVS Raipur Regional Office before connecting an official `kvsangathan.nic.in` / school subdomain or applying official KVS logos.

---

## 6. Deploying to Netlify (Alternative Supported Host)

`netlify.toml` is already configured.
1. Log in to **Netlify** → **Add new site** → **Import an existing project** from GitHub.
2. Verify settings (auto-detected from `netlify.toml`):
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
   - **Functions directory:** `netlify/functions`
3. Add the exact same environment variables listed in Section 5 under **Site configuration → Environment variables**.
4. Custom domains receive automatic Let's Encrypt SSL certificates.

---

## 7. Connecting an External Library Catalogue (Koha / SLiMS / Google Sheet)
Because school libraries often maintain circulation in Koha, e-Granthalaya, SLiMS or spreadsheets, `src/lib/data/catalogueProvider.ts` defines a clean `CatalogueProvider` interface:
1. Today, `LibraryRepository` implements `CatalogueProvider` using Supabase (with Admin **CSV Bulk Import** on the Books tab).
2. To connect Koha REST API, SLiMS JSON, or a published Google Sheet CSV later:
   - Create a new class implementing `CatalogueProvider` (`listBooks` and `getBookBySlug`) in `src/lib/data/`.
   - Never expose Koha admin/staff API keys in the browser; proxy authenticated OPAC requests through `/functions/api/` or `/netlify/functions/api`.

---

## 8. How the Librarian Manages Content Without Code

1. **Log In:** Visit `/admin` and sign in with your Librarian email and password (or magic link).
2. **Update School Placeholders:** Go to **Site Settings & Audit**, replace `[LIBRARIAN NAME]`, `[SCHOOL ADDRESS]`, `[LIBRARY HOURS]`, etc., and click **Save Site Settings**.
3. **Publish a Blog Article:** Open **Blog** → **Write New Post** → type in Markdown (use **Live Preview** to check formatting), upload an image + write mandatory **Alt Text**, set status to **Published** or **Scheduled**, and click **Save Post**.
4. **Add Books or Import CSV:** Open **Books** → click **Add Book** (tick *Set as Book of the Month* to feature it on the homepage) or click **Import CSV** with columns `title,author,genre,language,grade_band,description`.
5. **Approve Student Reviews:** Open **Moderation & Inbox**, inspect any yellow safeguarding warnings (phone numbers/emails), edit out any personal info if needed, and click **Approve** or **Reject**.
6. **Before Going Live:** On the **Overview** tab, click **Remove All Sample Content** once you are ready to replace demo posts/books with real school entries.

For a printable step-by-step handbook, see [ADMIN_GUIDE.md](./ADMIN_GUIDE.md).

---

## 9. Post-Launch Checklist
- [ ] Replace all items in `PLACEHOLDERS.md` (Site Settings + `/public/brand/logo-placeholder.svg`)
- [ ] Click **Remove All Sample Content** in `/admin` Overview
- [ ] Verify `/sitemap.xml` and `/robots.txt` return HTTP 200 on the live domain
- [ ] Submit `https://your-domain/sitemap.xml` in **Google Search Console**
- [ ] Enable Cloudflare Web Analytics (cookie-less) or uptime monitor
- [ ] Verify preview deployments and know how to roll back a deploy in Cloudflare Pages / Netlify **Deployments** tab
