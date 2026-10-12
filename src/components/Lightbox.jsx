// Full-screen viewer for photos (stone decors, project galleries). Shows the ORIGINAL image uncropped
// (object-fit: contain, no filters). Keyboard: Esc closes, ← → browse.
import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { useLang } from '../lib.jsx'
import { Icon } from './Icons.jsx'

const L = {
  cz: { close: 'Zavřít', prev: 'Předchozí', next: 'Další' },
  en: { close: 'Close', prev: 'Previous', next: 'Next' },
  de: { close: 'Schließen', prev: 'Zurück', next: 'Weiter' },
}

const sources = (item) => <>
  {item.webm && <source src={item.webm} type="video/webm" />}
  <source src={item.src} type="video/mp4" />
</>

// Portrait (phone) videos: the full, uncropped video sits in the middle; a blurred, darkened copy of the same
// video fills the rest of the screen and follows the main one (play, pause, seek).
function VideoStage({ item }) {
  const main = useRef(null)
  const bg = useRef(null)
  useEffect(() => {
    const m = main.current; const b = bg.current
    if (!m || !b) return
    const sync = () => {
      if (Math.abs(b.currentTime - m.currentTime) > 0.3) b.currentTime = m.currentTime
      if (m.paused !== b.paused) (m.paused ? b.pause() : b.play().catch(() => {}))
    }
    const events = ['play', 'pause', 'seeked', 'timeupdate']
    events.forEach((e) => m.addEventListener(e, sync))
    return () => events.forEach((e) => m.removeEventListener(e, sync))
  }, [item.src])
  return (
    <div className="lightbox__vstage">
      <video ref={bg} className="lightbox__vbg" poster={item.poster} muted loop playsInline autoPlay aria-hidden="true" tabIndex={-1}>{sources(item)}</video>
      <video ref={main} className="lightbox__vmain" poster={item.poster} autoPlay muted loop playsInline controls aria-label={item.alt}>{sources(item)}</video>
    </div>
  )
}

// items: [{ src, alt, caption, video?, webm?, poster? }] – video items play muted with controls
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
          ? <VideoStage key={item.src} item={item} />
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
