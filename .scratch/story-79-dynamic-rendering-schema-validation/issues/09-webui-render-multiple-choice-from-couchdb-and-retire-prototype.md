# 09 — WebUI: render `multiple_choice` from CouchDB + retire the prototype

**Target repo:** `Netgang.Component.Lumiere.WebUI`.

**What to build:** A learner opens an activity and the web app loads it **directly from CouchDB**, renders it
generically (stimulus + interaction) from its activity-type contract, validates the response before submit,
and grades `multiple_choice` on-device. This is the CouchDB switchover: the hand-authored prototype activity
data, its five bespoke components, and the type `switch` are **removed**, and the practicing list sources from
CouchDB. `multiple_choice` works end to end; `dictation`/`shadowing`/`free_writing` are recognised but render
a clearly-marked "not yet supported" placeholder until 05/06/07. Stands up the scaffolding those tickets
reuse (Couch read client, generic stimulus renderer, dispatcher).

**Blocked by:** 08 — client validator + test harness.

**Status:** ready-for-agent

- [ ] A dedicated CouchDB read client loads an activity **content** doc by id over HTTP with the shared
      read-only reader credential (HTTP Basic; env `VITE_COUCHDB_*`), **separate** from the axios API client
      (server stays out of the path, ADR-0001). It does **not** read schema docs from CouchDB. It also lists
      the `activity:*` content docs for the practicing list.
- [ ] The content doc `{ activityType: { name, version }, content: { stimulus?, item } }` resolves its
      `ActivityTypeDefinition` from the **pinned package**; an unknown `{ name, version }` shows an
      **"unsupported activity version"** state; not-found / loading / error states are handled.
- [ ] A **generic stimulus renderer** handles the four `kind`s (text / table / image / audio). A **dispatcher**
      composes the stimulus + the interaction keyed off `activityType.name` inside the existing activity chrome
      (`ActivityLayout`), structured as a **registry** so a new interaction is an added entry, not a `switch`
      branch.
- [ ] The `multiple_choice` (choice) interaction renders options with authored `explanation` and produces
      `{ selectedOptionId }`; on submit the assembled response validates against `responseFormat` (invalid
      **blocked** with a mapped message, valid accepted) and is graded **on-device** vs `item.correctOptionId`,
      rendering a `gradingFormat`-shaped outcome (correct/incorrect + explanation).
- [ ] `dictation`/`shadowing`/`free_writing` render a plainly-marked "not yet supported" placeholder (their
      real interactions are 05/06/07).
- [ ] **Prototype retired:** `src/data/activities.ts`, the five bespoke components, the old activity types, and
      the type `switch` are removed; the activity screen **and** the practicing list both source from CouchDB
      (practicing groups by the definition's `skillType`, links each card by doc id). No hand-authored
      front-end activity data remains. Confirm the activity route id (colon-bearing doc id) round-trips through
      the router.
- [ ] **Dynamic-rendering seam (seam 2) green:** given a mocked CouchDB `multiple_choice` doc (read client
      stubbed), the dispatcher renders the interaction + stimulus, blocks an invalid submit with the mapped
      error, accepts a valid submit, and shows offline correctness (correct vs incorrect pick).

_Reference: `webui-spec.md` §"CouchDB read client", §"Dynamic renderer", §"Replace the prototype",
§"Testing Decisions" (seam 2); ADR-0001/0002/0003._
