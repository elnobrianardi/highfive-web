# AGENTS.md

## Stack

- **Next.js 13.4 (Pages Router)**, **React 18**, **TypeScript** (`strict`), path alias `@/*` → `src/*`.
- **Sass** for all styling; **Bootstrap 5** grid loaded globally in [`_app.tsx`](src/pages/_app.tsx:5).
- **GSAP + ScrollTrigger**, **SplitType**, **Swiper**, **VanillaTilt**, **chroma-js** for animation and sliders.
- Scripts: `npm run dev | build | start | lint`. No test suite — `npm run build` type-checks.

## Structure

```
src/
  pages/          routes (index*.tsx variants, case-study/[slug].tsx, api/)
  components/
    layout/       Layout shell + Header/Footer/Banner/Cursor/VideoModal
    containers/   page sections: home/ blog/ project/ service-details/ ...
    youtube/
  data/           static JSON content (caseStudies.json, clientLogos.json)
  styles/         SCSS partials
public/           images/ icons/ (served as-is, not bundled)
```

- Pages wrap content in [`Layout`](src/components/layout/Layout.tsx:31) with `header`/`footer`/`video` variant props, then stack section containers.
- Repeated content lives in [`src/data/`](src/data) and is imported as JSON — edit data, not markup.
- Images use `next/image` with absolute paths (`/images/...`).

## Styling

Single entry: [`src/styles/main.scss`](src/styles/main.scss:81). Register new partials there.

- Folders: `abstracts/` (theme tokens in [`_variables.scss`](src/styles/abstracts/_variables.scss:6)), `base/`, `components/`, `layout/`, `sections/_all-sections.scss`, `themes/`, `_responsive.scss`.
- BEM naming (`.block__element--modifier`). Add section styles to [`_all-sections.scss`](src/styles/sections/_all-sections.scss:1) under a numbered comment header; make targeted edits, don't reformat the 4k-line file.
- Use CSS variables (`--primary-color`, `--theme-bg`, ...) instead of raw hex. Pass dynamic values as inline custom properties (see `--card-overlay` in [`CaseStudyHome.tsx`](src/components/containers/home/CaseStudyHome.tsx:131)).
- GSAP hooks are CSS classes: `.fade-top`, `.fade-wrapper`, `.appear-down`, `.title-anim`, `.topy-tilt` — reuse them.
- Note: a light theme ([`_light-theme.scss`](src/styles/themes/_light-theme.scss:1)) exists, but only for leftover template routes (`index-light`, `index-two-light`, ...). Current pages use the dark default; treat light-mode styles as legacy unless working on those routes.

## `.zoocodeignore` (Zoo Code)

[`.zoocodeignore`](.zoocodeignore:1) tells the Zoo Code agent which files **not** to read or index — a context-budget file, not a build/git ignore.

- Excludes `node_modules/`, `.next/`, build output, images/media, lockfiles, logs, editor/cache folders, and secrets (`*.env*`, `*.db`).
- Since assets are unreadable, infer from code usage or `src/data/*.json` rather than opening media files.
- Add any new heavy/generated directory (e.g. `coverage/`) here; keep `src/` readable.

## Conventions

- Type props and JSON shapes explicitly (see `CaseStudy` in [`CaseStudyHome.tsx`](src/components/containers/home/CaseStudyHome.tsx:9)).
- Prefer extending existing section components over creating new layout primitives.
