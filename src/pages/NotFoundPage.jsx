// 404 – shown for any unknown address (the server also returns HTTP status 404).
import { useLang, Rich } from '../lib.jsx'
import { Icon } from '../components/Icons.jsx'
import { heroSlides } from '../site.config.js'
import './legal.css'

const copy = {
  cz: {
    eyebrow: 'Chyba 404', title: 'Tuto stránku *jsme nenašli.*',
    text: 'Adresa mohla být zadána chybně, nebo stránka už neexistuje. Zkuste některou z našich služeb nebo se vraťte na úvod.',
    home: 'Zpět na úvod', contact: 'Napište nám',
    links: [['Kuchyně na míru', '/kuchyne-na-miru'], ['Vestavné skříně', '/vestavne-skrine'], ['Nábytek na míru', '/nabytek-na-miru'], ['Dveře a interiérové prvky', '/dvere'], ['Kompletní interiéry', '/kompletni-interiery']],
  },
  en: {
    eyebrow: 'Error 404', title: 'We could not *find this page.*',
    text: 'The address may be mistyped, or the page no longer exists. Try one of our services or go back to the homepage.',
    home: 'Back to homepage', contact: 'Contact us',
    links: [['Bespoke kitchens', '/kuchyne-na-miru'], ['Built-in wardrobes', '/vestavne-skrine'], ['Bespoke furniture', '/nabytek-na-miru'], ['Doors & interior elements', '/dvere'], ['Complete interiors', '/kompletni-interiery']],
  },  de: { // MASTER DE 1.0 – 16.01.13–15
    eyebrow: 'Fehler 404', title: 'Diese Seite *wurde nicht gefunden.*',
    text: 'Die gewünschte Seite ist nicht verfügbar. Kehren Sie zur Startseite zurück oder kontaktieren Sie uns.',
    home: 'Zur Startseite', contact: 'Kontakt aufnehmen',
    links: [['Küchen nach Maß', '/kuchyne-na-miru'], ['Einbauschränke', '/vestavne-skrine'], ['Möbel nach Maß', '/nabytek-na-miru'], ['Türen & Innenausbau-Elemente', '/dvere'], ['Komplette Inneneinrichtungen', '/kompletni-interiery']],
  },
}

export default function NotFoundPage() {
  const { lang } = useLang()
  const c = copy[lang]
  return (
    <div className="panel panel--dark">
      <section className="nf" id="top">
        <img className="nf__img" src={heroSlides[1]} alt="" />
        <div className="nf__shade" aria-hidden="true" />
        <span className="nf__code" aria-hidden="true">404</span>
        <div className="container nf__inner">
          <p className="eyebrow">{c.eyebrow}</p>
          <h1 className="nf__title"><Rich t={c.title} /></h1>
          <p className="nf__text">{c.text}</p>
          <div className="nf__actions">
            <a href="/" className="btn btn--primary">{c.home}<Icon.arrow /></a>
            <a href="/#kontakt" className="btn btn--ghost">{c.contact}<Icon.arrow /></a>
          </div>
          <ul className="nf__links">
            {c.links.map(([label, href]) => <li key={href}><a href={href}>{label}<Icon.arrow /></a></li>)}
          </ul>
        </div>
      </section>
    </div>
  )
}
