# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Lumière is a French-language learning web app (editorial/newspaper visual direction, largely French UI copy). It is a React 19 + Vite + TypeScript SPA, originally scaffolded from Google AI Studio. It is a frontend only — it talks to an external REST API (see `docs/api-1.yaml`).

## Commands

```bash
pnpm install      # install dependencies (see peer-deps note below)
pnpm dev          # Vite dev server on port 3000, host 0.0.0.0
pnpm build        # Production build (vite build)
pnpm preview      # Preview the production build
pnpm lint         # tsc --noEmit  (this is a TYPE CHECK, not ESLint)
pnpm clean        # rm -rf dist server.js
```

- **This project uses pnpm** (`packageManager: pnpm@10.26.1` in `package.json`; only `pnpm-lock.yaml` is committed). Don't run `npm install` — it would create a stray `package-lock.json`.
- **`.npmrc`** declares the `@le-cogito` Azure Artifacts feed for the contract package. (The former `strict-peer-dependencies=false` was removed — the flag is deprecated in pnpm 10, and pnpm's default already tolerates the one intentional unmet peer: `i18next`'s optional `typescript@"^5 || ^6"` peer while the project is on TS 7.)
- pnpm 10 blocks dependency build scripts by default, so installs log an "Ignored build scripts" warning (`esbuild`, `@google/genai`, `protobufjs`). Benign — build and type-check both pass. Use `pnpm approve-builds` only if a dependency's postinstall is actually required.
- **There is no test framework, ESLint, or Prettier configured.** `pnpm lint` runs `tsc --noEmit`; run it after changes to verify types. Match existing code style manually.
- **TypeScript 7** (`~7.0.2`, the native Go compiler) via the standard `typescript` package / `tsc` binary. `tsconfig.json` pins `"strict": false` on purpose — TS7 defaults `strict` to `true`, but this project has only ever enforced `strictNullChecks`. Enabling full strict mode is a deliberate, separate cleanup, not part of the compiler bump.

## Architecture

### Routing — centralized, code-based
All routes live in `src/App.tsx` using **TanStack Router** with a manually-assembled route tree (NOT file-based routing, despite the `src/pages/` folder). To add a page you must (1) create the page component and (2) register `createRoute(...)` and add it to the correct `addChildren([...])` in `App.tsx`. Route branches:

> **Page components are code-split with `React.lazy`.** In `App.tsx`, only `LandingPage` (the `/` entry) and the app shell are imported eagerly; every other page/layout is `lazy(() => import(...))`. Suspense boundaries with `<RouteFallback />` (`src/components/shared/RouteFallback.tsx`) sit at the root `Outlet` (full-screen) and inside each layout's `Outlet` (content-area). New pages should follow the same `lazy(...)` pattern to stay out of the initial bundle.

- `/` → `LandingPage`
- `/auth` → `AuthPage`
- `/app/*` → `AppLayout` wrapped in `ProtectedRoute` (main authenticated app)
- `/admin/*` → `AdminLayout` wrapped in `ProtectedRoute allowedRoles={["ADMIN"]}`
- `/activity/$activityId` → `ActivityPage` (protected, outside the app layout)

### State — three separate systems, do not mix them up
- **Server state:** TanStack Query (`src/lib/queryClient.ts`). Mutations/queries live near their feature (e.g. `src/pages/auth/useAuth.ts`).
- **Auth state:** TanStack Store in `src/stores/auth-store.ts` (note **plural** `stores/`). Tokens are mirrored into `localStorage`. Mutate only via `authActions`.
- **Theme state:** Legend State in `src/store/themeStore.ts` (note **singular** `store/`), persisted to `localStorage` key `lumiere-theme-pref`. Components consuming it use `observer(...)` from `@legendapp/state/react`.

> The `store/` (theme, Legend) vs `stores/` (auth, TanStack) split is a real footgun — check the import path.

