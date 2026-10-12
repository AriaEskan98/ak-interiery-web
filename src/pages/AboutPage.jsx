// O nás – typographic, no photos (brief). Sections 07 (our work) and 08 (team & production) are prepared
// but hidden until genuine AK photos and verified facts exist: set `aboutPage.showWork` in site.config.js.
import { useLang, Rich, A11Y } from '../lib.jsx'
import { Icon } from '../components/Icons.jsx'
import { aboutPage } from '../site.config.js'
import { aboutContent } from './about.content.js'
import './shared.css'
import './complete.css'
import './b2b.css'

const thinkIcons = [Icon.chat, Icon.pencil, Icon.diamond, Icon.home]

export default function AboutPage() {
  const { lang } = useLang()
  const c = aboutContent[lang]
  return (
    <>
      {/* 01 Hero – typographic */}
      <div className="panel panel--dark">
        <section className="a-hero" id="top">
          <div className="container">
            <nav className="crumbs" aria-label={A11Y[lang].crumbs}>
              <a href="/">{c.crumb[0]}</a><span aria-hidden="true">/</span><span aria-current="page">{c.crumb[1]}</span>
            </nav>
            <p className="eyebrow hero__reveal" style={{ '--d': '.05s' }}>{c.hero.eyebrow}</p>
            <h1 className="a-hero__title hero__reveal" style={{ '--d': '.15s' }}><Rich t={c.hero.title} /></h1>
            <div className="a-hero__foot hero__reveal" style={{ '--d': '.4s' }}>
              <p className="a-hero__text">{c.hero.text}</p>
              <p className="a-hero__extra">{c.hero.extra}</p>
            </div>
          </div>
        </section>
      </div>

      {/* 02 Kdo jsme */}
      <div className="panel panel--light">
        <section className="section section--light w-intro" id="kdo-jsme">
          <div className="container w-intro__grid">
            <h2 className="display w-intro__title"><Rich t={c.who.title} /></h2>
            <div className="w-intro__text">{c.who.p.map((p, i) => <p key={i}>{p}</p>)}</div>
          </div>
        </section>
      </div>

      {/* 03 Jak přemýšlíme */}
      <div className="panel panel--warm">
        <section className="section c-why" id="jak-premyslime">
          <div className="container">
            <div className="c-why__head"><h2 className="display"><Rich t={c.think.title} /></h2></div>
            <ol className="c-why__list is-in">
              {c.think.points.map((p, i) => { const I = thinkIcons[i]; return (
                <li key={p.title} style={{ '--i': i }}>
                  <I className="a-icon" />
                  <h3>{p.title}</h3>
                  <p>{p.text}</p>
                </li>
              ) })}
            </ol>
          </div>
        </section>
      </div>

      {/* 04 Co umíme – links to service pages */}
      <div className="panel panel--light">
        <section className="section section--light" id="co-resime">
          <div className="container a-what">
            <div className="a-what__head">
              <p className="eyebrow">{c.what.eyebrow}</p>
              <h2 className="h2"><Rich t={c.what.title} /></h2>
              <p className="lead">{c.what.text}</p>
            </div>
            <ul className="a-links">
              {c.what.links.map(([label, href]) => (
                <li key={href}><a href={href}><span>{label}</span><Icon.arrow /></a></li>
              ))}
            </ul>
          </div>
        </section>
      </div>

      {/* 05 Proč AK */}
      <div className="panel panel--dark">
        <section className="section section--dark" id="proc-ak">
          <div className="container">
            <div className="section-head">
              <p className="eyebrow">{c.why.eyebrow}</p>
              <h2 className="h2"><Rich t={c.why.title} /></h2>
            </div>
            <ol className="b-models__grid">
              {c.why.points.map((p, i) => (
                <li key={p.title}><span className="b-models__num">{String(i + 1).padStart(2, '0')}</span><h3>{p.title}</h3><p>{p.text}</p></li>
              ))}
            </ol>
          </div>
        </section>
      </div>

      {/* 06 Soukromí klienti / profesionálové */}
      <div className="panel panel--light">
        <section className="section section--light" id="pro-koho">
          <div className="container">
            <div className="section-head"><h2 className="h2"><Rich t={c.split.title} /></h2></div>
            <div className="a-split">
              {[c.split.b2c, c.split.b2b].map((col, i) => (
                <a key={col.href} href={col.href} className={`a-split__col${i ? ' a-split__col--dark' : ''}`}>
                  <p className="eyebrow">{col.label}</p>
                  <p className="a-split__text">{col.text}</p>
                  <span className="more">{col.link}<Icon.arrow /></span>
                </a>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* 07 Naše práce – hidden until genuine AK photos/videos exist */}
      {aboutPage.showWork && (
        <div className="panel panel--dark">
          <section className="section section--dark" id="nase-prace">
            <div className="container">
              <p className="eyebrow">{c.work.eyebrow}</p>
              <h2 className="h2"><Rich t={c.work.title} /></h2>
              <p className="lead">{c.work.text}</p>
              <a href="/realizace" className="btn btn--ghost">{c.work.cta}<Icon.arrow /></a>
            </div>
          </section>
        </div>
      )}
      {/* 08 Tým a výroba – NOT PUBLISHED yet (brief): add here once genuine photos and verified facts exist. */}

      {/* 09 CTA */}
      <div className="panel panel--dark">
        <section className="section section--dark a-cta" id="kontakt">
          <div className="container a-cta__inner">
            <h2 className="display"><Rich t={c.cta.title} /></h2>
            <p>{c.cta.text}</p>
            <div className="a-cta__buttons">
              <a href="/kontakt" className="btn btn--primary">{c.cta.b1}<Icon.arrow /></a>
              <a href="/kontakt" className="btn btn--ghost">{c.cta.b2}<Icon.arrow /></a>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
