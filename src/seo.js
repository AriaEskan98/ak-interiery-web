// Search & share data for every page – used by the pre-renderer (scripts/prerender.mjs) for the HTML <head>,
// and in the browser to keep title/description in sync when navigating or switching language.
import { useEffect } from 'react'
import { useLang } from './lib.jsx'
import { siteUrl, contact, company } from './site.config.js'
import { heroSlides, wardrobesPage, completePage, kitchenPage, doorsPage, furniturePage } from './site.config.js'

export const SEO = {
  home: {
    path: '/', image: heroSlides[0],
    cz: { title: 'AK Interiéry – kuchyně, nábytek a kompletní interiéry na míru | Praha',
          description: 'Navrhujeme a realizujeme interiéry na míru od prvního návrhu po montáž: kuchyně, vestavné skříně, nábytek, dveře i kompletní interiéry. Praha a okolí.' },
    en: { title: 'AK Interiors – bespoke kitchens, furniture and complete interiors | Prague',
          description: 'We design and deliver bespoke interiors from the first concept to installation: kitchens, built-in wardrobes, furniture, doors and complete interiors. Prague and surroundings.' },
  },
  kitchen: {
    path: '/kuchyne-na-miru', image: kitchenPage.hero, crumb: 'Kuchyně na míru',
    cz: { title: 'Kuchyně na míru – návrh, výroba a montáž | AK Interiéry',
          description: 'Kuchyně na míru navržené podle vašeho prostoru a způsobu života. Návrh, materiály, výroba a montáž od jednoho partnera. Praha a okolí.' },
    en: { title: 'Bespoke kitchens – design, manufacture and installation | AK Interiors',
          description: 'Bespoke kitchens designed around your space and the way you live. Design, materials, manufacture and installation from one partner.' },
  },
  wardrobes: {
    path: '/vestavne-skrine', image: wardrobesPage.hero, crumb: 'Vestavné skříně',
    cz: { title: 'Vestavné skříně na míru – posuvné skříně a šatny | AK Interiéry',
          description: 'Vestavné skříně, šatní systémy a úložné prostory na míru. Navrhneme rozměry, vnitřní členění, materiály i osvětlení. Výroba a montáž.' },
    en: { title: 'Bespoke built-in wardrobes and walk-ins | AK Interiors',
          description: 'Built-in wardrobes, walk-in systems and storage made to measure – dimensions, interior layout, materials and lighting. Manufacture and installation.' },
  },
  furniture: {
    path: '/nabytek-na-miru', image: furniturePage.hero, crumb: 'Nábytek na míru',
    cz: { title: 'Nábytek na míru – obývací pokoje, pracovny, ložnice | AK Interiéry',
          description: 'Nábytek na míru pro obývací pokoje, pracovny, ložnice i atypické prostory. Od jednoho kusu po kompletní řešení místnosti.' },
    en: { title: 'Bespoke furniture – living rooms, studies, bedrooms | AK Interiors',
          description: 'Bespoke furniture for living rooms, studies, bedrooms and unusual spaces. From a single piece to a complete room.' },
  },
  doors: {
    path: '/dvere', image: doorsPage.details[0], crumb: 'Dveře a interiérové prvky',
    cz: { title: 'Interiérové dveře a interiérové prvky na míru | AK Interiéry',
          description: 'Dřevěné, skryté, posuvné i prosklené dveře sladěné s celým interiérem. Výběr povrchů, zárubní a kování, dodání a montáž.' },
    en: { title: 'Interior doors and interior elements | AK Interiors',
          description: 'Wooden, hidden, sliding and glazed doors matched to the whole interior. Finishes, frames and hardware, delivery and installation.' },
  },
  complete: {
    path: '/kompletni-interiery', image: completePage.hero, crumb: 'Kompletní interiéry',
    cz: { title: 'Kompletní interiéry na míru – jeden partner pro celý domov | AK Interiéry',
          description: 'Kuchyně, nábytek, vestavné skříně, dveře a další prvky jako jeden promyšlený celek. Návrh, koordinace, výroba a montáž od jednoho partnera.' },
    en: { title: 'Complete bespoke interiors – one partner for the whole home | AK Interiors',
          description: 'Kitchens, furniture, built-in wardrobes, doors and more as one considered whole. Design, coordination, manufacture and installation from one partner.' },
  },
  privacy: {
    path: '/ochrana-osobnich-udaju', image: heroSlides[0], crumb: 'Ochrana osobních údajů',
    cz: { title: 'Ochrana osobních údajů | AK Interiéry', description: 'Jak AK Interiéry zpracovávají osobní údaje z poptávkového formuláře a newsletteru a jaká máte práva.' },
    en: { title: 'Privacy policy | AK Interiors', description: 'How AK Interiors processes personal data from the enquiry form and newsletter, and your rights.' },
  },
  terms: {
    path: '/podminky-pouziti', image: heroSlides[0], crumb: 'Podmínky použití',
    cz: { title: 'Podmínky použití webu | AK Interiéry', description: 'Podmínky používání webu AK Interiéry.' },
    en: { title: 'Terms of use | AK Interiors', description: 'Terms of use of the AK Interiors website.' },
  },
  notfound: {
    path: null, image: heroSlides[0], noindex: true,
    cz: { title: 'Stránka nenalezena | AK Interiéry', description: 'Tuto stránku jsme nenašli.' },
    en: { title: 'Page not found | AK Interiors', description: 'We could not find this page.' },
  },
}

