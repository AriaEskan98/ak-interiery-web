// Naše výroba (/nase-vyroba) – AK_INTERIERY_NASE_VYROBA_WEBAR_CZ_EN.docx, section 03 (layout) + 04 (texts).
// Hero · capability overview (5 areas) · furniture · CNC/MDF · softforming/vacuum/saws · stone (→ /kamen) ·
// plexiglass · B2B manufacturing enquiry (form C) with a link to the B2B page.
// No photos until AK supplies genuine workshop media (productionMedia in site.config.js).
import { useLang, Rich, openForm, A11Y } from '../lib.jsx'
import { Icon } from '../components/Icons.jsx'
import { ContactSection } from '../components/EnquiryForms.jsx'
import { CrossLink } from '../components/CrossLink.jsx'
import { productionMedia } from '../site.config.js'
import { productionContent } from './production.content.js'
import './shared.css'
import './work.css'
import './production.css'

const toForm = (preselect) => (e) => { e?.preventDefault(); openForm({ mode: 'production', preselect }) }

function Media({ m, lang }) {
  if (!m) return null
  return <figure className="m-chapter__media"><img src={m.src} alt={m.alt?.[lang] || ''} loading="lazy" /></figure>
}

// one manufacturing chapter: number + heading on the left, approved text + details on the right
function Chapter({ id, no, ch, tone, children, media, lang }) {
  return (
    <section className={`section section--${tone} m-chapter${media ? ' has-media' : ''}`} id={id}>
      <div className="container m-chapter__grid">
        <div className="m-chapter__head">
          <span className="m-chapter__no" aria-hidden="true">{no}</span>
          <p className="eyebrow">{ch.eyebrow}</p>
          <h2 className="h2">{ch.title}</h2>
        </div>
        <div className="m-chapter__body">
          <p className="m-chapter__text">{ch.text}</p>
          {ch.tags && <ul className="m-tags" aria-label={ch.title}>{ch.tags.map((t) => <li key={t}>{t}</li>)}</ul>}
          {children}
        </div>
      </div>
      {media && <div className="container"><Media m={media} lang={lang} /></div>}
    </section>
  )
}

export default function ProductionPage() {
  const { lang } = useLang()
  const C = productionContent[lang]
  const c = C.page
  const ch = c.chapters

  return (
    <>
      {/* 01 Hero – typographic until a verified workshop photo/video exists */}
      <div className="panel panel--dark">
        <section className={`work-hero m-hero${productionMedia.hero ? ' has-media' : ''}`} id="top">
          <div className="container m-hero__grid">
            <div>
              <nav className="crumbs" aria-label={A11Y[lang].crumbs}>
                <a href="/">{c.crumb[0]}</a><span aria-hidden="true">/</span><span aria-current="page">{c.crumb[1]}</span>
              </nav>
              <p className="eyebrow hero__reveal" style={{ '--d': '.05s' }}>{c.hero.eyebrow}</p>
              <h1 className="work-hero__title hero__reveal" style={{ '--d': '.15s' }}><Rich t={c.hero.title} /></h1>
              <p className="work-hero__intro hero__reveal" style={{ '--d': '.3s' }}>{c.hero.text}</p>
              <div className="hero__actions hero__reveal" style={{ '--d': '.45s' }}>
                <a href="#formular" onClick={toForm()} className="btn btn--primary">{c.hero.cta1}<Icon.arrow /></a>
                <a href="#oblasti" className="btn btn--ghost">{c.hero.cta2}<Icon.arrow /></a>
              </div>
            </div>
            {productionMedia.hero
              ? <Media m={productionMedia.hero} lang={lang} />
              : (
                <ul className="m-hero__materials hero__reveal" style={{ '--d': '.5s' }} aria-hidden="true">
                  {c.overview.items.map((it, i) => <li key={it.id}><span>{String(i + 1).padStart(2, '0')}</span>{it.title}</li>)}
                </ul>
              )}
          </div>
        </section>
      </div>

      {/* 02 Capabilities overview – five numbered areas (5-point brief), each linking to its chapter */}
      <div className="panel panel--light">
        <section className="section section--light m-overview" id="oblasti">
          <div className="container">
            <div className="section-head">
              <p className="eyebrow">{c.overview.eyebrow}</p>
              <h2 className="h2"><Rich t={c.overview.title} /></h2>
            </div>
            <ul className="m-overview__grid">
              {c.overview.items.map((it, i) => (
                <li key={it.id}>
                  <a href={`#${it.id}`} className="m-area">
                    <span className="m-area__no">{String(i + 1).padStart(2, '0')}</span>
                    <span className="m-area__title">{it.title}</span>
                    <span className="m-area__tag">{it.tag}</span>
                    <span className="m-area__arrow" aria-hidden="true"><Icon.arrow /></span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>

      {/* 03 Furniture */}
      <div className="panel panel--dark">
        <Chapter id="nabytek" no="01" ch={ch.furniture} tone="dark" media={productionMedia.furniture} lang={lang}>
          <ul className="m-links">
            {ch.furniture.links.map(([label, href]) => <li key={href}><a href={href}><span>{label}</span><Icon.arrow /></a></li>)}
          </ul>
        </Chapter>
      </div>

      {/* 04 CNC + MDF, 05 softforming / vacuum press / saws */}
      <div className="panel panel--light">
        <Chapter id="cnc-mdf" no="02" ch={ch.cnc} tone="light" media={productionMedia.cnc} lang={lang} />
        <Chapter id="softforming" no="03" ch={ch.edge} tone="light" media={productionMedia.edge} lang={lang}>
          <dl className="m-tech">
            {ch.edge.tech.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}
          </dl>
        </Chapter>
      </div>

      {/* 06 Stone – short; the collection stays on its own page (never the kitchen page) */}
      <div className="panel panel--warm">
        <Chapter id="kamen" no="04" ch={ch.stone} tone="warm" media={productionMedia.stone} lang={lang}>
          <div className="m-chapter__actions">
            <a href="/kamen" className="btn btn--primary">{ch.stone.cta}<Icon.arrow /></a>
          </div>
        </Chapter>
      </div>

      {/* 07 Plexiglass */}
      <div className="panel panel--light">
        <Chapter id="plexisklo" no="05" ch={ch.plexi} tone="light" media={productionMedia.plexi} lang={lang}>
          <div className="m-chapter__actions">
            <a href="#formular" onClick={toForm('plexi')} className="more">{c.b2b.cta}<Icon.arrow /></a>
          </div>
        </Chapter>
      </div>

      {/* 08 B2B – manufacturing partner + form C */}
      <div className="panel panel--dark">
        <ContactSection eyebrow={c.b2b.eyebrow} title={c.b2b.title} text={c.b2b.text} mode="production" modes={['production', 'private']}
          aside={<CrossLink dark href="/pro-profesionaly" text={c.b2b.link.text} label={c.b2b.link.label} />} />
      </div>
    </>
  )
}
