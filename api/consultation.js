// Vercel function for the enquiry form (POST /api/consultation).
// Vercel has no permanent disk, so the e-mails ARE the record of each enquiry – set the SMTP variables
// in Vercel → Project → Settings → Environment Variables (same names as in .env.example).
import { validateConsultation } from '../server/enquiry.js'
import { mailEnabled, sendEnquiryEmails } from '../server/mail.js'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ ok: false })
  const { bot, errors, entry } = validateConsultation(req.body)
  if (bot) return res.status(200).json({ ok: true })
  if (errors) return res.status(400).json({ ok: false, errors })
  if (!mailEnabled) {
    console.error('Enquiry NOT delivered – e-mail is not configured in Vercel environment variables.')
    return res.status(500).json({ ok: false, error: 'mail_not_configured' })
  }
  try {
    await sendEnquiryEmails(entry) // must finish before responding – Vercel stops the function afterwards
    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error('Enquiry e-mail failed:', err.message)
    return res.status(500).json({ ok: false, error: 'server_error' })
  }
}
