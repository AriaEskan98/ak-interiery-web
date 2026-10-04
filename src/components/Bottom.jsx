import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useLang, useInView, prefersReducedMotion, Rich } from '../lib.jsx'
import { Icon, Logo } from './Icons.jsx'
import { contact, projects, b2bImage, testimonials, services } from '../site.config.js'

const DEMO = import.meta.env.VITE_DEMO === '1' // static preview: no API server behind it

async function postJSON(url, body) {
  if (DEMO) { await new Promise((r) => setTimeout(r, 700)); return { ok: true } }
  const res = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
  if (!res.ok) throw new Error(String(res.status))
  return res.json()
}

/* ───────── Vybrané realizace ───────── */
export function Projects() {
  const { t, lang } = useLang()
  const track = useRef(null)
  const [edges, setEdges] = useState({ start: true, end: false })
  const [lightbox, setLightbox] = useState(null)

  const update = useCallback(() => {
    const el = track.current
    if (!el) return
    setEdges({ start: el.scrollLeft < 8, end: el.scrollLeft + el.clientWidth > el.scrollWidth - 8 })
  }, [])

  useEffect(() => { update() }, [update])

  const scrollBy = (dir) => {
    const el = track.current
    const card = el.querySelector('.project')
    el.scrollBy({ left: dir * (card.offsetWidth + 20), behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
  }

  // drag to scroll with a mouse
  const drag = useRef(null)
  const onPointerDown = (e) => {
    if (e.pointerType !== 'mouse') return
    drag.current = { x: e.clientX, left: track.current.scrollLeft, moved: false }
  }
  const onPointerMove = (e) => {
    if (!drag.current) return
    const dx = e.clientX - drag.current.x
    if (Math.abs(dx) > 4) { drag.current.moved = true; track.current.classList.add('is-dragging') }
    track.current.scrollLeft = drag.current.left - dx
  }
  const endDrag = () => {
    track.current?.classList.remove('is-dragging')
    setTimeout(() => { drag.current = null }, 0)
  }

  return (
    <section className="section section--dark projects" id="realizace">
      <div className="container">
        <div className="section-head section-head--row">
          <div>
            <p className="eyebrow">{t.projects.eyebrow}</p>
            <h2 className="h2"><Rich t={t.projects.title} /></h2>
          </div>
          <a href="#realizace" className="btn btn--ghost">{t.projects.cta}<Icon.arrow /></a>
        </div>
      </div>

      <div className="projects__wrap">
        <button type="button" className="round-btn round-btn--prev" onClick={() => scrollBy(-1)} disabled={edges.start} aria-label={t.projects.prev}><Icon.arrowLeft /></button>
        <ul ref={track} className="projects__track" onScroll={update}
          onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={endDrag} onPointerLeave={endDrag}>
          {projects.map((p, i) => (
            <li key={i} className="project">
              <button type="button" onClick={() => !drag.current?.moved && setLightbox(i)} aria-label={p.title[lang]}>
                <img src={p.image} alt="" loading="lazy" draggable="false" />
                <span className="project__meta">
                  <span className="project__title">{p.title[lang]}</span>
                  {p.illustrative && <span className="tag">{t.projects.illustrative}</span>}
                </span>
              </button>
            </li>
          ))}
        </ul>
        <button type="button" className="round-btn round-btn--next" onClick={() => scrollBy(1)} disabled={edges.end} aria-label={t.projects.next}><Icon.arrow /></button>
      </div>

      {lightbox !== null && createPortal(<Lightbox index={lightbox} setIndex={setLightbox} />, document.body)}
    </section>
  )
}

function Lightbox({ index, setIndex }) {
  const { t, lang } = useLang()
  const closeRef = useRef(null)
  const n = projects.length
  const p = projects[index]

  useEffect(() => {
    const prev = document.activeElement
    closeRef.current?.focus()
    document.body.style.overflow = 'hidden'
    const onKey = (e) => {
      if (e.key === 'Escape') setIndex(null)
      if (e.key === 'ArrowRight') setIndex((i) => (i + 1) % n)
      if (e.key === 'ArrowLeft') setIndex((i) => (i - 1 + n) % n)
    }
    window.addEventListener('keydown', onKey)
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = ''; prev?.focus() }
  }, [n, setIndex])

  return (
    <div className="lightbox" role="dialog" aria-modal="true" aria-label={p.title[lang]} onClick={(e) => e.target === e.currentTarget && setIndex(null)}>
      <button ref={closeRef} type="button" className="lightbox__close" onClick={() => setIndex(null)} aria-label={t.projects.close}><Icon.close /></button>
      <figure>
        <img key={index} src={p.image} alt={p.title[lang]} />
        <figcaption>
          <span>{p.title[lang]}{p.illustrative && <span className="tag">{t.projects.illustrative}</span>}</span>
          <span className="lightbox__count">{String(index + 1).padStart(2, '0')} / {String(n).padStart(2, '0')}</span>
        </figcaption>
      </figure>
      <button type="button" className="round-btn round-btn--prev" onClick={() => setIndex((index - 1 + n) % n)} aria-label={t.projects.prev}><Icon.arrowLeft /></button>
      <button type="button" className="round-btn round-btn--next" onClick={() => setIndex((index + 1) % n)} aria-label={t.projects.next}><Icon.arrow /></button>
    </div>
  )
}

/* ───────── Pro developery a profesionály ───────── */
export function B2B() {
  const { t } = useLang()
  const [ref, inView] = useInView({ threshold: 0.4 })
  return (
    <section className="b2b" id="pro-profesionaly">
      <div className="b2b__media"><img src={b2bImage} alt="" loading="lazy" /></div>
      <div className="b2b__copy">
        <p className="eyebrow">{t.b2b.eyebrow}</p>
        <h2 className="h2"><Rich t={t.b2b.title} /></h2>
        <p>{t.b2b.text}</p>
        <p ref={ref} className={`b2b__claim${inView ? ' is-in' : ''}`}>
          {t.b2b.claim.map((w, i) => <span key={w} style={{ '--i': i }}>{w}</span>)}
          <em style={{ '--i': 3 }}>{t.b2b.claimTail}</em>
        </p>
        <a href="#kontakt" className="btn btn--primary">{t.b2b.cta}<Icon.arrow /></a>
      </div>
    </section>
  )
}

/* ───────── O nás / hodnoty / reference ───────── */
export function About() {
  const { t, lang } = useLang()
  return (
    <section className="section section--light about" id="o-nas">
      <div className="container about__grid">
        <div className="about__copy">
          <p className="eyebrow">{t.about.eyebrow}</p>
          <h2 className="h2"><Rich t={t.about.title} /></h2>
          <p>{t.about.text}</p>
          <p className="pull">{t.about.extra}</p>
          <a href="#kontakt" className="btn btn--dark">{t.about.cta}<Icon.arrow /></a>
        </div>
        <ul className="values">
          {t.about.values.map((v) => {
            const I = Icon[v.icon]
            return (
              <li key={v.title}>
                <I />
                <h3>{v.title}</h3>
                <p>{v.text}</p>
              </li>
            )
          })}
        </ul>
      </div>

      {testimonials.length > 0 && (
        <div className="container testimonials">
          <h3 className="h3">{t.about.testimonialsTitle}</h3>
          <ul>
            {testimonials.map((r, i) => (
              <li key={i}><blockquote>„{r.quote[lang]}“</blockquote><p>{r.author}</p></li>
            ))}
          </ul>
        </div>
      )}
    </section>
  )
}

/* ───────── Závěrečné CTA + formulář ───────── */
export function ContactCTA({ title, text, button, preselect, image } = {}) {
  const { t, lang } = useLang()
  const f = t.cta.form
  const empty = { name: '', email: '', phone: '', interest: preselect ? [preselect] : [], message: '', consent: false, website: '' }
  const [data, setData] = useState(empty)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | done | error

  useEffect(() => {
    const onPre = (e) => setData((d) => ({ ...d, interest: d.interest.includes(e.detail) ? d.interest : [...d.interest, e.detail] }))
    window.addEventListener('ak:preselect', onPre)
    return () => window.removeEventListener('ak:preselect', onPre)
  }, [])

  const set = (k) => (e) => setData((d) => ({ ...d, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }))
  const toggle = (id) => setData((d) => ({ ...d, interest: d.interest.includes(id) ? d.interest.filter((x) => x !== id) : [...d.interest, id] }))

  const submit = async (e) => {
    e.preventDefault()
    const errs = {}
    if (!data.name.trim()) errs.name = f.errors.name
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errs.email = f.errors.email
    if (!data.consent) errs.consent = f.errors.consent
    setErrors(errs)
    if (Object.keys(errs).length) {
      document.getElementById(`f-${Object.keys(errs)[0]}`)?.focus()
      return
    }
    setStatus('sending')
    try {
      await postJSON('/api/consultation', { ...data, lang })
      setStatus('done')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section className={`section section--dark cta${image ? ' cta--image' : ''}`} id="kontakt"
      style={image ? { backgroundImage: `linear-gradient(90deg, rgba(31,26,22,.94) 0%, rgba(31,26,22,.86) 50%, rgba(31,26,22,.72) 100%), url(${image})` } : undefined}>
      <div className="container cta__grid">
        <div className="cta__copy">
          <h2 className="display"><Rich t={title || t.cta.title} /></h2>
          <p>{text || t.cta.text}</p>
          <ul className="cta__contact">
            <li><Icon.phone /><a href={`tel:${contact.phone.replace(/\s/g, '')}`}>{contact.phone}</a></li>
            <li><Icon.mail /><a href={`mailto:${contact.email}`}>{contact.email}</a></li>
            <li><Icon.pin /><span>{contact.area}</span></li>
          </ul>
        </div>

        {status === 'done' ? (
          <div className="form form--done" role="status">
            <h3 className="h3">{f.successTitle}</h3>
            <p>{f.successText}</p>
            <button type="button" className="btn btn--ghost" onClick={() => { setData(empty); setStatus('idle') }}>{f.again}</button>
          </div>
        ) : (
          <form className="form" onSubmit={submit} noValidate>
            <div className="form__row">
              <Field id="name" label={f.name} error={errors.name}>
                <input id="f-name" autoComplete="name" value={data.name} onChange={set('name')} aria-invalid={!!errors.name} />
              </Field>
              <Field id="email" label={f.email} error={errors.email}>
                <input id="f-email" type="email" autoComplete="email" value={data.email} onChange={set('email')} aria-invalid={!!errors.email} />
              </Field>
            </div>
            <Field id="phone" label={<>{f.phone} <small>({f.optional})</small></>}>
              <input id="f-phone" type="tel" autoComplete="tel" value={data.phone} onChange={set('phone')} />
            </Field>

            <fieldset className="chips">
              <legend>{f.interest}</legend>
              {services.map((s) => (
                <label key={s.id} className={`chip${data.interest.includes(s.id) ? ' is-on' : ''}`}>
                  <input type="checkbox" checked={data.interest.includes(s.id)} onChange={() => toggle(s.id)} />
                  {t.services.items[s.id].title}
                </label>
              ))}
            </fieldset>

            <Field id="message" label={f.message}>
              <textarea id="f-message" rows="4" value={data.message} onChange={set('message')} />
            </Field>

            {/* honeypot */}
            <input className="hp" tabIndex="-1" autoComplete="off" value={data.website} onChange={set('website')} aria-hidden="true" />

            <label className="consent">
              <input id="f-consent" type="checkbox" checked={data.consent} onChange={set('consent')} aria-invalid={!!errors.consent} />
              <span>{f.consent} <a href="/ochrana-osobnich-udaju" className="consent__link">{f.privacyLink}</a></span>
            </label>
            {errors.consent && <p className="field__error">{errors.consent}</p>}

            {status === 'error' && <p className="form__error" role="alert">{f.errors.server}</p>}

            <button type="submit" className="btn btn--primary btn--block" disabled={status === 'sending'}>
              {status === 'sending' ? f.sending : (button || t.cta.button)}<Icon.arrow />
            </button>
          </form>
        )}
      </div>
    </section>
  )
}

function Field({ id, label, error, children }) {
  return (
    <div className={`field${error ? ' has-error' : ''}`}>
      <label htmlFor={`f-${id}`}>{label}</label>
      {children}
      {error && <p className="field__error">{error}</p>}
    </div>
  )
}

/* ───────── Footer ───────── */
const footerHrefs = ['/kuchyne-na-miru', '/vestavne-skrine', '/nabytek-na-miru', '/dvere', '#sluzby', '#realizace', '#pro-profesionaly', '#o-nas', '#kontakt']

export function Footer() {
  const { t } = useLang()
  const [email, setEmail] = useState('')
  const [done, setDone] = useState(false)
  const [err, setErr] = useState(false)

  const subscribe = async (e) => {
    e.preventDefault()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setErr(true); return }
    setErr(false)
    try { await postJSON('/api/newsletter', { email }); setDone(true) } catch { setErr(true) }
  }

  return (
    <footer className="footer">
      <div className="container footer-close">
        <h2 className="footer-close__title"><Rich t={t.footer.closing} /></h2>
        <a href="#kontakt" className="btn btn--primary">{t.nav.cta}<Icon.arrow /></a>
      </div>
      <div className="container footer__grid">
        <div className="footer__brand">
          <Logo />
          <p>{t.footer.claim}</p>
          <div className="social">
            <a href={contact.social.facebook} aria-label="Facebook" target="_blank" rel="noreferrer"><Icon.facebook /></a>
            <a href={contact.social.instagram} aria-label="Instagram" target="_blank" rel="noreferrer"><Icon.instagram /></a>
            <a href={contact.social.linkedin} aria-label="LinkedIn" target="_blank" rel="noreferrer"><Icon.linkedin /></a>
          </div>
        </div>
        <div>
          <h3 className="footer__title">{t.footer.linksTitle}</h3>
          <ul className="footer__links">
            {t.footer.links.map((l, i) => <li key={l}><a href={footerHrefs[i]}>{l}</a></li>)}
          </ul>
        </div>
        <div>
          <h3 className="footer__title">{t.footer.contactTitle}</h3>
          <ul className="footer__contact">
            <li><Icon.phone /><a href={`tel:${contact.phone.replace(/\s/g, '')}`}>{contact.phone}</a></li>
            <li><Icon.mail /><a href={`mailto:${contact.email}`}>{contact.email}</a></li>
            <li><Icon.pin /><span>{contact.area}</span></li>
          </ul>
        </div>
        <div>
          <h3 className="footer__title">{t.footer.newsletterTitle}</h3>
          {done ? <p role="status">{t.footer.newsletterDone}</p> : (
            <>
              <p className="footer__small">{t.footer.newsletterText}</p>
              <form className="newsletter" onSubmit={subscribe} noValidate>
                <label className="sr-only" htmlFor="nl">{t.footer.newsletterPlaceholder}</label>
                <input id="nl" type="email" placeholder={t.footer.newsletterPlaceholder} value={email} onChange={(e) => setEmail(e.target.value)} aria-invalid={err} />
                <button type="submit" aria-label={t.footer.newsletterTitle}><Icon.arrow /></button>
              </form>
              {err && <p className="field__error">{t.cta.form.errors.email}</p>}
              <p className="newsletter__note">{t.footer.newsletterNote} <a href="/ochrana-osobnich-udaju">{t.footer.privacy}</a>.</p>
            </>
          )}
        </div>
      </div>
      <div className="container footer__bottom">
        <span>© {new Date().getFullYear()} AK Interiéry. {t.footer.rights}</span>
        <span><a href="/ochrana-osobnich-udaju">{t.footer.privacy}</a><span aria-hidden="true">|</span><a href="/podminky-pouziti">{t.footer.terms}</a></span>
      </div>
      <div className="footer-mark" aria-hidden="true"><span>AK Interiéry</span></div>
    </footer>
  )
}
