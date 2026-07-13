# 03 — Server consumes the schema package

**Target repo:** `Netgang.Component.EllaAI.Server`.

**What to build:** The server stops owning a local copy of the activity-type contracts and instead depends on
the published package as its single source of truth — while keeping its authoritative role as validator and
seeder unchanged. From the outside nothing about the server's behavior changes: it still validates
server-originated writes, and the CouchDB seed still self-checks and upserts the same schemas; only the
schemas' *home* has moved.

**Blocked by:** 02 — Provision Azure Artifacts feed + first publish.

**Status:** done — squash-merged to `develop` (PR #87, merge commit `947ffc5`)

- [x] The server adds the feed to its package config (`.npmrc`, scoped `@le-cogito`) and pins the package
      (`0.1.0`); the authenticated `pnpm install` recorded `0.1.0` in `pnpm-lock.yaml` (committed).
- [x] Every import of the old local schema module is repointed to the package (validator service + spec,
      CouchDB seed service/doc/integration spec); the local `src/@lumiere/activities/schemas/**` copy is removed.
- [x] `SkillType` is re-exported from the package on the doc side (shrinking the Story 77 follow-up #1
      duplication).
- [x] `npm run build`, `npm test`, and the seed self-check pass (build clean; jest 31 passed / 3 skipped
      = CouchDB integration; validator + seed self-check green); no residual references remain.
- [x] ADR-0001/0002 and the Story 77 spec get a short "contract home moved to the contracts repo" note.

_Reference: spec §"Source-of-truth move + server migration"; ADR-0001, ADR-0002._

## Comments

**Implemented on branch `feat/consume-activity-schemas-package` (commit `9cd2340`, not pushed).** Verified
against the local contracts build (byte-identical to the published `0.1.0`): `nest build` compiles and the
pre-commit hook ran ESLint + jest (31 passed, 3 skipped = CouchDB integration).

**Lockfile — resolved** (commit `7eba038`): authenticated `pnpm install` recorded
`@le-cogito/lumiere-activity-schemas@0.1.0`; also dropped the deprecated `always-auth` from `.npmrc`.

**Remaining follow-up (out of ticket-03 code scope):** the server's image build runs `pnpm install`, so it
must authenticate to the `le-cogito` feed to pull the private package (npmAuthenticate / a build-time
token). Wire this into the server pipeline/Dockerfile before the branch merges/deploys.
