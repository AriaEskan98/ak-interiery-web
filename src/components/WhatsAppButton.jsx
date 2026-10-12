// Floating WhatsApp button – brand colours (not WhatsApp green), appears after scrolling past the top.
import { useEffect, useState } from 'react'
import { useLang } from '../lib.jsx'
import { Icon } from './Icons.jsx'
import { whatsappUrl } from '../site.config.js'

export function WhatsAppButton() {
  const { lang } = useLang()
  const [show, setShow] = useState(false)
  useEffect(() => {
    const on = () => setShow(window.scrollY > 400)
    on(); window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  const label = { cz: 'Napište nám na WhatsApp', en: 'Message us on WhatsApp', de: 'Schreiben Sie uns auf WhatsApp' }[lang]
  return (
    <a className={`wa-float${show ? ' is-on' : ''}`} href={whatsappUrl(lang)} target="_blank" rel="noopener noreferrer"
      aria-label={label} title={label} tabIndex={show ? 0 : -1}>
      <Icon.whatsapp width="26" height="26" />
      <span className="wa-float__label">WhatsApp</span>
    </a>
  )
}
