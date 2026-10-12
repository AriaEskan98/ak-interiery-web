// Kuchyně na míru – opens from Homepage → Kuchyně na míru → Zjistit více (and the "Kuchyně" menu item).
// Section order follows "KONTROLNÍ POŘADÍ STRÁNKY" in AK_Kuchyne_na_miru_KONTROLNI_VZOR.pdf.
import { useLang, useInView, Rich } from '../lib.jsx'
import { Icon } from '../components/Icons.jsx'
import { ContactCTA } from '../components/Bottom.jsx'
import { CrossLink } from '../components/CrossLink.jsx'
import { productionContent } from './production.content.js'
import { FeaturedProject, ProjectCard } from '../components/OurWork.jsx'
import { projectsIn } from '../realizace.js'
import { kitchenPage as img } from '../site.config.js'
import { kitchenContent } from './kitchen.content.js'
import './shared.css'
import './complete.css' // card / split / list layouts shared with the complete-interiors page
import './kitchen.css'

const stepIcons = [Icon.chat, Icon.ruler, Icon.pencil, Icon.tag, Icon.gear, Icon.home]

export default function KitchenPage() {
  const kitchenProjects = projectsIn('kitchen')
  const { lang } = useLang()
  const c = kitchenContent[lang]
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

      {/* 02 Úvod – Srdce domova navržené pro vás */}
      <div className="panel panel--light">
        <section className="section section--light c-meaning" id="srdce-domova">
          <div className="container c-meaning__grid">
            <div className="c-meaning__media"><img src={img.intro} alt="" loading="lazy" /></div>
            <div className="c-meaning__copy">
              <h2 className="h2"><Rich t={c.intro.title} /></h2>
              <p>{c.intro.p1}</p>
              <p>{c.intro.p2}</p>
              <p className="k-claim">{c.intro.claim}</p>
            </div>
          </div>
        </section>
      </div>

      {/* 03 Styly kuchyní */}
      <div className="panel panel--light">
        <section className="section section--light c-include" id="styly">
          <div className="container">
            <div className="section-head section-head--split">
              <div>
                <p className="eyebrow">{c.styles.eyebrow}</p>
                <h2 className="h2"><Rich t={c.styles.title} /></h2>
              </div>
              <p className="lead">{c.styles.text}</p>
            </div>
            <ul className="c-include__grid">
              {c.styles.items.map((it, i) => (
                <li key={i} className="c-card">
                  <div className="c-card__link">
                    <span className="c-card__img"><img src={img.styles[i]} alt="" loading="lazy" /></span>
                    <span className="k-num">{String(i + 1).padStart(2, '0')}</span>
                    <span className="c-card__title">{it.title}</span>
                    <span className="c-card__text">{it.text}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>

      {/* 04 Materiály a detaily */}
      <div className="panel panel--dark">
        <section className="section section--dark c-design" id="materialy">
          <div className="container c-design__grid">
            <div className="k-mosaic">
              {img.details.map((src, i) => <div key={i} className={`k-mosaic__item k-mosaic__item--${i}`}><img src={src} alt="" loading="lazy" /></div>)}
            </div>
            <div className="c-design__copy">
              <p className="eyebrow">{c.details.eyebrow}</p>
              <h2 className="h2"><Rich t={c.details.title} /></h2>
              <p className="c-design__text">{c.details.text}</p>
              <ul className="c-design__list">
                {c.details.items.map((x) => <li key={x}>{x}</li>)}
              </ul>
              <p className="pull k-pull">{c.details.extra}</p>
              <CrossLink dark href="/kamen" text={c.details.stoneLink.text} label={c.details.stoneLink.label} />
              <CrossLink dark href="/nase-vyroba#nabytek" text={productionContent[lang].links.kitchen.text} label={productionContent[lang].links.kitchen.label} />
            </div>
          </div>
        </section>
      </div>

      {/* 05 Realizace – real kitchen projects from src/realizace.js; hidden while there are none */}
      {kitchenProjects.length > 0 && (
        <div className="panel panel--dark">
          <section className="section section--dark" id="realizace-kuchyne">
            <div className="container">
              <div className="section-head section-head--row">
                <div>
                  <p className="eyebrow">{c.projects.eyebrow}</p>
                  <h2 className="h2"><Rich t={c.projects.title} /></h2>
                  <p className="w-projects__text">{c.projects.text}</p>
                </div>
                <a href="/realizace" className="btn btn--ghost">{c.projects.cta}<Icon.arrow /></a>
              </div>
              {kitchenProjects.length === 1 ? <FeaturedProject project={kitchenProjects[0]} /> : (
                <ul className="pgrid">{kitchenProjects.map((p) => <ProjectCard key={p.slug} project={p} />)}</ul>
              )}
            </div>
          </section>
        </div>
      )}

      {/* 06 Proces 01–06 */}
      <div className="panel panel--light">
        <section className="section section--light process" id="jak-vznika">
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
        <section className="b2b w-complete" id="vice-nez-kuchyne">
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

      {/* 08 Závěrečné CTA – 07_LIFESTYLE_Kitchen behind */}
      <div className="panel panel--dark">
        <ContactCTA title={c.cta.title} text={c.cta.text} button={c.cta.button} preselect="kitchen" image={img.ctaImage} />
      </div>
    </>
  )
}
