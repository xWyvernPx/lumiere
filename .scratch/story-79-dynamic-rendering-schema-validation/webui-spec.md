# Spec — WebUI: dynamic activity rendering + client validation from CouchDB

> **Status:** ready-for-agent
> **Tracker:** Azure DevOps [le-cogito/NetGang #79](https://dev.azure.com/le-cogito/NetGang) — User Story 3.1
> **Repo:** `Netgang.Component.Lumiere.WebUI`
> **Parent:** the product-level story spec is `./spec.md`; this is the WebUI-implementation-focused spec.
> **Supersedes:** issue `04-webui-multiple-choice-end-to-end-and-harness.md` — that single oversized ticket
> is replaced by the finer vertical slices broken out from this spec (see `issues/`).
> **Depends on:** 02 (feed + first publish) [done]; 03 (server consumes package) [done]; 03b (seed sample
> content + browser read access, ADR-0003) [done].
> **Respects:** ADR-0001 (Lumiere storage split — activity engine in CouchDB, server out of the learner
> read path), ADR-0002 (stimulus + item content model, QTI vocabulary, DRAFT grading), ADR-0003 (shared
> read-only CouchDB reader for browser reads).

## Problem Statement

As a learner, I open an activity in the Lumière web app and it renders — but only for the five bespoke
formats someone hand-built a React component for, using data shapes the web prototype invented on its own.
Those shapes don't match the platform's authoritative activity-type contracts. Nothing on the web validates
my answer before I submit it, so I get no instant feedback when it's malformed. And the moment product adds
or changes an activity type on the backend, the web app can't show it — it needs yet another bespoke
component and another invented shape.

The authoritative contracts now ship as a versioned package (`@le-cogito/lumiere-activity-schemas`,
`ACTIVITY_TYPE_DEFINITIONS`) and real sample **activity content** is seeded into CouchDB (one `activity:*`
doc per type), readable by the browser via a shared read-only reader. The WebUI has not yet been switched
over: it still reads hand-authored front-end data and renders via a per-type `switch`, and it has no test
framework at all.

## Solution

Replace the five bespoke prototype activities with a **single data-driven rendering path**. The web app
loads an activity's **content** directly from CouchDB (never through the NestJS server — ADR-0001), renders
it generically from its activity-type contract (a generic **stimulus** renderer keyed off the stimulus
`kind`, plus an **interaction** keyed off the activity type's `name`), and validates the learner's
**response** against the type's `responseFormat` on the client before submit — instant, field-mapped,
French-friendly feedback. The contract (JSON Schemas + types) comes from the pinned package, not from
CouchDB.

The effort migrates the **whole activity engine** — all four seeded contract types (`multiple_choice`,
`dictation`, `shadowing`, `free_writing`) render from CouchDB, leaving **no hand-authored activity data**
in the WebUI. It is sequenced so the shared scaffolding lands first: a first vertical slice —
**`multiple_choice` end to end** — stands up everything the other interactions reuse (Couch read client,
response/content validator, generic stimulus renderer, dispatcher) and introduces the repo's **first
automated-test harness**, and in the same slice the CouchDB-backed path becomes the **only** activity path
(the hand-authored data, the five bespoke components, and the type `switch` are removed, and the practicing
list also sources from CouchDB). `multiple_choice` is graded **on-device** (compare the selected option to
the item's `correctOptionId`) and shows the authored `explanation`; the other three types are recognised by
the dispatcher and render a clearly-marked "not yet supported" placeholder **only until their own tickets
(05/06/07) land** — those are part of this effort, not deferred out of it.

Separately (and with no new backend), the admin **Activity-Type Registry** is rewired to list the real
`ACTIVITY_TYPE_DEFINITIONS` from the pinned package instead of its hardcoded mock, so the last piece of
mock *activity-type* data on the admin surface is also removed.

Client validation is explicitly a **UX first line, not a trust boundary** — the CouchDB
`validate_doc_update` backstop and the server remain authoritative (ADR-0001).

## User Stories

1. As a learner, I want an activity to render from its authoritative contract, so that what I see matches
   exactly what the platform and my teacher/grader intend.
2. As a learner, I want my activities loaded from real backend content (CouchDB), so that I practise
   authored material rather than hard-coded demo data.
3. As a learner doing a `multiple_choice` item, I want to read the stimulus (a passage/table/image/audio)
   and the stem, so that I have the context to answer.
4. As a learner doing a `multiple_choice` item, I want to pick exactly one option, so that I can submit my
   answer.
5. As a learner, I want my answer validated before it's submitted, with a clear human-readable message, so
   that I fix a malformed answer immediately instead of after a failed submit.
6. As a learner, I want validation messages in French-friendly language mapped to the field at fault, so
   that I understand what to correct.
7. As a learner doing `multiple_choice`, I want my answer graded instantly on-device, so that I get
   feedback without waiting for the server.
8. As a learner, I want to see whether I was right or wrong and the authored explanation for the option I
   chose, so that I learn from the outcome.
9. As a learner opening an activity whose type/version the app doesn't understand, I want a clear
   "unsupported activity version" state, so that I'm not shown a broken or mis-rendered activity.
10. As a learner opening an activity that doesn't exist or can't be loaded, I want a clear not-found / error
    state, so that I understand what happened.
11. As a learner browsing the practicing area, I want the activity list to reflect the real activities that
    exist in the backend, so that every card I see is something I can actually open.
12. As a learner on a slow connection, I want a loading state while the activity is fetched, so that the
    screen isn't blank or janky.
13. As a learner doing a not-yet-supported type (`dictation`/`shadowing`/`free_writing`), I want the app to
    say so plainly rather than fail, so that I'm not confused by a broken screen.
14. As a frontend developer, I want one shared contract package to import for both schemas and types, so
    that the web app validates and types against the same shapes as the server and mobile.
15. As a frontend developer, I want a single dynamic renderer keyed off the contract, so that I don't write
    and maintain a bespoke component per activity format.
16. As a frontend developer, I want a generic stimulus renderer for the four `kind`s, so that any
    interaction can reuse the same passage/table/image/audio rendering.
17. As a frontend developer, I want a client-side validator that checks a payload against a JSON Schema and
    returns field-mapped errors, so that I can block invalid submissions with instant feedback and reuse it
    for both content and response.
18. As a frontend developer, I want the CouchDB read isolated behind a small client, so that the rest of
    the app doesn't know or care how activity content is fetched, and the server stays out of the path.
19. As a frontend developer, I want activity content typed via the contract package, so that content and
    the schema it's validated against stay in agreement.
20. As a content author, I want a new activity type to render on the web just by authoring its contract and
    content, so that no bespoke web component is needed per surface.
21. As a maintainer, I want no hand-authored front-end activity data or per-type `switch` left behind, so
    that there is no parallel system to drift from the contract.
22. As a QA engineer, I want the validator's accept/reject behaviour covered by unit tests, so that the
    validation contract is protected against regressions.
23. As a QA engineer, I want the dynamic renderer's user-visible behaviour covered by component tests, so
    that "renders the right interaction, blocks invalid submits, grades MC" can't silently regress.
24. As a QA engineer, I want the repo to have a real test harness, so that future WebUI work has a place and
    a pattern to add tests.
25. As a security reviewer, I want client validation understood as a UX first line only, so that trust
    stays enforced at the CouchDB backstop and the server (ADR-0001), not in the browser.
26. As a platform operator, I want the WebUI to depend on the contract as a pinned package from the Azure
    Artifacts feed, so that a contract change is an explicit, reviewed version bump — matching the server.
27. As a developer, I want to verify the whole path locally before it deploys to the homelab, so that I
    catch breakage before ArgoCD ships it.

## Implementation Decisions

**Contract as a pinned dependency.** The WebUI consumes `@le-cogito/lumiere-activity-schemas` at a pinned
version from the Azure Artifacts feed (the `@le-cogito` scope is added to the project's npm config, mirroring
the server). It imports the schemas-as-data (`ACTIVITY_TYPE_DEFINITIONS` / per-type definitions) and the
types (`ActivityTypeDefinition` / `ActivityTypeRef` / `JsonSchema` / `SkillType`). It does **not** read
schema documents from CouchDB. `ajv` + `ajv-formats` are added as runtime dependencies (validation runs in
the browser); the version is aligned with the server's.

**CouchDB read client.** A thin, dedicated client reads activity **content** docs directly from CouchDB over
HTTP, authenticated with the shared read-only reader credential (HTTP Basic), with connection details from
Vite env (`VITE_COUCHDB_URL` / `VITE_COUCHDB_DB` / `VITE_COUCHDB_USERNAME` / `VITE_COUCHDB_PASSWORD`). It is
**separate from the existing axios API client** (which carries the NestJS response envelope + JWT); the
Couch path has no envelope and no JWT (ADR-0001). It exposes fetching a single content doc by id and listing
the content docs (for the practicing list). Read failures map to distinct states: not-found, auth failure,
and generic/connection error. Server-side per-user read isolation is out of scope and already tracked
(follow-up #1); today the database holds shared content only.

**Activity content model.** A content doc is `{ activityType: { name, version }, content: { stimulus?, item } }`
plus CouchDB metadata, discriminated as `activity` content (ADR-0002). The WebUI resolves the matching
`ActivityTypeDefinition` from the pinned package by the `{ name, version }` pair; a doc whose pair is absent
from the pinned package yields the **unsupported activity version** state rather than a mis-render (version
skew handled explicitly). Vocabulary stays QTI-aligned: stimulus / item / stem / interaction / response /
outcome.

**Client validator.** A single validator module wraps an `Ajv2020` instance (Draft 2020-12) plus
`ajv-formats`, compiling each schema once and caching it (keyed by the schema's `$id`), and returns
field-mapped, French-friendly errors rather than throwing — it is a UX aid, not a control-flow exception.
The same module validates activity **content** against `dataFormat` (defensive, on load) and the assembled
**response** against `responseFormat` (on submit). Its error-mapping mirrors the server's ajv error mapper
(instancePath → dotted field path, missing-required appended). This is the client mirror of the server's
`SchemaValidatorService`.

**Dynamic renderer.** A **generic stimulus renderer** handles the four `kind`s (text passage, table,
image, audio). An **interaction** is chosen by the activity type's `name`; `multiple_choice` renders a
single-choice control over the item's options and produces `{ selectedOptionId }`. A **dispatcher** composes
the stimulus with the correct interaction inside the existing activity chrome, and on submit validates the
assembled response against `responseFormat` — blocking with the mapped error when invalid. `multiple_choice`
is graded on-device by comparing `selectedOptionId` to the item's `correctOptionId`, rendering a
`gradingFormat`-shaped outcome (correct/incorrect + the selected option's authored `explanation`). The
dispatcher is structured as a registry so a new interaction is an added entry, not a new branch of a
`switch`; the other seeded types render a plainly-marked "not yet supported" placeholder for now (their
tickets are 05–07). Non-`multiple_choice` types, once built, will show "submitted — pending grading" because
grading is server-originated and `gradingFormat` is DRAFT (ADR-0002).

**Server-state + routing conventions.** Activity loads use the project's existing TanStack Query
server-state layer (not a client store, not the axios interceptor path). The existing centralized,
code-based routing and `React.lazy` page-splitting conventions are preserved; the activity route continues
to take the activity id as a path param (the CouchDB doc id, which contains colons — confirm it round-trips
through the router's param encode/decode). The existing activity layout/chrome (header, panes, tabs) is
reused for the rendered activity.

**Replace the prototype.** The hand-authored front-end activity data, the five bespoke activity components,
and the per-type `switch` are removed. The activity screen and the practicing list both source from
CouchDB; the practicing list groups the fetched activities by the definition's `skillType` into the existing
skill tabs and links each card to its activity by doc id. No parallel system and no front-end demo data
remain.

**Local-first verification (before homelab).** The path is proven locally before it is pushed: the contract
package is installed at its pinned version from the feed (developer configures feed auth locally, same as
CI); a local CouchDB is stood up and seeded via the server's context/seed tooling; the WebUI env points at
that local CouchDB; and the developer drives `multiple_choice` in the browser. The committed npm config and
pinned version stay feed-based so the homelab build is unaffected.

## Testing Decisions

A good test asserts **external behaviour at the highest seam**, not implementation details, so it survives
refactors. Two seams, ordered by value:

1. **Client validator seam (unit; primary).** Assert the validator module's public boundary: a conforming
   `responseFormat` payload is accepted; a non-conforming one is rejected with a **field-mapped** error —
   asserted at the public API, never against its compile/cache internals. The same seam asserts a
   **data-integrity** property: the sample `multiple_choice` content fixture (mirroring the seeded CouchDB
   doc) conforms to its type's `dataFormat`. Runs without a browser. **Prior art:** the server's
   `SchemaValidatorService` spec (its Seam 1) — this is the client mirror.
2. **Dynamic-rendering seam (component; new harness).** Given a **mocked CouchDB activity doc** (the Couch
   read client stubbed), the dispatcher renders the correct interaction for `activityType.name`, renders the
   stimulus for its `kind`, **blocks an invalid submit** and surfaces the mapped error, **accepts a valid
   submit**, and shows **offline correctness** for `multiple_choice` (correct vs incorrect pick). This
   introduces the WebUI's **first test framework — vitest + `@testing-library/react` (jsdom)** — and
   establishes the repo's testing pattern. Assertions are on user-visible behaviour (what renders, what's
   blocked, which message and outcome show), not on component internals.

The WebUI has no existing tests; seam 2 stands up the harness. Seam 1 keeps the client validation contract
honest against the same schemas the server validates.

## Out of Scope

- **Library page mock cards** and **decorative practicing cards** — hand-written UI filler with no backend
  or CouchDB source in the platform today (a module/course library API doesn't exist). De-mocking them needs
  new backend work — a separate story.
- **Audio-recording UI for `shadowing`** — the interaction ships with an upload/URL affordance that
  satisfies the schema; in-browser recording is deferred to its own ticket (06 notes this).
- **Submission / progress persistence** — the validated response is not written back (no submission doc or
  endpoint); seeded content is read-only for rendering.
- **Full PouchDB ⇄ CouchDB offline replication and write-back**, and **per-user databases / filtered
  replication** (ADR-0001).
- **Finalising the grading contract** — `gradingFormat` is DRAFT (ADR-0002); real AI/teacher grading is
  server-originated and lands later.
- **Server changes** — the server already consumes the package and seeds content; nothing here changes it.
- **Provisioning the Azure Artifacts feed / feed auth mechanics** — an operator/developer concern; this
  work only adds the pinned dependency + scope config.

## Further Notes

- **Why validate on the client if it isn't the trust boundary?** Instant UX and a first line of defence.
  The CouchDB `validate_doc_update` backstop and the server remain authoritative (ADR-0001); a tampered
  client cannot bypass those.
- **Drift is handled by the package manager** — the WebUI pins a version; adopting a contract change is an
  explicit, reviewed version bump, kept consistent with the server.
- **Route id shape:** activity doc ids look like `activity:<name>:sample` (colons); confirm they survive the
  router's param encode/decode as a single path segment.
- **References:** `./spec.md` (product-level story spec); `./follow-ups.md` (#1 per-user read isolation,
  #2 reader-password default, #3 provisioning-as-job); server ADR-0001/0002/0003.

## Comments
