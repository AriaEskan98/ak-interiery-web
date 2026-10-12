// Contact details used in the footer and next to every enquiry form:
// company phone / e-mail / WhatsApp (same number) + Nadima Said as the separate contact for projects.
import { useLang } from '../lib.jsx'
import { Icon } from './Icons.jsx'
import { contact, company, whatsappUrl } from '../site.config.js'

const tel = (n) => `tel:${n.replace(/\s/g, '')}`

export function ContactDetails({ className = 'cta__contact' }) {
  const { lang, t } = useLang()
  const L = t.contactInfo
  const p = contact.person
  return (
    <div className="cdetails">
      <ul className={className}>
        <li><Icon.phone /><a href={tel(contact.phone)}>{contact.phone}</a></li>
        <li><Icon.mail /><a href={`mailto:${contact.email}`}>{contact.email}</a></li>
        <li><Icon.whatsapp /><a href={whatsappUrl(lang)} target="_blank" rel="noopener noreferrer">{L.whatsapp} {contact.phone}</a></li>
      </ul>
      <p className="cdetails__label">{L.person}</p>
      <ul className={className}>
        <li><Icon.person width="16" height="16" /><span>{p.name} — {p.role[lang]}</span></li>
        <li><Icon.phone /><a href={tel(p.phone)}>{p.phone}</a></li>
        <li><Icon.mail /><a href={`mailto:${p.email}`}>{p.email}</a></li>
      </ul>
    </div>
  )
}

// Company identification (contact page)
export function CompanyDetails() {
  const { t } = useLang()
  const L = t.contactInfo
  return (
    <dl className="company-details">
      <dt className="cdetails__label">{L.details}</dt>
      <dd className="company-details__name">{company.legalName}</dd>
      <dd><span>{L.ico}</span> {company.ico}</dd>
      <dd><span>{L.seat}</span> {company.address}</dd>
      <dd><span>{L.directors}</span> {company.directors}</dd>
    </dl>
  )
}
