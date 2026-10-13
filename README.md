# Crowned360 Beauty Bar: spec website

A finished, static spec website for **Crowned360 Beauty Bar** (Lakeisha Mells, natural hair care and locs, Augusta, GA), built by Couture House Co. as a sales pitch and ready to launch.

- Live preview URL (Netlify): https://crowned360-beauty-bar.netlify.app/
- Proposed custom domain: **crowned360beautybar.com** (register before launch; see LAUNCH-NOTES.md)
- Booking: every "Book" button goes to https://www.styleseat.com/m/v/crowned360

## Pages

| File | Purpose |
|---|---|
| `index.html` | Home: hero ring, ratings, the 360 pillars (pinned on desktop), most-booked services, loc journey, gallery teaser, Lakeisha's own words, reviews, quick facts, FAQ |
| `services.html` | Full StyleSeat menu (103 services, 15 categories) with starting prices and durations, fees and policies |
| `locs.html` | Loc and microloc studio: consult, deposit, install, retighten path; starter options; extensions; maintenance; results; loc FAQ |
| `gallery.html` | 40 photos with filters and a lightbox |
| `visit.html` | Address, directions, hours, policies, booth rental, Netlify contact form |
| `404.html` | Branded not-found page |

## Stack

Static HTML, one stylesheet (`assets/css/site.css`), one vanilla script (`assets/js/site.js`). No build step, no frameworks, no external requests. Fonts are self-hosted from Fontsource (Bodoni Moda, Cinzel, Manrope; SIL Open Font License).

## Preview locally

```
cd crowned360-beauty-bar
python3 -m http.server 8080
```

Then open http://localhost:8080/. (Double-clicking `index.html` also works; the contact form only submits once deployed on Netlify.)

## Deploy on Netlify

1. Push this folder to a GitHub repo (e.g. `crowned360-beauty-bar`).
2. Netlify: Add new site, Import from GitHub, pick the repo. Build command: none. Publish directory: `.`
3. Site name: `crowned360-beauty-bar` so the URL matches the canonical tags.
4. After the first deploy, open Forms in the Netlify dashboard and enable notifications for the `contact` form (send to the owner's email).
5. Custom domain later: add `crowned360beautybar.com` in Domain settings, then replace `https://crowned360-beauty-bar.netlify.app/` everywhere (HTML, sitemap.xml, robots.txt, llms.txt) in one find-and-replace.

## Cache busting

`netlify.toml` caches `/assets/*` for a year. Every page links `site.css?v=20261012a` (also fonts.css and site.js). Bump the version on every CSS or JS change, on every page including 404.html. A new share image needs a new filename (e.g. `share-2.jpg`) and updated `og:image` / `twitter:image` tags.