const abs = (p) => siteUrl.replace(/\/$/, '') + p

// Structured data Google understands (company details, breadcrumbs).
export function jsonLd(route) {
  const page = SEO[route]
  const business = {
    '@context': 'https://schema.org',
    '@type': 'HomeAndConstructionBusiness',
    name: 'AK Interiéry',
    legalName: company.legalName,
    url: abs('/'),
    image: abs(SEO.home.image),
    telephone: contact.phone,
    email: contact.email,
    areaServed: contact.area,
    address: { '@type': 'PostalAddress', addressLocality: 'Praha', addressCountry: 'CZ' },
    description: SEO.home.cz.description,
  }
  if (route === 'home') return [business]
  if (!page?.path) return []
  return [{
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Úvod', item: abs('/') },
      { '@type': 'ListItem', position: 2, name: page.crumb, item: abs(page.path) },
    ],
  }]
}

// <head> tags for the pre-rendered HTML (Czech is the primary language of the site).
export function headTags(route) {
  const page = SEO[route] || SEO.notfound
  const m = page.cz
  const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')
  const tags = [
    `<title>${esc(m.title)}</title>`,
    `<meta name="description" content="${esc(m.description)}" />`,
    page.noindex ? '<meta name="robots" content="noindex" />' : `<link rel="canonical" href="${abs(page.path)}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="AK Interiéry" />`,
    `<meta property="og:locale" content="cs_CZ" />`,
    `<meta property="og:title" content="${esc(m.title)}" />`,
    `<meta property="og:description" content="${esc(m.description)}" />`,
    page.path ? `<meta property="og:url" content="${abs(page.path)}" />` : '',
    `<meta property="og:image" content="${abs(page.image)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    ...jsonLd(route).map((d) => `<script type="application/ld+json">${JSON.stringify(d).replace(/</g, '\\u003c')}</script>`),
  ]
  return tags.filter(Boolean).join('\n    ')
}

// Browser: keep the title and description in sync with the page and language.
export function useSeo(route) {
  const { lang } = useLang()
  useEffect(() => {
    const m = (SEO[route] || SEO.notfound)[lang]
    document.title = m.title
    const set = (sel, attr, val) => { const el = document.head.querySelector(sel); if (el) el.setAttribute(attr, val) }
    set('meta[name="description"]', 'content', m.description)
    set('meta[property="og:title"]', 'content', m.title)
    set('meta[property="og:description"]', 'content', m.description)
    const page = SEO[route]
    if (page?.path) set('link[rel="canonical"]', 'href', abs(page.path))
  }, [route, lang])
}
