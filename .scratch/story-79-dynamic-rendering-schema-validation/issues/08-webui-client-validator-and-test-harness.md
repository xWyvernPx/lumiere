# 08 — WebUI: client activity validator + first test harness

**Target repo:** `Netgang.Component.Lumiere.WebUI`.

**What to build:** The shared foundation every activity interaction reuses — the WebUI can validate a payload
against an activity-type contract schema with instant, field-mapped, French-friendly errors, and the repo
gets its first automated-test harness. No learner-facing screen changes yet.

**Blocked by:** None — can start immediately (02/03/03b done).

**Status:** ready-for-agent

- [ ] The WebUI adds the `@le-cogito` scope to its npm config (Azure Artifacts feed registry, mirroring the
      server's `.npmrc`) and installs the **pinned** `@le-cogito/lumiere-activity-schemas` package plus `ajv`
      + `ajv-formats` as **runtime** dependencies (validation runs in the browser; version aligned with the
      server). `pnpm install` resolves them; `pnpm lint` (tsc) stays clean. Committed config stays feed-based
      so the homelab build is unaffected.
- [ ] A validator module wraps an `Ajv2020` instance (Draft 2020-12) + `ajv-formats`, compiles-once/caches by
      schema `$id`, and validates a payload against a given JSON Schema — returning **field-mapped**,
      French-friendly errors instead of throwing (UX first line, not a trust boundary; ADR-0001). Error
      mapping mirrors the server's ajv error mapper (instancePath → dotted field path; missing-required
      appended). It is reusable for both content (`dataFormat`) and response (`responseFormat`).
- [ ] A **vitest + `@testing-library/react` (jsdom)** harness is configured with a `test` script; `pnpm test`
      runs. This is the repo's first test framework and establishes the pattern.
- [ ] **Validator unit seam (seam 1) green:** a conforming `multiple_choice` `responseFormat` payload is
      accepted; a non-conforming one is rejected with a field-mapped error (asserted at the validator's public
      boundary, never its compile/cache internals); and a sample `multiple_choice` **content** fixture
      (mirroring the seeded CouchDB doc) conforms to its type's `dataFormat`.

_Reference: `webui-spec.md` §"Client validator", §"Testing Decisions" (seam 1). Prior art: server
`SchemaValidatorService` spec + `ajv-error.mapper`._
