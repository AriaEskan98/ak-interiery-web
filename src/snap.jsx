// Snap pages: every scroll gesture moves exactly one page (slideshow feel).
// Works together with stack.js (pages slide over each other during the move).
// Pages taller than the screen scroll normally inside; the next gesture at their end snaps on.
// Enable with `sectionTransition = 'snap'` in src/site.config.js.
import { useEffect, useState } from 'react'
import './snap.css'

const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Rest zones of each page: [start, end]. Between end(i) and start(i+1) the next page is sliding in.
export function getStops() {
  const stack = document.querySelector('.stack')
  if (!stack) return []
  const vh = window.innerHeight
  let y = stack.getBoundingClientRect().top + window.scrollY
  const segs = [...stack.querySelectorAll(':scope > .panel')].map((panel) => {
    const start = Math.round(y)
    const end = Math.round(y + Math.max(0, panel.offsetHeight - vh))
    y += panel.offsetHeight
    return { start, end, panel }
  })
  const max = document.documentElement.scrollHeight - vh
  if (segs.length && max > segs[segs.length - 1].end + 2) segs.push({ start: max, end: max, panel: null }) // footer
  return segs
}
const locate = (segs, y) => {
  let i = 0
  segs.forEach((s, j) => { if (s.start <= y + 2) i = j })
  return i
}

export function useSnapPages(enabled = true) {
  useEffect(() => {
    if (!enabled || reduced() || !document.querySelector('.stack')) return
    const root = document.documentElement
    root.classList.add('is-snap')

    let anim = null
    let animEnd = 0
    let lastWheel = 0
    let lastWasFree = false
    let lastY = window.scrollY
    let dir = 1
    let touching = false
    let idle = 0

    function tween(to) {
      const from = window.scrollY
      if (Math.abs(to - from) < 2) return
      const dur = Math.min(1150, 700 + Math.abs(to - from) * 0.2)
      const t0 = performance.now()
      if (anim) cancelAnimationFrame(anim.raf)
      root.style.scrollBehavior = 'auto'
      anim = { to }
      const step = (now) => {
        const k = Math.min(1, (now - t0) / dur)
        const e = k < 0.5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2 // easeInOutCubic
        window.scrollTo(0, from + (to - from) * e)
        if (k < 1) anim.raf = requestAnimationFrame(step)
        else { anim = null; animEnd = performance.now(); root.style.scrollBehavior = '' }
      }
      anim.raf = requestAnimationFrame(step)
    }
    window.__akSnapTo = tween // used by the page dots

    // returns: number (snap target), 'free' (let the page scroll natively) or null (nothing to do)
    function target(d) {
      const segs = getStops()
      const y = window.scrollY
      const i = locate(segs, y)
      const s = segs[i]
      if (d > 0) {
        if (y < s.end - 1) return 'free'
        return segs[i + 1] ? segs[i + 1].start : null
      }
      if (y > s.end + 1) return s.end            // halfway between pages → back
      if (y > s.start + 1) return 'free'
      return segs[i - 1] ? segs[i - 1].end : null
    }

    const onWheel = (e) => {
      if (e.ctrlKey || Math.abs(e.deltaX) > Math.abs(e.deltaY)) return  // zoom / sideways (gallery)
      if (e.target.closest?.('.lightbox, .hdr__menu, textarea')) return
      const now = performance.now()
      const since = now - lastWheel
      lastWheel = now
      if (anim) { e.preventDefault(); return }
      if (now - animEnd < 900 && since < 180) { e.preventDefault(); return } // trackpad inertia tail
      const d = Math.sign(e.deltaY)
      if (!d) return
      const t = target(d)
      if (t === 'free') {
        // scroll inside a tall page, but never past its edge in the same gesture
        const segs = getStops(); const s = segs[locate(segs, window.scrollY)]
        const next = window.scrollY + e.deltaY
        if (d > 0 && next > s.end) { e.preventDefault(); window.scrollTo({ top: s.end, behavior: 'instant' }) }
        if (d < 0 && next < s.start) { e.preventDefault(); window.scrollTo({ top: s.start, behavior: 'instant' }) }
        lastWasFree = true
        return
      }
      if (t === null) return
      e.preventDefault()
      if (lastWasFree && since < 180) return // reached a page edge mid-gesture: wait for a new one
      lastWasFree = false
      tween(t)
    }

    const onKey = (e) => {
      if (e.target.closest?.('input, textarea, select, [contenteditable]') || document.querySelector('.lightbox')) return
      const keys = { PageDown: 1, ArrowDown: 1, ' ': e.shiftKey ? -1 : 1, PageUp: -1, ArrowUp: -1 }
      if (e.key === 'Home' || e.key === 'End') {
        e.preventDefault()
        tween(e.key === 'Home' ? 0 : root.scrollHeight - window.innerHeight)
        return
      }
      const d = keys[e.key]
      if (!d || anim) return
      const t = target(d)
      if (t === 'free' || t === null) return
      e.preventDefault()
      tween(t)
    }

    // touch, scrollbar drag, anchor jumps: if movement stops between two pages, settle on one
    const settle = () => {
      if (anim || touching) return
      const segs = getStops()
      const y = window.scrollY
      const i = locate(segs, y)
      const s = segs[i]; const n = segs[i + 1]
      if (!n || y <= s.end + 1 || y >= n.start - 1) return
      const p = (y - s.end) / (n.start - s.end)
      tween(dir > 0 ? (p > 0.12 ? n.start : s.end) : (p < 0.88 ? s.end : n.start))
    }
    const onScroll = () => {
      const y = window.scrollY
      if (y !== lastY) dir = y > lastY ? 1 : -1
      lastY = y
      clearTimeout(idle)
      if (!anim) idle = setTimeout(settle, 140)
    }
    const onTouchStart = () => { touching = true; if (anim) { cancelAnimationFrame(anim.raf); anim = null; root.style.scrollBehavior = '' } }
    const onTouchEnd = () => { touching = false; clearTimeout(idle); idle = setTimeout(settle, 140) }

    window.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('keydown', onKey)
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchend', onTouchEnd, { passive: true })
    return () => {
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchend', onTouchEnd)
      clearTimeout(idle)
      if (anim) cancelAnimationFrame(anim.raf)
      root.classList.remove('is-snap')
      delete window.__akSnapTo
    }
  }, [enabled])
}

