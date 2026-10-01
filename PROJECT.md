---
canonical_id: "YW-000600"
project_name: "Yannick Identity / Public Voice"
repository_role: "CANONICAL_PROJECT"
authority: "canonical"
lifecycle: "active"
visibility: "public"
parent_system: null
canonical_repository: "yj000018/yannick"
primary_branch: "main"
deployment_targets: []
related_repositories: []
last_reviewed: "2026-10-01"
identity_status: "CROSSWALK_CONFIRMED"
execution_owner: "Codex (Wave A only)"
---

# Yannick Identity / Public Voice

Public identity/personal portfolio implementation using the historical Gatsby/DatoCMS stack.

## Authority and boundaries

The upstream demo URL is not proof of Yannick deployment. Preserve upstream license/attribution; no stack upgrade or public deployment.

Repository-local authority covers its declared payload only. Canonical semantic identity and relationships follow the [YOS crosswalk](https://github.com/yj000018/YOS/blob/main/ontology/registries/REPOSITORY-CROSSWALK-v0.1.md); a repository name or new document cannot create a project identity. `canonical_repository: null` means no consolidated/identity-resolved repository is selected here. `deployment_targets: []` records no target verified by this audit; it does not erase existing configuration.

## Entry and retained paths

Read [documentation map](docs/README.md), [current state](docs/status/CURRENT.md), [architecture](docs/architecture/OVERVIEW.md) and [agent instructions](AGENTS.md). Existing content remains at its original paths; no code/corpus reorganization, physical merge or archival is authorized by this contract.

## Validation and dependencies

npm run build; npm run develop for local preview. Legacy Gatsby/node-sass dependencies and CMS credentials need separate compatibility verification.

This Wave A review validates documentary structure and remote revisions. It does not claim fresh build, runtime, deployment, source completeness or creative approval.

## Supersession

The 2026-10-01 [Wave A decision](docs/decisions/DECISION-LEDGER.md) governs navigation and repository authority. Older source notes, receipts and handoffs retain their dates and provenance, and do not override this authority boundary.
