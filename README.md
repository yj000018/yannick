# Yannick Identity / Public Voice

Public identity/personal portfolio implementation using the historical Gatsby/DatoCMS stack.

**Repository role:** `CANONICAL_PROJECT`. **Canonical object:** `YW-000600`.

The upstream demo URL is not proof of Yannick deployment. Preserve upstream license/attribution; no stack upgrade or public deployment.

## Start here

| Need | Entry |
|---|---|
| Identity and authority | [PROJECT.md](PROJECT.md) |
| Agent operating contract | [AGENTS.md](AGENTS.md) |
| Canon and document authority | [Documentation map](docs/README.md#canon) |
| Architecture | [Observed structure](docs/architecture/OVERVIEW.md) |
| Key decisions | [Decision ledger](docs/decisions/DECISION-LEDGER.md) |
| Current state | [CURRENT](docs/status/CURRENT.md) |
| Specifications | [Specs map](docs/README.md#specs) |
| Resume / handoff | [Resume map](docs/README.md#handoffs) |

## Validation

npm run build; npm run develop for local preview. Legacy Gatsby/node-sass dependencies and CMS credentials need separate compatibility verification.

Commands are pointers from tracked manifests or existing runbooks, not test results from this audit. Deployment and live acceptance require their own evidence.

## Historical documentation

[Previous README snapshot](docs/history/README-before-wave-a-2026-10-01.md) preserves prior documentation and attribution.

## Modernization verification

[The proposed Masonry adapter](verification/masonry/README.md) has independent strict locks, synthetic layout/SSR checks and dedicated CI. It is not used by the legacy portfolio. Its CMS migration, root build and production acceptance remain open.
