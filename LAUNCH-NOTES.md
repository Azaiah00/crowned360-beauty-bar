# Crowned360 Beauty Bar: launch notes

Confirm everything below with Lakeisha Mells before the site goes live. Items are ordered by risk.

## 1. MUST CONFIRM: the salon address (conflict)

- **Google, Fresha, MapQuest, Birdeye and her own BusinessRate award graphic** show: **3128 Deans Bridge Rd, Ste D, Augusta, GA 30906**. The site uses this address everywhere (header menu, footer, visit page, JSON-LD, llms.txt).
- **Her StyleSeat profile** shows: **270 Bobby Jones Expy, Suite 158, Augusta, GA 30907**.
- Ask which one is current. If she has moved to Bobby Jones Expy, swap the address in `build`-generated pages (search for "3128 Deans Bridge"), update the Google Maps link, remove the "I-520 Exit 5 / Deans Bridge Rd" directions, redraw the simplified map on visit.html, and update her Google Business Profile so the two match. If Deans Bridge is current, update StyleSeat.
- The directions note ("close to I-520 Exit 5") is general and comes from iExit data for 3128 Deans Bridge Rd.

## 2. Hours (Saturday conflict)

- Published: **Monday to Friday, 8 AM to 5 PM**, with "after 5 PM, Saturday and Sunday by request (+$35 after-hours fee), call (762) 245-1983" (StyleSeat wording).
- Fresha and Birdeye show **Saturday 8 AM to 3 PM**; MapQuest shows Mon to Sat 9 to 6 (likely stale). Confirm whether Saturday is a regular day. If so, add it to the hours table, footer, JSON-LD `openingHoursSpecification` and llms.txt.

## 3. Phone

- The site uses **(762) 245-1983** (Google, StyleSeat after-hours line, her own booth rental flyer). Fresha and MapQuest still list **(706) 524-7922**. Confirm the 706 number is retired and ask her to correct those listings.

## 4. Prices, menu and policies

- All 103 services and prices were captured from StyleSeat on October 12, 2026 and are shown as starting prices ("from $X"). Every price block says "Prices from StyleSeat, October 12, 2026. Final price confirmed at booking." Re-check right before launch.
- **Full Loc Extensions w/ Hair Included** lists 45 minutes on StyleSeat (data error); the site says "Appointment length confirmed at consultation." Ask her to fix the duration on StyleSeat.
- **"Mircale Knots"** is spelled that way on StyleSeat; the site shows "Miracle Knots" with a note. Ask her to fix the typo.
- **Consultation fee:** the menu lists Consultation at $35, but the policy text says "Consultation and fee of $25.00 will be required for all new Loc Extensions, Micro locs and Micro Twists". The site shows $35 (menu price). Confirm.
- **Microloc Consultation Transfer Fee ($150):** the site lists it without explaining it ("ask Lakeisha whether it applies to you"). Ask what it covers (e.g. microlocs started by another stylist) so the copy can explain it.
- Deposit policy and late cancellation / no-show policy are quoted verbatim on services.html; fees ($25 deposit, $25 late, $35 after-hours, $100 holiday, $350 microloc / extension deposit) are as listed on StyleSeat.

## 5. Ratings, award and reviews

- **StyleSeat 4.9 from 403 reviews, "1k+ booked"** and **Loc Re-twist (Only) 5.0 from 24 reviews**: verified live on StyleSeat, October 12, 2026. Shown as text only (not marked up as schema).
- **Google 4.7 from 28 reviews**: the only rating in schema (`aggregateRating`, home page only). Update the count at launch.
- **Award:** "BusinessRate Top 3 of 2025, Hair Salon, Augusta, GA 30906, Google Reviews, November 2025" was read from her own post (photo 002). The site shows "BusinessRate Top 3 Hair Salon, Augusta (2025), based on Google reviews" with a crop of the seal. Confirm she is happy to display it.
- Review excerpts (home page): "She was absolutely amazing." (Thressa, Google, quoted); Valerie and Liz (Google, paraphrased, first names only). Liz's review mentions "DeeDee"; the site does not name DeeDee. Ask whether DeeDee is a stylist she wants featured.

## 6. Products

- The "Crowned360 Beauty Collection" name, "100% pure organic", "vegan | cruelty free", "Fenugreek & Chebe Herbal Hair Oil" and "Rose Water & Hibiscus Hydrating Mist" are read from her product labels (photos 031, 032). No prices or online store are shown. If she sells online or wants prices listed, add them.

## 7. Booth rental

- From her flyer: "JOIN OUR TEAM, Free Wifi, BOOTHS AVAILABLE, 24 Hr Access, BE YOUR OWN BOSS, Text or Call (762) 245-1983". Confirm booths are still available; if not, remove the "Join our team" section on visit.html and the footer link.

## 8. Photos (license and approval)

- All photos come from Crowned360 Beauty Bar's own public social posts. Lakeisha must approve their use and confirm she has permission from the clients pictured. Faces are visible on: colored-loc-curls-client-smiling, red-curly-updo-color, honey-blonde-short-locs, loc-updo-side-profile, boho-locs-in-the-salon, quick-weave-bob-copper, loc-barrel-roll-updo. Swap any she prefers not to use.
- Photos with a minor (bubble braids, 042) and a photo whose watermark text crossed the hair (013) were left out. Older collages carry an "@KeishaStyles" / "Keisha Styles" watermark; only clean crops were used, and two journey collages that carry her own date and "Crowned360 Beauty Bar" captions are shown as-is on locs.html.
- The salon interior photo on visit.html is cropped from her booth rental flyer and is low resolution. **Ask for 3 to 5 fresh photos of the salon** (front door, the pink wall, the chairs) and a portrait of Lakeisha for the "Meet Lakeisha" section.
- Logo: her 300 px profile image, upscaled 2x. **Ask for the original logo file** (PNG or vector) for crisper display.

## 9. Socials

- Facebook https://www.facebook.com/Crowned360/ is linked. Instagram and TikTok exist per Google, but the handles were not verified, so they are not linked. Get the exact handles and add them to the footer and JSON-LD `sameAs`.

## 10. Forms and domain

- The contact form on visit.html is a Netlify Form (`contact`). It works only once deployed on Netlify; turn on email notifications in Netlify > Forms.
- Proposed domain: **crowned360beautybar.com** (register it). Until then every canonical, og:url, JSON-LD and sitemap URL uses https://crowned360-beauty-bar.netlify.app/.
- After launch: set the Google Business Profile website field to the new site (currently it points to StyleSeat), and fix the truncated Birdeye link and the outdated Fresha / MapQuest phone and hours.

## Do not claim (kept off the site)

Years in business, licenses or certifications, LLC status, "#1 on Yelp", Instagram/TikTok follower counts, who DeeDee is, any Fresha auto-generated service tags.
