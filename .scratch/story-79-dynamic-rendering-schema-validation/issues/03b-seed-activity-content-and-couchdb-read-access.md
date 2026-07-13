# 03b — Seed sample activity content into CouchDB + browser read access

**Target:** `Netgang.Component.EllaAI.Server` (CouchDB seed) + platform/infra (CouchDB read access/auth).

**What to build:** The prerequisite that gives the WebUI real activity data to render. Sample activity
**content** documents exist in CouchDB (only the four activity-*type* schemas are seeded today), and a
browser can **read** activity content docs from CouchDB directly (per ADR-0001 the server stays out of the
learner path; the schema comes from the npm package, not CouchDB). Without this, ticket 04 has nothing to load.

**Blocked by:** None — CouchDB + its CORS were provisioned in Story 77.

**Blocks:** 04 (WebUI renders from CouchDB).

**Status:** done — implemented in `Netgang.Component.EllaAI.Server` (seed + provisioning) + WebUI env config.

- [x] A CouchDB seed adds sample **activity content** docs — one per type (`multiple_choice`, `dictation`,
      `shadowing`, `free_writing`) — each `{ activityType: { name, version }, content: { stimulus?, item } }`
      conforming to its type's `dataFormat`. Idempotent, mirroring the existing activity-type seed.
- [x] The seed self-checks each content doc against its type's `dataFormat` before writing (reuse the
      server's `ajv` validator).
- [x] Browser **read access** works: a shared read-only user reads activity **content** docs from CouchDB
      (CORS from Story 77 already allows the origin). Schema docs are not read by the WebUI (it uses the package).
- [x] The **auth model** for browser→CouchDB reads is decided and documented (ADR-0003), and the WebUI env
      config is defined (`VITE_COUCHDB_URL` / `VITE_COUCHDB_DB` / `VITE_COUCHDB_USERNAME` / `VITE_COUCHDB_PASSWORD`).

**Auth decision (2026-07-13):** a **shared read-only CouchDB member user** on the `lumiere-activities`
database — the minimal option, matching ADR-0001 (no per-user DBs). The server provisions the reader user +
locks the DB `_security` idempotently in `CouchdbService.onModuleInit` (no manual infra step). Recorded in
server `docs/adr/0003-couchdb-browser-read-auth.md`. The per-user **submission** read-isolation concern
(safe today only because the DB holds shared content) is captured as a follow-up (`../follow-ups.md` #1) —
it gates the future submission-write-back story, not this one.

_Reference: spec §"Activity data source — CouchDB direct", §"Sequencing" (C); ADR-0001, ADR-0003._

## Comments

**Implemented (server, `EllaAI.Server`):**
- Seed: `src/database/seeds/couchdb/activity-content/` — `sample-content.ts` (one French sample per type),
  `activity-content.document.ts` (persistence shape, `type: 'activity'`, `activity:<name>:sample` ids),
  self-checking `activity-content-seed.service.ts`; wired into `seed.module.ts` + `run-seed.ts` (runs after
  the type seed). `poststart:context` already runs `seed:run:couchdb`, so `npm run start:context` seeds it.
- Read auth: `CouchdbService` gained idempotent `ensureReaderUser()` + `ensureActivitiesDbSecurity()`;
  config gained `COUCHDB_READER_USERNAME` / `COUCHDB_READER_PASSWORD` (dev defaults; prod must override —
  warns on default).
- Tests: `sample-content.spec.ts` (unit, data-integrity — every sample conforms to its `dataFormat`, runs in
  default `npm test`); `activity-content-seed.integration.spec.ts` (gated behind `RUN_COUCHDB_IT`,
  `npm run test:couchdb` broadened to run both integration specs).
- Verified: `npm run build`, `npm run lint`, `npm test` all clean (36 passed, integration suites skipped
  without a live CouchDB).

**WebUI:** `.env.example` + `CLAUDE.md` document `VITE_COUCHDB_*` (matching the server's `COUCHDB_READER_*`).
This unblocks ticket 04.
