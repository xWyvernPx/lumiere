# 01 — Contracts repo: publishable, tested schema package + publish pipeline

**Target repo:** new `Netgang.Component.Lumiere.Contracts` (final name/scope team-confirmed).

**What to build:** A standalone repository that turns the canonical activity-type contracts into a
versioned, installable artifact. A developer on any surface can add one pinned npm dependency
(`@le-cogito/lumiere-activity-schemas`, scope team-confirmed) and import
`ACTIVITY_TYPE_DEFINITIONS` / `ActivityTypeDefinition` / `SkillType` — the same four QTI-style types
(`multiple_choice`, `dictation`, `shadowing`, `free_writing`) the server authored in Story 77, each with its
`dataFormat` (`{ stimulus?, item }`), `responseFormat`, and DRAFT `gradingFormat`. The package proves its own
contracts are valid JSON Schema, and a single-purpose Azure DevOps pipeline publishes it to the Azure
Artifacts feed on a version bump.

**Blocked by:** None — can start immediately.

**Status:** done

- [x] The schema source is seeded **byte-faithfully** from the server's current
      `src/@lumiere/activities/schemas/**` (four `*.schema.ts`, shared stimulus + common, definition type,
      barrel), and `SkillType` gets its canonical home in this package.
- [x] The package builds with **tsup** to ESM + CJS + `.d.ts`; `ajv` is a **devDependency only** (the
      `SchemaObject` import is type-only and erases at runtime); no NestJS/CouchDB/Prisma dependency.
- [x] A unit test compiles every definition's `dataFormat`/`responseFormat`/`gradingFormat` and fails if any
      is not valid JSON Schema (relocated from Story 77's `activity-type-definitions.spec.ts`).
- [x] `npm pack --dry-run` ships only build output (`dist`), nothing else.
- [x] A publish pipeline authenticates with **`NpmAuthenticate@0`** and runs `npm publish` with a
      **publish-if-new guard** (skip when the committed version already exists on the feed), triggered on
      changes to the package; version bumped in-PR.
- [x] A `.npmrc` targets the feed for the package scope; a `README` documents the feed URL placeholder and the
      operator's one-time provisioning steps.

_Reference: spec §"Contract distribution", §"Testing Decisions" seam 2; Story 77 follow-up #1 (SkillType home)._

## Comments

**Resolved.** Implemented as the new sibling repo `Netgang.Component.Lumiere.Contracts` (committed
locally on `main`, `feat: extract activity-type schema contracts into publishable package`). Verified:
`pnpm build` → ESM+CJS+dts; `pnpm test` → 34 schema-validity tests pass; `tsc --noEmit` clean;
`npm pack --dry-run` ships only `dist` (+ README/package.json). Byte-faithfulness confirmed by diff
against the server originals (only the `SkillType` import path differs per file). Intentional deviation:
`JsonSchema` decoupled from ajv's `SchemaObject` to a structural type so the published `.d.ts` carries no
ajv dependency. **Not pushed** — the ADO repo + feed are provisioned in ticket 02 (operator).
