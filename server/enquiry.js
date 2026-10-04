// Form validation shared by the Node server (server/index.js) and the Vercel functions (api/*.js).
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const SERVICES = ['kitchen', 'wardrobes', 'furniture', 'doors', 'pergola']
const clean = (s, max) => String(s ?? '').trim().slice(0, max)

// → { bot: true } | { errors } | { entry }
export function validateConsultation(b = {}) {
  if (b.website) return { bot: true } // honeypot field filled → a bot
  const entry = {
    name: clean(b.name, 120),
    email: clean(b.email, 160),
    phone: clean(b.phone, 40),
    interest: Array.isArray(b.interest) ? b.interest.filter((x) => SERVICES.includes(x)) : [],
    lang: b.lang === 'en' ? 'en' : 'cz',
    message: clean(b.message, 4000),
    consent: b.consent === true,
    createdAt: new Date().toISOString(),
  }
  const errors = {}
  if (!entry.name) errors.name = 'required'
  if (!EMAIL_RE.test(entry.email)) errors.email = 'invalid'
  if (!entry.consent) errors.consent = 'required'
  return Object.keys(errors).length ? { errors } : { entry }
}

export function validateNewsletter(b = {}) {
  const email = clean(b.email, 160)
  return EMAIL_RE.test(email) ? { entry: { email, createdAt: new Date().toISOString() } } : { errors: { email: 'invalid' } }
}
