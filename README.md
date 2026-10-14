# AK Interiéry – homepage (React + Node)

Homepage built from the approved materials: `AK_Interiery_Homepage_KONTROLNI_VZOR.pdf`,
`AK_HOMEPAGE_WEB_DEVELOPER_PACK.pdf` and the texts in `AK_Interiery_Homepage_FINAL_CZ_EN.docx`.

## Before going live – checklist

1. **Domain:** set `siteUrl` in `src/site.config.js` (used for canonical links, share previews, sitemap).
2. **Company details:** fill in `company` in `src/site.config.js` – they appear in the privacy policy and terms.
3. **Legal texts:** `src/pages/legal.content.js` are templates written for how this site works. Have a lawyer review them.
4. **E-mail:** copy `.env.example` to `.env`, fill in your mailbox's SMTP details, run `npm run test:email`.
5. **Contact details & photos:** see the TODOs in `src/site.config.js`.
6. After launch, add the site in **Google Search Console** and submit `https://<your-domain>/sitemap.xml`.

## Company and contact details – v29
- `company` and `contact` in src/site.config.js: A&K Interiéry-Granit s.r.o., IČO 23030887, Těšínská 1316,
  735 14 Orlová-Poruba, directors Kamil Sivák and Ing. Azizullah Sayed; company mobile +420 604 596 169 (also WhatsApp),
  info@akinteriery.com. Nadima Said is the separate contact for projects (+420 736 719 675, Said.nadima@gmail.com).
- Shown by `ContactDetails.jsx` (footer + next to every form) and `CompanyDetails` (contact page); company line in the
  footer bottom; filled into the privacy policy and terms; used in the structured data (address) for search engines.
- Location: "Orlová a okolí" (footer, homepage/kitchen SEO texts). Social profiles: Instagram, Facebook, TikTok –
  set a profile to null to hide its icon.
- Where enquiries are delivered is set by MAIL_TO in Vercel (Settings → Environment Variables).

## German version (DE) – v28
- Third language next to CZ and EN (switch CZ · EN · DE in the header). Copy: AK_INTERIERY_CELY_WEB_DE (MASTER DE 1.0),
  formal "Sie". Each content file has a `de` block; lines marked `// UI` were not in the document and were written by us.
- Desktop header uses short forms of the German menu labels (`short` in content.js – the full labels do not fit on one
  line); the phone menu and footer use the full labels. Below 1240 px German switches to the menu button.
- Forms, validation, success state and the customer's confirmation e-mail are German; the e-mail to AK stays Czech and
  shows "Jazyk webu: němčina".
- Legal pages: no German text was supplied, so German headings + a note + the full Czech text (marked `lang="cs"`).
- Not done on purpose (brief): AK CLEAN cross-link (destination not confirmed), cookie banner (none on the site).
- Deviations from the German brief made at the client's later request: decor names are shown (brief says numbers only)
  and the four project videos are published (brief says keep unpublished).
- German SEO titles/descriptions are applied when the visitor switches to DE; search engines index the Czech pages
  (no separate /de/ addresses yet).

## Naše výroba – 5 points (v28)
- The homepage section and the /nase-vyroba overview show the five areas from AK_INTERIERY_VYROBA_5_BODU (CZ/EN/DE),
  defined once in `AREAS` (src/pages/production.content.js). Item 03 links to the softforming / vacuum chapter.

## Domain
- Live domain: **akinteriery.cz** (`siteUrl`). In Vercel: akinteriery.cz → Production, www.akinteriery.cz → 308 redirect.

## Moving the domain from Shopify (akinteriery.com) – no longer used
- `siteUrl` is `https://akinteriery.com` (no www – the same primary domain Shopify used, so search rankings carry over).
  In Vercel add `akinteriery.com` (primary) and `www.akinteriery.com` (redirect → akinteriery.com).
- In Shopify → Settings → Domains → DNS: A record `@` 23.227.38.65 → the IP Vercel shows (usually 76.76.21.21);
  CNAME `www` shops.myshopify.com → the value Vercel shows (usually cname.vercel-dns.com). Leave MX/TXT (e-mail) alone.
- `vercel.json` redirects Shopify's standard URLs (/pages/…, /collections/…, /products/…, /policies/…, /cart…)
  to the matching new pages. Add more there if Google still shows other old addresses.
