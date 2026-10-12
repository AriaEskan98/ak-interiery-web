import { useState } from 'react'
import { useLang, useInView, Rich } from '../lib.jsx'
import { Icon, Logo } from './Icons.jsx'
import { ContactSection } from './EnquiryForms.jsx'
import { contact, b2bImage, testimonials, whatsappUrl } from '../site.config.js'

const DEMO = import.meta.env.VITE_DEMO === '1' // static preview: no API server behind it

async function postJSON(url, body) {
  if (DEMO) { await new Promise((r) => setTimeout(r, 700)); return { ok: true } }
  const res = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
  if (!res.ok) throw new Error(String(res.status))
  return res.json()
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
        <a href="/pro-profesionaly" className="btn btn--primary">{t.b2b.cta}<Icon.arrow /></a>
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
          <a href="/o-nas" className="btn btn--dark">{t.about.cta}<Icon.arrow /></a>
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

/* ───────── Závěrečné CTA + formuláře (see EnquiryForms.jsx) ───────── */
export function ContactCTA({ title, text, preselect, image, mode } = {}) {
  const { t } = useLang()
  return <ContactSection title={title || t.cta.title} text={text || t.cta.text} preselect={preselect} image={image} mode={mode} />
}

/* ───────── Footer ───────── */

export function Footer() {
  const { t, lang } = useLang()
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
          <p className="footer__area"><Icon.pin />{contact.area}</p>
        </div>

        <nav aria-label={t.footer.servicesTitle}>
          <h3 className="footer__title">{t.footer.servicesTitle}</h3>
          <ul className="footer__list">{t.footer.services.map(([l, h]) => <li key={h}><a href={h}>{l}</a></li>)}</ul>
        </nav>

        <nav aria-label={t.footer.companyTitle}>
          <h3 className="footer__title">{t.footer.companyTitle}</h3>
          <ul className="footer__list">{t.footer.company.map(([l, h]) => <li key={h}><a href={h}>{l}</a></li>)}</ul>
        </nav>

        <div>
          <h3 className="footer__title">{t.footer.contactTitle}</h3>
          <ul className="footer__contact">
            <li><Icon.phone /><a href={`tel:${contact.phone.replace(/\s/g, '')}`}>{contact.phone}</a></li>
            <li><Icon.mail /><a href={`mailto:${contact.email}`}>{contact.email}</a></li>
            <li><Icon.whatsapp /><a href={whatsappUrl(lang)} target="_blank" rel="noopener noreferrer">{t.footer.whatsapp}</a></li>
          </ul>
          {/* social icons – footer only, right-hand column (AK_Social_Media_Footer_Instructions): Instagram · Facebook · TikTok */}
          <h3 className="footer__title footer__follow">{t.footer.follow}</h3>
          <div className="footer-social">
            <a href={contact.social.instagram} target="_blank" rel="noopener noreferrer" aria-label={t.footer.on('Instagram')}><Icon.instagram /></a>
            <a href={contact.social.facebook} target="_blank" rel="noopener noreferrer" aria-label={t.footer.on('Facebook')}><Icon.facebook /></a>
            <a href={contact.social.tiktok} target="_blank" rel="noopener noreferrer" aria-label={t.footer.on('TikTok')}><Icon.tiktok /></a>
          </div>
        </div>
      </div>

      {/* newsletter – one slim row */}
      <div className="container footer-news">
        <div className="footer-news__copy">
          <h3 className="footer__title">{t.footer.newsletterTitle}</h3>
          <p>{t.footer.newsletterText}</p>
        </div>
        {done ? <p className="footer-news__done" role="status">{t.footer.newsletterDone}</p> : (
          <div className="footer-news__form">
            <form className="newsletter" onSubmit={subscribe} noValidate>
              <label className="sr-only" htmlFor="nl">{t.footer.newsletterPlaceholder}</label>
              <input id="nl" type="email" placeholder={t.footer.newsletterPlaceholder} value={email} onChange={(e) => setEmail(e.target.value)} aria-invalid={err} />
              <button type="submit" aria-label={t.footer.newsletterTitle}><Icon.arrow /></button>
            </form>
            {err && <p className="field__error">{t.cta.form.errors.email}</p>}
            <p className="newsletter__note">{t.footer.newsletterNote} <a href="/ochrana-osobnich-udaju">{t.footer.privacy}</a>.</p>
          </div>
        )}
      </div>

      <div className="container footer__bottom">
        <span>© {new Date().getFullYear()} AK Interiéry. {t.footer.rights}</span>
        <span><a href="/ochrana-osobnich-udaju">{t.footer.privacy}</a><span aria-hidden="true">·</span><a href="/podminky-pouziti">{t.footer.terms}</a></span>
      </div>
      <div className="footer-mark" aria-hidden="true"><span>AK Interiéry</span></div>
    </footer>
  )
}
