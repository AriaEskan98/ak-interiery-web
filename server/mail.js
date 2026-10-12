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
  kitchen: 'Kuchyň na míru', stone: 'Kámen a kamenické práce', wardrobes: 'Vestavné skříně', furniture: 'Nábytek na míru',
  doors: 'Dveře a interiérové prvky', complete: 'Kompletní interiér', other: 'Jiné zadání',
}
const MATERIAL_NAMES = {
  furniture: 'Nábytková výroba', cnc: 'CNC opracování dřeva a MDF', mdf: 'Frézovaná MDF dvířka',
  edge: 'Softforming / vakuové lisování / dělení desek', stone: 'Kamenická výroba', plexi: 'Opracování plexiskla', other: 'Jiné zadání',
}
const PHONE = () => env.CONTACT_PHONE || '+420 736 719 675'
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

export async function sendEnquiryEmails(e, files = []) {
  if (!mailEnabled) return
  const b2b = e.type === 'b2b' || e.type === 'production' // both: company contact, reply goes to the contact person
  const production = e.type === 'production'
  const link = (href, text) => `<a href="${esc(href)}" style="color:#1F1A16">${esc(text)}</a>`
  const tel = e.phone ? link(`tel:${e.phone.replace(/\s/g, '')}`, e.phone) : '–'
  const attachments = files.map((f) => ({ filename: f.filename, content: f.content, contentType: f.contentType }))
  const fileList = e.files?.length ? e.files.join(', ') : '–'
  const ref = e.reference
    ? [e.reference.kind === 'decor' ? 'Vybraný dekor' : 'Podobná realizace',
       e.reference.kind === 'decor' ? `<strong>${esc(e.reference.label)}</strong>` : `<strong>${esc(e.reference.label)}</strong> (/realizace/${esc(e.reference.id)})`]
    : null
  const refSubject = e.reference ? ` [${e.reference.label}]` : ''

  // 1) notification to AK Interiéry – reply goes straight to the customer
  let subject, rows, bodyText, textBlock
  if (production) {
    subject = `Poptávka výroby: ${e.company} – ${MATERIAL_NAMES[e.material]}${refSubject}`
    rows = [['Společnost', esc(e.company)], ['Kontaktní osoba', esc(e.person)], ['Telefon', tel], ['E-mail', link(`mailto:${e.email}`, e.email)],
      ['Materiál / služba', esc(MATERIAL_NAMES[e.material])], ['Přibližné rozměry', esc(e.dimensions) || '–'], ['Množství', esc(e.quantity) || '–'],
      ['Odkaz na podklady', e.link ? link(e.link, e.link) : '–'], ['Přílohy', esc(fileList)]]
    bodyText = e.message
    textBlock = 'Zpráva / technické zadání'
  } else if (b2b) {
    subject = `B2B poptávka: ${e.company} – ${e.projectType}${refSubject}`
    rows = [['Společnost', esc(e.company)], ['Kontaktní osoba', esc(e.person)], ['Telefon', tel], ['E-mail', link(`mailto:${e.email}`, e.email)],
      ['Typ společnosti', esc(e.companyType) || '–'], ['Typ projektu', esc(e.projectType)], ['Místo realizace', esc(e.place) || '–'],
      ['Rozsah / jednotky', esc(e.scope) || '–'], ['Termín', esc(e.deadline) || '–'],
      ['Odkaz na podklady', e.link ? link(e.link, e.link) : '–'], ['Přílohy', esc(fileList)]]
    bodyText = e.description
    textBlock = 'Popis projektu'
  } else {
    const interests = e.interest.map((id) => SERVICE_NAMES[id]).join(', ')
    subject = `Nová poptávka: ${e.name} – ${interests}${refSubject}`
    rows = [['Jméno', esc(e.name)], ['Telefon', tel], ['E-mail', link(`mailto:${e.email}`, e.email)], ['Místo realizace', esc(e.city) || '–'],
      ['Co chce řešit', esc(interests)], ['Fáze projektu', esc(e.stage) || '–'], ['Termín', esc(e.timeline) || '–'], ['Přílohy', esc(fileList)]]
    bodyText = e.message
    textBlock = 'Představa'
  }
  if (ref) rows.unshift(ref)
  rows.push(['Jazyk webu', e.lang === 'en' ? 'angličtina' : 'čeština'])
  await mailer.sendMail({
    from: FROM(), to: env.MAIL_TO, replyTo: `${b2b ? e.person : e.name} <${e.email}>`, subject, attachments,
    text: rows.map(([k, v]) => `${k}: ${String(v).replace(/<[^>]+>/g, '')}`).join('\n') + `\n\n${textBlock}:\n${bodyText || '–'}\n\nOdpovězte přímo na tento e-mail.`,
    html: layout(production ? 'Nová poptávka zakázkové výroby' : b2b ? 'Nová B2B poptávka' : 'Nová poptávka z webu', `
      ${b2b ? `<p style="margin:0 0 18px;display:inline-block;padding:4px 10px;background:#3A2F28;color:#C9B79E;font-size:11px;letter-spacing:2px">${production ? 'ZAKÁZKOVÁ VÝROBA' : 'B2B PROJEKT'}</p>` : ''}
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${rows.map(([k, v]) => row(k, v)).join('')}</table>
      <p style="margin:24px 0 8px;font-size:12px;letter-spacing:1px;text-transform:uppercase;color:#85725B">${textBlock}</p>
      <p style="margin:0;font-size:15px;line-height:1.6;white-space:pre-wrap">${esc(bodyText) || '–'}</p>
      ${attachments.length ? `<p style="margin:20px 0 0;font-size:13px;color:#5E544C">Přílohy (${attachments.length}) jsou připojené k tomuto e-mailu.</p>` : ''}
      <p style="margin:28px 0 0;font-size:13px;color:#5E544C">Stačí odpovědět na tento e-mail – odpověď půjde přímo ${b2b ? 'kontaktní osobě' : 'zákazníkovi'}.</p>`),
  })

  // 2) confirmation to the customer (set CONFIRM_TO_CUSTOMER=false to disable) – text from AK_Kontakt_a_formulare
  if (env.CONFIRM_TO_CUSTOMER === 'false') return
  const en = e.lang === 'en'
  const title = en ? 'Thank you. We have received your message.' : 'Děkujeme. Vaši zprávu jsme přijali.'
  const text = en
    ? 'We will get back to you once we have reviewed the details. If your enquiry is urgent, you can also call us.'
    : 'Ozveme se vám, jakmile se s podklady seznámíme. Pokud je vaše poptávka urgentní, můžete nás kontaktovat také telefonicky.'
  await mailer.sendMail({
    from: FROM(), to: e.email, replyTo: env.MAIL_TO,
    subject: en ? 'We have received your message – AK Interiors' : 'Vaši zprávu jsme přijali – AK Interiéry',
    text: `${en ? 'Hello' : 'Dobrý den,'}\n\n${title}\n${text}\n\n${PHONE()}\n\n${en ? 'AK Interiors' : 'AK Interiéry'}`,
    html: layout(title, `
      <p style="margin:0 0 16px;font-size:15px;line-height:1.7">${en ? 'Hello,' : 'Dobrý den,'}</p>
      <p style="margin:0 0 20px;font-size:15px;line-height:1.7">${text}</p>
      <p style="margin:0 0 26px;font-size:18px"><a href="tel:${PHONE().replace(/\s/g, '')}" style="color:#1F1A16;text-decoration:none">${PHONE()}</a></p>
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
