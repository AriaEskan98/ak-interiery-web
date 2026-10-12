// Privacy policy (/ochrana-osobnich-udaju) and terms of use (/podminky-pouziti).
import { useLang, Rich, A11Y } from '../lib.jsx'
import { company } from '../site.config.js'
import { legalContent } from './legal.content.js'
import './legal.css'

const fill = (s) => s.replace(/\{(\w+)\}/g, (_, k) => company[k] ?? `{${k}}`)
const slug = (s) => s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

function Legal({ kind }) {
  const { lang } = useLang()
  const L = legalContent[lang]
  const c = L[kind]
  return (
    <>
      <div className="panel panel--dark">
        <section className="legal-hero" id="top">
          <div className="container">
            <nav className="crumbs" aria-label={A11Y[lang].crumbs}>
              <a href="/">{{ cz: 'Úvod', en: 'Home', de: 'Startseite' }[lang]}</a><span aria-hidden="true">/</span>
              <span aria-current="page">{c.title.replace(/\*/g, '')}</span>
            </nav>
            <p className="eyebrow">{c.eyebrow}</p>
            <h1 className="legal-hero__title"><Rich t={c.title} /></h1>
            <p className="legal-hero__intro">{c.intro}</p>
            <p className="legal-hero__date">{L.updated} {company.effectiveFrom}</p>
          </div>
        </section>
      </div>
      <div className="panel panel--light">
        <section className="section section--light legal">
          <div className="container legal__grid">
            <nav className="legal__toc" aria-label={L.contents} lang={L.bodyLang}>
              <p className="eyebrow">{L.contents}</p>
              <ol>
                {c.sections.map((s) => <li key={s.h}><a href={`#${slug(s.h)}`}>{s.h}</a></li>)}
              </ol>
            </nav>
            <div className="legal__body" lang={L.bodyLang}>
              {c.sections.map((s, i) => (
                <section key={s.h} id={slug(s.h)} className="legal__section">
                  <h2><span className="legal__num">{String(i + 1).padStart(2, '0')}</span>{s.h}</h2>
                  {s.p?.map((p, k) => <p key={k}>{fill(p)}</p>)}
                  {s.list && <ul>{s.list.map((x, k) => <li key={k}>{fill(x)}</li>)}</ul>}
                  {s.after && <p>{fill(s.after)}</p>}
                  {s.link && <p><a className="legal__link" href={s.link.href}>{s.link.label} →</a></p>}
                </section>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export const PrivacyPage = () => <Legal kind="privacy" />
export const TermsPage = () => <Legal kind="terms" />
