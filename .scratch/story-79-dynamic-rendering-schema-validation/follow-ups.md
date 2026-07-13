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
