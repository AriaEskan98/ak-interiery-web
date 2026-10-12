// Modern header (v2). The original header is still in Top.jsx as `Header`.
// Switch between them with `headerStyle` in src/site.config.js.
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { LANGS, useLang, A11Y } from '../lib.jsx'
import { useRoute } from '../router.jsx'
import { Icon } from './Icons.jsx'
import { contact } from '../site.config.js'
import './header-modern.css'

function LogoInline() {
  return (
    <span className="logo-inline" aria-label="AK Interiéry">
      <span className="logo-inline__mark" aria-hidden="true"><span>A</span><span>K</span></span>
      <span className="logo-inline__rule" aria-hidden="true" />
      <span className="logo-inline__word" aria-hidden="true">Interiéry<small>Na míru</small></span>
    </span>
  )
}

export function HeaderModern() {
  const { t, lang, setLang } = useLang()
  const { route } = useRoute()
  const pageHref = { complete: '/kompletni-interiery', kitchen: '/kuchyne-na-miru', work: '/realizace', project: '/realizace', b2b: '/pro-profesionaly', about: '/o-nas', contact: '/kontakt' }[route] || null
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(null) // section in view
  const [hover, setHover] = useState(null)   // link under the pointer
  const [ind, setInd] = useState({ x: 0, w: 0, on: false })
  const navRef = useRef(null)
  const progressRef = useRef(null)
  const openRef = useRef(open)
  openRef.current = open

  // scrolled state, hide-on-scroll-down, progress hairline
  useEffect(() => {
    let lastY = window.scrollY
    let ticking = false
    const update = () => {
      const y = window.scrollY
      const max = document.documentElement.scrollHeight - window.innerHeight
      setScrolled(y > 40)
      if (!openRef.current) {
        if (y > 320 && y > lastY + 4) setHidden(true)
        else if (y < lastY - 4 || y < 320) setHidden(false)
      }
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${max > 0 ? y / max : 0})`
      lastY = y
      ticking = false
    }
    const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(update) } }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // scrollspy: whatever section is actually on top at the centre of the screen
  // (works with stacked pages, where covered sections are still technically in view)
  useEffect(() => {
    const hrefs = new Set(t.nav.items.map((i) => i.href))
    const alias = { '#jak-pracujeme': '#kompletni-interiery' }
    let raf = 0
    const spy = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const el = document.elementFromPoint(window.innerWidth / 2, window.innerHeight / 2)
        const sec = el?.closest('section[id]')
        const id = sec ? alias['#' + sec.id] || '#' + sec.id : null
        setActive(hrefs.has(id) ? id : pageHref)
      })
    }
    spy()
    window.addEventListener('scroll', spy, { passive: true })
    return () => { window.removeEventListener('scroll', spy); cancelAnimationFrame(raf) }
  }, [t, pageHref])

  // gliding indicator under hovered / active link
  const place = useCallback(() => {
    const target = hover || active
    const nav = navRef.current
    const el = target && nav?.querySelector(`a[href="${target}"]`)
    if (!el) { setInd((s) => ({ ...s, on: false })); return }
    setInd({ x: el.offsetLeft, w: el.offsetWidth, on: true })
  }, [hover, active])
  useLayoutEffect(place, [place, lang])
  useEffect(() => {
    window.addEventListener('resize', place)
    document.fonts?.ready.then(place)
    return () => window.removeEventListener('resize', place)
  }, [place])

  // close the mobile menu whenever the page changes (links to other pages are handled by the router)
  useEffect(() => { setOpen(false); setHidden(false) }, [route])

  // mobile menu: lock scroll, Esc closes
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    if (open) setHidden(false)
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const cls = ['hdr', scrolled && 'is-scrolled', hidden && 'is-hidden', open && 'is-open'].filter(Boolean).join(' ')

  const Lang = (
    <div className="hdr__lang" role="group" aria-label="Jazyk / Language / Sprache">
      {LANGS.map((l) => (
        <button key={l} type="button" aria-pressed={lang === l} className={lang === l ? 'is-active' : ''} onClick={() => setLang(l)}>
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  )

  return (
    <header className={cls}>
      <div className="hdr__bar">
        <a href="/" className="hdr__logo" aria-label={A11Y[lang].home} onClick={() => setOpen(false)}><LogoInline /></a>

        <nav ref={navRef} className="hdr__nav" aria-label={A11Y[lang].mainNav} onMouseLeave={() => setHover(null)}>
          {t.nav.items.map((i) => (
            <a key={i.href} href={i.href} onMouseEnter={() => setHover(i.href)} onFocus={() => setHover(i.href)} onBlur={() => setHover(null)}
              className={active === i.href ? 'is-active' : ''} aria-current={active === i.href ? 'location' : undefined}
              title={i.short ? i.label : undefined}>
              {i.short || i.label}
            </a>
          ))}
          <span className={`hdr__ind${ind.on ? ' is-on' : ''}`} style={{ transform: `translateX(${ind.x}px)`, width: ind.w }} aria-hidden="true" />
        </nav>

        <div className="hdr__end">
          {Lang}
          <a href="#kontakt" className="hdr__cta" onClick={() => window.dispatchEvent(new CustomEvent('ak:form', { detail: { mode: 'private' } }))}>
            <span>{t.nav.cta}</span>
            <span className="hdr__cta-icon"><Icon.arrow width="14" height="14" /></span>
          </a>
          <button type="button" className="hdr__burger" aria-expanded={open} aria-controls="hdr-menu" onClick={() => setOpen(!open)}>
            <span className="sr-only">{open ? t.nav.close : t.nav.menu}</span>
            <i /><i />
          </button>
        </div>

        <span className="hdr__progress" aria-hidden="true"><span ref={progressRef} /></span>
      </div>

      <div id="hdr-menu" className="hdr__menu" hidden={!open}>
        <nav aria-label={A11Y[lang].mobileNav}>
          {t.nav.items.map((i, n) => (
            <a key={i.href} href={i.href} onClick={() => setOpen(false)} style={{ '--i': n }}>
              <span>{i.label}</span><Icon.arrow />
            </a>
          ))}
        </nav>
        <div className="hdr__menu-foot">
          <a href="#kontakt" className="btn btn--primary btn--block" onClick={() => { setOpen(false); window.dispatchEvent(new CustomEvent('ak:form', { detail: { mode: 'private' } })) }}>{t.nav.cta}<Icon.arrow /></a>
          <div className="hdr__menu-meta">
            <a href={`tel:${contact.phone.replace(/\s/g, '')}`}>{contact.phone}</a>
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
          </div>
          <div className="hdr__menu-row">
            {Lang}
          </div>
        </div>
      </div>
    </header>
  )
}
