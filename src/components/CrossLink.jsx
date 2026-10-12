// A quiet one-line link to a related service page (e.g. Kitchen → Stone). `dark` for dark sections.
import { Icon } from './Icons.jsx'

export function CrossLink({ href, text, label, dark = false }) {
  return (
    <a href={href} className={`xlink${dark ? ' xlink--dark' : ''}`}>
      <span className="xlink__text">{text}</span>
      <span className="xlink__label">{label}<Icon.arrow /></span>
    </a>
  )
}