- Do not close the Shopify store before the domain is transferred out (if it was bought through Shopify).

## Deploying to Vercel

The project is Vercel-ready (`vercel.json` + the functions in `api/`):
- Pages are served as pre-rendered static files; unknown addresses get `404.html`.
- The enquiry form and newsletter run as Vercel functions (`api/consultation.js`, `api/newsletter.js`).
- **Vercel has no permanent disk, so on Vercel the e-mails are the record of every enquiry.** Set the e-mail
  variables in Vercel → Project → Settings → Environment Variables (same names as in `.env.example`:
  `MAIL_TO`, `MAIL_FROM`, `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, optionally `CONFIRM_TO_CUSTOMER`),
  then redeploy. Without them the form shows an error instead of silently losing enquiries.

The regular Node server (`npm start`) still works for any other hosting.

## Run it

```bash
npm install
npm run dev        # React on http://localhost:5173 + API on :3001 (proxied)
```

Production:

```bash
npm run build      # builds the site into /dist
npm start          # Node serves /dist and the API on PORT (default 3001)
```

`npm run build:preview` creates a single self-contained HTML file in `/dist-preview`
(images and fonts inlined, form in demo mode) for sending a quick preview to the client.

## Pages

| URL | Page | Opens from |
| --- | --- | --- |
| `/` | Homepage | |
| `/vestavne-skrine` | Built-in wardrobes (`src/pages/WardrobesPage.jsx`) | Homepage → Vestavné skříně → Zjistit více |
| `/kuchyne-na-miru` | Bespoke kitchens (`src/pages/KitchenPage.jsx`) | Menu "Kuchyně", Homepage → Kuchyně na míru, complete-interiors page |
| `/dvere` | Doors & interior elements (`src/pages/DoorsPage.jsx`) | Homepage → Dveře → Zjistit více, complete-interiors page |
| `/nabytek-na-miru` | Bespoke furniture (`src/pages/FurniturePage.jsx`) | Homepage → Nábytek na míru → Zjistit více, complete-interiors page |
| `/pro-profesionaly` | B2B – for developers & professionals (`src/pages/B2BPage.jsx`) | Menu "Pro profesionály", homepage "B2B spolupráce" |
| `/o-nas` | About us – typographic, no photos (`src/pages/AboutPage.jsx`) | Menu "O nás", homepage "Poznejte nás" |
| `/kontakt` | Contact + both forms (`src/pages/ContactPage.jsx`) | Menu "Kontakt" |
| `/kamen` | Stone & stone fabrication (`src/pages/StonePage.jsx`) | Homepage card "Kámen a kamenické realizace", Kitchen and B2B cross-links, footer, About |
| `/realizace` | Naše realizace – all real projects, filters (`src/pages/WorkPages.jsx`) | Menu "Realizace", hero "Prohlédnout realizace", footer |
| `/realizace/<slug>` | One project (generated from `src/realizace.js`) | Project cards |
| `/nase-vyroba` | Naše výroba – in-house manufacturing + form C (`src/pages/ProductionPage.jsx`) | Homepage "Naše výroba" → Prohlédnout naši výrobu, footer, B2B / Kitchen / Stone cross-links |
| `/kompletni-interiery` | Complete interiors / Home Design (`src/pages/CompletePage.jsx`) | Menu "Interiéry", Homepage → Kompletní interiéry, wardrobe page |

Routing is in `src/router.jsx` (no extra dependency). Add a page by adding it to `ROUTES` there and to
`PAGES` in `src/App.jsx`, then set the matching service's `href` in `src/site.config.js`.
Menu links to homepage sections (e.g. "Realizace") work from every page.

### Furniture page – open items
- English texts are our translations – review `src/pages/furniture.content.js`.

### Stone page (Kámen a kamenické realizace) – before publishing
- **Copy:** no text document was supplied – Czech and English in `src/pages/stone.content.js` are our drafts. Approve them.
- **Specs** (3 200 × 1 600 × 20 mm, 5,12 m²) appear in the "Technický kámen" card and on the hero drawing. Verify them, or
  set `stonePage.showSpecs = false` in `src/site.config.js` to hide every dimension.
- **Decor gallery – LIVE with 6 named decors** (12 Oct 2026, names supplied by the client): 01 Calacatta White,
  02 Nero Marquina, 03 Patagonia Gold, 04 Pure White, 05 Black Laurent, 06 Pietra Grey. Each card shows "Dekor 0N"
  above the name; the enquiry and e-mail carry both (e.g. `[Dekor 03 – Patagonia Gold]`). Names: `name` in
  `stonePage.decors` (site.config.js). Photos are
  AK's own, only cropped to the slab (white background, slab edge, shadow and a sticker removed) and saved as WebP – no
  colour changes or retouching (`src/assets/img/stone/`). Four decors also have a real warehouse/detail photo, viewable
  in the full-size viewer (matched to their decor by pattern – please confirm). "Poptat tento dekor" opens the form with
  "Kámen a kamenické práce" selected and the decor number attached; it appears in the e-mail subject (`[Dekor 05]`) and
  as its own row. Each decor has its own link: `/kamen#dekor-05`. The heading counts the decors automatically.
  To add Dekor 07: put the photo in `src/assets/img/stone/`, import it and add `{ no: '07', image: … }` to
  `stonePage.decors` in `src/site.config.js`.
- The homepage card and the page hero are line drawings in brand colours; a stone photo can be given to the homepage
  card via `image` in `services` (site.config.js).
- Form A has a new option "Kámen a kamenické práce" (pre-selected on this page); form B has "Kámen / kamenické práce".

### Naše realizace (AK_INTERIERY_NASE_REALIZACE brief)
- Projects live in `src/realizace.js` – the file explains the format (slug, category, title, cover, description,
  optional scope, photos and videos). **Real, approved AK media only.**
- While the list is empty: the homepage section is hidden, there are no project pages, and `/realizace` shows only its
  heading, intro and the enquiry form. The former illustrative "Vybrané realizace" strip was removed from the homepage.
- With projects: the homepage section appears directly after the service cards (up to 6, `featured` first); `/realizace`
  shows filters only for categories that have projects; each project gets `/realizace/<slug>` with a gallery (photos open
  full-size, videos are click-to-play with controls and a poster, never autoplay) and "Poptat podobnou realizaci", which
  attaches the project to the enquiry (e-mail row "Podobná realizace").
- Photos: `src/assets/realizace/<slug>/` (imported). Videos: `public/realizace/<slug>/` (MP4, optionally WebM).

- **Published (v23):** "Moderní kuchyně s kamenným ostrůvkem" (Kuchyně na míru) – one wide featured card on the
  homepage, on `/realizace` and on the kitchen page; 8 selected photos (originals, portrait – cropped only by CSS);
  the stone page links to it with the countertop detail photo. **TODO:** add the exact scope of AK's work (`scope`) once
  confirmed – the page deliberately makes no claim about the scope of delivery.
- **Návrhy a vizualizace** (`/realizace#navrhy-a-vizualizace`): 10 renderings, each badged "Vizualizace" and labelled
  "3D vizualizace …", in a separate section below the real projects – never shown as completed work.
- **Videa z realizací** (`/realizace#videa`, v24): 4 client-supplied clips, **sound removed** (no audio track at all),
  re-encoded MP4 + WebM (~0.5–1.7 MB each) in `public/realizace/videa/`; posters in `src/assets/realizace/videa/`.
  They play muted and looped only while on screen (still frame for "reduced motion"); a tap opens them full-size.
  Captions describe only what is visible – edit them in `projectVideos` (`src/realizace.js`). Video 02 had black bars
  in the file; they were cropped off.
- **Older videos – NOT published:** `media-pending/videos/` (video 01 = a different kitchen, video 02 = a TV wall). Publish
  only after AK confirms which project they belong to.

### Naše výroba (AK_INTERIERY_NASE_VYROBA brief)
- Homepage section directly after Naše realizace: Services → Realizace → **Naše výroba** → rest of the page.
- `/nase-vyroba`: hero · 4 manufacturing areas · 01 furniture · 02 CNC & MDF · 03 softforming / vacuum press / saws ·
  04 stone (CTA → `/kamen`, never the kitchen page) · 05 plexiglass · B2B section with **form C "Zakázková výroba"**
  (company, contact person, e-mail, phone, material/service, approximate dimensions, quantity, message, optional
  drawing upload PDF/DWG/DXF…). E-mail subject: `Poptávka výroby: <company> – <material>`.
- Czech copy verbatim from the brief; English and the short tags/labels are ours – review `src/pages/production.content.js`.
- **Photos/videos:** none yet. Slots in `productionMedia` (site.config.js) – genuine workshop media only; empty slots
  are not rendered.
- **Verify before relying on it:** "přibližně 25 designových variant" of MDF doors, the range of interior doors, any
  capacity / lead-time claims.

### WhatsApp
`contact.whatsapp` in `src/site.config.js` (number in international format, no + or spaces) drives the floating
WhatsApp button (bottom right, appears after scrolling), the footer contact list and the contact sections. Each link
opens WhatsApp with a short greeting pre-filled (`contact.whatsappText`). **Confirm the number has WhatsApp.**

### B2B, O nás, Kontakt – open items
- **Contact e-mail:** `Said.nadima@gmail.com` is used as specified, but the document says to use it only if approved for
  launch. Replace `contact.email` in `site.config.js` and `MAIL_TO` once the company mailbox exists.
- **Social links:** set the real Instagram, Facebook and TikTok profile URLs in `contact.social` (footer icons).
- **B2B photos:** the B2B image pack repeats existing photos (no exterior, workshop or installation shots). The exterior
  card uses the drawn pergola. References (section 07) stay hidden until genuine AK projects are added (`b2bPage.projects`).
- **O nás:** no photos by design. "Naše práce" (07) appears once `aboutPage.showWork = true`; "Tým a výroba" (08) is
  reserved and unpublished.
- No address, showroom or company registration data is published (brief) – the privacy policy keeps placeholders.
- English texts for all three pages and both forms are our translations.
- "Realizace" (section 05) is hidden until genuine AK photos are added to `furniturePage.projects`.
- In `AK_Nabytek_na_miru_IMAGES_WEB.zip`, 01/02/03/06 are the same living-room file and 07/09 are near-identical
  coffee-table crops. Cards therefore use other photos (see `furniturePage` in `site.config.js`); a real study and a
  living-room furniture photo (TV wall, library) are still needed. `07` had its "Kinfolk" book title softened out.

**Pergoly** has no page (no materials yet) – its card still scrolls to the form with Pergoly pre-selected.

### Doors page – open items
- **No image in `AK_Dvere_IMAGES_WEB.zip` shows an interior door** – they are crops of wardrobe, living-room and dining
  photos, and `01_HERO` is the complete-interior hero. They are placed as the text document specifies, but real door
  photography is needed (hinged wooden, flush/hidden, sliding, glazed + surface/handle details). Swap in `doorsPage`.
- English texts are our translations – review `src/pages/doors.content.js`.
- "Realizace" (section 05) is hidden until genuine AK photos are added to `doorsPage.projects`.

### Kitchen page – open items
- English texts are our translations (document is Czech only) – review `src/pages/kitchen.content.js`.
- "Realizace" (section 05) is hidden until genuine AK photos are added to `kitchenPage.projects`.
- Pack files that repeat photos used elsewhere: 03 = homepage hero kitchen, 05 = homepage gallery kitchen,
  06 = homepage kitchen card, 07 = complete-interiors section 02. Used as the pack's README specifies.

### Complete interiors page – open items
- English texts are our translations (document is Czech only) – review `src/pages/complete.content.js`.
- "Realizace" (section 07) is hidden until genuine AK photos are added to `completePage.projects`.
- Only `06_Interior_Detail` and `08_DETAIL_Materials` in the pack are new photos; the rest repeat homepage/wardrobe
  photos, and `01_HERO` = `02_Living_and_Kitchen`. Section 02 therefore uses `06`; the doors card uses the doors detail.
- `08_DETAIL_Materials`: a visible book title ("THE KINFOLK BOOK") was softened out.
- Kitchen and doors cards will link to their pages once built (set `href` in `completePage.include`).

### Wardrobes page – open items
- English texts are our translations (the document is Czech only) – please review `src/pages/wardrobes.content.js`.
- "Realizace" (section 05) is built but hidden until genuine AK photos are added to `wardrobesPage.projects`.
- The image pack has duplicates: `04_Bedroom` = `01_HERO`, `05_Dark` = `03_WalkIn`. `02_Sliding` is the same
  room as `04_Bedroom` in a lighter version. A distinct bedroom photo and a real hallway photo would help.
- `07_DETAIL_Storage` was cropped to remove a visible brand label ("TOM FORD").
- The "Kompletní interiéry" button goes to that section of the homepage until its own page exists.

## Design details (v10)

- **Italic accents in headings:** wrap words in `*asterisks*` in any content file to set them in Playfair italic
  (champagne on dark backgrounds, darker champagne on beige). Example: `'Prostor, *který má hodnotu.*'`
- **Services** on the homepage are expanding image panels on desktop/tablet (one always open; hover or Tab
  opens another) and swipeable cards on phones.
- **Statement band** (`Statement` in `src/components/Top.jsx`): full-width photo with one line. Used on the homepage
  (line from the Kuchyně mockup) and the complete-interiors page (line from its mockup). Images in
  `statementImages` in `src/site.config.js`.
- **Closing footer:** a large brand line with a consultation button, plus an oversized "AK Interiéry" wordmark.

## Search engines & sharing (pre-rendering)

`npm run build` renders every page to real HTML (`scripts/prerender.mjs`): each page has its own title, description,
canonical link, share image (Facebook/WhatsApp previews) and structured data for Google (company details on the
homepage, breadcrumbs on subpages). It also writes `dist/sitemap.xml`, `dist/robots.txt` and `dist/404.html`.
Titles and descriptions live in `src/seo.js`. Unknown addresses get the 404 page with a real HTTP 404 status.

## Legal pages & cookies

`/ochrana-osobnich-udaju` (privacy policy) and `/podminky-pouziti` (terms) are linked from the footer, the enquiry
form and the newsletter. The site uses no analytics or marketing cookies – it only remembers the chosen language in
the browser, which is strictly necessary – so **no cookie banner is needed**. If you add analytics or a marketing pixel
later, a consent banner becomes necessary.

## Enquiry forms (AK_Kontakt_a_formulare)

Two separate forms in `src/components/EnquiryForms.jsx`, texts in `src/forms.content.js`:
- **A – private client:** name*, phone*, e-mail*, city, what to solve* (multi-choice), project stage, timing, message,
  attachments (photos / floor plan / PDF).
- **B – B2B project:** company*, contact person*, phone*, e-mail*, company type, project type*, place, scope / units,
  timing, description*, attachments (PDF, DWG/DXF, Office, photos, ZIP) + a link field for larger documents.

Every page ends with the forms (tabs switch A/B). Buttons open the right one via `openForm({ mode, preselect })` in
`src/lib.jsx` – e.g. kitchen page → A with "Kuchyň na míru", complete-interiors page → A with "Kompletní interiér",
B2B page buttons → B, header "Nezávazná konzultace" → A.
- **Attachments:** max. 4 MB per enquiry (Vercel's request limit). Photos are shrunk in the browser first, so normal
  phone photos fit easily; larger B2B documents go through the link field. Attachments are added to the notification
  e-mail; the Node server also saves them to `server/data/uploads/`.
- **Spam:** invisible – a hidden honeypot field and a minimum fill-in time. No CAPTCHA.
- **Privacy:** a notice with a link to the privacy policy under the button (no consent checkbox – the policy processes
  enquiries as pre-contract steps, Art. 6(1)(b) GDPR). Nothing is pre-ticked.
- **Analytics hook:** a successful submission fires `ak:enquiry-sent` (`{ type: 'private' | 'b2b' }`) on `window` –
  connect it to the conversion event if analytics is added.

## Enquiry e-mails

With `.env` filled in, every enquiry sends (1) a notification to `MAIL_TO` – reply goes straight to the customer – and
(2) a confirmation to the customer in the language they used (turn off with `CONFIRM_TO_CUSTOMER=false`).
Enquiries are always saved to `server/data/consultations.jsonl` first, so an e-mail problem never loses one.
The server prints at startup whether e-mail is configured. `npm run test:email` checks the settings and sends a test.

## Where things live

| What | File |
| --- | --- |
| All Czech + English copy | `src/content.js` |
| Contact details, social links, images, gallery, testimonials | `src/site.config.js` |
| Colours, type scale, layout | `src/index.css` (tokens at the top) |
| Sections | `src/components/Top.jsx`, `src/components/Bottom.jsx` |
| Form + newsletter API | `server/index.js` |

Section order follows "2. POŘADÍ HOMEPAGE" from the control PDF:
header, hero, services (5 cards), complete interiors, how we work (01–05), selected projects,
for developers & professionals, about / values / references, final CTA, footer.

## Header versions

Two header designs are included. Pick one in `src/site.config.js`:

```js
export const headerStyle = 'modern'   // v2: floating frosted bar, hides on scroll down, scrollspy
// export const headerStyle = 'classic' // v1: original header
```

To remove v2 entirely, delete `src/components/HeaderModern.jsx` and `header-modern.css`
and set `headerStyle` to `'classic'`.

## Page transitions

Set `sectionTransition` in `src/site.config.js`:

- `'none'` (current): normal scrolling.
- `'snap'`: every scroll gesture moves one whole page, like slides. The beige block is
  split into three pages. Pages taller than the screen scroll normally inside, and the next gesture
  at their end moves on. Keyboard (arrows, PageUp/Down, Space, Home/End) and touch swipes snap too.
  Dots on the right show and jump between pages. Code: `src/snap.jsx`, `src/snap.css`.
- `'stack'`: free scrolling with pages pinning and sliding over each other (described below).

### Stacked pages

Each colour block is wrapped in a `.panel` in `src/App.jsx` and behaves like its own page:
when you reach its end it pins in place, and the next block slides up over it while the one
underneath dims and sinks back. Code: `src/stack.js`, `src/stack.css`.

- Turn off: `sectionTransition = 'none'` in `src/site.config.js`.
- Group sections differently: move sections between the `.panel` wrappers in `App.jsx`.
- Anchor links (menu, buttons) are handled by `scrollToHash` in `src/lib.jsx`, because a pinned
  page's on-screen position is not its position in the document.
- Visitors with "reduce motion" turned on get normal scrolling.

The earlier text/image reveal animation is still in the project (`src/reveal.js`), switched off
with `scrollReveal = false`.

## Brand rules applied

- Colours: Dark Brown `#1F1A16`, Warm Brown `#3A2F28`, Champagne `#C9B79E`, Light Beige `#F8F6F1`, White.
  One darker champagne (`#85725B`) is used only for small text on beige so it passes contrast.
- Fonts: Playfair Display (headings) and Montserrat (body, menu, buttons), self-hosted with
  Czech diacritics (no request to Google Fonts, which keeps the site GDPR-friendly).
- No invented numbers, years of experience or reviews (checklist in the control PDF).

## Still needed from the client (marked `TODO` in `src/site.config.js`)

1. **Real project photos for "Vybrané realizace".** The brief says this section must use genuine AK
   photography. The current images are illustrative AI visuals and carry an "Ilustrační vizualizace"
   label. Replace them and set `illustrative: false`.
2. **A pergola photo.** Both supplied `06_Pergola` files are homepage mockups, not pergolas, so the
   card shows a drawn pergola for now.
3. **A photo for the B2B section** (e.g. a residential development). It currently uses a kitchen.
4. **Final contact details and social links** (current ones are the placeholders from the mockup).
5. **Vector logo (SVG).** The logo is recreated in type from the PNG reference.
6. **Genuine client reviews.** The reviews block appears automatically once `testimonials` has entries.
7. **Detail sub-pages.** Until they exist, "Zjistit více" scrolls to the form and pre-selects that
   service. Set `href` on a service in `site.config.js` to link to its page instead.
8. Privacy policy and terms pages (footer links).

Note: `04_Custom_Furniture_Living`, `07_Complete_Interior` and `12_Gallery_Living` in the supplied
packs are the same image, as are `03_Wardrobes` and `10_Gallery_Wardrobe`.

## Form / API

`POST /api/consultation` validates input, drops bots via a honeypot, rate-limits per IP and appends
each enquiry to `server/data/consultations.jsonl`. To also receive an e-mail, copy `.env.example`
to `.env` and fill in the SMTP settings. `POST /api/newsletter` stores sign-ups the same way.

Node 20.12+ required.
