# Javi Careaga — Portfolio

A static Astro portfolio covering software engineering, machine learning, financial technology, education, and leadership. Content updated for November 2026.

## Local development

Use Node.js 20+ and npm. No environment variables or external services are required.

```sh
npm ci
npm run dev
```

## Validation

```sh
npm run format:check
npm run lint    # Astro template diagnostics and TypeScript checking
npm run build
npm test        # Generated routes, metadata, links, anchors, assets, and content checks
```

`npm run check` also runs Astro diagnostics. `npm run format` formats the source. `npm run preview` serves the production build. Build output is in `dist/`.

## Editing

- `src/data/portfolio.ts`: typed profile, projects, experiment results, experience, and skills.
- `src/components/`: homepage sections and the calibration visual.
- `src/pages/projects/[slug].astro`: generated project case studies.
- `src/styles/global.css`: shared design and responsive / reduced-motion rules.
- `src/layouts/Layout.astro`: titles, descriptions, canonical URLs, and social metadata.
- `public/social-card.png`: social preview; `public/favicon.svg`: site icon.

The site renders without client-side JavaScript. Fonts are self-hosted, and Astro generates responsive WebP project images. Contact links go directly to email, GitHub, and the supplied LinkedIn profile. No contact form or third-party analytics requests are used.

## Content provenance and privacy

- Education, EUTIC, Fundación Balia, private mobile engineering, and personal interests come from the owner's November 2026 brief.
- Pixel Labs is retained as previous independent development, confirmed by the owner. No unverified dates or employment claims are added.
- [Private Markets Tracker](https://github.com/javicrg/private-markets-tracker): README, package manifest, schema, definitions, dashboard routes, authenticated server actions, SQL/report calculations, and report/chart components were reviewed. Its tables use JSON-text positions and schedules; the portfolio does not imply a fully normalised schema. Screenshots come from the public README and show fictional demo data matching its seed database. They are labelled accordingly. The reference repository was not modified.
- [DIY JEV](https://github.com/javicrg/diy-jev): the README, `results/final_metrics.json`, dataset partitions, training, metrics, inference, and final evaluation code establish the final experiment. The site uses the owner's corrected Original / Fine-tuned / Calibrated table on the internal 600-question held-out split. Earlier 1,221-question validation runs are not combined with it. No model training or expensive evaluation was rerun for this portfolio update.
- The private mobile app has no published screenshots, repository link, or demo. Its architecture illustration contains no private content.
- Legacy template screenshots remain in source history/assets but are not published as the owner's projects.

No CV URL was supplied, so the site does not invent one. LinkedIn blocks automated verification (HTTP 999); the owner-supplied URL is preserved.

## Verification limits and hosting

The production domain is `https://portfolio.javic.tech/`; sitemap, canonical URLs, and Open Graph URLs use it. The existing deployment workflow is preserved. No deployment credentials are changed.

During this update, the public domain returned a TLS certificate hostname mismatch. This requires a hosting/domain configuration check before publication. Browser visual, keyboard, and mobile interaction QA could not be completed because the computer-use browser host was unavailable. Semantic markup, focus styles, reduced-motion rules, mobile breakpoints, and generated navigation are implemented and checked at source/build level; a real-browser review remains necessary.

Nothing has been committed, pushed, or deployed as part of this update.