// Page dots on the right edge
export function SnapDots() {
  const [pages, setPages] = useState([])
  const [active, setActive] = useState(0)

  useEffect(() => {
    const read = () => setPages(getStops().filter((s) => s.panel).map((s) => {
      const h = s.panel.querySelector('h1, h2')
      return { label: h ? [...h.querySelectorAll('.line')].map((l) => l.textContent).join(' ') || h.textContent.trim() : '', light: s.panel.classList.contains('panel--light') }
    }))
    read()
    const ro = new ResizeObserver(read)
    document.querySelectorAll('.stack > .panel').forEach((p) => ro.observe(p))
    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const segs = getStops().filter((s) => s.panel)
        const y = window.scrollY + window.innerHeight * 0.5
        let i = 0
        segs.forEach((s, j) => { if (s.start <= y) i = j })
        setActive(i)
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    // labels follow the language switch
    const mo = new MutationObserver(read)
    mo.observe(document.querySelector('.stack'), { subtree: true, characterData: true, childList: true })
    return () => { ro.disconnect(); mo.disconnect(); window.removeEventListener('scroll', onScroll); cancelAnimationFrame(raf) }
  }, [])

  if (!pages.length) return null
  const go = (i) => {
    const s = getStops().filter((x) => x.panel)[i]
    if (s) (window.__akSnapTo || ((t) => window.scrollTo({ top: t, behavior: 'smooth' })))(s.start)
  }
  return (
    <nav className={`snap-dots${pages[active]?.light ? ' on-light' : ''}`} aria-label="Stránky">
      {pages.map((p, i) => (
        <button key={i} type="button" onClick={() => go(i)} aria-label={p.label} aria-current={i === active}
          className={i === active ? 'is-active' : ''}>
          <span className="snap-dots__label">{p.label}</span>
        </button>
      ))}
    </nav>
  )
}
