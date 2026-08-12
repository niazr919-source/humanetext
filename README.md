# Humanwords

Free tools that make AI-generated content sound and look more natural:

- **Text Humanizer** (`/humanize-text`) — rewrites stiff or robotic text into
  natural, varied prose while preserving meaning.
- **Photo Humanizer** (`/humanize-photo`) — adds realistic camera-like grain and
  micro-detail to photos so they read as authentic photography.

Both tools are free to use without an account, with a daily usage limit tracked
per browser and IP address. Built with Next.js (App Router) + TypeScript +
Tailwind CSS, the Google Gemini API, `sharp` for image processing, and
Supabase for usage tracking.

## 1. Prerequisites

- Node.js 18.18 or newer
- A free [Google Gemini API key](https://aistudio.google.com/apikey)
- A free [Supabase](https://supabase.com) account
- A Hostinger Business hosting plan (or higher) — Business and up support
  Node.js web apps, which this project needs for its API routes

## 2. Get a Gemini API key

1. Go to <https://aistudio.google.com/apikey> and sign in with a Google account.
2. Click **Create API key**, and copy the value.
3. That's it — no credit card and no phone verification required. The free
   tier includes generous daily request limits on `gemini-3.6-flash` (the model this
   project uses), which is enough for real usage before you'd ever need to
   upgrade to a paid plan.
4. One trade-off worth knowing: on the free tier, Google may use your
   inputs/outputs to improve their models. If that matters for your use case,
   Google's paid tier (or Vertex AI) doesn't use your data for training.

## 3. Set up Supabase

1. Create a project at <https://supabase.com> (the free tier is enough).
2. Open **SQL Editor > New query**, paste the contents of
   [`supabase/schema.sql`](supabase/schema.sql), and run it. This creates the
   `usage_log` table (daily usage tracking) and `subscribers` table (waitlist
   emails), both with Row Level Security enabled so only server-side requests
   using the service role key can read or write them.
3. Go to **Project Settings > API** and copy:
   - **Project URL** → `SUPABASE_URL`
   - **service_role secret key** → `SUPABASE_SERVICE_ROLE_KEY` (not the
     `anon`/public key — this key must stay server-side only)

## 4. Configure environment variables

Copy the example file and fill in your values:

```bash
cp .env.example .env.local
```

| Variable | Description |
| --- | --- |
| `GEMINI_API_KEY` | Your Google Gemini API key, used server-side to power the Text Humanizer. |
| `SUPABASE_URL` | Your Supabase project URL. |
| `SUPABASE_SERVICE_ROLE_KEY` | Your Supabase service role secret key (server-side only). |
| `NEXT_PUBLIC_SITE_URL` | The public URL of your deployed site, used for metadata, Open Graph tags, and the sitemap. |

## 5. Run locally

```bash
npm install
npm run dev
```

Open <http://localhost:3000>. If Supabase isn't configured yet, both tools
still work locally — usage limits just won't be enforced until you add your
Supabase credentials.

## 6. Deploy to Hostinger (Business hosting)

Since the domain and hosting are both on Hostinger, there's no separate DNS
step — hPanel connects them directly. There are two ways to deploy:

### Option A: GitHub (recommended — auto-redeploys on every push)

1. Push this project to a GitHub repository (create one at
   <https://github.com/new>, then from this folder:
   `git init && git add . && git commit -m "Initial commit"`, add the repo as
   a remote, and push).
2. In **hPanel > Websites > Add Website > Deploy Web App**, choose
   **Import Git Repository** and authorize Hostinger to access GitHub (public
   repos can also be added by pasting the URL directly, no authorization
   needed).
3. Select the repository. Hostinger auto-detects Next.js and suggests the
   build/start commands — confirm `npm run build` as the build command and
   `npm start` as the start command.
4. Add every environment variable from step 4 above in the app's **Environment
   Variables** section before deploying (`GEMINI_API_KEY`, `SUPABASE_URL`,
   `SUPABASE_SERVICE_ROLE_KEY`, and `NEXT_PUBLIC_SITE_URL=https://humanetext.com`).
5. Click **Deploy**. Future updates: push to GitHub and Hostinger redeploys
   automatically.

### Option B: Upload a zip (no GitHub needed)

1. From this folder, zip the project **excluding** `node_modules`, `.next`,
   and `.env.local` (Hostinger installs dependencies and builds itself).
2. In **hPanel > Websites > Add Website > Deploy Web App**, choose the upload
   option instead of GitHub, and upload the zip.
3. Set the build command to `npm run build` and start command to `npm start`
   if not auto-detected, and add the same environment variables as in Option
   A.
4. To update the live site later, repeat this process with a fresh zip.

### Connect the domain

Since `humanetext.com` is already registered with Hostinger, once the Node.js
app is deployed, go to the app's settings in hPanel and point the domain
(already in your account) at it — no external DNS records to add, since
registrar and host are the same account.

Finally, update `NEXT_PUBLIC_SITE_URL=https://humanetext.com` (already the
default in code, but confirm it's set as an actual environment variable on
the deployed app so metadata, Open Graph tags, and the sitemap all resolve to
your real domain).

## Project structure

```
src/
  app/                Pages and API routes (App Router)
  components/          Shared UI components
  content/blog/         MDX blog posts
  lib/                  Supabase, rate limiting, Gemini, and photo processing helpers
supabase/schema.sql     Database schema — run this in the Supabase SQL editor
```

## 8. Getting ready for Google AdSense (or another ad network)

The site ships with what's controllable in code. A few things are worth
doing before you apply:

**Already done:**
- 11 original, in-depth blog posts (900–1,800 words each) covering the
  text-humanizing and photo-authenticity niche — see `src/content/blog/`
- Essential trust pages: `/about`, `/contact`, `/privacy`, `/terms`
- Privacy Policy includes an "Advertising" section disclosing third-party
  ad cookies (required by AdSense's own program policies)
- Clean navigation, mobile-responsive design, fast page loads, sitemap.xml,
  robots.txt

**Still needed before applying, and outside what code alone can fix:**
- **Domain age.** Most reviewers report AdSense wants a domain that's been
  live for at least a few weeks to months — apply after the site has been up
  for a while, not on day one.
- **Organic traffic.** Get at least some real visits from search before
  applying (submit the sitemap to Google Search Console, share the blog
  posts, wait for indexing).
- **Update the real contact email.** `src/app/contact/page.tsx` and the
  privacy/terms `[CONTACT EMAIL]` placeholders currently use a placeholder
  address — replace with your real inbox.
- **Finish the legal pages.** `/privacy` and `/terms` are marked as
  placeholders in the UI on purpose — have a lawyer review and finalize
  them before launch.
- **More posts over time.** 11 is a solid starting library; many successful
  applications have 15–25+ posts, so keep publishing on the same niche
  (natural writing, AI content, authentic photography) rather than
  branching into unrelated topics.
- **`ads.txt`.** Once you're approved and have a publisher ID, add an
  `ads.txt` file at `public/ads.txt` with the line AdSense gives you (e.g.
  `google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0`) and redeploy.

### Once you're approved: turning ads on

The ad plumbing is already built and wired up, but stays completely inactive
(nothing renders, no script loads) until you set a publisher ID:

1. Set `NEXT_PUBLIC_ADSENSE_CLIENT_ID` (format `ca-pub-XXXXXXXXXXXXXXXX`, from
   your AdSense account) in `.env.local` locally and in your Hostinger Node.js
   app's **Environment Variables** section for production, then redeploy.
2. That's it for the global script — `src/app/layout.tsx` loads the AdSense
   script and site-verification meta tag automatically once the env var is
   set.
3. Ad units themselves render via the `AdSlot` component
   (`src/components/AdSlot.tsx`), currently placed once per article at the
   bottom of each blog post (`src/app/blog/[slug]/page.tsx`) — the highest-
   converting, lowest-friction spot on a content site like this. Create a new
   ad unit in your AdSense dashboard, copy its slot ID, and pass it as the
   `slot` prop: `<AdSlot slot="your-slot-id" />`.
4. To add more placements, drop `<AdSlot slot="..." />` anywhere else you
   want one — for example between FAQ items on the landing page, or in the
   blog index between a few posts. **Don't add one to `/humanize-text` or
   `/humanize-photo`** — AdSense policy (and basic UX) requires ads to be
   clearly separated from a tool's interactive controls, and cluttering the
   actual product surface hurts conversion more than an extra impression is
   worth.
5. Add `public/ads.txt` with the line from your AdSense account (see above).

## Notes

- The `/privacy` and `/terms` pages are placeholders and are clearly marked as
  such in the UI — have a lawyer review them before launch.
- Free usage defaults to 3 text rewrites and 3 photo processes per day per
  browser/IP; adjust `FREE_LIMIT` and `SUBSCRIBER_LIMIT` in
  `src/lib/rateLimit.ts` to change this.
- Payments, full user authentication, and ad integration are intentionally
  not included in this build.
