# 06 — WebUI: `shadowing` interaction

**Target repo:** `Netgang.Component.Lumiere.WebUI`.

**What to build:** A learner can open a `shadowing` activity, listen to the model utterance (required audio
stimulus), and submit their spoken response, validated before submit — reusing the ticket-09 scaffolding.

**Blocked by:** 09 — WebUI: render `multiple_choice` from CouchDB + retire the prototype (dynamic-render scaffolding).

**Status:** ready-for-agent

- [ ] A spoken-response interaction renders over the required audio stimulus and produces an
      `{ audioUrl, transcript? }` response via an upload/URL affordance that satisfies the schema (in-browser
      recording is out of scope — see spec).
- [ ] The dispatcher renders this interaction for `activityType.name === "shadowing"`; on submit the response is
      validated against `responseFormat`, blocking invalid input with a mapped message.
- [ ] A submitted shadowing shows a "submitted — pending grading" state (server-originated grading, DRAFT).
- [ ] A sample `shadowing` activity content doc is seeded in CouchDB (and used as a test fixture).
- [ ] Tests cover the validator behavior for this response and the interaction rendering/submission.

_Reference: spec §"Dynamic renderer", §"Out of Scope" (audio recording UI); ADR-0002 (shadowing = spoken response over required audio)._
