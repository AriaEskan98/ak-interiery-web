// "Naše výroba" – homepage section between Naše realizace and the next section (brief section 01/02).
// Concise 4-point overview + champagne CTA to /nase-vyroba. The photo slot stays empty until AK supplies media.
import { useLang, Rich } from '../lib.jsx'
import { Icon } from './Icons.jsx'
import { productionMedia } from '../site.config.js'
import { productionContent } from '../pages/production.content.js'
import '../pages/production.css'

export function Production() {
  const { lang } = useLang()
  const c = productionContent[lang].home
  const m = productionMedia.home
  return (
    <section className={`section mfg-home${m ? ' has-media' : ''}`} id="nase-vyroba">
      <div className="container mfg-home__grid">
        <div className="mfg-home__copy">
          <p className="eyebrow">{c.eyebrow}</p>
          <h2 className="h2"><Rich t={c.title} /></h2>
          <p className="mfg-home__text">{c.text}</p>
          <a href="/nase-vyroba" className="btn btn--primary">{c.cta}<Icon.arrow /></a>
        </div>
        <div className="mfg-home__side">
          {m && <figure className="mfg-home__media"><img src={m.src} alt={m.alt?.[lang] || ''} loading="lazy" /></figure>}
          <ol className="mfg-home__points">
            {c.points.map((p, i) => (
              <li key={p.id}>
                <a href={`/nase-vyroba#${p.id}`}>
                  <span className="mfg-home__no">{String(i + 1).padStart(2, '0')}</span>
                  <span className="mfg-home__label">
                    <span className="mfg-home__title">{p.title}</span>
                    <span className="mfg-home__tag">{p.tag}</span>
                  </span>
                  <Icon.arrow />
                </a>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
