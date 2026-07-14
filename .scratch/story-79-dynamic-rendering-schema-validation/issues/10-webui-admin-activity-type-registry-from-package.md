# 10 — WebUI: admin Activity-Type Registry from the contract package

**Target repo:** `Netgang.Component.Lumiere.WebUI`.

**What to build:** An admin opens the Activity-Type Registry and sees the **real** activity-type contracts
from the pinned package — the authoritative types, versions, skill types, and their
`dataFormat`/`responseFormat`/`gradingFormat` schemas — instead of the current hardcoded mock. No backend
needed: the registry is meant to display the contracts, which the package already ships as data.

**Blocked by:** 08 — needs the pinned `@le-cogito/lumiere-activity-schemas` package installed. (Independent of
09; can run in parallel.)

**Status:** ready-for-agent

- [ ] The registry lists the real `ACTIVITY_TYPE_DEFINITIONS` from the package (name, version, `skillType`,
      `description`) rather than the hardcoded `ACTIVITY_TYPES` mock.
- [ ] Each entry shows its `dataFormat` and `responseFormat` schemas (and the DRAFT `gradingFormat`, marked as
      draft) from the definition, formatted readably.
- [ ] The hardcoded mock activity-type list is removed; no invented schema strings remain on this page.
- [ ] `pnpm lint` clean; a component test (reusing the seam-2 harness) asserts the registry renders one entry
      per definition.

_Reference: `webui-spec.md` §"Contract as a pinned dependency"; the package's `ACTIVITY_TYPE_DEFINITIONS`._
