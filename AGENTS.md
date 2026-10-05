# Agent operating contract — Yannick Identity / Public Voice

Read [PROJECT.md](PROJECT.md), [documentation map](docs/README.md) and [CURRENT](docs/status/CURRENT.md) before editing. Repository role: `CANONICAL_PROJECT`.

## Authority and safe edits

The upstream demo URL is not proof of Yannick deployment. Preserve upstream license/attribution; no stack upgrade or public deployment.

Preserve source provenance, creative text, licenses, source manifests, hashes and immutable receipts. This normalization scope covers navigation/metadata only, with no physical merge, repository rename, archival, runtime activation or external publication. Keep existing payload paths; do not infer ownership or completion from a folder name. Read more specific module instructions before code work.

## Validation

npm run build; npm run develop for local preview. Legacy Gatsby/node-sass dependencies and CMS credentials need separate compatibility verification.

For documentation, check local links, metadata against the YOS crosswalk, changed-path scope, and the remote commit/default branch after publication. For code, run the relevant module checks; a commit or passing local test does not prove deployment.

## Durable documentation

Use the map in docs/README.md. Accepted canon, accepted decisions, architecture/specs, current status, handoffs, research, evidence and history remain separate. A research draft, chat or handoff is never implicitly canon. Structural/hard-to-reverse decisions need an ADR; smaller durable decisions belong in the ledger. Create semantic directories only when they have material.

## Secrets

Never commit credentials, access tokens, cookies, private runtime configuration or newly acquired private raw exports. Use ignored local configuration and an approved secret store. Do not print secrets in validation receipts.

## Isolated compatibility verification

[verification/masonry](verification/masonry/README.md) tests a proposed adapter under Node 24, independently from the legacy root application. Keep fixtures explicitly synthetic and retain the original site/CMS boundary. Passing this module does not authorize replacing portfolio content, upgrading the whole stack or publishing the site.
