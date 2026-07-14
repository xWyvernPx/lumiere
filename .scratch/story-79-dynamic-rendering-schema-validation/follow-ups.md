# Story-79 — deferred follow-ups

Captured so they aren't lost. Not yet tickets.

## 1. Per-user submission read isolation (before submission write-back lands)

Ticket 03b chose a **shared read-only CouchDB user** for browser reads of the `lumiere-activities`
database (server `docs/adr/0003-couchdb-browser-read-auth.md`). That is safe **only because the database
currently holds shared, non-sensitive content** — activity types + activity content, identical for every
learner.

Story-79 does **not** write learner submissions back (explicitly out of scope). But once submission
write-back is built, submissions would land in a CouchDB the shared reader can read — so **one learner could
read every learner's submissions**. Before that work starts, decide the read-isolation model:

- submissions in a **separate database** with its own `_security` (not readable by the shared reader), or
- a per-user mechanism (per-user database / filtered replication — currently out of scope per ADR-0001), or
- another approach settled at that time.

Then revisit ADR-0003. This blocks nothing in story-79; it is a gate on the future submission-persistence
story.

## 2. Bootstrap i18next (init + translation resources)

The WebUI imports i18next but never `init()`s it and ships **no resource files**, so all `i18n.t()` /
`i18n.exists()` calls fall back — apiClient's `errors.*` and the ticket-08 validator's `errors.validation.*`
both currently render hardcoded fallback strings (French for the validator).

Wire it as its own task: `i18n.use(initReactI18next).init({ resources, lng: 'fr', fallbackLng })` imported once
in `main.tsx`, plus `src/i18n/{fr,en}.json` housing the keys — the existing `errors.*` (accessDenied,
errorTitle, notFound, …) and the new `errors.validation.*` (required, type, minLength, minItems,
additionalProperties, format, invalidSchema, …). Until then the fallbacks keep the UI working. Not gating
story-79.