### API layer
`src/lib/apiClient.ts` is the single axios instance. Key behaviors:
- Base URL from `VITE_API_URL` (defaults to `http://localhost:3000/api/v1`).
- Request interceptor injects `Authorization: Bearer <token>` from the auth store.
- **Response interceptor returns `response.data` directly** — callers receive the response body, not the axios wrapper. The API envelope is `ApiResponse<T> = { data, message? }` (`src/types/api.ts`).
- 401 handling: automatic token refresh via `/auth/refresh` with a queued-retry mechanism; on failure it logs out, toasts, and redirects to `/auth`.
- Errors are surfaced as `sonner` toasts, translated through **i18next** (`errors.*` keys).

### Auth flow
- `src/components/ProtectedRoute.tsx` gates routes: if a token exists but no user is loaded, it fetches `/auth/me` (`src/services/auth-service.ts`); supports `allowedRoles` role gating via `user.role?.name`.
- Email login/register/forgot-password and social login are TanStack Query mutations in `src/pages/auth/useAuth.ts`, with Zod schemas defined there.
- Social login (Google / Facebook / Apple) is in `src/pages/auth/SocialLoginButtons.tsx`.

### Mock login mode
Setting `VITE_MOCKING_LOGIN=true` bypasses real auth: `ProtectedRoute` injects a mock ADMIN user and `apiClient` short-circuits 401 refresh. Use this to work on protected/admin UI without a backend.

### UI & styling
- Primitives in `src/components/ui/` wrap **Radix UI**, styled with **class-variance-authority** + `cn()` (`src/lib/utils.ts`, clsx + tailwind-merge).
- **Tailwind CSS v4** via `@tailwindcss/vite` — there is no `tailwind.config`; theming is CSS-variable driven in `src/index.css` (e.g. `var(--primary)`, `var(--foreground)`, `var(--border)`, `var(--accent)`, `var(--background)`). Use these variables rather than hardcoding colors.
- Animations use `motion` (Framer Motion successor), icons use `lucide-react`.
- `themeStore` declares `aura | midnight | forest | lumiere`, but the CSS currently ships the Lumière theme only.

### Path alias
`@/*` maps to the project root in both `vite.config.ts` and `tsconfig.json`.

## Conventions & gotchas

- **Adding a route requires editing `src/App.tsx`** — the `src/pages/` directory is organizational only.
- The root directory contains many `fix_*.py` and `patch_*.py` scripts. These are one-off throwaway codegen/patch scripts from earlier AI Studio iterations — **not part of the app or build; do not rely on or extend them.**
- HMR/file-watching is toggled by the `DISABLE_HMR` env var (used by AI Studio to avoid flicker during agent edits). Leave the `vite.config.ts` server block alone unless intentionally changing this.
- `tsconfig.json` has `strictNullChecks` on but not full `strict`; `user` in the auth store is typed `any`.

## Environment variables (Vite `VITE_*`)

| Var | Purpose |
|-----|---------|
| `VITE_API_URL` | Backend base URL (default `http://localhost:3000/api/v1`) |
| `VITE_MOCKING_LOGIN` | `"true"` to enable mock auth (no backend needed) |
| `VITE_GOOGLE_CLIENT_ID` | Google OAuth client id |
| `VITE_FACEBOOK_APP_ID` | Facebook login app id |
| `VITE_APPLE_CLIENT_ID` / `VITE_APPLE_REDIRECT_URI` | Apple sign-in config |
| `VITE_COUCHDB_URL` / `VITE_COUCHDB_DB` | CouchDB base URL + activities database, for reading activity content directly (server ADR-0003) |
| `VITE_COUCHDB_USERNAME` / `VITE_COUCHDB_PASSWORD` | Shared read-only CouchDB credential (HTTP Basic); must match the server's `COUCHDB_READER_*` |
| `GEMINI_API_KEY` | Referenced by README for AI Studio features |

See `.env.example`. The API contract is documented in `docs/api-1.yaml`. `docs/AUTH_GET_STARTED.md` covers **backend** OAuth provider setup (Google/Apple client secrets, `.p8` keys, Firebase) — not the frontend `VITE_*` vars.
