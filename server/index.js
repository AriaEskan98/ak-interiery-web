// AK Interiéry – small Node/Express server
// • POST /api/consultation  – consultation form (validated, rate-limited, saved, optionally emailed)
// • POST /api/newsletter    – footer newsletter sign-up
// • serves the built React app from /dist in production
import express from 'express'
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

try { process.loadEnvFile() } catch { /* no .env file – fine */ }

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DATA_DIR = path.join(__dirname, 'data')
const DIST = path.join(__dirname, '..', 'dist')
const PORT = process.env.PORT || 3001

const app = express()
app.disable('x-powered-by')
app.use(express.json({ limit: '20kb' }))

// basic security headers
app.use((_req, res, next) => {
  res.set({
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'X-Frame-Options': 'SAMEORIGIN',
  })
  next()
})

// tiny in-memory rate limiter: 5 requests / 10 min per IP per route
const hits = new Map()
const limit = (req, res, next) => {
  const key = `${req.ip}:${req.path}`
  const now = Date.now()
  const recent = (hits.get(key) || []).filter((t) => now - t < 10 * 60_000)
  if (recent.length >= 5) return res.status(429).json({ ok: false, error: 'too_many_requests' })
  hits.set(key, [...recent, now])
  next()
}

import { validateConsultation, validateNewsletter } from './enquiry.js'

async function append(file, record) {
  await fs.mkdir(DATA_DIR, { recursive: true })
  await fs.appendFile(path.join(DATA_DIR, file), JSON.stringify(record) + '\n')
}

import { mailEnabled, sendEnquiryEmails, sendNewsletterEmail } from './mail.js'

app.post('/api/consultation', limit, async (req, res) => {
  const { bot, errors, entry } = validateConsultation(req.body)
  if (bot) return res.json({ ok: true }) // silently drop bots
  if (errors) return res.status(400).json({ ok: false, errors })

  try {
    await append('consultations.jsonl', entry) // always saved first – an email problem never loses an enquiry
  } catch (err) {
    console.error('consultation could not be saved', err)
    return res.status(500).json({ ok: false, error: 'server_error' })
  }
  res.json({ ok: true })
  // emails are sent after answering, so the visitor never waits for (or sees) mail-server problems
  sendEnquiryEmails(entry).catch((err) => console.error('enquiry email failed (enquiry is saved):', err.message))
})

app.post('/api/newsletter', limit, async (req, res) => {
  const { errors, entry } = validateNewsletter(req.body)
  if (errors) return res.status(400).json({ ok: false, error: 'invalid_email' })
  try {
    await append('newsletter.jsonl', entry)
    res.json({ ok: true })
  } catch (err) {
    console.error('newsletter failed', err)
    return res.status(500).json({ ok: false, error: 'server_error' })
  }
  sendNewsletterEmail(entry).catch((err) => console.error('newsletter e-mail failed (sign-up is saved):', err.message))
})

app.get('/api/health', (_req, res) => res.json({ ok: true }))

// production: serve the pre-rendered site (npm run build)
app.use(express.static(DIST, { maxAge: '30d', index: false, redirect: false }))
app.get(/^(?!\/api).*/, async (req, res) => {
  const clean = decodeURIComponent(req.path).replace(/\/+$/, '') || '/'
  const file = clean === '/' ? path.join(DIST, 'index.html') : path.join(DIST, clean + '.html')
  if (file.startsWith(DIST) && await fs.stat(file).then((st) => st.isFile(), () => false)) {
    res.set('Cache-Control', 'no-cache') // pages always fresh; hashed assets are cached for 30 days
    return res.sendFile(file)
  }
  res.status(404).sendFile(path.join(DIST, '404.html'), (err) => err && res.status(404).end('404'))
})

app.listen(PORT, () => {
  console.log(`AK Interiéry server on http://localhost:${PORT}`)
  console.log(mailEnabled
    ? `E-mail: enquiries are sent to ${process.env.MAIL_TO}`
    : 'E-mail: NOT configured – enquiries are only saved to server/data/consultations.jsonl (see .env.example)')
})
