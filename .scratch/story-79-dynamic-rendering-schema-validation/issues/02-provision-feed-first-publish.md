# 02 — Provision Azure Artifacts feed + first publish

**Target:** operator / platform (Azure DevOps `le-cogito/NetGang`) — human action, not agent-grabbable.

**What to build:** The published artifact actually exists on the feed, so downstream repos can install it.
This is the **block-on-feed gate**: the server migration (03) and the WebUI work (04) cannot begin until a
first version of the schema package is resolvable from the Azure Artifacts feed.

**Blocked by:** 01 — Contracts repo: publishable, tested schema package + publish pipeline.

**Status:** done

- [x] The `Netgang.Component.Lumiere.Contracts` ADO Git repo is created and the ticket-01 contents pushed.
- [x] An Azure Artifacts npm feed is created; the final feed URL and package scope are recorded back into the
      spec's team-confirm points.
- [x] The publish pipeline's service connection is granted publish (contributor) rights on the feed.
- [x] The pipeline runs and **publishes the first version**, byte-faithful to the server's current schemas.
- [x] The package is installable from the feed by an authenticated consumer (`@le-cogito/lumiere-activity-schemas@0.1.0`
      confirmed on the feed; ticket 03/04 `pnpm add` will exercise the actual install).

_Reference: spec §"Sequencing (block-on-feed)", §"Out of Scope" (provisioning)._

## Comments

**Progress (repo + feed wiring done):** Repo created and pushed to
`dev.azure.com/le-cogito/NetGang/_git/Netgang.Component.Lumiere.Contracts` (branch `main`). Feed is
**`le-cogito`** (org-scoped): `https://pkgs.dev.azure.com/le-cogito/_packaging/le-cogito/npm/registry/`,
wired into `.npmrc` (scoped to `@le-cogito`) and `package.json` → `publishConfig.registry`; package scope
confirmed `@le-cogito/lumiere-activity-schemas`. **Remaining (operator):** grant the pipeline build service
Contributor/publish rights on the feed, then create the pipeline from `.pipelines/azure-pipelines.yml` and
run it (or publish manually: `vsts-npm-auth -config .npmrc` → `npm publish`). First publish unblocks
tickets 03 (server) and 04 (WebUI).
