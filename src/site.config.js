// ─────────────────────────────────────────────────────────────
//  AK Interiéry – everything the client still needs to confirm
//  lives in this file. Change values here, not in components.
// ─────────────────────────────────────────────────────────────
import heroKitchen from './assets/img/hero-kitchen.webp'
import kitchenDark from './assets/img/gallery-kitchen-dark.webp'
import living from './assets/img/complete-interior.webp'
import sKitchen from './assets/img/service-kitchen.webp'
import sWardrobes from './assets/img/service-wardrobes.webp'
import sFurniture from './assets/img/service-furniture.webp'
import sDoors from './assets/img/service-doors.webp'
import gKitchen from './assets/img/gallery-kitchen.webp'
import gBedroom from './assets/img/gallery-bedroom.webp'
import gKitchenLight from './assets/img/gallery-kitchen-light.webp'
import gBedroomLight from './assets/img/gallery-bedroom-light.webp'
import gWardrobe from './assets/img/gallery-wardrobe.webp'

// Header design: 'modern' (v2, floating bar) or 'classic' (v1, original). Change to roll back.
export const headerStyle = 'modern'

// How the page moves between colour blocks:
//   'snap'  – every scroll moves one whole page, like slides (v5)
//   'stack' – pages pin and the next slides over while you scroll freely (v4)
//   'none'  – normal scrolling
export const sectionTransition = 'none'

// Text/images rise in as you scroll (tried in v3, switched off). Set to true to bring back.
export const scrollReveal = false

// TODO (client): the live domain – used for canonical links, share previews and the sitemap.
export const siteUrl = 'https://www.akinteriery.cz'

// TODO (client): legal details of the operator – shown in the privacy policy and terms of use.
export const company = {
  legalName: '[Obchodní firma / jméno podnikatele]',
  ico: '[IČO]',
  address: '[Sídlo / místo podnikání]',
  register: '[Zápis v obchodním rejstříku nebo živnostenském rejstříku]',
  privacyEmail: 'info@akinteriery.cz',
  effectiveFrom: '1. 1. 2027',
}

// TODO (client): final contact details – these are the placeholders from the visual reference.
export const contact = {
  phone: '+420 123 456 789',
  email: 'info@akinteriery.cz',
  area: 'Praha a okolí',
  social: {
    facebook: 'https://facebook.com/',
    instagram: 'https://instagram.com/',
    linkedin: 'https://linkedin.com/',
  },
}

export const heroSlides = [heroKitchen, kitchenDark, living]

// Statement band images (homepage / complete-interiors page)
import kitchenHeroWide from './assets/img/kitchen-hero.webp'
export const statementImages = { home: kitchenHeroWide, complete: gKitchenLight }

// `href: null` → "Zjistit více" scrolls to the contact form with this service pre-selected.
// Once the detail sub-pages exist, set e.g. href: '/kuchyne-na-miru'.
export const services = [
  { id: 'kitchen', image: sKitchen, href: '/kuchyne-na-miru' },
  { id: 'wardrobes', image: sWardrobes, href: '/vestavne-skrine' },
  { id: 'furniture', image: sFurniture, href: '/nabytek-na-miru' },
  { id: 'doors', image: sDoors, href: '/dvere' },
  // TODO (client): no pergola photo was supplied (both "06_Pergola" files are homepage mockups).
  // Until a real photo exists, the card shows a drawn pergola. Add `image: import(...)` to replace it.
  { id: 'pergola', image: null, href: null },
]

export const completeInterior = { main: living, detailA: gBedroom }
export const b2bImage = gKitchen

// IMPORTANT (brief): the "Realizace" section must use genuine AK project photography only.
// These are illustrative AI visuals, so each is flagged `illustrative: true` and shows a small label.
// Replace with real projects and set `illustrative: false`.
export const projects = [
  { image: gBedroom, illustrative: true, title: { cz: 'Ložnice s vestavnými skříněmi', en: 'Bedroom with built-in wardrobes' } },
  { image: kitchenDark, illustrative: true, title: { cz: 'Kuchyně v tmavém dřevě', en: 'Kitchen in dark wood' } },
  { image: gWardrobe, illustrative: true, title: { cz: 'Šatní skříň s osvětlením', en: 'Lit walk-in wardrobe' } },
  { image: gKitchenLight, illustrative: true, title: { cz: 'Světlá kuchyně s výhledem', en: 'Light kitchen with a view' } },
  { image: gBedroomLight, illustrative: true, title: { cz: 'Světlá ložnice', en: 'Light bedroom' } },
]

// Brief: genuine client reviews only – no placeholders or invented names.
// The testimonials block stays hidden while this list is empty.
// Shape: { quote: { cz, en }, author: 'Jméno, Město' }
export const testimonials = []

// ── Vestavné skříně page ─────────────────────────────────────
// Images from AK_Vestavne_skrine_IMAGES_WEB.zip. In that pack 04_Bedroom = 01_HERO and
// 05_Dark = 03_WalkIn (identical files):
//   bedroom card → 04_Bedroom (same photo as the hero)   TODO (client): a distinct bedroom photo
//   hallway card → 08_DETAIL_Doors                        TODO (client): a real hallway wardrobe photo
// 07_DETAIL_Storage is cropped to remove a visible brand label.
import wHero from './assets/img/gallery-bedroom.webp'            // = 01_HERO_Wardrobe
import wSliding from './assets/img/service-doors.webp'          // = 02_Sliding_Wardrobe
import wWalkIn from './assets/img/service-wardrobes.webp'       // = 03_WalkIn_Wardrobe
import wLighting from './assets/img/wardrobe-detail-lighting.webp'
import wStorage from './assets/img/wardrobe-detail-storage.webp'
import wDoors from './assets/img/wardrobe-detail-doors.webp'

