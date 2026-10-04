// Scroll reveal (sections appear as you scroll).
// Turn off with `scrollReveal = false` in src/site.config.js, or delete this file + reveal.css.
// Components are untouched: elements are tagged here by selector, and only tagged
// elements are ever hidden, so anything missed simply stays visible.
import { useEffect } from 'react'
import './reveal.css'

// each item rises in on its own; items that enter together are staggered
const ITEMS = [
  '.section-head > *',
  '.complete__copy > *',
  '.steps > li',
  '.b2b__copy > *',
  '.about__copy > *',
  '.values > li',
  '.cta__copy > *',
  '.cta .form',
  '.footer__grid > *',
]
// horizontal rows: the whole row cascades in left → right
const ROWS = ['.services', '.projects__track']
// large photos: curtain wipe + settle from zoom
const WIPES = ['.complete__main', '.complete__detail', '.b2b__media']

const STAGGER = 90 // ms between items

export function useScrollReveal(enabled = true) {
  useEffect(() => {
    if (!enabled || !('IntersectionObserver' in window)) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const tag = (selectors, kind) =>
      selectors.flatMap((s) => [...document.querySelectorAll(s)]).map((el) => {
        el.dataset.reveal = kind
        return el
      })

    const items = tag(ITEMS, 'up')
    const rows = tag(ROWS, 'row')
    const wipes = tag(WIPES, 'wipe')
    rows.forEach((row) => [...row.children].forEach((c, i) => c.style.setProperty('--n', i)))

    const io = new IntersectionObserver((entries) => {
      const entering = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top || a.boundingClientRect.left - b.boundingClientRect.left)
      entering.forEach((e, i) => {
        e.target.style.setProperty('--rd', `${i * STAGGER}ms`)
        e.target.dataset.revealed = ''
        io.unobserve(e.target)
      })
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0 })

    ;[...items, ...rows, ...wipes].forEach((el) => io.observe(el))

    // hero content drifts up and fades as you leave it
    const hero = document.querySelector('.hero')
    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        if (!hero) return
        const p = Math.min(1, Math.max(0, window.scrollY / hero.offsetHeight))
        hero.style.setProperty('--hp', p.toFixed(3))
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      io.disconnect()
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
      document.querySelectorAll('[data-reveal]').forEach((el) => { el.dataset.revealed = '' })
    }
  }, [enabled])
}
