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
```

There is no test suite configured in this repo.

## Architecture

**Single-page portfolio + separate projects section.** `/` (`src/app/page.tsx`) is a client component that stacks section components from `src/app/_components/` in order: Hero → About → Project → Skill → Contact. Each section is self-contained and pulls its data from `src/lib/utils.ts`.

**Data is hardcoded in `src/lib/utils.ts`**, not fetched from an API or CMS. This file is the single source of truth for:
- `personalInfo` — bio/contact fields used across Hero/About/Contact/Footer
- `projects: Project[]` — all project entries, including nested `workBreakdown` shown on project detail pages
- `skills: Skill[]` and `filters` (derived from skills, plus `"All Projects"`) — used to drive the tag filter UI on `/projects`
- `getRoleColor(role)` — maps a `Role` to a Tailwind badge color class

When adding/editing a project or skill, edit this file — there is no database or content layer. Types for all of the above live in `src/types/type.ts`, including the `SkillName` and `Role` union types that `projects`/`skills` entries must satisfy.

**Routing:**
- `/` — the single-page portfolio
- `/projects` — filterable, paginated grid of all projects (client-side filter/pagination over the in-memory `projects` array, 6 per page)
- `/projects/[id]` — project detail page; looks up the project by numeric `id` from `useParams()` against the in-memory `projects` array (no server fetch) and renders `ProjectNotFound` if no match

**Contact form flow:** `src/app/_components/contact.tsx` collects form data, validates client-side with the Zod schema in `src/app/schema/contact.ts` (`contactSchema`), then POSTs JSON to the route handler at `src/app/api/send-email/route.ts`. That route re-validates required fields and forwards the message to the EmailJS REST API (`api.emailjs.com`) using service/template/public/private keys from environment variables (`EMAIL_JS_SERVICE_ID`, `EMAIL_JS_TEMPLATE_NAME`, `EMAIL_JS_PUBLIC_KEY`, `EMAIL_JS_PRIVATE_KEY`). There is no email-sending logic on the client — EmailJS is only ever called server-side from this route.

**Styling/theming:** Tailwind v4 with CSS custom properties defined in `src/app/globals.css` (`:root` / `.dark` blocks, OKLCH colors), toggled via `next-themes` (`ThemeProvider` in `src/components/ui/theme-provider.tsx`, wired in `src/app/layout.tsx` with `attribute="class"`). Path alias `@/*` maps to `src/*` (see `tsconfig.json` and `components.json` aliases). Use the `cn()` helper from `src/lib/utils.ts` (clsx + tailwind-merge) when combining conditional class names.

**UI primitives** in `src/components/ui/` are shadcn/ui components (button, card, badge, input, textarea, pagination, sheet, sonner toaster, spinner, separator) — treat these as generated/vendored; prefer composing them over editing internals unless fixing a real bug. Shared, portfolio-specific composites (navbar, footer, project card, pagination wrapper) live in `src/components/layout/` and `src/components/shared/`.

React Compiler is enabled (`reactCompiler: true` in `next.config.ts`), so manual `useMemo`/`useCallback` micro-optimizations are generally unnecessary for new code.
