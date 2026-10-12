// Search & share data for every page – used by the pre-renderer (scripts/prerender.mjs) for the HTML <head>,
// and in the browser to keep title/description in sync when navigating or switching language.
import { useEffect } from 'react'
import { useLang } from './lib.jsx'
import { projectBySlug } from './realizace.js'
import { siteUrl, contact, company } from './site.config.js'
import { heroSlides, wardrobesPage, completePage, kitchenPage, doorsPage, furniturePage, b2bPage } from './site.config.js'

export const SEO = {
  home: {
    path: '/', image: heroSlides[0],
    cz: { title: 'AK Interiéry – kuchyně, nábytek a kompletní interiéry na míru | Orlová',
          description: 'Navrhujeme a realizujeme interiéry na míru od prvního návrhu po montáž: kuchyně, vestavné skříně, nábytek, dveře i kompletní interiéry. Orlová a okolí.' },
    en: { title: 'AK Interiors – bespoke kitchens, furniture and complete interiors | Orlová',
          description: 'We design and deliver bespoke interiors from the first concept to installation: kitchens, built-in wardrobes, furniture, doors and complete interiors. Orlová and surroundings.' },
  },
  kitchen: {
    path: '/kuchyne-na-miru', image: kitchenPage.hero, crumb: 'Kuchyně na míru',
    cz: { title: 'Kuchyně na míru – návrh, výroba a montáž | AK Interiéry',
          description: 'Kuchyně na míru navržené podle vašeho prostoru a způsobu života. Návrh, materiály, výroba a montáž od jednoho partnera. Orlová a okolí.' },
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
  stone: {
    path: '/kamen', image: heroSlides[0], crumb: 'Kámen a kamenické realizace',
    cz: { title: 'Kámen a kamenické realizace – technický i přírodní kámen na míru | AK Interiéry',
          description: 'Technický i přírodní kámen pro kuchyně, koupelny, obklady a projekty na míru. Řezání, frézování, výroba, doprava a montáž ve vlastní dílně.' },
    en: { title: 'Stone & stone fabrication – technical and natural stone | AK Interiors',
          description: 'Technical and natural stone for kitchens, bathrooms, cladding and bespoke projects. Cutting, milling, fabrication, delivery and installation in our own workshop.' },
  },
  complete: {
    path: '/kompletni-interiery', image: completePage.hero, crumb: 'Kompletní interiéry',
    cz: { title: 'Kompletní interiéry na míru – jeden partner pro celý domov | AK Interiéry',
          description: 'Kuchyně, nábytek, vestavné skříně, dveře a další prvky jako jeden promyšlený celek. Návrh, koordinace, výroba a montáž od jednoho partnera.' },
    en: { title: 'Complete bespoke interiors – one partner for the whole home | AK Interiors',
          description: 'Kitchens, furniture, built-in wardrobes, doors and more as one considered whole. Design, coordination, manufacture and installation from one partner.' },
  },
  b2b: {
    path: '/pro-profesionaly', image: b2bPage.hero, crumb: 'Pro developery a profesionály',
    cz: { title: 'B2B – výroba, dodávka a montáž pro developery a profesionály | AK Interiéry',
          description: 'Partner pro výrobu a realizaci projektů: interiérová i exteriérová řešení na míru, sériové dodávky, subdodávky, atypická výroba a montáž pro developery, stavební firmy a investory.' },
    en: { title: 'B2B – manufacturing, delivery and installation for developers | AK Interiors',
          description: 'A partner for manufacturing and delivering projects: bespoke interior and exterior solutions, serial deliveries, subcontracting, bespoke manufacturing and installation.' },
  },
  about: {
    path: '/o-nas', image: heroSlides[0], crumb: 'O nás',
    cz: { title: 'O nás – partner pro prostor, který má fungovat | AK Interiéry',
          description: 'Nasloucháme zadání, přemýšlíme nad prostorem v souvislostech a přebíráme odpovědnost za výsledek. Od jednoho detailu po celý interiér, od návrhu po realizaci.' },
    en: { title: 'About us – a partner for spaces that have to work | AK Interiors',
          description: 'We listen to the brief, think about the space as a whole and take responsibility for the result. From a single detail to the whole interior.' },
  },
  contact: {
    path: '/kontakt', image: heroSlides[0], crumb: 'Kontakt',
    cz: { title: 'Kontakt – nezávazná poptávka | AK Interiéry',
          description: 'Napište nám o svém projektu – kuchyně, nábytek na míru, celý interiér nebo B2B zakázka. Telefon +420 604 596 169, info@akinteriery.com.' },
    en: { title: 'Contact – send an enquiry | AK Interiors',
          description: 'Tell us about your project – a kitchen, bespoke furniture, a whole interior or a B2B contract. Phone +420 604 596 169, info@akinteriery.com.' },
  },
  work: {
    path: '/realizace', image: heroSlides[0], crumb: 'Naše realizace',
    cz: { title: 'Naše realizace – skutečné projekty AK Interiéry', description: 'Nahlédněte do našich skutečných projektů: kuchyně a nábytek na míru, kamenické realizace a kompletní interiéry.' },
    en: { title: 'Our projects – real AK Interiors work', description: 'Take a look at our real projects: bespoke kitchens and furniture, stonework and complete interiors.' },
  },
  production: {
    path: '/nase-vyroba', image: heroSlides[0], crumb: 'Naše výroba',
    cz: { title: 'Naše výroba – nábytek, CNC a MDF, kámen a plexisklo na míru | AK Interiéry',
          description: 'Vlastní výroba nábytku, CNC opracování dřeva a MDF, kamenická výroba a zpracování plexiskla. Zakázková výroba i pro firemní partnery.' },
    en: { title: 'Our manufacturing – furniture, CNC & MDF, stone and acrylic glass | AK Interiors',
          description: 'In-house furniture manufacturing, CNC machining of wood and MDF, stone fabrication and acrylic glass processing. Custom manufacturing for business partners too.' },
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

// German titles and descriptions – MASTER DE 1.0, 16.03 (privacy/terms/404 = UI).
const SEO_DE = {
  home: { title: 'AK INTERIÉRY | Küchen, Möbel und Stein nach Maß', description: 'Maßgefertigte Küchen, Möbel, Türen und Steinlösungen. Entdecken Sie die eigene Fertigung und die individuellen Einrichtungsmöglichkeiten von AK INTERIÉRY.' },
  kitchen: { title: 'Küchen nach Maß | AK INTERIÉRY', description: 'Individuelle Küchenplanung, abgestimmte Materialien und maßgefertigte Lösungen. Entdecken Sie unsere Küchen und fragen Sie Ihr Projekt bei AK INTERIÉRY an.' },
  wardrobes: { title: 'Einbauschränke nach Maß | AK INTERIÉRY', description: 'Einbauschränke, Ankleiden und Stauraum passend zu Ihrem Raum. Entdecken Sie individuelle Aufteilungen und Gestaltungsmöglichkeiten von AK INTERIÉRY.' },
  furniture: { title: 'Möbel nach Maß | AK INTERIÉRY', description: 'Individuelle Möbel für Wohnräume, Arbeitszimmer und Schlafzimmer. AK INTERIÉRY plant und fertigt Lösungen passend zu Ihrem Raum und Ihren Anforderungen.' },
  doors: { title: 'Türen und Innenausbau-Elemente | AK INTERIÉRY', description: 'Türen, Oberflächen und Details passend zur gesamten Einrichtung. Entdecken Sie die Lösungen von AK INTERIÉRY und fragen Sie Ihr Projekt an.' },
  complete: { title: 'Komplette Inneneinrichtungen | AK INTERIÉRY', description: 'Küchen, Möbel, Einbauschränke und Türen als stimmiges Ganzes. AK INTERIÉRY begleitet Ihre Einrichtung vom Entwurf bis zur vereinbarten Umsetzung.' },
  stone: { title: 'Stein und Steinverarbeitung | AK INTERIÉRY', description: 'Kunststein und Naturstein nach Maß. Entdecken Sie Dekore, Arbeitsplatten und individuelle Bauteile aus der eigenen Steinbearbeitung von AK INTERIÉRY.' },
  production: { title: 'Eigene Fertigung und CNC-Bearbeitung | AK INTERIÉRY', description: 'Möbelfertigung, Holz- und MDF-Bearbeitung, Steinbearbeitung und Acrylglas. Entdecken Sie die auftragsbezogenen Fertigungsmöglichkeiten von AK INTERIÉRY.' },
  b2b: { title: 'Fertigung und Projektumsetzung für Unternehmen | AK INTERIÉRY', description: 'Individuelle Fertigung, Lieferung und Montage für Projektentwickler, Bauunternehmen und Immobilienverwaltungen. Fragen Sie Ihre B2B-Zusammenarbeit an.' },
  about: { title: 'Über uns | AK INTERIÉRY', description: 'Lernen Sie AK INTERIÉRY kennen: individuelle Lösungen, eigene Fertigung und abgestimmte Einrichtungen – vom einzelnen Detail bis zum gesamten Projekt.' },
  work: { title: 'Unsere Projekte | AK INTERIÉRY', description: 'Entdecken Sie ausgewählte Projekte, maßgefertigte Möbel und Details unserer Arbeiten. Finden Sie Anregungen für Ihr eigenes Projekt mit AK INTERIÉRY.' },
  contact: { title: 'Kontakt und Projektanfrage | AK INTERIÉRY', description: 'Planen Sie eine Küche, Möbel, Steinbauteile oder eine gesamte Einrichtung? Kontaktieren Sie AK INTERIÉRY und besprechen Sie Ihr Projekt mit uns.' },
  privacy: { title: 'Datenschutzhinweise | AK INTERIÉRY', description: 'Wie AK INTERIÉRY personenbezogene Daten aus dem Anfrageformular und dem Newsletter verarbeitet.' },
  terms: { title: 'Nutzungsbedingungen | AK INTERIÉRY', description: 'Nutzungsbedingungen der Website von AK INTERIÉRY.' },
  notfound: { title: 'Seite nicht gefunden | AK INTERIÉRY', description: 'Diese Seite wurde nicht gefunden.' },
}
for (const [k, v] of Object.entries(SEO_DE)) if (SEO[k]) SEO[k].de = v

const abs = (p) => siteUrl.replace(/\/$/, '') + p

// SEO data for a route; project pages (/realizace/<slug>) are built from src/realizace.js.
export function pageSeo(route, path = '') {
  if (route !== 'project') return SEO[route] || SEO.notfound
  const p = projectBySlug(path.split('/').filter(Boolean)[1])
  if (!p) return SEO.notfound
  const desc = (l) => (p.description?.[l] || SEO.work[l].description).replace(/\s+/g, ' ').slice(0, 155)
  return {
    path: `/realizace/${p.slug}`, image: p.cover, crumb: p.title.cz, parent: SEO.work,
    cz: { title: `${p.title.cz} | Naše realizace | AK Interiéry`, description: desc('cz') },
    en: { title: `${p.title.en || p.title.cz} | Our projects | AK Interiors`, description: desc('en') },
    de: { title: `${p.title.de || p.title.cz} | Unsere Projekte | AK INTERIÉRY`, description: desc('de') },
  }
}

// Structured data Google understands (company details, breadcrumbs).
export function jsonLd(route, path) {
  const page = pageSeo(route, path)
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
    address: { '@type': 'PostalAddress', streetAddress: company.street, postalCode: company.postalCode, addressLocality: company.city, addressCountry: 'CZ' },
    description: SEO.home.cz.description,
  }
  if (route === 'home') return [business]
  if (!page?.path) return []
  return [{
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Úvod', item: abs('/') },
      ...(page.parent ? [{ '@type': 'ListItem', position: 2, name: page.parent.crumb, item: abs(page.parent.path) }] : []),
      { '@type': 'ListItem', position: page.parent ? 3 : 2, name: page.crumb, item: abs(page.path) },
    ],
  }]
}

// <head> tags for the pre-rendered HTML (Czech is the primary language of the site).
export function headTags(route, path) {
  const page = pageSeo(route, path)
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
    ...jsonLd(route, path).map((d) => `<script type="application/ld+json">${JSON.stringify(d).replace(/</g, '\\u003c')}</script>`),
  ]
  return tags.filter(Boolean).join('\n    ')
}

// Browser: keep the title and description in sync with the page and language.
export function useSeo(route, path) {
  const { lang } = useLang()
  useEffect(() => {
    const page = pageSeo(route, path)
    const m = page[lang] || page.cz
    document.title = m.title
    const set = (sel, attr, val) => { const el = document.head.querySelector(sel); if (el) el.setAttribute(attr, val) }
    set('meta[name="description"]', 'content', m.description)
    set('meta[property="og:title"]', 'content', m.title)
    set('meta[property="og:description"]', 'content', m.description)
    if (page.path) set('link[rel="canonical"]', 'href', abs(page.path))
  }, [route, path, lang])
}
