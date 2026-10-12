// ─────────────────────────────────────────────────────────────
//  NAŠE REALIZACE – real AK projects (brief: AK_INTERIERY_NASE_REALIZACE_KONTROLNI_PDF)
//  ONLY genuine, client-approved AK photos/videos. No AI or stock images, no invented customer names,
//  locations, dates, counts or certifications.
//
//  While `projects` is empty: the homepage section and every project card stay hidden, the /realizace page
//  shows only its heading, intro and the enquiry form, and no project pages exist.
// ─────────────────────────────────────────────────────────────
//
//  How to add a project:
//  1. Photos → src/assets/realizace/<slug>/… (WebP preferred), then import them below.
//     Videos → public/realizace/<slug>/… (MP4 + WebM if available) and reference them by URL.
//  2. Add an entry to `projects`:
//
//  import kuchyneBrevnovCover from './assets/realizace/kuchyne-brevnov/01.webp'
//  {
//    slug: 'kuchyne-brevnov',                       // → URL /realizace/kuchyne-brevnov (unique, a–z, 0–9, -)
//    category: 'kitchen',                           // one of CATEGORY_IDS below
//    title: { cz: 'Kuchyně s ostrůvkem', en: 'Kitchen with an island' },
//    cover: kuchyneBrevnovCover,                    // card + main image
//    featured: true,                                // show on the homepage (max 6; otherwise newest first)
//    description: { cz: '…verified text…', en: '…' },
//    scope: { cz: ['Kuchyně na míru', 'Kamenná pracovní deska'], en: [...] }, // optional, only if confirmed
//    media: [                                       // gallery, in order
//      { type: 'image', src: kuchyneBrevnov02, alt: { cz: '…', en: '…' } },
//      { type: 'video', src: '/realizace/kuchyne-brevnov/montaz.mp4', webm: '/realizace/kuchyne-brevnov/montaz.webm',
//        poster: kuchyneBrevnovPoster, alt: { cz: 'Montáž kuchyně', en: 'Kitchen installation' } },
//    ],
//  },

export const CATEGORY_IDS = ['kitchen', 'furniture', 'stone', 'complete', 'other']

// ── Projekt 01: Moderní kuchyně s kamenným ostrůvkem ──
// Photos: REALIZACE_01_KUCHYNE (client-supplied, rights + scope confirmed by AK 12. 10. 2026). Files unchanged;
// any cropping is done in CSS. Copy: AK_INTERIERY_REALIZACE_MEDIA_WEBAR (section 04). The two supplied videos show
// OTHER interiors and are kept unpublished in /media-pending (section 07).
// TODO (client): add the exact scope of AK's work to `scope` once written up (brief: do not claim complete delivery).
import k01 from './assets/realizace/moderni-kuchyne/kuchyne-01.webp'
import k02 from './assets/realizace/moderni-kuchyne/kuchyne-02.webp'
import k03 from './assets/realizace/moderni-kuchyne/kuchyne-03.webp'
import k06 from './assets/realizace/moderni-kuchyne/kuchyne-06.webp'
import k07 from './assets/realizace/moderni-kuchyne/kuchyne-07.webp'
import k08 from './assets/realizace/moderni-kuchyne/kuchyne-08.webp'
import k09 from './assets/realizace/moderni-kuchyne/kuchyne-09.webp'
import k10 from './assets/realizace/moderni-kuchyne/kuchyne-10.webp'
import k11 from './assets/realizace/moderni-kuchyne/kuchyne-11.webp'

const img = (src, cz, en) => ({ type: 'image', src, alt: { cz, en } })

export const projects = [
  {
    slug: 'moderni-kuchyne-s-kamennym-ostruvkem',
    category: 'kitchen',
    featured: true,
    title: { cz: 'Moderní kuchyně s kamenným ostrůvkem', en: 'Modern kitchen with a stone island' },
    cover: k01,
    coverAlt: { cz: 'Moderní kuchyně se dvěma ostrůvky, závěsnými světly a prosklenými vitrínami', en: 'Modern kitchen with two islands, pendant lights and glazed display cabinets' },
    coverPosition: '50% 58%', // CSS crop of the portrait photo for wide cards
    description: {
      cz: 'Moderní kuchyňský prostor s výrazným kamenným ostrůvkem, tmavými nábytkovými plochami, prosklenými vitrínami a promyšleným osvětlením. Kombinace kontrastních materiálů a jemných detailů vytváří reprezentativní a funkční celek.',
      en: 'A modern kitchen space with a striking stone island, dark cabinetry, glazed display cabinets and carefully considered lighting. The combination of contrasting materials and fine details creates a representative and functional whole.',
    },
    // detail of the stone worktop – used for the cross-link on the Kámen a kamenické realizace page
    stoneDetail: k07,
    media: [
      img(k08, 'Pohled na kuchyň se dvěma ostrůvky a závěsnými světly', 'View of the kitchen with two islands and pendant lights'),
      img(k03, 'Ostrůvek s nasvícenou hranou, v pozadí prosklené vitríny', 'Island with an illuminated edge, glazed cabinets behind'),
      img(k02, 'Pracovní deska ostrůvku s dřezem a zlatou baterií', 'Island worktop with sink and gold tap'),
      img(k07, 'Detail kamenné pracovní desky', 'Detail of the stone worktop'),
      img(k10, 'Prosklené vitríny s integrovaným osvětlením', 'Glazed display cabinets with integrated lighting'),
      img(k06, 'Kuchyň pod střešním oknem, v popředí jídelní stůl', 'Kitchen under the roof light, dining table in the foreground'),
      img(k09, 'Jídelní stůl a pohled do kuchyně', 'Dining table and view of the kitchen'),
      img(k11, 'Kuchyňská linka s nasvícenou hranou a vestavěnými spotřebiči', 'Kitchen run with illuminated edge and built-in appliances'),
    ],
  },
]

