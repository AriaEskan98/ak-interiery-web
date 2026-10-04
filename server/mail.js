// Enquiry e-mails: a notification to AK Interiéry and a confirmation to the customer.
// Configure in .env (see .env.example). Test with: npm run test:email
import nodemailer from 'nodemailer'

try { process.loadEnvFile() } catch { /* no .env – fine */ }

const env = process.env
export const mailEnabled = Boolean(env.SMTP_HOST && env.SMTP_USER && env.SMTP_PASS && env.MAIL_TO)
export const mailer = mailEnabled
  ? nodemailer.createTransport({
      host: env.SMTP_HOST,
      port: Number(env.SMTP_PORT || 587),
      secure: Number(env.SMTP_PORT) === 465,
      auth: { user: env.SMTP_USER, pass: env.SMTP_PASS },
    })
  : null

const FROM = () => env.MAIL_FROM || `AK Interiéry <${env.SMTP_USER}>`
const SERVICE_NAMES = {
  cz: { kitchen: 'Kuchyně na míru', wardrobes: 'Vestavné skříně', furniture: 'Nábytek na míru', doors: 'Dveře a interiérové prvky', pergola: 'Pergoly' },
  en: { kitchen: 'Bespoke kitchens', wardrobes: 'Built-in wardrobes', furniture: 'Bespoke furniture', doors: 'Doors & interior elements', pergola: 'Pergolas' },
}
const esc = (s) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

// simple, brand-coloured HTML that works in every mail client (tables + inline styles)
const layout = (title, inner) => `<!doctype html><html><body style="margin:0;background:#F8F6F1;font-family:Arial,Helvetica,sans-serif;color:#1F1A16">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F8F6F1;padding:32px 12px"><tr><td align="center">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff">
<tr><td style="background:#1F1A16;padding:28px 36px;color:#C9B79E;font-family:Georgia,serif;font-size:26px;letter-spacing:1px">AK <span style="font-family:Arial,sans-serif;font-size:11px;letter-spacing:4px;color:#ffffff">INTERIÉRY</span></td></tr>
<tr><td style="padding:36px"><h1 style="margin:0 0 20px;font-family:Georgia,serif;font-weight:normal;font-size:24px;color:#1F1A16">${title}</h1>${inner}</td></tr>
<tr><td style="background:#F8F6F1;padding:18px 36px;font-size:12px;color:#85725B">AK Interiéry · ${esc(env.MAIL_TO || '')}</td></tr>
</table></td></tr></table></body></html>`

const row = (k, v) => `<tr><td style="padding:10px 0;border-bottom:1px solid #EFEAE2;width:140px;font-size:12px;letter-spacing:1px;text-transform:uppercase;color:#85725B;vertical-align:top">${k}</td><td style="padding:10px 0;border-bottom:1px solid #EFEAE2;font-size:15px">${v}</td></tr>`

export async function sendEnquiryEmails(e) {
  if (!mailEnabled) return
  const interests = e.interest.map((id) => SERVICE_NAMES.cz[id]).join(', ') || '–'

  // 1) notification to AK Interiéry – reply goes straight to the customer
  await mailer.sendMail({
    from: FROM(), to: env.MAIL_TO, replyTo: `${e.name} <${e.email}>`,
    subject: `Nová poptávka: ${e.name}${interests !== '–' ? ' – ' + interests : ''}`,
    text: `Jméno: ${e.name}\nE-mail: ${e.email}\nTelefon: ${e.phone || '–'}\nZájem: ${interests}\nJazyk webu: ${e.lang}\n\n${e.message || '(bez zprávy)'}\n\nOdpovězte přímo na tento e-mail.`,
    html: layout('Nová poptávka z webu', `<table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      ${row('Jméno', esc(e.name))}${row('E-mail', `<a href="mailto:${esc(e.email)}" style="color:#1F1A16">${esc(e.email)}</a>`)}
      ${row('Telefon', e.phone ? `<a href="tel:${esc(e.phone.replace(/\s/g, ''))}" style="color:#1F1A16">${esc(e.phone)}</a>` : '–')}
      ${row('Zájem', esc(interests))}${row('Jazyk webu', e.lang === 'en' ? 'angličtina' : 'čeština')}</table>
      <p style="margin:24px 0 8px;font-size:12px;letter-spacing:1px;text-transform:uppercase;color:#85725B">Zpráva</p>
      <p style="margin:0;font-size:15px;line-height:1.6;white-space:pre-wrap">${esc(e.message) || '(bez zprávy)'}</p>
      <p style="margin:28px 0 0;font-size:13px;color:#5E544C">Stačí odpovědět na tento e-mail – odpověď půjde přímo zákazníkovi.</p>`),
  })

  // 2) confirmation to the customer (set CONFIRM_TO_CUSTOMER=false to disable)
  if (env.CONFIRM_TO_CUSTOMER === 'false') return
  const en = e.lang === 'en'
  await mailer.sendMail({
    from: FROM(), to: e.email, replyTo: env.MAIL_TO,
    subject: en ? 'We have received your enquiry – AK Interiors' : 'Vaši poptávku jsme přijali – AK Interiéry',
    text: en
      ? `Hello ${e.name},\n\nthank you for your enquiry. We will get back to you within two working days to arrange a consultation.\n\nAK Interiors`
      : `Dobrý den,\n\nděkujeme za vaši poptávku. Ozveme se vám do dvou pracovních dnů a domluvíme termín konzultace.\n\nAK Interiéry`,
    html: layout(en ? 'Thank you for your enquiry.' : 'Děkujeme za vaši poptávku.', `
      <p style="margin:0 0 16px;font-size:15px;line-height:1.7">${en ? `Hello ${esc(e.name)},` : 'Dobrý den,'}</p>
      <p style="margin:0 0 16px;font-size:15px;line-height:1.7">${en
        ? 'we have received your enquiry and will get back to you within two working days to arrange a consultation.'
        : 'vaši poptávku jsme přijali. Ozveme se vám do dvou pracovních dnů a domluvíme termín konzultace.'}</p>
      <p style="margin:0 0 24px;font-size:15px;line-height:1.7">${en
        ? 'If you would like to add photos or a floor plan of your space, simply reply to this email.'
        : 'Pokud nám chcete poslat fotografie nebo půdorys prostoru, stačí odpovědět na tento e-mail.'}</p>
      <p style="margin:0;font-family:Georgia,serif;font-style:italic;font-size:17px;color:#85725B">${en ? 'A space with lasting value.' : 'Prostor, který má hodnotu.'}</p>`),
  })
}

// New newsletter sign-up → short note to MAIL_TO (on Vercel this is the record of the sign-up).
export async function sendNewsletterEmail({ email }) {
  if (!mailEnabled) return
  await mailer.sendMail({
    from: FROM(), to: env.MAIL_TO, subject: `Nový odběratel newsletteru: ${email}`,
    text: `Na webu se k odběru novinek přihlásil(a): ${email}`,
    html: layout('Nový odběratel newsletteru', `<p style="margin:0;font-size:15px">Na webu se k odběru novinek přihlásil(a): <strong>${esc(email)}</strong></p>`),
  })
}
