// Minimal router (no dependency): real URLs like /vestavne-skrine, back/forward buttons work.
// Each route is pre-rendered to HTML at build time (scripts/prerender.mjs); unknown paths get the 404 page.
import { createContext, useContext, useEffect, useState } from 'react'
import { scrollToHash } from './lib.jsx'

export const ROUTES = {
  '/': 'home',
  '/vestavne-skrine': 'wardrobes',
  '/kompletni-interiery': 'complete',
  '/kuchyne-na-miru': 'kitchen',
  '/dvere': 'doors',
  '/nabytek-na-miru': 'furniture',
  '/ochrana-osobnich-udaju': 'privacy',
  '/podminky-pouziti': 'terms',
}

// The single-file preview runs under an unrelated URL, so there an unknown path means "homepage".
const UNKNOWN = import.meta.env.VITE_DEMO === '1' ? 'home' : 'notfound'

const RouteCtx = createContext({ route: 'home', navigate: () => {} })
export const routeOf = (path) => ROUTES[path.replace(/\/+$/, '') || '/'] || UNKNOWN

export function RouterProvider({ children, initialPath }) {
  // initialPath is given when pre-rendering on the server; in the browser we read the address bar
  const [path, setPath] = useState(() => initialPath ?? window.location.pathname)
  const route = routeOf(path)

  const navigate = (to, hash) => {
    const target = to.replace(/\/+$/, '') || '/'
    try { window.history.pushState({}, '', target + (hash || '')) } catch { /* sandboxed preview: keep in-memory */ }
    setPath(target)
    // after the new page renders: go to the section, or to the top
    requestAnimationFrame(() => requestAnimationFrame(() => {
      if (hash && document.querySelector(hash)) scrollToHash(hash)
      else window.scrollTo({ top: 0, behavior: 'instant' })
    }))
  }

  useEffect(() => {
    const onPop = () => setPath(window.location.pathname)
    // internal links: "/page" and "#section" (a section that only exists on the homepage)
    const onClick = (e) => {
      if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return
      const a = e.target.closest('a[href]')
      if (!a || a.target === '_blank') return
      const href = a.getAttribute('href')
      if (href.startsWith('/') && !href.startsWith('//') && !href.startsWith('/api')) {
        const [p, h] = href.split('#')
        e.preventDefault()
        e.stopPropagation()
        navigate(p || '/', h ? '#' + h : '')
      } else if (href.startsWith('#') && href.length > 1 && !document.querySelector(href)) {
        e.preventDefault()
        e.stopPropagation()
        navigate('/', href)
      }
    }
    window.addEventListener('popstate', onPop)
    document.addEventListener('click', onClick, true)
    return () => { window.removeEventListener('popstate', onPop); document.removeEventListener('click', onClick, true) }
  }, [])

  return <RouteCtx.Provider value={{ route, navigate }}>{children}</RouteCtx.Provider>
}

export const useRoute = () => useContext(RouteCtx)
