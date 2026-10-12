// Vercel function for enquiry forms A + B (POST /api/enquiry, multipart with attachments up to ~4.4 MB).
// Vercel has no permanent disk, so the e-mail (with attachments) IS the record of each enquiry –
// set the SMTP variables in Vercel → Project → Settings → Environment Variables (see .env.example).
import { parseMultipart, validateEnquiry } from '../server/enquiry.js'
import { mailEnabled, sendEnquiryEmails } from '../server/mail.js'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ ok: false })
  let parsed
  try { parsed = await parseMultipart(req) } catch { return res.status(400).json({ ok: false, error: 'bad_request' }) }
  if (parsed.tooBig) return res.status(413).json({ ok: false, error: 'files_too_large' })
  const { bot, errors, entry, files } = validateEnquiry(parsed.payload, parsed.files)
  if (bot) return res.status(200).json({ ok: true })
  if (errors) return res.status(400).json({ ok: false, errors })
  if (!mailEnabled) {
    console.error('Enquiry NOT delivered – e-mail is not configured in Vercel environment variables.')
    return res.status(500).json({ ok: false, error: 'mail_not_configured' })
  }
  try {
    await sendEnquiryEmails(entry, files) // must finish before responding – Vercel stops the function afterwards
    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error('Enquiry e-mail failed:', err.message)
    return res.status(500).json({ ok: false, error: 'server_error' })
  }
}
