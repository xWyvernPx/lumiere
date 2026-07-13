# Spec — Dynamic Rendering & Schema Validation

> **Status:** ready-for-agent
> **Tracker:** Azure DevOps [le-cogito/NetGang #79](https://dev.azure.com/le-cogito/NetGang) — User Story 3.1
> **Scope repos:** `Netgang.Component.Lumiere.WebUI` (this story) + a new
> `Netgang.Component.Lumiere.Contracts` (schema package) it consumes; a follow-on migration in
> `Netgang.Component.EllaAI.Server`.
> **Depends on:** Story 77 (Activity Type Definition, #77) — the canonical contracts this story renders.
> Continues that story's `follow-ups.md` #4 (WebUI taxonomy alignment) and #1 (single `SkillType` home).
>
> Product/agent-level spec. It omits file paths and code so it does not go stale; the phased
> ticket breakdown lives under `issues/`.

## Problem Statement

As a learner, I open an activity in the Lumière web app and it renders — but only for the five bespoke
formats someone hand-built a React component for, using data shapes the web prototype invented on its own.
Those shapes do **not** match the platform's authoritative activity contracts (defined server-side in
Story 77: `multiple_choice`, `dictation`, `shadowing`, `free_writing`, each a QTI-style *interaction over an
optional stimulus*). Nothing on the web validates my answer before I submit it, so I get no instant
feedback when it's malformed, and the moment product adds a new activity type on the backend, the web app
can't show it at all — it needs another bespoke component and another invented data shape.

Underneath that, the platform has no shared, drift-proof way to get the one true contract to every surface.
The schemas live inside the backend app repo; the web app and the mobile app can't safely depend on them,
so each surface risks interpreting an activity's content, the student's response, and the grading outcome
differently — the exact divergence Story 77 set out to prevent, still unsolved on the client.

## Solution

Distribute the activity-type contract as **its own versioned artifact**, and make the web app **render any
activity type generically from that contract** and **validate the learner's response against it on the
client**.

- **Contract as a package.** The four canonical `ActivityTypeDefinition`s (each with its `dataFormat` =
  `{ stimulus?, item }`, `responseFormat`, and DRAFT `gradingFormat`) move out of the backend app into a
  dedicated repository that builds and **publishes a versioned npm package to an Azure Artifacts feed** via
  an Azure DevOps pipeline. The backend, the web app, and (later) the mobile app all consume it as a normal
  pinned dependency. Drift is prevented by npm versioning + lockfiles — no hand-maintained copy, no bespoke
  sync script.
- **Backend data, directly.** The web app loads activity **content from CouchDB** — the document store
  where activities live (ADR-0001), read directly by the client rather than through the NestJS server or
  from hand-authored front-end data. Each activity doc references its type by `{ name, version }`.
- **Dynamic rendering.** From that doc, the web app renders the **stimulus** generically by its `kind`
  (text / table / image / audio) and the **item**'s interaction by the activity type's `name`
  (choice / text-entry / spoken-response / extended-text), driven by the contract rather than a bespoke
  component per format. A new type authored on the backend renders on the web without new invented shapes.
- **Client validation.** Before a learner submits, the web app validates the assembled **response** against
  the type's `responseFormat` with `ajv`, giving instant, field-mapped feedback. This is a UX first line,
  not a trust boundary — the database backstop and the server remain authoritative (ADR-0001).

This CouchDB-backed path **replaces** the five bespoke prototype activities — one data-driven rendering
path fed by real backend content, not a parallel system beside hand-coded demo data.

## User Stories

1. As a learner, I want an activity to render from its authoritative contract, so that what I see matches
   exactly what the platform (and my teacher/grader) intends.
2. As a learner, I want the reading/listening material (the stimulus) shown appropriately whether it's a
   passage, a table, an image, or an audio clip, so that I can engage with any activity format.
3. As a learner doing a `multiple_choice` item, I want to pick one option and see the authored explanation,
   so that I understand why an answer is right or wrong.
4. As a learner doing a `dictation`, I want to listen to the audio and type what I hear, so that I can
   practise listening and transcription.
5. As a learner doing a `shadowing` item, I want to listen to a model utterance and submit my spoken
   response, so that I can practise pronunciation.
6. As a learner doing `free_writing`, I want to write prose with a live word count against the prompt's
   bounds, so that I know when my answer meets the length requirement.
7. As a learner, I want my answer validated before submission with a clear, human-readable message, so that
   I fix a malformed answer immediately instead of after a failed submit.
8. As a learner, I want a `multiple_choice` answer graded instantly on-device, so that I get feedback
   without waiting for the server.
9. As a learner, I want activities that need server/teacher grading to clearly say "submitted — pending
   grading", so that I understand why there's no immediate score.
10. As a learner, I want my activities loaded from the backend (CouchDB), so that I practise real authored
    content rather than hard-coded demo data.
11. As a frontend developer, I want one shared contract package to import, so that the web app validates the
    same shape the backend and mobile do.
12. As a frontend developer, I want a single dynamic renderer keyed off the contract, so that I don't write
    and maintain a bespoke component per activity format.
13. As a frontend developer, I want a generic stimulus renderer, so that any interaction can reuse the same
    passage/table/image/audio rendering.
14. As a frontend developer, I want a client-side validator that checks a response against its
    `responseFormat`, so that I can block invalid submissions with instant feedback.
15. As a frontend developer, I want validation errors mapped to readable (French-friendly) messages, so that
    the UI can show a learner what to fix.
16. As a frontend developer, I want activity docs read from CouchDB typed via the contract package, so that
    content and the schema it's validated against stay in agreement.
17. As a content author, I want to add a new activity type by authoring its contract, so that the web app
    can render it without a bespoke component per surface.
18. As a backend developer, I want the server to consume the shared schema package instead of owning a local
    copy, so that there is one source of truth for the contract.
19. As a backend developer, I want the server's validator and seed self-check to keep working against the
    imported package, so that server-originated writes and seeded schemas stay guaranteed-valid.
20. As a mobile developer, I want the same contract package the web app uses, so that the device validates
    and renders against an identical shape.
21. As a platform operator, I want the contract published as a versioned package by a pipeline, so that each
    change is a reviewed, deliberate release consumers opt into by bumping a pinned version.
22. As a platform operator, I want re-running the publish to be idempotent, so that a re-run doesn't fail or
    republish an existing version.
23. As a maintainer, I want the contract to live in its own repository with its own lifecycle, so that a
    schema change isn't coupled to the backend app's Docker/Helm release cadence.
24. As a maintainer, I want `SkillType` to have a single canonical home in the package, so that the
    doc-side/relational duplication flagged in Story 77 shrinks rather than grows.
25. As a maintainer, I want no hand-maintained schema copy on any client, so that drift is structurally
    impossible rather than policed by discipline.
26. As a security reviewer, I want client validation understood as a UX first line only, so that trust
    continues to be enforced at the database backstop and the server (ADR-0001), not the browser.
27. As a QA engineer, I want the dynamic renderer's behavior covered by automated tests, so that "renders
    the right interaction and blocks invalid submits" is protected against regressions.

## Implementation Decisions

**Contract distribution — dedicated repo + Azure Artifacts package (ready-made tooling).**
- The canonical contracts move into a new repository (`Netgang.Component.Lumiere.Contracts`, final
  name/scope team-confirmed) whose npm package (`@le-cogito/lumiere-activity-schemas`, scope team-confirmed)
  is published to an **Azure Artifacts** feed by a single-purpose **Azure DevOps** pipeline.
- Build with **tsup** (ESM + CJS + `.d.ts`). `ajv` is a **devDependency only** — the schema source uses a
  type-only `SchemaObject` import that erases at runtime, so consumers bring their own `ajv`; the package
  has no NestJS/CouchDB/Prisma dependency and ships only its build output.
- The pipeline authenticates with the **`NpmAuthenticate@0`** task and runs `npm publish` with a
  **publish-if-new guard** (skip when the committed version already exists on the feed). Version is bumped
  in-PR. Provisioning the ADO repo, creating the feed, granting publish rights, and the first publish are an
  operator/team action (not automatable from the current workspace).

**Source-of-truth move + server migration.**
- The schemas' authoritative home moves from the backend app into the contracts package. The server becomes
  a **consumer** of the package (pinned dependency) and drops its local copy; its imports repoint to the
  package.
- The server remains the authoritative **validator/seeder** — the `ajv` validation service and the
  seed-time self-check keep their behavior, now validating the imported package's schemas. `SkillType`'s
  canonical TS home becomes the package; the server's doc-side enum re-exports it (addresses Story 77
  follow-up #1).
- ADR-0001/0002 and the Story 77 spec get a "contract home moved to the contracts repo" note.

**Activity data source — CouchDB direct.**
- The web app reads activity **content** docs straight from CouchDB (via PouchDB or a thin HTTP client),
  URL/credentials from env (`VITE_COUCHDB_*`), relying on the CouchDB **CORS** provisioned in Story 77 — the
  NestJS server stays out of this read path (ADR-0001). A doc carries `activityType { name, version }` +
  `content { stimulus?, item }`. It does **not** read schema docs from CouchDB — the schema comes from the
  package (below).
- Activity **content must exist in CouchDB** — only the type schemas are seeded today, so a prerequisite seeds
  sample content (see Sequencing). Browser read access needs a credential/role (per-user databases remain out
  of scope — ADR-0001).

**WebUI rendering + validation.**
- The contract **package is the single validation + type artifact** for both server and web: it ships the JSON
  Schemas as data (`ACTIVITY_TYPE_DEFINITIONS`) *and* the TS types (`ActivityTypeDefinition` / `JsonSchema` /
  `SkillType` / `ActivityTypeRef`). The web app validates content + response with `ajv` against the package
  schema for the doc's `activityType { name, version }` — no schema fetch from CouchDB.
- **Version skew** is handled explicitly: if the pinned package lacks a content doc's `{ name, version }`, the
  UI shows an "unsupported activity version" state rather than mis-rendering. Pin the package consistently
  across server + web so both validate the same shapes.
- Validation uses an **`Ajv2020`** instance (Draft 2020-12) + `ajv-formats`, compile-once/cache-by-`$id`,
  mapping errors to readable French-friendly messages.

**Activity model (WebUI), per ADR-0002.**
- An activity doc is `{ activityType: { name, version }, content: { stimulus?, item } }` — a reference to its
  type (no embedded schema, no FK) plus content conforming to that type's `dataFormat`; types come from the
  package. Vocabulary is QTI-aligned: **stimulus / item / stem / interaction / response / outcome**.

**Dynamic renderer.**
- A **generic stimulus renderer** handles the four `kind`s (text / table / image / audio).
- One **interaction renderer per type**, keyed off `activityType.name`: choice (`multiple_choice` — options
  + authored `explanation`, produces `{ selectedOptionId }`), text-entry (`dictation` — `{ transcript }`),
  spoken-response (`shadowing` — `{ audioUrl, transcript? }`; recording UI deferred, start with an
  upload/URL that satisfies the schema), extended-text (`free_writing` — `{ text }`, live word count vs
  `minWords`/`maxWords`).
- A **dispatcher** composes stimulus + the correct interaction, and on submit validates the assembled
  response against `responseFormat`, blocking and surfacing mapped errors when invalid. `multiple_choice` is
  graded on-device by comparing `selectedOptionId` to the item's `correctOptionId` and can render a
  `gradingFormat`-shaped outcome; other types show a "submitted — pending grading" state because grading is
  server-originated and `gradingFormat` is DRAFT (ADR-0002).

**Replace the prototype.**
- The CouchDB-backed renderer becomes the single activity path. The activity screen — and the practicing
  list, which also reads `ACTIVITIES` — source from CouchDB; `src/data/activities.ts`, the five bespoke
  components, and the type `switch` are removed. No parallel system, no front-end demo data.

**Layered validation ownership (unchanged from ADR-0001).**
- Client `ajv` = instant UX, first line (this story). CouchDB `validate_doc_update` = database trust
  backstop. Server `ajv` = writes the server originates + seed self-check. The client layer is deliberately
  **not** a trust boundary.

**Sequencing.**
- (A) Contracts repo + publish [done]. → (B) Server consumes the package [done]. → (C) **Seed sample activity
  content into CouchDB + confirm browser read access** (Story-77 CORS + a read credential) — a new
  prerequisite for the WebUI. → (D, the WebUI ticket) read from CouchDB + render + validate, replacing the
  prototype. D is gated on the first publish [done] and on (C).

## Testing Decisions

A good test asserts **external behavior at the highest seam**, not implementation details, so it survives
refactors. Three seams, ordered by value:

1. **Client response-validator seam (unit; primary).** The web app's validator: a conforming `responseFormat`
   payload is accepted; a non-conforming one is rejected with a field-mapped error — asserted at the
   validator's public boundary, never against its compile/cache internals. The same seam asserts a
   **data-integrity** property: the sample activity content (test fixtures mirroring the seeded CouchDB docs)
   conforms to its type's `dataFormat`. Runnable without a browser. **Prior art:** the server's `SchemaValidatorService` spec from
   Story 77 (its Seam 1) — this is the client mirror of it.
2. **Contract schema-validity seam (unit; travels with the package).** In the contracts repo: every
   published `ActivityTypeDefinition` compiles as valid JSON Schema (`dataFormat` / `responseFormat` /
   `gradingFormat`). **Prior art:** Story 77's `activity-type-definitions.spec.ts` (its Seam 1a), relocated
   to live with the schemas so it ships with every publish.
3. **Dynamic-rendering seam (component; new test infrastructure).** The dispatcher, given a **mocked CouchDB
   activity doc** (the Couch read client stubbed), renders the correct interaction for `activityType.name`,
   renders the stimulus for its `kind`,
   **blocks an invalid submit** and surfaces the mapped error, accepts a valid submit, and shows offline
   correctness for `multiple_choice`. This introduces the WebUI's **first test framework** — **vitest +
   `@testing-library/react`** (with jsdom) — establishing the pattern for the repo. Assertions are on
   user-visible behavior (what renders, what's blocked, what message shows), not component internals.

The WebUI has no existing tests; seam 3 establishes the harness. Seams 1 and the server-side prior art keep
the validation contract honest on both sides.

## Out of Scope

- **Provisioning** the Azure Artifacts feed, creating the ADO repo, granting publish rights, and running the
  first publish — an operator/team action; this spec delivers the repo contents, pipeline YAML, and consumer
  config.
- **Full PouchDB ⇄ CouchDB offline replication and submission write-back** — this story reads activity content
  from CouchDB (the schema comes from the package), but full bidirectional offline sync and persisting the
  learner's response back to CouchDB (a submission doc) are later work. **Per-user databases / filtered
  replication** remain out (ADR-0001).
- **Submission / progress persistence** — the validated response is not written back (no submission doc or
  endpoint here); seeded content is read-only for rendering.
- **Finalizing the grading contract** — `gradingFormat` is DRAFT (ADR-0002); real AI/teacher grading is
  server-originated and lands later. The web app renders outcomes defensively and marks non-offline types
  "pending grading".
- **Audio recording UI for `shadowing`** — start with an upload/URL that satisfies `responseFormat`;
  in-browser recording is a follow-up.
- **Server behavior changes beyond consuming the package + seeding sample content** — the validator keeps its
  behavior; the WebUI reads CouchDB directly, not through new server endpoints.

## Further Notes

- **Why validate on the client if it isn't the trust boundary?** For instant UX and a first line of defense.
  The database `validate_doc_update` backstop and the server remain authoritative (ADR-0001); a tampered
  client cannot bypass those.
- **Drift is handled by the package manager**, not custom code: consumers pin a version; adopting a contract
  change is an explicit version bump reviewed like any dependency update.
- **Tracker:** ADO work item #79 is the product-level record; this local file is the agent-level detail —
  link both ways. The A/B prerequisite work (contracts repo + server migration) is tracked as its own
  tickets under `issues/`.
- **Team-confirm points:** final contracts repo name + package scope; the Azure Artifacts feed URL; the
  publish pipeline's branch/path filters (the existing server pipeline filters on `server/**` — confirm the
  checkout layout).
- **References:** Story 77 spec + `follow-ups.md` (#1 SkillType single home, #4 WebUI alignment — this
  story); ADR-0001 (Lumiere storage split); ADR-0002 (stimulus + item content model, QTI vocabulary, DRAFT
  grading).

## Comments
