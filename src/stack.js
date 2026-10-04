// Stacked pages: each colour block pins when you reach its end and the next one
// slides up over it like a sheet, while the one underneath dims and sinks back.
// Turn off with `sectionTransition = 'none'` in src/site.config.js.
import { useEffect } from 'react'
import { scrollToHash } from './lib.jsx'
import './stack.css'

export function useStackedSections(enabled = true) {
  useEffect(() => {
    const stack = document.querySelector('.stack')
    if (!enabled || !stack) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    document.documentElement.classList.add('is-stacked')
    const panels = [...stack.querySelectorAll(':scope > .panel')]

    // a page taller than the screen pins only once its bottom reaches the bottom of the screen
    const setTops = () => panels.forEach((p) => {
      p.style.top = `${Math.min(0, window.innerHeight - p.offsetHeight)}px`
    })
    const ro = new ResizeObserver(() => { setTops(); update() })
    panels.forEach((p) => ro.observe(p))

    let raf = 0
    function update() {
      const vh = window.innerHeight
      panels.forEach((p, i) => {
        const next = panels[i + 1]
        // how far the next page has slid over this one (0 → 1)
        const cover = next ? Math.min(1, Math.max(0, 1 - next.getBoundingClientRect().top / vh)) : 0
        // how far this page still is from the top while sliding in (1 → 0)
        const enter = Math.min(1, Math.max(0, p.getBoundingClientRect().top / vh))
        p.style.setProperty('--cover', cover.toFixed(3))
        p.style.setProperty('--enter', enter.toFixed(3))
        if (cover > 0.001) {
          // scale around the centre of what is currently visible
          const origin = vh / 2 - parseFloat(p.style.top || 0)
          p.style.transformOrigin = `50% ${origin}px`
          p.style.transform = `scale(${1 - cover * 0.07})`
        } else {
          p.style.transform = '' // no transform → fixed-position children (lightbox) behave
        }
      })
    }
    const onScroll = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(update) }

    // anchor links: pinned pages report their on-screen position, so compute the real one
    const onClick = (e) => {
      const a = e.target.closest('a[href^="#"]')
      if (!a || e.defaultPrevented || e.metaKey || e.ctrlKey) return
      const hash = a.getAttribute('href')
      if (hash.length < 2 || !document.querySelector(hash)) return
      e.preventDefault()
      setTimeout(() => scrollToHash(hash), 30) // let a mobile menu close first
      history.replaceState(null, '', hash)
    }

    setTops(); update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    document.addEventListener('click', onClick, true)
    return () => {
      ro.disconnect()
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      document.removeEventListener('click', onClick, true)
      document.documentElement.classList.remove('is-stacked')
      panels.forEach((p) => { p.style.top = ''; p.style.transform = '' })
    }
  }, [enabled])
}
