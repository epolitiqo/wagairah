# Wagairah

A minimal modern website scaffold built with Next.js, Tailwind CSS, and TypeScript. The project ships with a single homepage, a small black/white/red design system, and a clean folder structure that is easy to expand.

## Stack

- Next.js 15.5.3
- React 19.1.1
- Tailwind CSS 4.1.13
- TypeScript

## Project structure

```text
.
├── public
│   └── favicon.svg
├── supabase
│   └── schema.sql
├── src
│   ├── app
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components
│   │   ├── home
│   │   │   ├── fragment-composer.tsx
│   │   │   └── home-page.tsx
│   │   └── ui
│   │       └── container.tsx
│   └── lib
│       ├── site.ts
│       └── supabase
│           ├── client.ts
│           ├── fragments.ts
│           └── types.ts
├── next.config.ts
├── package.json
├── postcss.config.mjs
└── tsconfig.json
```

## Run locally

1. Install Node.js 20 or newer.
2. Install dependencies:

   ```bash
   npm install
   ```

3. Copy `.env.example` to `.env.local` and add your Supabase project URL plus publishable key.
4. Run the SQL in `supabase/schema.sql` in the Supabase SQL editor to create the `fragments` table.
5. Start the development server:

   ```bash
   npm run dev
   ```

6. Open `http://localhost:3000`.

## Production commands

```bash
npm run build
npm run start
```

## Environment variables

Use the same public Supabase values locally and in Vercel:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-publishable-key
```

- `NEXT_PUBLIC_SUPABASE_URL`: your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`: your Supabase publishable key
- Optional fallback: `NEXT_PUBLIC_SUPABASE_ANON_KEY` for older Supabase projects still using the legacy anon key name

## Deploy to Vercel

This project is ready for Vercel's standard Next.js deployment flow. No custom `vercel.json` is required.

1. Create or open your Supabase project.
2. In the Supabase SQL editor, run `supabase/schema.sql` to create the `fragments` table and its policies.
3. Push this project to GitHub, GitLab, or Bitbucket.
4. In Vercel, create a new project and import the repository.
5. When Vercel asks for environment variables, add:

   ```bash
   NEXT_PUBLIC_SUPABASE_URL
   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
   ```

6. Apply those variables to `Production`, `Preview`, and `Development`.
7. Keep the framework preset as `Next.js` and the default build settings.
8. Deploy the project.
9. After the first deploy completes, open the site and submit a fragment to confirm writes are reaching Supabase.

## Deploy with Vercel CLI

If you prefer the CLI:

```bash
npm install -g vercel
vercel
```

For a production deploy:

```bash
vercel --prod
```

If you want local env vars synced from Vercel later, you can use:

```bash
vercel env pull
```

## Notes

- This environment did not have `node` or `npm` installed, so the scaffold was created manually and not executed here.
- Styling uses the Tailwind CSS v4 PostCSS flow with `@import "tailwindcss";` in `src/app/globals.css`.
- The Supabase client reads `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`, with `NEXT_PUBLIC_SUPABASE_ANON_KEY` supported as a fallback for older projects.
- The browser-side insert depends on the RLS policies in `supabase/schema.sql`; that policy setup is required for unauthenticated form submissions to succeed.
- The fragment feed loads the latest 10 rows from Supabase, ordered by `created_at` descending, and updates immediately after a successful submit.
- `package.json` pins the project to Node `20.x || 22.x`, which keeps local and Vercel runtime expectations aligned.
- `next.config.ts` disables the `X-Powered-By` header and keeps the rest of the deployment zero-config for Vercel.
