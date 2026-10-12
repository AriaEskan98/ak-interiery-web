// B2B / Pro developery a profesionály – AK as a production and delivery partner.
// Section order follows "KONTROLNÍ POŘADÍ" in AK_B2B_KONTROLNI_VZOR.pdf.
import { useLang, useInView, Rich, openForm } from '../lib.jsx'
import { Icon, PergolaArt } from '../components/Icons.jsx'
import { ContactSection } from '../components/EnquiryForms.jsx'
import { CrossLink } from '../components/CrossLink.jsx'
import { productionContent } from './production.content.js'
import { b2bPage as img } from '../site.config.js'
import { b2bContent } from './b2b.content.js'
import './shared.css'
import './complete.css'
import './b2b.css'

const whyIcons = [Icon.person, Icon.doc, Icon.gear, Icon.home]
const stepIcons = [Icon.chat, Icon.ruler, Icon.tag, Icon.gear, Icon.home]
const toForm = (e) => { e.preventDefault(); openForm({ mode: 'b2b' }) }

export default function B2BPage() {
  const { lang } = useLang()
  const c = b2bContent[lang]
  const [stepsRef, stepsIn] = useInView({ threshold: 0.35 })
  return (
    <>
      {/* 01 Hero */}
      <div className="panel panel--dark">
        <section className="hero page-hero" id="top">
          <div className="hero__media" aria-hidden="true"><img src={img.hero} alt="" className="is-active" fetchPriority="high" /></div>
          <div className="hero__shade" aria-hidden="true" />
          <div className="container hero__content">
            <nav className="crumbs hero__reveal" style={{ '--d': '0s' }} aria-label="Drobečková navigace">
              <a href="/">{c.crumb[0]}</a><span aria-hidden="true">/</span><span aria-current="page">{c.crumb[1]}</span>
            </nav>
            <p className="eyebrow hero__reveal" style={{ '--d': '.1s' }}>{c.hero.eyebrow}</p>
            <h1 className="hero__title page-hero__title">
              {c.hero.title.map((line, i) => <span className="line" key={i}><span style={{ '--d': `${0.25 + i * 0.12}s` }}><Rich t={line} /></span></span>)}
            </h1>
            <p className="hero__text hero__reveal" style={{ '--d': '.6s' }}>{c.hero.text}</p>
            <p className="hero__claim hero__reveal" style={{ '--d': '.7s' }}>{c.hero.claim}</p>
            <div className="hero__actions hero__reveal" style={{ '--d': '.8s' }}>
              <a href="#formular" onClick={toForm} className="btn btn--primary">{c.hero.cta1}<Icon.arrow /></a>
              <a href="#formular" onClick={toForm} className="btn btn--ghost">{c.hero.cta2}<Icon.arrow /></a>
            </div>
          </div>
        </section>
      </div>

      {/* 02 Proč spolupracovat s AK */}
      <div className="panel panel--light">
        <section className="section section--light b-why" id="proc-ak">
          <div className="container">
            <div className="section-head section-head--split">
              <h2 className="h2"><Rich t={c.why.title} /></h2>
              <p className="lead">{c.why.text}</p>
            </div>
            <ul className="b-points">
              {c.why.points.map((p, i) => { const I = whyIcons[i]; return (
                <li key={p.title}><I /><h3>{p.title}</h3><p>{p.text}</p></li>
              ) })}
            </ul>
          </div>
        </section>
      </div>

      {/* 03 Oblasti realizací */}
      <div className="panel panel--light">
        <section className="section section--light c-include" id="oblasti">
          <div className="container">
            <div className="section-head">
              <p className="eyebrow">{c.areas.eyebrow}</p>
              <h2 className="h2"><Rich t={c.areas.title} /></h2>
            </div>
            <ul className="c-include__grid">
              {c.areas.items.map((it, i) => (
                <li key={it.title} className="c-card">
                  <div className="c-card__link">
                    <span className="c-card__img">{img.areas[i] ? <img src={img.areas[i]} alt="" loading="lazy" /> : <PergolaArt />}</span>
                    <span className="k-num">{String(i + 1).padStart(2, '0')}</span>
                    <span className="c-card__title">{it.title}</span>
                    <span className="c-card__text">{it.text}</span>
                  </div>
                </li>
              ))}
            </ul>
            <CrossLink href="/kamen" text={c.areas.stoneLink.text} label={c.areas.stoneLink.label} />
            <CrossLink href="/nase-vyroba" text={productionContent[lang].links.b2b.text} label={productionContent[lang].links.b2b.label} />
          </div>
        </section>
      </div>

      {/* 04 Modely spolupráce – key section */}
      <div className="panel panel--dark">
        <section className="section section--dark b-models" id="modely-spoluprace">
          <div className="container">
            <div className="section-head">
              <p className="eyebrow">{c.models.eyebrow}</p>
              <h2 className="h2"><Rich t={c.models.title} /></h2>
            </div>
            <ol className="b-models__grid">
              {c.models.items.map((m, i) => (
                <li key={m.title}>
                  <span className="b-models__num">{String(i + 1).padStart(2, '0')}</span>
                  <h3>{m.title}</h3>
                  <p>{m.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      </div>

      {/* 05 Atypické zadání – visually prominent */}
      <div className="panel panel--warm">
        <section className="b-custom" id="atypicke-zadani">
          <img className="b-custom__img" src={img.custom} alt="" loading="lazy" />
          <div className="b-custom__shade" aria-hidden="true" />
          <div className="container b-custom__inner">
            <p className="eyebrow">{c.custom.eyebrow}</p>
            <h2 className="b-custom__title"><Rich t={c.custom.title} /></h2>
            <p className="b-custom__lead">{c.custom.text1}</p>
            <p className="b-custom__text">{c.custom.text2}</p>
            <a href="#formular" onClick={toForm} className="btn btn--primary">{c.custom.cta}<Icon.arrow /></a>
          </div>
        </section>
      </div>

      {/* 06 Proces B2B 01–05 */}
      <div className="panel panel--light">
        <section className="section section--light process" id="prubeh-spoluprace">
          <div className="container">
            <div className="section-head">
              <p className="eyebrow">{c.process.eyebrow}</p>
              <h2 className="h2"><Rich t={c.process.title} /></h2>
            </div>
            <ol ref={stepsRef} className={`steps${stepsIn ? ' is-in' : ''}`}>
              {c.process.steps.map((s, i) => { const I = stepIcons[i]; return (
                <li key={s.title} className="step" style={{ '--i': i }}>
                  <I className="step__icon" />
                  <span className="step__num">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="step__title">{s.title}</h3>
                  <p className="step__text">{s.text}</p>
                </li>
              ) })}
            </ol>
          </div>
        </section>
      </div>

      {/* 07 Reference – genuine AK projects only; hidden until provided */}
      {img.projects.length > 0 && (
        <div className="panel panel--dark">
          <section className="section section--dark w-projects" id="reference">
            <div className="container">
              <div className="section-head">
                <p className="eyebrow">{c.references.eyebrow}</p>
                <h2 className="h2"><Rich t={c.references.title} /></h2>
              </div>
              <ul className="w-projects__grid">
                {img.projects.map((p, i) => <li key={i}><img src={p.image} alt={p.title[lang]} loading="lazy" /><span>{p.title[lang]}</span></li>)}
              </ul>
            </div>
          </section>
        </div>
      )}

      {/* 08 Výrobní a montážní možnosti – no invented data */}
      <div className="panel panel--light">
        <section className="section section--light w-intro" id="moznosti">
          <div className="container w-intro__grid">
            <div>
              <p className="eyebrow">{c.capacity.eyebrow}</p>
              <h2 className="display w-intro__title"><Rich t={c.capacity.title} /></h2>
            </div>
            <div className="w-intro__text">
              <p>{c.capacity.text}</p>
              <p className="pull">{c.capacity.extra}</p>
            </div>
          </div>
        </section>
      </div>

      {/* 09 CTA – form B */}
      <div className="panel panel--dark">
        <ContactSection title={c.cta.title} text={c.cta.text} mode="b2b" />
      </div>
    </>
  )
}
