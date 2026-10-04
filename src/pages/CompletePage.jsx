// Kompletní interiéry / Home Design – key brand page.
// Opens from Homepage → Kompletní interiéry → Zjistit více (and the "Interiéry" menu item).
// Section order follows "KONTROLNÍ POŘADÍ" in AK_Kompletni_interiery_KONTROLNI_VZOR.pdf.
import { useLang, useInView, Rich } from '../lib.jsx'
import { Icon } from '../components/Icons.jsx'
import { ContactCTA } from '../components/Bottom.jsx'
import { Statement } from '../components/Top.jsx'
import { completePage as img, statementImages } from '../site.config.js'
import { completeContent } from './complete.content.js'
import './shared.css'
import './complete.css'

const stepIcons = [Icon.chat, Icon.ruler, Icon.pencil, Icon.diamond, Icon.gear, Icon.home]

export default function CompletePage() {
  const { lang } = useLang()
  const c = completeContent[lang]
  const [stepsRef, stepsIn] = useInView({ threshold: 0.35 })
  const [whyRef, whyIn] = useInView({ threshold: 0.3 })

  return (
    <>
      {/* 01 Hero */}
      <div className="panel panel--dark">
        <section className="hero page-hero" id="top">
          <div className="hero__media" aria-hidden="true">
            <img src={img.hero} alt="" className="is-active" fetchPriority="high" />
          </div>
          <div className="hero__shade" aria-hidden="true" />
          <div className="container hero__content">
            <nav className="crumbs hero__reveal" style={{ '--d': '0s' }} aria-label="Drobečková navigace">
              <a href="/">{c.crumb[0]}</a><span aria-hidden="true">/</span><span aria-current="page">{c.crumb[1]}</span>
            </nav>
            <p className="eyebrow hero__reveal" style={{ '--d': '.1s' }}>{c.hero.eyebrow}</p>
            <h1 className="hero__title page-hero__title">
              {c.hero.title.map((line, i) => (
                <span className="line" key={i}><span style={{ '--d': `${0.25 + i * 0.12}s` }}><Rich t={line} /></span></span>
              ))}
            </h1>
            <p className="hero__text hero__reveal" style={{ '--d': '.6s' }}>{c.hero.text}</p>
            <p className="hero__claim hero__reveal" style={{ '--d': '.7s' }}>{c.hero.claim}</p>
            <div className="hero__actions hero__reveal" style={{ '--d': '.8s' }}>
              <a href="#kontakt" className="btn btn--primary">{c.hero.cta}<Icon.arrow /></a>
            </div>
          </div>
        </section>
      </div>

      {/* 02 Co znamená kompletní interiér */}
      <div className="panel panel--light">
        <section className="section section--light c-meaning" id="co-znamena">
          <div className="container c-meaning__grid">
            <div className="c-meaning__media"><img src={img.meaning} alt="" loading="lazy" /></div>
            <div className="c-meaning__copy">
              <h2 className="h2"><Rich t={c.meaning.title} /></h2>
              <p>{c.meaning.p1}</p>
              <p>{c.meaning.p2}</p>
              <p className="pull">{c.meaning.extra}</p>
            </div>
          </div>
        </section>
      </div>

      {/* 03 Co všechno umíme zahrnout */}
      <div className="panel panel--light">
        <section className="section section--light c-include" id="co-zahrnujeme">
          <div className="container">
            <div className="section-head">
              <p className="eyebrow">{c.include.eyebrow}</p>
              <h2 className="h2"><Rich t={c.include.title} /></h2>
            </div>
            <ul className="c-include__grid">
              {c.include.items.map((it, i) => {
                const card = img.include[i]
                const body = (
                  <>
                    <span className="c-card__img"><img src={card.image} alt="" loading="lazy" /></span>
                    <span className="c-card__title">{it.title}</span>
                    <span className="c-card__text">{it.text}</span>
                    {card.href && <span className="more">{c.include.more}<Icon.arrow /></span>}
                  </>
                )
                return (
                  <li key={i} className="c-card">
                    {card.href ? <a href={card.href} className="c-card__link">{body}</a> : <div className="c-card__link">{body}</div>}
                  </li>
                )
              })}
            </ul>
          </div>
        </section>
      </div>

      {/* statement band */}
      <div className="panel panel--dark">
        <Statement image={statementImages.complete} eyebrow={c.statement.eyebrow} line={c.statement.line} id="smysl" />
      </div>

      {/* 04 Home Design / návrh celku */}
      <div className="panel panel--dark">
        <section className="section section--dark c-design" id="home-design">
          <div className="container c-design__grid">
            <div className="c-design__copy">
              <p className="eyebrow">{c.design.eyebrow}</p>
              <h2 className="h2"><Rich t={c.design.title} /></h2>
              <p className="c-design__text">{c.design.text}</p>
              <ul className="c-design__list">
                {c.design.items.map((x) => <li key={x}>{x}</li>)}
              </ul>
            </div>
            <div className="c-design__media"><img src={img.design} alt="" loading="lazy" /></div>
          </div>
        </section>
      </div>

      {/* 05 Proces 01–06 */}
      <div className="panel panel--light">
        <section className="section section--light process" id="jak-probiha-spoluprace">
          <div className="container">
            <div className="section-head">
              <p className="eyebrow">{c.process.eyebrow}</p>
              <h2 className="h2"><Rich t={c.process.title} /></h2>
            </div>
            <ol ref={stepsRef} className={`steps steps--6${stepsIn ? ' is-in' : ''}`}>
              {c.process.steps.map((s, i) => {
                const I = stepIcons[i]
                return (
                  <li key={i} className="step" style={{ '--i': i }}>
                    <I className="step__icon" />
                    <span className="step__num">{String(i + 1).padStart(2, '0')}</span>
                    <h3 className="step__title">{s.title}</h3>
                    <p className="step__text">{s.text}</p>
                  </li>
                )
              })}
            </ol>
          </div>
        </section>
      </div>

      {/* 06 Proč jeden partner – strong and concise */}
      <div className="panel panel--warm">
        <section className="section c-why" id="proc-jeden-partner">
          <div className="container">
            <div className="c-why__head">
              <p className="eyebrow">{c.why.eyebrow}</p>
              <h2 className="display"><Rich t={c.why.title} /></h2>
            </div>
            <ol ref={whyRef} className={`c-why__list${whyIn ? ' is-in' : ''}`}>
              {c.why.points.map((p, i) => (
                <li key={p.title} style={{ '--i': i }}>
                  <span className="c-why__num">{String(i + 1).padStart(2, '0')}</span>
                  <h3>{p.title}</h3>
                  <p>{p.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      </div>

      {/* 07 Realizace – genuine AK photos only; hidden until provided */}
      {img.projects.length > 0 && (
        <div className="panel panel--dark">
          <section className="section section--dark w-projects" id="realizace-interiery">
            <div className="container">
              <div className="section-head section-head--row">
                <div>
                  <p className="eyebrow">{c.projects.eyebrow}</p>
                  <h2 className="h2"><Rich t={c.projects.title} /></h2>
                  <p className="w-projects__text">{c.projects.text}</p>
                </div>
                <a href="/#realizace" className="btn btn--ghost">{c.projects.cta}<Icon.arrow /></a>
              </div>
              <ul className="w-projects__grid">
                {img.projects.map((p, i) => (
                  <li key={i}><img src={p.image} alt={p.title[lang]} loading="lazy" /><span>{p.title[lang]}</span></li>
                ))}
              </ul>
            </div>
          </section>
        </div>
      )}

      {/* 08 CTA / kontakt – full-width warm interior image behind */}
      <div className="panel panel--dark">
        <ContactCTA title={c.cta.title} text={c.cta.text} button={c.cta.button} image={img.ctaImage} />
      </div>
    </>
  )
}
