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
| `/kompletni-interiery` | Complete interiors / Home Design (`src/pages/CompletePage.jsx`) | Menu "Interiéry", Homepage → Kompletní interiéry, wardrobe page |

Routing is in `src/router.jsx` (no extra dependency). Add a page by adding it to `ROUTES` there and to
`PAGES` in `src/App.jsx`, then set the matching service's `href` in `src/site.config.js`.
Menu links to homepage sections (e.g. "Realizace") work from every page.

### Furniture page – open items
- English texts are our translations – review `src/pages/furniture.content.js`.
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
