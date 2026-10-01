# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Personal e-portfolio for Arvel Francisco (Full Stack Engineer), built with Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, and shadcn/ui (New York style, neutral base color). Live at https://arvel-portfolio.netlify.app/, deployed via Netlify.

## Commands

```bash
npm run dev      # start dev server (Next.js, Turbopack default)
npm run build    # production build
npm run start    # run production build
npm run lint     # eslint (flat config: eslint-config-next core-web-vitals + typescript)

npm run db:generate  # generate a SQL migration in drizzle/ from src/db/schema.ts
npm run db:migrate   # apply pending migrations
npm run db:push      # push schema directly (prototyping, skips migration files)
npm run db:studio    # Drizzle Studio GUI for editing rows
npm run db:seed      # wipe + reseed profile/projects/skills from src/db/seed.ts
npm run db:seed:admin # create/update the admin login + storage bucket (doesn't touch content)
docker compose up -d # local Postgres 17 on localhost:5432 (db/user/pass: portfolio/postgres/postgres)
```

Env vars:
- `DATABASE_URL` — Supabase transaction pooler (port 6543) in prod; `postgresql://postgres:postgres@localhost:5432/portfolio` for the Docker DB.
- `DIRECT_URL` (optional) — session pooler/direct (port 5432), preferred by drizzle-kit. **If `.env` has a Supabase `DIRECT_URL`, `.env.local` must override it too**, or migrations will hit Supabase.
- `SESSION_SECRET` — signs `/my-profile` session cookies (≥32 chars). Needed at runtime, including on Netlify.
- `SUPABASE_URL`, `SUPABASE_SECRET_KEY`, `SUPABASE_STORAGE_BUCKET` (optional, default `project-images`) — Supabase Storage for project thumbnails (Project Settings → API; the secret key, or the legacy `service_role` key). Server-only: never prefix with `NEXT_PUBLIC_`. Needed at runtime, including on Netlify.
- `ADMIN_EMAIL`, `ADMIN_PASSWORD` — read **only by the seed script** to create/update the `admin_users` row (the password is hashed before storing). Not needed at runtime; keep them out of Netlify.

CLI scripts (seed, drizzle-kit) load `.env.local` then `.env` via `src/db/load-env.ts`, matching Next's precedence, so local Docker settings go in `.env.local`.

There is no test suite configured in this repo.

## Architecture

**Single-page portfolio + separate projects section.** `/` (`src/app/page.tsx`) is a server component that fetches data and stacks section components from `src/app/_components/` in order: Hero → About → Project → Skill → Contact. Each section receives its data as props.

**Data lives in Supabase Postgres, accessed via Drizzle ORM** (`postgres` driver). Everything is under `src/db/`:
- `schema.ts` — tables `profile` (single row of bio/contact info), `projects`, `skills`. All have RLS enabled with no policies, so Supabase's anon Data API can't touch them; the app connects as the owner via `DATABASE_URL`.
- `index.ts` — the `db` client (`prepare: false` for the transaction pooler; pool cached on `globalThis` in dev).
- `queries.ts` — `getProfile`, `getProjects`, `getSkills` (`server-only`, wrapped in React `cache`). Ordered by `sortOrder`.
- `seed.ts` — the canonical seed data; re-running it replaces all rows.

`src/app/layout.tsx` and `src/app/page.tsx` are async server components that call these queries and pass data down as props to the client section components/Navbar/Footer. `revalidate = 3600` in the layout makes the site ISR (static, re-queried at most hourly), so `npm run build` needs database access. Row types (`Profile`, `Project`, `Skill`) are inferred from the schema in `src/types/type.ts`, alongside the `SkillName` union that `projects.tags`/`skills.name` are typed with.

`projects.placeholderIcon` stores a key into `placeholderIcons` (`src/lib/placeholder-icons.ts`), not a component — add the Lucide icon there before using a new name.

To change content, edit rows (Drizzle Studio / Supabase dashboard) or edit `seed.ts` and reseed. To change the shape, edit `schema.ts`, run `db:generate`, then `db:migrate`.

**Routing:**
- `/` — the single-page portfolio
- `/projects` — filterable, paginated grid of all projects (client-side filter/pagination over the in-memory `projects` array, 6 per page)
- `/projects/[id]` — project detail page; looks up the project by numeric `id` from `useParams()` against the in-memory `projects` array (no server fetch) and renders `ProjectNotFound` if no match

