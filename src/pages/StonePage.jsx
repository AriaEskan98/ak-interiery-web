// Kámen a kamenické realizace – opens from Homepage → Kámen a kamenické realizace → Zjistit více.
// Section order (brief): Hero · Technical stone · Natural stone · Collection of 7 decors · In-house fabrication ·
// Applications & custom projects · Enquiry form.
// No stone photos are used until the verified package arrives; the decor gallery stays unpublished
// (stonePage in site.config.js).
import { useState } from 'react'
import { useLang, Rich, openForm } from '../lib.jsx'
import { Lightbox } from '../components/Lightbox.jsx'
import { Icon, SlabArt } from '../components/Icons.jsx'
import { ContactSection } from '../components/EnquiryForms.jsx'
import { stonePage, stoneDecorsVisible } from '../site.config.js'
import { stoneContent } from './stone.content.js'
import { productionContent } from './production.content.js'
import { projects, projectPath } from '../realizace.js'
import './work.css'
import './shared.css'
import './b2b.css'
import './stone.css'

const toForm = (e) => { e.preventDefault(); openForm({ mode: 'private', preselect: 'stone' }) }

export default function StonePage() {
  const { lang } = useLang()
  const c = stoneContent[lang]
  const specs = stonePage.showSpecs ? c.technical.specs : null
  const showDecors = stoneDecorsVisible()
  const stoneProject = projects.find((p) => p.stoneDetail) // a real project with a stone worktop detail photo
  const [viewing, setViewing] = useState(null) // { d: decor index, i: photo index } shown full-size
  const decorLabel = (d) => `${c.decors.label} ${d.no}${d.name ? ` – ${d.name}` : ''}`
  // a decor's photos: the catalogue photo first, then real photos (warehouse / detail)
  const decorPhotos = (d) => [
    { src: d.image, alt: `${c.decors.type} – ${decorLabel(d)}`, caption: decorLabel(d) },
    ...(d.photos || []).map((ph) => ({ src: ph.src, alt: `${decorLabel(d)} – ${c.decors.photoKinds[ph.kind]}`, caption: `${decorLabel(d)} · ${c.decors.photoKinds[ph.kind]}` })),
  ]
  const enquireDecor = (d) => {
    setViewing(null)
    openForm({ mode: 'private', preselect: 'stone', reference: { kind: 'decor', id: d.no, label: decorLabel(d) } })
  }

  return (
    <>
      {/* 01 Hero */}
      <div className="panel panel--dark">
        <section className="s-hero" id="top">
          <div className="container s-hero__grid">
            <div className="s-hero__copy">
              <nav className="crumbs hero__reveal" style={{ '--d': '0s' }} aria-label="Drobečková navigace">
                <a href="/">{c.crumb[0]}</a><span aria-hidden="true">/</span><span aria-current="page">{c.crumb[1]}</span>
              </nav>
              <p className="eyebrow hero__reveal" style={{ '--d': '.1s' }}>{c.hero.eyebrow}</p>
              <h1 className="hero__title s-hero__title">
                {c.hero.title.map((line, i) => <span className="line" key={i}><span style={{ '--d': `${0.25 + i * 0.12}s` }}><Rich t={line} /></span></span>)}
              </h1>
              <p className="hero__text hero__reveal" style={{ '--d': '.6s' }}>{c.hero.text}</p>
              <p className="hero__claim hero__reveal" style={{ '--d': '.7s' }}>{c.hero.claim}</p>
              <div className="hero__actions hero__reveal" style={{ '--d': '.8s' }}>
                <a href="#formular" onClick={toForm} className="btn btn--primary">{c.hero.cta1}<Icon.arrow /></a>
                <a href="#dekory" className="btn btn--ghost">{c.hero.cta2}<Icon.arrow /></a>
              </div>
            </div>
            <div className="s-hero__art hero__reveal" style={{ '--d': '.5s' }}>
              <SlabArt labels={specs && [specs[0][1], specs[1][1], specs[2][1], specs[3][1]]} />
            </div>
          </div>
        </section>
      </div>

      {/* 02 Technický kámen */}
      <div className="panel panel--light">
        <section className="section section--light s-tech" id="technicky-kamen">
          <div className="container s-tech__grid">
            <div className="s-tech__copy">
              <p className="eyebrow">{c.technical.eyebrow}</p>
              <h2 className="h2"><Rich t={c.technical.title} /></h2>
              <p>{c.technical.p1}</p>
              <p>{c.technical.p2}</p>
            </div>
            {specs && (
              <aside className="s-specs" aria-label={c.technical.specsTitle}>
                <p className="s-specs__title">{c.technical.specsTitle}</p>
                <dl>
                  {specs.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}
                </dl>
                <p className="s-specs__note">{c.technical.specsNote}</p>
              </aside>
            )}
          </div>
        </section>
      </div>

      {/* 03 Přírodní kámen */}
      <div className="panel panel--warm">
        <section className="section s-natural" id="prirodni-kamen">
          <div className="container s-natural__grid">
            <div>
              <p className="eyebrow">{c.natural.eyebrow}</p>
              <h2 className="display"><Rich t={c.natural.title} /></h2>
            </div>
            <div className="s-natural__text">
              <p>{c.natural.p1}</p>
              <p>{c.natural.p2}</p>
              <ul className="s-natural__points">{c.natural.points.map((p) => <li key={p}>{p}</li>)}</ul>
            </div>
          </div>
        </section>
      </div>

      {/* 04 Kolekce 7 dekorů – gallery UNPUBLISHED until verified photos + confirmed names (stonePage.decorsPublished) */}
      <div className="panel panel--light">
        <section className="section section--light s-decors" id="dekory">
          <div className="container">
            <div className="section-head section-head--split">
              <div>
                <p className="eyebrow">{c.decors.eyebrow}</p>
                <h2 className="h2"><Rich t={c.decors.title.replace('{n}', showDecors ? stonePage.decors.length : 7)} /></h2>
              </div>
              {showDecors && <p className="lead">{c.decors.text}</p>}
            </div>
            {showDecors ? (
              <ul className="s-decors__grid">
                {stonePage.decors.map((d, i) => (
                  <li key={d.no} className="s-decor" id={`dekor-${d.no}`}>
                    <button type="button" className="s-decor__img" onClick={() => setViewing({ d: i, i: 0 })} aria-label={`${c.decors.view}: ${decorLabel(d)}`}>
                      <img src={d.image} alt={`${c.decors.type} – ${decorLabel(d)}`} loading="lazy" />
                      {d.photos?.length > 0 && <span className="s-decor__count">{d.photos.length + 1} {c.decors.photosShort}</span>}
                      <span className="s-decor__zoom" aria-hidden="true"><Icon.plus /></span>
                    </button>
                    <div className="s-decor__body">
                      <p className="s-decor__no">{c.decors.label} {d.no}</p>
                      <h3 className="s-decor__name">{d.name || `${c.decors.label} ${d.no}`}</h3>
                      <p className="s-decor__meta">{c.decors.type}{specs && <> · {[0, 1, 2].map((k) => specs[k][1].replace(' mm', '').replace(/ /g, '\u00a0')).join(' × ') + '\u00a0mm'}</>}</p>
                      <button type="button" className="btn btn--dark btn--sm s-decor__cta" onClick={() => enquireDecor(d)}>{c.decors.enquire}<Icon.arrow /></button>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="s-pending">
                <span className="s-pending__num" aria-hidden="true">7</span>
                <div>
                  <h3 className="s-pending__title">{c.decors.pendingTitle}</h3>
                  <p>{c.decors.pendingText}</p>
                  <a href="#formular" onClick={toForm} className="btn btn--dark">{c.decors.pendingCta}<Icon.arrow /></a>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>

      {viewing !== null && (
        <Lightbox
          items={decorPhotos(stonePage.decors[viewing.d])}
          index={viewing.i}
          onIndex={(next) => setViewing((v) => ({ ...v, i: typeof next === 'function' ? next(v.i) : next }))}
          onClose={() => setViewing(null)}
          action={() => (
            <button type="button" className="btn btn--primary btn--sm" onClick={() => enquireDecor(stonePage.decors[viewing.d])}>{c.decors.enquire}<Icon.arrow /></button>
          )}
        />
      )}

      {/* 05 Vlastní kamenická výroba – a sequence, so numbered */}
      <div className="panel panel--dark">
        <section className="section section--dark" id="vlastni-vyroba">
          <div className="container">
            <div className="section-head section-head--split">
              <div>
                <p className="eyebrow">{c.fabrication.eyebrow}</p>
                <h2 className="h2"><Rich t={c.fabrication.title} /></h2>
              </div>
              <p className="lead s-lead--dark">{c.fabrication.text}</p>
            </div>
            <ol className="b-models__grid b-models__grid--3">
              {c.fabrication.steps.map((s, i) => (
                <li key={s.title}><span className="b-models__num">{String(i + 1).padStart(2, '0')}</span><h3>{s.title}</h3><p>{s.text}</p></li>
              ))}
            </ol>
            <a href="/nase-vyroba#kamen" className="more s-fab-link">{productionContent[lang].links.stone}<Icon.arrow /></a>
          </div>
        </section>
      </div>

      {/* 06 Použití a zakázky na míru */}
      <div className="panel panel--light">
        <section className="section section--light" id="pouziti">
          <div className="container a-what">
            <div className="a-what__head">
              <p className="eyebrow">{c.applications.eyebrow}</p>
              <h2 className="h2"><Rich t={c.applications.title} /></h2>
              <p className="lead">{c.applications.text}</p>
              <div className="s-custom">
                <h3>{c.applications.customTitle}</h3>
                <p>{c.applications.customText}</p>
                <div className="s-custom__buttons">
                  <a href="#formular" onClick={toForm} className="btn btn--dark">{c.hero.cta1}<Icon.arrow /></a>
                  <a href="/pro-profesionaly" className="more">{c.applications.b2b}<Icon.arrow /></a>
                </div>
              </div>
            </div>
            <ul className="a-links">
              {c.applications.items.map(([label, href]) => (
                <li key={label}>{href
                  ? <a href={href}><span>{label}</span><Icon.arrow /></a>
                  : <span className="a-links__item">{label}</span>}</li>
              ))}
            </ul>
          </div>
          {stoneProject && (
            <div className="container">
              <a href={projectPath(stoneProject)} className="ptease">
                <span className="ptease__img"><img src={stoneProject.stoneDetail} alt={stoneProject.title[lang]} loading="lazy" /></span>
                <span className="ptease__body">
                  <span className="pcard__cat">{c.project.eyebrow}</span>
                  <span className="ptease__title">{stoneProject.title[lang]}</span>
                  <span className="ptease__text">{c.project.text}</span>
                  <span className="more">{c.project.cta}<Icon.arrow /></span>
                </span>
              </a>
            </div>
          )}
        </section>
      </div>

      {/* 07 Poptávka – form A with "Kámen" pre-selected (B2B tab available) */}
      <div className="panel panel--dark">
        <ContactSection title={c.cta.title} text={c.cta.text} preselect="stone" />
      </div>
    </>
  )
}
