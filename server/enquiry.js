// Validation + multipart parsing shared by the Node server (server/index.js) and the Vercel function (api/enquiry.js).
import Busboy from 'busboy'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PRIVATE_IDS = ['kitchen', 'stone', 'wardrobes', 'furniture', 'doors', 'complete', 'other']
const MATERIAL_IDS = ['furniture', 'cnc', 'mdf', 'edge', 'stone', 'plexi', 'other']
export const MAX_TOTAL = 4.4 * 1024 * 1024 // Vercel request limit is 4.5 MB
const ALLOWED = {
  private: ['jpg', 'jpeg', 'png', 'webp', 'heic', 'pdf'],
  b2b: ['jpg', 'jpeg', 'png', 'webp', 'heic', 'pdf', 'dwg', 'dxf', 'doc', 'docx', 'xls', 'xlsx', 'odt', 'ods', 'zip'],
}
ALLOWED.production = ALLOWED.b2b
const clean = (s, max = 300) => String(s ?? '').trim().slice(0, max)
const safeName = (n) => String(n || 'soubor').replace(/[^\w.\-áčďéěíňóřšťúůýžÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ ]+/g, '_').slice(0, 120)

// Reads multipart/form-data: field "payload" (JSON) + files "files". Rejects oversize uploads.
export function parseMultipart(req) {
  return new Promise((resolve, reject) => {
    let bb
    try { bb = Busboy({ headers: req.headers, limits: { files: 10, fileSize: MAX_TOTAL, fields: 5, fieldSize: 64 * 1024 } }) } catch (e) { return reject(e) }
    const files = []; let payload = null; let total = 0; let tooBig = false
    bb.on('field', (name, val) => { if (name === 'payload') { try { payload = JSON.parse(val) } catch { payload = null } } })
    bb.on('file', (_name, stream, info) => {
      const chunks = []
      stream.on('data', (d) => { total += d.length; if (total > MAX_TOTAL) tooBig = true; else chunks.push(d) })
      stream.on('limit', () => { tooBig = true })
      stream.on('end', () => { if (!tooBig) files.push({ filename: safeName(info.filename), contentType: info.mimeType, content: Buffer.concat(chunks) }) })
    })
    bb.on('close', () => resolve({ payload, files, tooBig }))
    bb.on('error', reject)
    req.pipe(bb)
  })
}

// → { bot } | { errors } | { entry, files }
export function validateEnquiry(payload, files = []) {
  const p = payload || {}
  if (p.website) return { bot: true }                                   // honeypot filled
  if (typeof p.elapsed === 'number' && p.elapsed < 2500) return { bot: true } // submitted faster than a human can
  const type = ['b2b', 'production'].includes(p.type) ? p.type : 'private'
  const errors = {}
  const base = { type, lang: ['en', 'de'].includes(p.lang) ? p.lang : 'cz', createdAt: new Date().toISOString(), phone: clean(p.phone, 40), email: clean(p.email, 160) }
  let entry
  if (type === 'private') {
    entry = { ...base, name: clean(p.name, 120), city: clean(p.city, 120),
      interest: Array.isArray(p.interest) ? p.interest.filter((x) => PRIVATE_IDS.includes(x)) : [],
      stage: clean(p.stage, 120), timeline: clean(p.timeline, 120), message: clean(p.message, 4000) }
    if (!entry.name) errors.name = 'required'
    if (!entry.interest.length) errors.interest = 'required'
  } else if (type === 'production') {
    entry = { ...base, company: clean(p.company, 160), person: clean(p.person, 120),
      material: MATERIAL_IDS.includes(p.material) ? p.material : '', dimensions: clean(p.dimensions, 200), quantity: clean(p.quantity, 120),
      message: clean(p.message, 6000), link: /^https?:\/\//.test(clean(p.link, 500)) ? clean(p.link, 500) : '' }
    if (!entry.company) errors.company = 'required'
    if (!entry.person) errors.person = 'required'
    if (!entry.material) errors.material = 'required'
    if (!entry.message) errors.message = 'required'
  } else {
    entry = { ...base, company: clean(p.company, 160), person: clean(p.person, 120), companyType: clean(p.companyType, 120),
      projectType: clean(p.projectType, 120), place: clean(p.place, 160), scope: clean(p.scope, 200), deadline: clean(p.deadline, 120),
      description: clean(p.description, 6000), link: /^https?:\/\//.test(clean(p.link, 500)) ? clean(p.link, 500) : '' }
    if (!entry.company) errors.company = 'required'
    if (!entry.person) errors.person = 'required'
    if (!entry.projectType) errors.projectType = 'required'
    if (!entry.description) errors.description = 'required'
  }
  if (!EMAIL_RE.test(entry.email)) errors.email = 'invalid'
  if (entry.phone.replace(/\D/g, '').length < 9) errors.phone = 'invalid'
  const okFiles = files.filter((f) => ALLOWED[type].includes(f.filename.split('.').pop().toLowerCase()))
  // what the visitor was looking at: a stone decor number or a project from Naše realizace
  const r = p.reference
  if (r && ['decor', 'project'].includes(r.kind) && /^[a-z0-9-]{1,60}$/.test(String(r.id))) {
    entry.reference = { kind: r.kind, id: String(r.id), label: clean(r.label, 160) || String(r.id) }
  }
  entry.files = okFiles.map((f) => f.filename)
  return Object.keys(errors).length ? { errors } : { entry, files: okFiles }
}

export function validateNewsletter(b = {}) {
  const email = clean(b.email, 160)
  return EMAIL_RE.test(email) ? { entry: { email, createdAt: new Date().toISOString() } } : { errors: { email: 'invalid' } }
}
