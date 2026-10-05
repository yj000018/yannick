# Proposed Masonry compatibility verification

Status: **VERIFICATION ONLY — NOT THE PORTFOLIO IMPLEMENTATION**.
Engineering/execution owner: Codex. Content/identity/release decisions: Yannick.

The native homepage uses only `className` and children on react-masonry-component
6.2.1. Its wrapper blocks React 18. This proposed adapter uses React 18.3.1 with
the same native Masonry 4.2.2 and imagesLoaded 4.1.4 engines; application source,
root package manifest/lock and CMS queries are untouched. No synthetic card is
portfolio content or an accepted replacement for a CMS export.

The separate legacy-baseline package uses the actual native wrapper and React
16.14.0. Both packages have independent locks and strict peer installation.
Builds compile the unchanged native showcase Sass and two synthetic browser
fixtures, plus an SSR check without browser globals. Generated bundles and
reports remain ignored; upstream MIT attribution and LICENSE remain intact.

## Commands

From the repository root with Node 24:

```sh
npm ci --strict-peer-deps --prefix verification/masonry
npm ci --strict-peer-deps --prefix verification/masonry/legacy-baseline
npm run build --prefix verification/masonry
node verification/masonry/build/ssr.cjs
npm exec --prefix verification/masonry -- playwright install chromium
npm test --prefix verification/masonry
```

CI installs Chromium including its Linux system dependencies and repeats these
checks. It never installs or builds the legacy root Gatsby application.

## Evidence and limits

The synthetic checks compare geometry within one pixel, source order and links
at 320, 400, 401, 900, 1100, 1400 and 1440 px, then React image-size updates,
card insertion/removal, empty and restored grids. The candidate runs under React
18 StrictMode. Cleanup after unmount/resize and cancellation before asynchronous
initialization settles are checked; no external content requests are made.

Reference protocol is explicit: a fresh native legacy load at each width is
compared with continuous candidate resizing. Continuous legacy resizing across
401 → 400 px retained stale image measurements in the initial trial, so it is
not used as the correct-layout reference. Image-size updates use React props
on both fixtures. This is a bounded layout contract, not whole-site visual,
route, content, image, SEO or device acceptance.

The native Sass compiles with two existing slash-division deprecation warnings.
A broader Gatsby 5 graph remains rejected: default resolution overrides peer
conflicts and reports 75 audit findings; strict resolution fails on incompatible
ESLint plugin constraints. Neither graph nor this proposed adapter is activated
in the actual site. CMS ownership/schema/content and accepted production
compatibility remain prerequisites for migration.

The [receipt](../../evidence/MASONRY-COMPATIBILITY-2026-10-05.json) records exact
source/dependency boundaries and local checks. Rollback: revert this verification
change; the original site stays recoverable through the pre-verification tag.

Implementation API references: [Masonry methods](https://masonry.desandro.com/methods)
and [imagesLoaded](https://imagesloaded.desandro.com/).
