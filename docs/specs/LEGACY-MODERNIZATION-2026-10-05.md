# Legacy portfolio modernization — 2026-10-05

Status: engineering proposal / preparation complete; implementation not validated.
Decision owner: Yannick. Engineering and sole execution owner: Codex.
Baseline: `fa5fbeefda9253825287b6f7cd7a6373e34e2199` in `yj000018/yannick`, identity YW-000600.
The user authorized continued technical normalization after documentary Wave A.
This proposal preserves the existing project and CMS boundary; it does not
select a new public identity, content authority or deployment target.

## Observed constraints

The source declares Gatsby 2, React 16, node-sass 4 and Node 12. The prior Node 24
Mac locked install failed in native utf-8-validate/node-gyp before build.
Replacing Sass alone cannot resolve the entire legacy graph. No application
content snapshot or local static asset corpus appears in this 34-file tree.
DatoCMS credentials, project ownership, schema and content were not accessed.
An absent verified content snapshot is not evidence that the CMS is empty.

Five source consumers require DatoCMS: page creation, layout, home, about and
work template. Preserve `/`, `/about`, `/404` and `/works/<slug>` routing,
work slugs and positions, titles/excerpts/descriptions, image/gallery ordering,
about text/photo, site metadata/favicon, home intro/copyright, social profiles
and SEO tags. Preserve upstream license and attribution. The demo title and
upstream deployment URL do not establish Yannick's actual published identity.

## Bounded execution sequence

1. Preserve an immutable pre-upgrade ref and hash manifest for all 34 baseline
   files. Keep the baseline available until content and route parity pass.
2. Establish a read-only, source-backed DatoCMS schema/content boundary through
   the existing approved secret configuration or an authorized native export.
   Keep raw/private exports and secrets out of this public repository. Record
   redacted model counts, route/asset references and export checksums separately.
   This input is required before claiming a real portfolio migration.
3. Trial compatible Gatsby/React/source-plugin dependencies on a branch using
   the official sequential major migration notes. Pin a tested runtime and a
   native frozen lock. Replace node-sass with supported Sass; validate the
   existing indented Sass, tilde font/loader imports and responsive styling.
   Do not use forced peer resolution as proof of compatibility.
4. Migrate image query/component contracts together: legacy fluid fragments and
   gatsby-image must match the actual DatoCMS source-plugin schema. Reconcile
   sort syntax, Markdown-derived HTML, Helmet SEO, gallery and slider/masonry
   peer compatibility against captured source-backed data.
5. Run locked clean installation, schema/query validation and production build,
   then local route/asset/SEO parity and responsive visual checks. Offline
   synthetic fixtures may test adapters but must never masquerade as portfolio
   content or close CMS acceptance. Review every changed dependency/source file.
6. Verify candidate remote SHA, passing hosted checks and exact merged payload.
   Select/verify any deployment host/domain only from actual existing records;
   prepare rollback to the prior artifact. Publication and Yannick's visual
   acceptance remain separate checkpoints.

## Current outcome and resume

Preparation is complete. Code and original lock remain unchanged. Implementation
is not build-ready or deployment-ready. Next independent work can trial the
modern dependency graph, but content/query/route parity requires the source
boundary in step 2. Do not replace the site with an empty/static placeholder.

Rollback for this documentary preparation: revert its commit. For the eventual
upgrade, restore only the affected manifest/source paths from the pre-upgrade
ref, rebuild the known artifact, then verify any separately released host.

## Primary migration references

- [Gatsby 2 → 3](https://www.gatsbyjs.com/docs/reference/release-notes/migrating-from-v2-to-v3/)
- [Gatsby 3 → 4](https://www.gatsbyjs.com/docs/reference/release-notes/migrating-from-v3-to-v4/)
- [Gatsby 4 → 5](https://www.gatsbyjs.com/docs/reference/release-notes/migrating-from-v4-to-v5/)
- [Image migration](https://www.gatsbyjs.com/docs/reference/release-notes/image-migration-guide/)
- [Official DatoCMS source plugin](https://github.com/datocms/gatsby-source-datocms)

These references describe migration paths, not a verified compatible dependency
set for this repository. Resolve and test exact versions during implementation.

## Compatibility evidence — 2026-10-05

A [proposed adapter verification module](../../verification/masonry/README.md) tests React 18 with the exact native Masonry 4.2.2/imagesLoaded 4.1.4 engines against the original React 16/wrapper baseline. Two strict frozen fixture installs, SSR and 12 synthetic geometry cases pass, including React prop updates, empty/restored grids, cleanup and cancellation. This is independent adapter preparation; the homepage does not import it and no original application or lock was upgraded. Fresh native reference loads avoid the observed stale 401→400 resize measurements; whole-site visual/content acceptance remains required.

The isolated Gatsby 5 graph is not accepted. Default npm resolution overrides peer conflicts and reports 75 audit findings; strict resolution fails on Gatsby's TypeScript ESLint plugin 5.62.0 versus eslint-config-react-app 6.0.0's ^4 peer constraint. An experimental React server dependency also conflicts. No force/legacy-peer flag, application install, content read or deployment was used. Reconcile a supported compatible graph and security findings, then the source-backed CMS/query/route/image/SEO boundary before implementing the portfolio migration. [Exact receipt](../../evidence/MASONRY-COMPATIBILITY-2026-10-05.json).
