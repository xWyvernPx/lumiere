# 07 — WebUI: `free_writing` interaction

**Target repo:** `Netgang.Component.Lumiere.WebUI`.

**What to build:** A learner can open a `free_writing` activity, write prose in response to the prompt (over an
optional text/image stimulus) with a live word count against the item's bounds, and have their answer validated
before submit — reusing the ticket-04 scaffolding.

**Blocked by:** 04 — WebUI: `multiple_choice` end-to-end + dynamic-render harness.

**Status:** ready-for-agent

- [ ] An extended-text interaction renders over the optional stimulus, shows a **live word count against
      `minWords`/`maxWords`**, and produces a `{ text }` response.
- [ ] The dispatcher renders this interaction for `activityType.name === "free_writing"`; on submit the response
      is validated against `responseFormat`, blocking invalid input with a mapped message.
- [ ] A submitted free-writing shows a "submitted — pending grading" state (qualitative grading is
      server-originated, DRAFT).
- [ ] A sample `free_writing` activity content doc is seeded in CouchDB (and used as a test fixture).
- [ ] Tests cover the validator behavior for this response and the interaction rendering/submission.

_Reference: spec §"Dynamic renderer"; ADR-0002 (free_writing = extended-text interaction)._