export const wardrobesPage = {
  hero: wHero,
  types: [wSliding, wWalkIn, wHero, wDoors],
  details: { main: wLighting, wide: wStorage },
  complete: living,
  // Brief: genuine AK photos only. Section stays hidden while empty.
  // Shape: { image: import(...), title: { cz, en } }
  projects: [],
}

// ── Kompletní interiéry page ─────────────────────────────────
// From AK_Kompletni_interiery_IMAGES_WEB.zip. Only 06 and 08 are new; the others are the same files
// as homepage/wardrobe photos (01 = 02 = complete-interior, 03 = kitchen, 04 = bedroom,
// 05 = walk-in, 07 = hero kitchen). Because 01 and 02 are identical, section 02 uses
// 06_Interior_Detail. Card 4 (doors) uses the doors detail – 06 shows a kitchen, not doors.
// 08_DETAIL_Materials: a visible book title ("THE KINFOLK BOOK") was softened out.
import cMaterials from './assets/img/complete-materials.webp'
import cLivingKitchen from './assets/img/complete-living-kitchen.webp'

export const completePage = {
  hero: living,                          // 01_HERO_Complete_Interior
  meaning: cLivingKitchen,               // 06_Interior_Detail (02 is identical to the hero)
  include: [
    { image: sKitchen, href: '/kuchyne-na-miru' },   // 03
    { image: sWardrobes, href: '/vestavne-skrine' }, // 05
    { image: gBedroom, href: '/nabytek-na-miru' },   // 04
    { image: wDoors, href: '/dvere' },
  ],
  design: cMaterials,                    // 08_DETAIL_Materials
  ctaImage: heroKitchen,                 // 07_Kitchen_Dining
  // Brief: genuine AK photos only. Section stays hidden while empty.
  projects: [],
}

// ── Kuchyně na míru page ─────────────────────────────────────
// From AK_Kuchyne_na_miru_IMAGES_WEB.zip. Some files are the same as photos already used elsewhere:
// 03 = homepage hero kitchen, 05 = homepage gallery kitchen, 06 = homepage kitchen card,
// 07 = complete-interiors section 02. Used here as the pack's README specifies.
import kHero from './assets/img/kitchen-hero.webp'
import kLight from './assets/img/kitchen-style-light.webp'
import kMinimal from './assets/img/kitchen-style-minimal.webp'
import kWorktop from './assets/img/kitchen-detail-worktop.webp'
import kCabinetry from './assets/img/kitchen-detail-cabinetry.webp'
import kSink from './assets/img/kitchen-detail-sink.webp'

export const kitchenPage = {
  hero: kHero,                                  // 01_HERO_Kitchen
  intro: sKitchen,                              // 06_SECTION_Kitchen_Dining
  styles: [kLight, heroKitchen, kMinimal, gKitchen], // 02, 03, 04, 05
  details: [kWorktop, kCabinetry, kSink],       // 08, 09, 10
  complete: living,
  ctaImage: cLivingKitchen,                     // 07_LIFESTYLE_Kitchen
  // Brief: genuine AK photos only. Section stays hidden while empty.
  projects: [],
}

// ── Dveře a interiérové prvky page ───────────────────────────
// From AK_Dvere_IMAGES_WEB.zip, placed as the text document specifies (hero 01, cards 02–05, details 06–08).
// TODO (client): NONE of these images show interior doors – they are crops of wardrobe, living-room and
// dining photos (01 = the complete-interior hero). Replace with real door photography:
// hinged wooden door, flush/hidden door, sliding door, glazed door/partition, plus surface & handle details.
import d02 from './assets/img/doors-02-door-wood.webp'
import d03 from './assets/img/doors-03-door-integrated.webp'
import d04 from './assets/img/doors-04-door-dark-premium.webp'
import d05 from './assets/img/doors-05-door-interior-context.webp'
import d06 from './assets/img/doors-06-detail-wood-surface.webp'
import d07 from './assets/img/doors-07-detail-dark-surface.webp'
import d08 from './assets/img/doors-08-detail-joinery.webp'

export const doorsPage = {
  hero: living,                 // 01_HERO_Interior_Doors (same file as the complete-interior hero)
  types: [d02, d03, d04, d05],  // 02–05
  details: [d06, d07, d08],     // 06–08
  complete: kitchenDark,
  // Brief: genuine AK photos only. Section stays hidden while empty.
  projects: [],
}

// ── Nábytek na míru page ─────────────────────────────────────
// From AK_Nabytek_na_miru_IMAGES_WEB.zip. In that pack 01, 02, 03 ("Home Office") and 06 are the same file
// (the living-room photo), 04 = bedroom, 05 = walk-in, and 07/09 are near-identical coffee-table crops.
// To avoid repeating the hero on the cards and showing two identical details:
//   living-room card → living/kitchen interior · studies card → lit shelving (closest to a library)
//   details → 07 (book title softened), 08, kitchen cabinetry detail instead of 09
// TODO (client): a real study/home-office photo and a living-room furniture photo (TV wall, library).
import fWood from './assets/img/furniture-detail-wood.webp'
import fCabinet from './assets/img/furniture-detail-cabinet.webp'

export const furniturePage = {
  hero: living,                                        // 01_HERO_Living_Furniture
  types: [cLivingKitchen, wLighting, gBedroom, sWardrobes],
  details: [fWood, fCabinet, kCabinetry],
  complete: kMinimal,
  // Brief: genuine AK photos only. Section stays hidden while empty.
  projects: [],
}
