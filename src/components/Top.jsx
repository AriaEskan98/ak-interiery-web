import { useEffect, useState } from 'react'
import { useLang, useInView, prefersReducedMotion, preselectService, Rich } from '../lib.jsx'
import { Icon, Logo, PergolaArt } from './Icons.jsx'
import { contact, heroSlides, services, completeInterior } from '../site.config.js'
import { useRoute } from '../router.jsx'

export function Header() {
  const { t, lang, setLang } = useLang()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { route } = useRoute()
  useEffect(() => { setOpen(false) }, [route]) // close the menu when the page changes

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const LangSwitch = (
    <div className="lang" role="group" aria-label="Jazyk / Language">
      {['cz', 'en'].map((l) => (
        <button key={l} type="button" className={lang === l ? 'is-active' : ''} aria-pressed={lang === l} onClick={() => setLang(l)}>
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  )

  return (
    <header className={`header${scrolled ? ' is-scrolled' : ''}${open ? ' is-open' : ''}`}>
      <div className="container header__inner">
        <a href="/" className="header__logo" aria-label="AK Interiéry – domů"><Logo compact /></a>
        <nav className="nav" aria-label="Hlavní menu">
          {t.nav.items.map((i) => <a key={i.href} href={i.href}>{i.label}</a>)}
        </nav>
        <div className="header__right">
          <div className="social">
            <a href={contact.social.facebook} aria-label="Facebook" target="_blank" rel="noreferrer"><Icon.facebook /></a>
            <a href={contact.social.instagram} aria-label="Instagram" target="_blank" rel="noreferrer"><Icon.instagram /></a>
          </div>
          {LangSwitch}
          <a href="#kontakt" className="btn btn--primary btn--sm header__cta">{t.nav.cta}<Icon.arrow /></a>
          <button type="button" className="burger" aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(!open)}>
            <span className="sr-only">{open ? t.nav.close : t.nav.menu}</span>
            <span /><span />
          </button>
        </div>
      </div>

      <div id="mobile-menu" className="mobile-menu" hidden={!open}>
        <nav aria-label="Mobilní menu">
          {t.nav.items.map((i, n) => (
            <a key={i.href} href={i.href} onClick={() => setOpen(false)} style={{ '--i': n }}>{i.label}</a>
          ))}
        </nav>
        <div className="mobile-menu__foot">
          <a href="#kontakt" className="btn btn--primary" onClick={() => setOpen(false)}>{t.nav.cta}<Icon.arrow /></a>
          {LangSwitch}
        </div>
      </div>
    </header>
  )
}

const SLIDE_MS = 7000

export function Hero() {
  const { t } = useLang()
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused || prefersReducedMotion()) return
    const id = setTimeout(() => setActive((a) => (a + 1) % heroSlides.length), SLIDE_MS)
    return () => clearTimeout(id)
  }, [active, paused])

  return (
    <section className="hero" id="top" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="hero__media" aria-hidden="true">
        {heroSlides.map((src, i) => (
          <img key={src} src={src} alt="" className={i === active ? 'is-active' : ''}
            fetchPriority={i === 0 ? 'high' : 'low'} loading={i === 0 ? 'eager' : 'lazy'} />
        ))}
      </div>
      <div className="hero__shade" aria-hidden="true" />

      <div className="container hero__content">
        <p className="eyebrow hero__reveal" style={{ '--d': '.1s' }}>{t.hero.eyebrow}</p>
        <h1 className="hero__title">
          {t.hero.title.map((line, i) => (
            <span className="line" key={i}><span style={{ '--d': `${0.25 + i * 0.12}s` }}><Rich t={line} /></span></span>
          ))}
        </h1>
        <p className="hero__text hero__reveal" style={{ '--d': '.6s' }}>{t.hero.text}</p>
        <p className="hero__claim hero__reveal" style={{ '--d': '.7s' }}>{t.hero.claim}</p>
        <div className="hero__actions hero__reveal" style={{ '--d': '.8s' }}>
          <a href="#kontakt" className="btn btn--primary">{t.hero.primary}<Icon.arrow /></a>
          <a href="#realizace" className="btn btn--ghost">{t.hero.secondary}<Icon.arrow /></a>
        </div>
      </div>

      <div className="container hero__bar">
        <a href="#sluzby" className="hero__scroll" aria-label={t.hero.scroll}><span /></a>
        <div className="hero__slides">
          <span className="hero__caption" key={active}>{t.hero.slides[active]}</span>
          <ol>
            {heroSlides.map((_, i) => (
              <li key={i}>
                <button type="button" onClick={() => setActive(i)} aria-label={`${i + 1}: ${t.hero.slides[i]}`}
                  aria-current={i === active} className={i === active ? 'is-active' : ''}>
                  <span className="num">{String(i + 1).padStart(2, '0')}</span>
                  <span className="track"><span className="fill" style={{ animationDuration: `${SLIDE_MS}ms`, animationPlayState: paused ? 'paused' : 'running' }} /></span>
                </button>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}

export function Services() {
  const { t } = useLang()
  const [open, setOpen] = useState(0) // desktop: which panel is expanded
  return (
    <section className="section section--light" id="sluzby">
      <div className="container">
        <div className="section-head section-head--split">
          <div>
            <p className="eyebrow">{t.services.eyebrow}</p>
            <h2 className="h2"><Rich t={t.services.title} /></h2>
          </div>
          <p className="lead">{t.services.text}</p>
        </div>

        <ul className="services">
          {services.map((s, i) => {
            const copy = t.services.items[s.id]
            const Tag = s.href ? 'a' : 'button'
            const props = s.href ? { href: s.href } : { type: 'button', onClick: () => preselectService(s.id) }
            return (
              <li key={s.id} className={`service${s.id === 'pergola' ? ' service--secondary' : ''}${open === i ? ' is-open' : ''}`}
                onMouseEnter={() => setOpen(i)} onFocus={() => setOpen(i)}>
                <Tag className="service__link" {...props}>
                  <span className="service__img">
                    {s.image ? <img src={s.image} alt="" loading="lazy" /> : <PergolaArt />}
                  </span>
                  <span className="service__body">
                    <span className="service__num">{String(i + 1).padStart(2, '0')}</span>
                    <span className="service__title">{copy.title}</span>
                    <span className="service__text">{copy.text}</span>
                    <span className="more">{t.services.more}<Icon.arrow /></span>
                  </span>
                </Tag>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}

export function CompleteInterior() {
  const { t } = useLang()
  return (
    <section className="section section--light complete" id="kompletni-interiery">
      <div className="container complete__grid">
        <div className="complete__media">
          <img className="complete__main" src={completeInterior.main} alt="" loading="lazy" />
          <img className="complete__detail" src={completeInterior.detailA} alt="" loading="lazy" />
        </div>
        <div className="complete__copy">
          <p className="eyebrow">{t.complete.eyebrow}</p>
          <h2 className="h2"><Rich t={t.complete.title} /></h2>
          <p>{t.complete.text}</p>
          <p className="pull">{t.complete.extra}</p>
          <a href="/kompletni-interiery" className="btn btn--dark">{t.complete.cta}<Icon.arrow /></a>
        </div>
      </div>
    </section>
  )
}

const stepIcons = [Icon.chat, Icon.ruler, Icon.doc, Icon.gear, Icon.home]

export function Process() {
  const { t } = useLang()
  const [ref, inView] = useInView({ threshold: 0.35 })
  return (
    <section className="section section--light process" id="jak-pracujeme">
      <div className="container">
        <div className="section-head">
          <p className="eyebrow">{t.process.eyebrow}</p>
          <h2 className="h2"><Rich t={t.process.title} /></h2>
        </div>
        <ol ref={ref} className={`steps${inView ? ' is-in' : ''}`}>
          {t.process.steps.map((s, i) => {
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
  )
}

// Full-width photo with one short line – a pause between sections.
export function Statement({ image, eyebrow, line, id }) {
  const [ref, inView] = useInView({ threshold: 0.35 })
  return (
    <section ref={ref} className={`statement${inView ? ' is-in' : ''}`} id={id}>
      <img className="statement__img" src={image} alt="" loading="lazy" />
      <div className="statement__shade" aria-hidden="true" />
      <div className="container statement__inner">
        <p className="eyebrow">{eyebrow}</p>
        <p className="statement__line"><span className="statement__mask"><span><Rich t={line} /></span></span></p>
      </div>
    </section>
  )
}
