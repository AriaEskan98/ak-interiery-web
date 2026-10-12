// Vestavné skříně – opens from Homepage → Vestavné skříně → Zjistit více.
// Section order follows "KONTROLNÍ POŘADÍ" in AK_Vestavne_skrine_KONTROLNI_VZOR.pdf.
import { useLang, useInView, Rich, A11Y } from '../lib.jsx'
import { Icon } from '../components/Icons.jsx'
import { ContactCTA } from '../components/Bottom.jsx'
import { wardrobesPage as img } from '../site.config.js'
import { wardrobesContent } from './wardrobes.content.js'
import './shared.css'
import './wardrobes.css'

const stepIcons = [Icon.chat, Icon.ruler, Icon.pencil, Icon.tag, Icon.gear, Icon.home]

export default function WardrobesPage() {
  const { lang } = useLang()
  const c = wardrobesContent[lang]
  const [stepsRef, stepsIn] = useInView({ threshold: 0.35 })
  const [claimRef, claimIn] = useInView({ threshold: 0.4 })

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
            <nav className="crumbs hero__reveal" style={{ '--d': '0s' }} aria-label={A11Y[lang].crumbs}>
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

      {/* 02 Úvod / řešení na míru */}
      <div className="panel panel--light">
        <section className="section section--light w-intro" id="reseni-na-miru">
          <div className="container w-intro__grid">
            <h2 className="display w-intro__title"><Rich t={c.intro.title} /></h2>
            <div className="w-intro__text">
              <p>{c.intro.p1}</p>
              <p>{c.intro.p2}</p>
              <a href="#kontakt" className="more">{c.hero.cta}<Icon.arrow /></a>
            </div>
          </div>
        </section>
      </div>

      {/* 03 Typy řešení */}
      <div className="panel panel--light">
        <section className="section section--light w-types" id="typy">
          <div className="container">
            <div className="section-head">
              <p className="eyebrow">{c.types.eyebrow}</p>
              <h2 className="h2"><Rich t={c.types.title} /></h2>
            </div>
            <ul className="w-types__grid">
              {c.types.items.map((it, i) => (
                <li key={i} className="w-type">
                  <div className="w-type__img"><img src={img.types[i]} alt="" loading="lazy" /></div>
                  <span className="w-type__num">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="w-type__title">{it.title}</h3>
                  <p className="w-type__text">{it.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>

      {/* 04 Detaily a materiály */}
      <div className="panel panel--dark">
        <section className="section section--dark w-details" id="detaily">
          <div className="container w-details__grid">
            <div className="w-details__main"><img src={img.details.main} alt="" loading="lazy" /></div>
            <div className="w-details__copy">
              <p className="eyebrow">{c.details.eyebrow}</p>
              <h2 className="h2"><Rich t={c.details.title} /></h2>
              <p className="w-details__text">{c.details.text}</p>
              <p className="pull">{c.details.extra}</p>
              <div className="w-details__wide"><img src={img.details.wide} alt="" loading="lazy" /></div>
            </div>
          </div>
        </section>
      </div>

      {/* 05 Realizace – genuine AK photos only; hidden until provided */}
      {img.projects.length > 0 && (
        <div className="panel panel--dark">
          <section className="section section--dark w-projects" id="realizace-skrine">
            <div className="container">
              <div className="section-head section-head--row">
                <div>
                  <p className="eyebrow">{c.projects.eyebrow}</p>
                  <h2 className="h2"><Rich t={c.projects.title} /></h2>
                  <p className="w-projects__text">{c.projects.text}</p>
                </div>
                <a href="/realizace" className="btn btn--ghost">{c.projects.cta}<Icon.arrow /></a>
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

      {/* 06 Proces 01–06 */}
      <div className="panel panel--light">
        <section className="section section--light process" id="jak-to-probiha">
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

      {/* 07 Proklik na Kompletní interiéry */}
      <div className="panel panel--warm">
        <section className="b2b w-complete" id="kompletni-interiery-proklik">
          <div className="b2b__media"><img src={img.complete} alt="" loading="lazy" /></div>
          <div className="b2b__copy">
            <p className="eyebrow">{c.complete.eyebrow}</p>
            <h2 className="h2"><Rich t={c.complete.title} /></h2>
            <p>{c.complete.text}</p>
            <p ref={claimRef} className={`b2b__claim${claimIn ? ' is-in' : ''}`}>
              {c.complete.claim.map((w, i) => <span key={w} style={{ '--i': i }}>{w}</span>)}
            </p>
            <a href="/kompletni-interiery" className="btn btn--primary">{c.complete.cta}<Icon.arrow /></a>
          </div>
        </section>
      </div>

      {/* 08 CTA / kontakt */}
      <div className="panel panel--dark">
        <ContactCTA title={c.cta.title} text={c.cta.text} button={c.cta.button} preselect="wardrobes" />
      </div>
    </>
  )
}