// ── Návrhy a vizualizace – 3D RENDERINGS, NOT completed work (always shown in their own, clearly labelled section) ──
import n01 from './assets/navrhy/navrh-01.webp'
import n02 from './assets/navrhy/navrh-02.webp'
import n03 from './assets/navrhy/navrh-03.webp'
import n04 from './assets/navrhy/navrh-04.webp'
import n05 from './assets/navrhy/navrh-05.webp'
import n06 from './assets/navrhy/navrh-06.webp'
import n07 from './assets/navrhy/navrh-07.webp'
import n08 from './assets/navrhy/navrh-08.webp'
import n09 from './assets/navrhy/navrh-09.webp'
import n10 from './assets/navrhy/navrh-10.webp'

const viz = (src, cz, en) => ({ src, label: { cz: `3D vizualizace ${cz}`, en: `3D visualisation – ${en}` } })
export const visualisations = [
  viz(n10, 'kuchyně', 'kitchen'),
  viz(n06, 'obývacího pokoje', 'living room'),
  viz(n09, 'obývacího pokoje s TV stěnou', 'living room with TV wall'),
  viz(n07, 'obývacího pokoje s knihovnou', 'living room with library'),
  viz(n08, 'ložnice', 'bedroom'),
  viz(n04, 'šatny', 'walk-in wardrobe'),
  viz(n01, 'koupelny', 'bathroom'),
  viz(n02, 'koupelny', 'bathroom'),
  viz(n03, 'koupelny', 'bathroom'),
  viz(n05, 'WC', 'WC'),
]

// ── Videa z realizací ── (client-supplied 12. 10. 2026, added to Naše realizace at the client's request)
// Sound removed, re-encoded H.264 MP4 + VP9 WebM (no audio track) in public/realizace/videa/. Shown muted, looping, playing only
// while on screen. Captions describe only what is visible – no customer names, places or dates.
import vp1 from './assets/realizace/videa/video-01-poster.webp'
import vp2 from './assets/realizace/videa/video-02-poster.webp'
import vp3 from './assets/realizace/videa/video-03-poster.webp'
import vp4 from './assets/realizace/videa/video-04-poster.webp'
// the single-file preview is published next to the video files, so it uses relative paths
const VIDEO_BASE = import.meta.env.VITE_DEMO === '1' ? 'realizace/videa/' : '/realizace/videa/'
const clip = (n, poster, cz, en) => ({ src: `${VIDEO_BASE}video-0${n}.mp4`, webm: `${VIDEO_BASE}video-0${n}.webm`, poster, label: { cz, en } })
export const projectVideos = [
  clip(1, vp1, 'Obývací pokoj s lamelovou stěnou a TV', 'Living room with a slatted wall and TV'),
  clip(2, vp2, 'Kuchyně s dřevěným dekorem a kamenným ostrůvkem', 'Kitchen with wood décor and a stone island'),
  clip(3, vp3, 'TV stěna s krbem a prosklenými vitrínami', 'TV wall with a fireplace and glazed cabinets'),
  clip(4, vp4, 'Světlá kuchyně s ostrůvkem', 'Light kitchen with an island'),
]

export const projectBySlug = (slug) => projects.find((p) => p.slug === slug)
export const projectPath = (p) => `/realizace/${p.slug}`
// homepage: featured projects first, max 6
export const homepageProjects = () => [...projects.filter((p) => p.featured), ...projects.filter((p) => !p.featured)].slice(0, 6)
// filter categories that actually have content (brief: only publish categories with genuine content)
export const usedCategories = () => CATEGORY_IDS.filter((c) => projects.some((p) => p.category === c))
export const hasVideo = (p) => p.media?.some((m) => m.type === 'video')
export const projectsIn = (category) => projects.filter((p) => p.category === category)
