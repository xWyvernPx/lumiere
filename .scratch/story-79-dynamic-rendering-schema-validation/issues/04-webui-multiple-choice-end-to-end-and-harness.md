# 04 — WebUI: render activities from CouchDB (replace the prototype)

**Target repo:** `Netgang.Component.Lumiere.WebUI`.

**What to build:** A learner opens an activity and the web app loads it **directly from CouchDB** (the
document store, per ADR-0001), renders it generically from its activity-type contract (stimulus +
interaction), and validates the response client-side before submit. This **replaces** the five bespoke
prototype activities with a single, data-driven path — no hand-authored front-end activity data, no parallel
"dynamic" system. First vertical slice: `multiple_choice` end to end, standing up the shared scaffolding
(Couch read client, validator, generic stimulus renderer, dispatcher, test harness).

**Blocked by:** 02 — feed + first publish (done); and **03b — seed sample activity content into CouchDB +
browser read access**.

**Status:** superseded

> **Superseded by** 08 (client validator + first test harness) + 09 (render `multiple_choice` from CouchDB +
> retire the prototype). This ticket bundled the shared scaffolding, the MC slice, the prototype removal, and
> the new test harness into one oversized unit; it was re-sliced (see `webui-spec.md`). The other-interaction
> tickets 05/06/07 now depend on 09, and the admin registry rewire is ticket 10. Do not implement this ticket
> directly — work 08 → 09 → {05, 06, 07} / 10.

- [ ] WebUI adds the `@le-cogito` feed to its `.npmrc` and installs the pinned package (the JSON Schemas +
      types — the shared validation artifact), plus `ajv` + `ajv-formats`.
- [ ] A CouchDB read client (PouchDB or HTTP) loads the activity **content** doc by id from CouchDB —
      URL/creds via env (`VITE_COUCHDB_*`); relies on the Story-77 CORS setup. Server stays out of the path
      (ADR-0001). It does **not** read schema docs from CouchDB.
- [ ] An `Ajv2020` validator compiling the **package schema** for the doc's `{ name, version }` (Draft 2020-12)
      + `ajv-formats`, compile-once/cache, returns readable French-friendly mapped errors; a doc whose
      `{ name, version }` isn't in the pinned package shows an "unsupported version" state.
- [ ] A generic stimulus renderer (text / table / image / audio) + a choice interaction (options with authored
      `explanation`); a dispatcher composes them keyed off `activityType.name`.
- [ ] On submit, the response validates against `responseFormat`; invalid is blocked with a mapped error, valid
      accepted, `multiple_choice` graded on-device vs `item.correctOptionId`.
- [ ] **Replace the prototype:** the activity screen (and the practicing list, which also reads `ACTIVITIES`)
      source from CouchDB; remove `src/data/activities.ts`, the five bespoke components, and the type `switch`.
- [ ] **vitest + @testing-library/react** (jsdom) harness: validator tests + render tests against a mocked
      Couch activity doc (correct interaction renders; invalid submit blocked; valid accepted; MC correctness).

_Reference: spec §"Activity data source — CouchDB direct", §"WebUI rendering + validation", §"Testing Decisions"._