**Admin area (`/my-profile`)** — single-owner, not linked from the public site, `noindex`:
- `/my-profile/login` — email + password checked against the `admin_users` table (scrypt, `src/lib/auth/password.ts`; unknown emails are hashed against a dummy so timing doesn't reveal which accounts exist). Success sets an HS256 JWT (`jose`, `src/lib/auth/jwt.ts`) whose `sub` is the admin id, in an httpOnly `session` cookie scoped to `/my-profile`, valid 7 days.
- `proxy.ts` only verifies the JWT signature (no DB hit); `requireAdmin()` also loads the admin row, so deleting it revokes that admin's sessions. Changing a password does **not** end existing sessions — rotate `SESSION_SECRET` for that.
- `/my-profile` — lists projects with delete + logout; `/my-profile/projects/new` — create form.
- Mutations are server actions in `src/app/my-profile/actions.ts`; they `revalidatePath("/")` so the ISR homepage updates immediately.
- Two layers of protection: `src/proxy.ts` (Next 16's renamed middleware) redirects signed-out visitors, **and** every admin page and server action calls `requireAdmin()` from `src/lib/auth/session.ts`. Server actions can be POSTed directly, so never rely on the proxy alone — any new action must start with `await requireAdmin()`.
- Uploaded thumbnails go to the public Supabase Storage bucket `project-images` (`src/lib/storage.ts`, using the secret key server-side) under `projects/<uuid>.<ext>`; the project's `image` column stores the object's public URL, which `next/image` is allowed to load via `images.remotePatterns` in `next.config.ts`. The bucket name comes from `SUPABASE_STORAGE_BUCKET` (default `project-images`). Upload happens before the DB insert, and the file is removed if the insert fails; deleting a project removes its file (best-effort, logged on failure). `image` can also be a `/public` path (the seeded logos) — storage deletes ignore those. Limits: PNG/JPEG, 5 MB, enforced in the action and on the bucket (server action body limit is raised to 6 MB). SVG is intentionally not allowed. `npm run db:seed` and `db:seed:admin` create the bucket if missing. Local dev has no Storage emulator, so uploads from a local server go to the real Supabase bucket.
- `skillNames` in `src/types/type.ts` is a runtime array (the `SkillName` type derives from it); it feeds both the tag checkboxes and Zod validation in `src/app/schema/project.ts`.

**Contact form flow:** `src/app/_components/contact.tsx` collects form data, validates client-side with the Zod schema in `src/app/schema/contact.ts` (`contactSchema`), then POSTs JSON to the route handler at `src/app/api/send-email/route.ts`. That route re-validates required fields and forwards the message to the EmailJS REST API (`api.emailjs.com`) using service/template/public/private keys from environment variables (`EMAIL_JS_SERVICE_ID`, `EMAIL_JS_TEMPLATE_NAME`, `EMAIL_JS_PUBLIC_KEY`, `EMAIL_JS_PRIVATE_KEY`). There is no email-sending logic on the client — EmailJS is only ever called server-side from this route.

**Styling/theming:** Tailwind v4 with CSS custom properties defined in `src/app/globals.css` (`:root` / `.dark` blocks, OKLCH colors), toggled via `next-themes` (`ThemeProvider` in `src/components/ui/theme-provider.tsx`, wired in `src/app/layout.tsx` with `attribute="class"`). Path alias `@/*` maps to `src/*` (see `tsconfig.json` and `components.json` aliases). Use the `cn()` helper from `src/lib/utils.ts` (clsx + tailwind-merge) when combining conditional class names.

**UI primitives** in `src/components/ui/` are shadcn/ui components (button, card, badge, input, textarea, pagination, sheet, sonner toaster, spinner, separator) — treat these as generated/vendored; prefer composing them over editing internals unless fixing a real bug. Shared, portfolio-specific composites (navbar, footer, project card, pagination wrapper) live in `src/components/layout/` and `src/components/shared/`.

React Compiler is enabled (`reactCompiler: true` in `next.config.ts`), so manual `useMemo`/`useCallback` micro-optimizations are generally unnecessary for new code.
