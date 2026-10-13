# QA report: Crowned360 Beauty Bar

Run: October 12, 2026, local server (python http.server), Chromium via Playwright. Script and screenshots: `/home/claude/salons/qa/crowned360-beauty-bar/` (`qa.py`, `qa-results.json`, `shots/final-*.png`).

Pages: index, services, locs, gallery, visit, 404. Every page was screenshotted full-page at 390, 768 and 1440 after scrolling through (reveals settled), then the PNGs were viewed in sections and fixed. Extra viewport captures checked the pinned 360 section at four scroll positions, the mobile menu, the lightbox (desktop and phone) and the share image at full size.

## Automated checks (all pass)

| Check | Result |
|---|---|
| No console errors or failed requests (6 pages x 3 widths) | PASS (18/18) |
| No horizontal overflow at 390 / 768 / 1440 | PASS (18/18) |
| No overflow while scrolling, scrollWidth sampled every 100 ms at 360 / 390 / 414 | PASS (18/18) |
| Sticky header stays at top while scrolling (360 / 390 / 414) | PASS (18/18) |
| Every local link and asset resolves (href, src, srcset, data-full) | PASS (362) |
| Every in-page / cross-page anchor resolves | PASS (33) |
| Every JSON-LD block parses (HairSalon + BreadcrumbList / FAQPage / WebSite / ImageGallery) | PASS (6/6) |
| aggregateRating (Google 4.7 / 28) on home page only | PASS |
| Exactly one H1 per page | PASS (6/6) |
| Every img has alt + width + height | PASS (86) |
| Titles <= 60 chars, descriptions <= 155 chars | PASS |
| Canonical / og:url / og:image on https://crowned360-beauty-bar.netlify.app/ | PASS |
| Every page has a Book CTA to https://www.styleseat.com/m/v/crowned360 | PASS |
| Footer credit "Website concept by Couture House Co." -> https://couturehouse.co | PASS |
| No emoji in any text file (regex scan of html, css, js, txt, md, xml, svg, toml, webmanifest) | PASS |
| No lorem / TODO / "coming soon" | PASS |
| `site.css?v=20261012a` on every page (also fonts.css, site.js) | PASS |
| Stable-scrolling block is the last thing in site.css | PASS |
| No `overflow-x: clip` on html, body or main | PASS |
| Custom scrollbars (track #0B0B0B, thumb #D4A845, hover #F3D58A; styled inner scrollers in rose on light sections) | PASS |
| Required files: robots.txt, sitemap.xml, llms.txt, site.webmanifest, netlify.toml, README, LAUNCH-NOTES, .gitignore, share.jpg, favicons | PASS |
| prefers-reduced-motion: all content visible, pinned section falls back to stacked | PASS |
| JavaScript off: `.js` gate absent, all content visible | PASS |
| Mobile menu: aria-expanded toggles, Esc closes | PASS |
| Gallery filters, lightbox open / close | PASS |
| Contact form client-side validation (3 required fields flagged) | PASS |

## Lessons-learned rules

- Photos inside aspect-ratio boxes are pinned (`position:absolute; inset:0; width/height:100%; object-fit:cover`, box `min-height:0`). PASS
- Rotating ring, circle-clip reveals and the pinned 360 ring use transform / opacity / clip-path only; nothing pushes past the viewport on phones (verified by the 100 ms sampling). PASS
- Share image checked at full size: no overflow, fonts loaded (Bodoni Moda, Cinzel, Manrope), no garbled glyphs. PASS

## Fixed during visual review

- Port collision with another builder's server (moved to 8861).
- Gold labels and links on blush sections were low contrast; light-section text rules now cover blush sections.
- Pinned 360 section: progress ticks moved above the panel so they never overlap long panels.
- Hero: removed a "1k+" stamp that collided with the ring text; H1 sized to break as "Care for the / whole crown."
- Tablet: pillar photo overlapped the text column; footer columns now 2-up between 640 and 999 px.
- Locs page: extension price table stacks into rows on phones (it was cramped and scrolled sideways).
- Visit page: map label clipped, "not to scale" note collided with the road; interior photo re-cropped to remove the flyer frame.
- Lightbox: close button was off-screen; dialog now fits the photo.
- Button text contrast: gradient end lightened to #B8892F.

## Not testable locally

- Netlify form submission (works once deployed on Netlify).
- Real iPhone Safari rendering (rules from 05-Lessons-Learned applied; test in a Private tab after deploy).
