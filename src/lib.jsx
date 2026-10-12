import { createContext, useContext, useEffect, useRef, useState } from 'react'
import { content } from './content.js'

const LangCtx = createContext(null)
// Site languages: Czech (primary, pre-rendered), English, German (MASTER DE 1.0, 12. 10. 2026).
export const LANGS = ['cz', 'en', 'de']
const HTML_LANG = { cz: 'cs', en: 'en', de: 'de' }
// Labels read out by screen readers (not visible).
export const A11Y = {
  cz: { crumbs: 'Drobečková navigace', mainNav: 'Hlavní menu', mobileNav: 'Mobilní menu', home: 'AK Interiéry – domů', formType: 'Typ poptávky' },
  en: { crumbs: 'Breadcrumb', mainNav: 'Main menu', mobileNav: 'Mobile menu', home: 'AK Interiors – home', formType: 'Enquiry type' },
  de: { crumbs: 'Brotkrümelnavigation', mainNav: 'Hauptmenü', mobileNav: 'Mobiles Menü', home: 'AK INTERIÉRY – Startseite', formType: 'Art der Anfrage' },
}

export function LangProvider({ children }) {
  // Starts in Czech so the browser matches the pre-rendered (Czech) HTML, then applies a saved choice.
  const [lang, setLang] = useState('cz')
  useEffect(() => {
    try { const saved = localStorage.getItem('ak-lang'); if (saved && saved !== 'cz' && LANGS.includes(saved)) setLang(saved) } catch { /* no storage */ }
  }, [])
  useEffect(() => {
    document.documentElement.lang = HTML_LANG[lang] || 'cs'
    try { localStorage.setItem('ak-lang', lang) } catch { /* storage unavailable */ }
  }, [lang])
  return <LangCtx.Provider value={{ lang, setLang, t: content[lang] }}>{children}</LangCtx.Provider>
}

export const useLang = () => useContext(LangCtx)

// Adds `is-in` once an element scrolls into view (used sparingly).
export function useInView(options = { threshold: 0.25 }) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el || inView) return
    if (!('IntersectionObserver' in window)) { setInView(true); return }
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setInView(true); io.disconnect() }
    }, options)
    io.observe(el)
    return () => io.disconnect()
  }, [inView]) // eslint-disable-line react-hooks/exhaustive-deps
  return [ref, inView]
}

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Shared bus so "Zjistit více" on a service card can pre-select that service in the form.
// Scrolls to a section's real position in the page, even when it sits inside a pinned (stacked) page.
export function scrollToHash(hash) {
  const el = document.querySelector(hash)
  if (!el) return
  const behavior = prefersReducedMotion() ? 'auto' : 'smooth'
  const panel = el.closest('.panel')
  const stack = panel?.parentElement
  if (!panel || !document.documentElement.classList.contains('is-stacked')) {
    el.scrollIntoView({ behavior })
    return
  }
  let top = stack.getBoundingClientRect().top + window.scrollY
  for (const p of stack.children) { if (p === panel) break; top += p.offsetHeight }
  let n = el
  while (n && n !== panel) { top += n.offsetTop; n = n.offsetParent }
  window.scrollTo({ top, behavior })
}

// Open the enquiry form at the bottom of the current page: mode 'private' (form A) or 'b2b' (form B),
// optionally with a service pre-selected in form A (e.g. 'kitchen') and a reference that is sent with the
// enquiry, e.g. { kind: 'decor', id: '03', label: 'Dekor 03' } or { kind: 'project', id: slug, label: title }.
export function openForm({ mode = 'private', preselect, reference } = {}) {
  const detail = { mode, preselect }
  if (reference !== undefined) detail.reference = reference
  window.dispatchEvent(new CustomEvent('ak:form', { detail }))
  scrollToHash(document.getElementById('formular') ? '#formular' : '#kontakt')
}
export const preselectService = (id) => openForm({ mode: 'private', preselect: id })

// Headings: words wrapped in *asterisks* in the content files render as Playfair italic accents.
export function Rich({ t }) {
  if (typeof t !== 'string' || !t.includes('*')) return t
  return t.split(/(\*[^*]+\*)/g).map((part, i) =>
    part.startsWith('*') && part.endsWith('*') ? <em key={i}>{part.slice(1, -1)}</em> : part)
}
