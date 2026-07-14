# 05 — WebUI: `dictation` interaction

**Target repo:** `Netgang.Component.Lumiere.WebUI`.

**What to build:** A learner can open a `dictation` activity, listen to the required audio stimulus, type what
they hear, and have their transcript validated before submit — reusing the scaffolding built in ticket 09.

**Blocked by:** 09 — WebUI: render `multiple_choice` from CouchDB + retire the prototype (dynamic-render scaffolding).

**Status:** ready-for-agent

- [ ] A text-entry interaction renders over the required audio stimulus and produces a `{ transcript }` response.
- [ ] The dispatcher renders this interaction for `activityType.name === "dictation"`; on submit the response is
      validated against the type's `responseFormat`, blocking invalid input with a mapped message.
- [ ] Because grading is server-originated (and `gradingFormat` is DRAFT), a submitted dictation shows a
      "submitted — pending grading" state.
- [ ] A sample `dictation` activity content doc is seeded in CouchDB (and used as a test fixture).
- [ ] Tests cover the validator behavior for this response and the interaction rendering/submission.

_Reference: spec §"Dynamic renderer"; ADR-0002 (dictation = text-entry over required audio)._
