// Used only at build time by scripts/prerender.mjs to render each page to HTML.
import { renderToString } from 'react-dom/server'
import App from './App.jsx'
import { ROUTES } from './router.jsx'
import { headTags, SEO } from './seo.js'
import { siteUrl } from './site.config.js'

export function render(path) {
  return renderToString(<App initialPath={path} />)
}
export { ROUTES, headTags, SEO, siteUrl }
