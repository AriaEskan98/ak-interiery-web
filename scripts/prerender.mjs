// Pre-renders every page to static HTML after `vite build` (part of `npm run build`).
// Search engines and link previews (Facebook, WhatsApp…) get real content and per-page <head> tags;
// in the browser React takes the HTML over (hydration).
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dist = path.join(root, 'dist')
const ssr = await import(pathToFileURL(path.join(root, 'dist-ssr', 'entry-server.js')).href)

const template = await fs.readFile(path.join(dist, 'index.html'), 'utf8')
// strip the generic head tags from index.html – each page gets its own
const base = template
  .replace(/<title>[\s\S]*?<\/title>\s*/i, '')
  .replace(/<meta name="description"[^>]*>\s*/i, '')
  .replace(/<meta property="og:[^>]*>\s*/gi, '')

const page = (route, urlPath) => base
  .replace('</head>', `    ${ssr.headTags(route)}\n  </head>`)
  .replace('<div id="root"></div>', `<div id="root">${ssr.render(urlPath)}</div>`)

const written = []
for (const [urlPath, route] of Object.entries(ssr.ROUTES)) {
  // flat files (dist/kuchyne-na-miru.html) – served as /kuchyne-na-miru by Vercel (cleanUrls) and server/index.js
  const file = urlPath === '/' ? path.join(dist, 'index.html') : path.join(dist, urlPath.slice(1) + '.html')
  await fs.writeFile(file, page(route, urlPath))
  written.push(urlPath)
}
await fs.writeFile(path.join(dist, '404.html'), page('notfound', '/__404'))

// sitemap + robots
const siteUrl = ssr.siteUrl.replace(/\/$/, '')
const today = new Date().toISOString().slice(0, 10)
const urls = Object.entries(ssr.ROUTES)
  .filter(([, r]) => !ssr.SEO[r]?.noindex)
  .map(([p, r]) => `  <url><loc>${siteUrl}${p}</loc><lastmod>${today}</lastmod><priority>${r === 'home' ? '1.0' : ['privacy', 'terms'].includes(r) ? '0.3' : '0.8'}</priority></url>`)
await fs.writeFile(path.join(dist, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`)
await fs.writeFile(path.join(dist, 'robots.txt'), `User-agent: *\nAllow: /\nDisallow: /api/\n\nSitemap: ${siteUrl}/sitemap.xml\n`)

await fs.rm(path.join(root, 'dist-ssr'), { recursive: true, force: true })
console.log(`Pre-rendered ${written.length} pages + 404, sitemap.xml, robots.txt → dist/`)
