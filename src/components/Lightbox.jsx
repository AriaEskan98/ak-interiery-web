// Full-screen viewer for photos (stone decors, project galleries). Shows the ORIGINAL image uncropped
// (object-fit: contain, no filters). Keyboard: Esc closes, ← → browse.
import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { useLang } from '../lib.jsx'
import { Icon } from './Icons.jsx'

const L = {
  cz: { close: 'Zavřít', prev: 'Předchozí', next: 'Další' },
  en: { close: 'Close', prev: 'Previous', next: 'Next' },
}

// items: [{ src, alt, caption, video?, poster? }] – video items play muted with controls
export function Lightbox({ items, index, onIndex, onClose, action }) {
  const { lang } = useLang()
  const l = L[lang]
  const closeRef = useRef(null)
  const n = items.length
  const item = items[index]

  useEffect(() => {
    const prev = document.activeElement
    closeRef.current?.focus()
    document.body.style.overflow = 'hidden'
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (n > 1 && e.key === 'ArrowRight') onIndex((i) => (i + 1) % n)
      if (n > 1 && e.key === 'ArrowLeft') onIndex((i) => (i - 1 + n) % n)
    }
    window.addEventListener('keydown', onKey)
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = ''; prev?.focus?.() }
  }, [n, onIndex, onClose])

  if (!item) return null
  return createPortal(
    <div className="lightbox" role="dialog" aria-modal="true" aria-label={item.alt} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <button ref={closeRef} type="button" className="lightbox__close" onClick={onClose} aria-label={l.close}><Icon.close /></button>
      <figure>
        {item.video
          ? <video key={item.src} poster={item.poster} autoPlay muted loop playsInline controls aria-label={item.alt}>
              {item.webm && <source src={item.webm} type="video/webm" />}
              <source src={item.src} type="video/mp4" />
            </video>
          : <img key={item.src} src={item.src} alt={item.alt} />}
        <figcaption>
          <span>{item.caption}</span>
          <span className="lightbox__side">
            {action && action(item)}
            {n > 1 && <span className="lightbox__count">{String(index + 1).padStart(2, '0')} / {String(n).padStart(2, '0')}</span>}
          </span>
        </figcaption>
      </figure>
      {n > 1 && <>
        <button type="button" className="round-btn round-btn--prev" onClick={() => onIndex((index - 1 + n) % n)} aria-label={l.prev}><Icon.arrowLeft /></button>
        <button type="button" className="round-btn round-btn--next" onClick={() => onIndex((index + 1) % n)} aria-label={l.next}><Icon.arrow /></button>
      </>}
    </div>,
    document.body,
  )
}
