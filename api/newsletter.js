// Vercel function for the footer newsletter sign-up (POST /api/newsletter) – sends a note to MAIL_TO.
import { validateNewsletter } from '../server/enquiry.js'
import { mailEnabled, sendNewsletterEmail } from '../server/mail.js'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ ok: false })
  const { errors, entry } = validateNewsletter(req.body)
  if (errors) return res.status(400).json({ ok: false, error: 'invalid_email' })
  if (!mailEnabled) return res.status(500).json({ ok: false, error: 'mail_not_configured' })
  try {
    await sendNewsletterEmail(entry)
    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error('Newsletter e-mail failed:', err.message)
    return res.status(500).json({ ok: false, error: 'server_error' })
  }
}
