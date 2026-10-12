// Enquiry forms (spec: AK_Kontakt_a_formulare_FINAL_CZ_EN.docx)
//   A – private client  ·  B – B2B project (with project-document uploads)
//   C – custom manufacturing ('production', Naše výroba page: AK_INTERIERY_NASE_VYROBA brief, section 05)
// Every page ends with <ContactSection>. Any button can open it with openForm({ mode, preselect }) from lib.jsx.
import { useEffect, useRef, useState } from 'react'
import { useLang, Rich, openForm } from '../lib.jsx'
import { Icon } from './Icons.jsx'
import { contact, whatsappUrl } from '../site.config.js'
import { formsContent } from '../forms.content.js'

const DEMO = import.meta.env.VITE_DEMO === '1' // single-file preview: no server behind it
const MAX_TOTAL = 4 * 1024 * 1024 // Vercel accepts ~4.5 MB per request
const ACCEPT = {
  private: ['jpg', 'jpeg', 'png', 'webp', 'heic', 'pdf'],
  b2b: ['jpg', 'jpeg', 'png', 'webp', 'heic', 'pdf', 'dwg', 'dxf', 'doc', 'docx', 'xls', 'xlsx', 'odt', 'ods', 'zip'],
}
ACCEPT.production = ACCEPT.b2b
export const MATERIAL_IDS = ['furniture', 'cnc', 'mdf', 'edge', 'stone', 'plexi', 'other']
const PRIVATE_IDS = ['kitchen', 'stone', 'wardrobes', 'furniture', 'doors', 'complete', 'other']
const toPrivateId = (id) => (PRIVATE_IDS.includes(id) ? id : id ? 'other' : null) // e.g. pergola → "Jiné zadání"
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const ext = (name) => name.split('.').pop().toLowerCase()
const fmtSize = (b) => (b > 1024 * 1024 ? `${(b / 1024 / 1024).toFixed(1)} MB` : `${Math.max(1, Math.round(b / 1024))} kB`)

// Phone photos are often 3–8 MB: shrink to max 2000 px JPEG before upload (PDFs and drawings untouched).
async function shrinkImage(file) {
  if (!/^image\/(jpeg|png|webp)$/.test(file.type) || file.size < 900 * 1024) return file
  try {
    const bmp = await createImageBitmap(file)
    const scale = Math.min(1, 2000 / Math.max(bmp.width, bmp.height))
    const canvas = document.createElement('canvas')
    canvas.width = Math.round(bmp.width * scale); canvas.height = Math.round(bmp.height * scale)
    canvas.getContext('2d').drawImage(bmp, 0, 0, canvas.width, canvas.height)
    const blob = await new Promise((r) => canvas.toBlob(r, 'image/jpeg', 0.82))
    return blob && blob.size < file.size ? new File([blob], file.name.replace(/\.\w+$/, '.jpg'), { type: 'image/jpeg' }) : file
  } catch { return file }
}

const emptyFor = (mode, preselect) => (mode === 'production'
  ? { company: '', person: '', phone: '', email: '', material: MATERIAL_IDS.includes(preselect) ? preselect : '', dimensions: '', quantity: '', message: '', link: '', website: '' }
  : mode === 'b2b'
  ? { company: '', person: '', phone: '', email: '', companyType: '', projectType: '', place: '', scope: '', deadline: '', description: '', link: '', website: '' }
  : { name: '', phone: '', email: '', city: '', interest: preselect ? [toPrivateId(preselect)] : [], stage: '', timeline: '', message: '', website: '' })

// reference: { kind: 'decor' | 'project', id, label } – what the visitor was looking at (sent with the enquiry)
function EnquiryForm({ mode, preselect, onDone, reference, onClearReference }) {
  const { lang } = useLang()
  const F = formsContent[lang]
  const f = F[mode]
  const [data, setData] = useState(() => emptyFor(mode, preselect))
  const [files, setFiles] = useState([])
  const [fileError, setFileError] = useState('')
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')
  const [drag, setDrag] = useState(false)
  const startedAt = useRef(Date.now())
  const fileInput = useRef(null)

  // a button elsewhere asked for a specific service
  useEffect(() => {
    if (mode === 'production' && MATERIAL_IDS.includes(preselect)) setData((d) => ({ ...d, material: preselect }))
    if (mode !== 'private' || !preselect) return
    const id = toPrivateId(preselect)
    setData((d) => (d.interest.includes(id) ? d : { ...d, interest: [...d.interest, id] }))
  }, [preselect, mode])

  const set = (k) => (e) => setData((d) => ({ ...d, [k]: e.target.value }))
  const toggle = (id) => setData((d) => ({ ...d, interest: d.interest.includes(id) ? d.interest.filter((x) => x !== id) : [...d.interest, id] }))

  async function addFiles(list) {
    setFileError('')
    const incoming = [...list]
    const bad = incoming.filter((x) => !ACCEPT[mode].includes(ext(x.name)))
    if (bad.length) setFileError(`${F.attach.badType} ${bad.map((x) => x.name).join(', ')}`)
    const ok = await Promise.all(incoming.filter((x) => ACCEPT[mode].includes(ext(x.name))).map(shrinkImage))
    const next = [...files, ...ok].slice(0, 10)
    if (next.reduce((s, x) => s + x.size, 0) > MAX_TOTAL) { setFileError(F.attach.tooBig); return }
    setFiles(next)
  }

  function validate() {
    const e = {}
    const req = mode === 'b2b' ? ['company', 'person', 'phone', 'email', 'projectType', 'description']
      : mode === 'production' ? ['company', 'person', 'phone', 'email', 'material', 'message'] : ['name', 'phone', 'email']
    req.forEach((k) => { if (!String(data[k] || '').trim()) e[k] = F.errors.required })
    if (data.email && !EMAIL_RE.test(data.email)) e.email = F.errors.email
    if (data.phone && data.phone.replace(/\D/g, '').length < 9) e.phone = F.errors.phone
    if (mode === 'private' && !data.interest.length) e.interest = F.errors.choose
    return e
  }

  async function submit(ev) {
    ev.preventDefault()
    const e = validate()
    setErrors(e)
    if (Object.keys(e).length) { document.getElementById(`${mode}-${Object.keys(e)[0]}`)?.focus(); return }
    setStatus('sending')
    try {
      if (DEMO) { await new Promise((r) => setTimeout(r, 700)) } else {
        const body = new FormData()
        body.append('payload', JSON.stringify({ ...data, type: mode, lang, elapsed: Date.now() - startedAt.current, reference: reference ? { kind: reference.kind, id: reference.id, label: reference.label } : null }))
        files.forEach((x) => body.append('files', x, x.name))
        const res = await fetch('/api/enquiry', { method: 'POST', body })
        if (!res.ok) throw new Error(String(res.status))
      }
      setStatus('done')
      onDone?.()
      // analytics hook (spec 06): fires only if an analytics tool is added later
      window.dispatchEvent(new CustomEvent('ak:enquiry-sent', { detail: { type: mode } }))
    } catch {
      setStatus('error')
    }
  }

  if (status === 'done') {
    return (
      <div className="form form--done" role="status">
        <h3 className="h3">{F.done.title}</h3>
        <p>{F.done.text}</p>
        <a className="form__phone" href={`tel:${contact.phone.replace(/\s/g, '')}`}><Icon.phone />{contact.phone}</a>
        <button type="button" className="btn btn--ghost" onClick={() => { setData(emptyFor(mode)); setFiles([]); setStatus('idle'); startedAt.current = Date.now() }}>{F.done.again}</button>
      </div>
    )
  }

  const field = (k, label, props = {}, required = false) => (
    <div className={`field${errors[k] ? ' has-error' : ''}`}>
      <label htmlFor={`${mode}-${k}`}>{label}{required && <span className="req" title={F.required}> *</span>}</label>
      {props.as === 'textarea'
        ? <textarea id={`${mode}-${k}`} rows="4" value={data[k]} onChange={set(k)} aria-invalid={!!errors[k]} />
        : props.options
          ? (
            <select id={`${mode}-${k}`} value={data[k]} onChange={set(k)} aria-invalid={!!errors[k]}>
              <option value="">{F.select}</option>
              {props.options.map((o) => <option key={o} value={o}>{o}</option>)}
            </select>
          )
          : <input id={`${mode}-${k}`} value={data[k]} onChange={set(k)} aria-invalid={!!errors[k]} {...props} />}
      {errors[k] && <p className="field__error">{errors[k]}</p>}
    </div>
  )

  return (
    <form className="form" onSubmit={submit} noValidate>
      <div className="form__head">
        <h3 className="form__title">{f.title}</h3>
        <p className="form__intro">{f.intro}</p>
      </div>

      {reference && (
        <div className="form-ref" role="status">
          <span className="form-ref__label">{F.reference[reference.kind]}</span>
          <span className="form-ref__value">{reference.label}</span>
          <button type="button" onClick={onClearReference} aria-label={`${F.attach.remove}: ${reference.label}`}><Icon.close width="16" height="16" /></button>
        </div>
      )}

      {mode === 'private' ? (
        <>
          {field('name', f.name, { autoComplete: 'name' }, true)}
          <div className="form__row">
            {field('phone', f.phone, { type: 'tel', autoComplete: 'tel' }, true)}
            {field('email', f.email, { type: 'email', autoComplete: 'email' }, true)}
          </div>
          {field('city', f.city, { autoComplete: 'address-level2' })}
          <fieldset className={`chips${errors.interest ? ' has-error' : ''}`}>
            <legend>{f.interest}<span className="req"> *</span></legend>
            {PRIVATE_IDS.map((id) => (
              <label key={id} className={`chip${data.interest.includes(id) ? ' is-on' : ''}`}>
                <input id={id === PRIVATE_IDS[0] ? 'private-interest' : undefined} type="checkbox" checked={data.interest.includes(id)} onChange={() => toggle(id)} />
                {f.interestOptions[id]}
              </label>
            ))}
            {errors.interest && <p className="field__error">{errors.interest}</p>}
          </fieldset>
          <div className="form__row">
            {field('stage', f.stage, { options: f.stageOptions })}
            {field('timeline', f.timeline)}
          </div>
          {field('message', f.message, { as: 'textarea' })}
        </>
      ) : mode === 'production' ? (
        <>
          <div className="form__row">
            {field('company', f.company, { autoComplete: 'organization' }, true)}
            {field('person', f.person, { autoComplete: 'name' }, true)}
          </div>
          <div className="form__row">
            {field('email', f.email, { type: 'email', autoComplete: 'email' }, true)}
            {field('phone', f.phone, { type: 'tel', autoComplete: 'tel' }, true)}
          </div>
          <div className={`field${errors.material ? ' has-error' : ''}`}>
            <label htmlFor="production-material">{f.material}<span className="req" title={F.required}> *</span></label>
            <select id="production-material" value={data.material} onChange={set('material')} aria-invalid={!!errors.material}>
              <option value="">{F.select}</option>
              {MATERIAL_IDS.map((id) => <option key={id} value={id}>{f.materialOptions[id]}</option>)}
            </select>
            {errors.material && <p className="field__error">{errors.material}</p>}
          </div>
          <div className="form__row">
            {field('dimensions', f.dimensions, { placeholder: f.dimensionsHint })}
            {field('quantity', f.quantity, { placeholder: f.quantityHint })}
          </div>
          {field('message', f.message, { as: 'textarea' }, true)}
        </>
      ) : (
        <>
          <div className="form__row">
            {field('company', f.company, { autoComplete: 'organization' }, true)}
            {field('person', f.person, { autoComplete: 'name' }, true)}
          </div>
          <div className="form__row">
            {field('phone', f.phone, { type: 'tel', autoComplete: 'tel' }, true)}
            {field('email', f.email, { type: 'email', autoComplete: 'email' }, true)}
          </div>
          <div className="form__row">
            {field('companyType', f.companyType, { options: f.companyTypeOptions })}
            {field('projectType', f.projectType, { options: f.projectTypeOptions }, true)}
          </div>
          <div className="form__row">
            {field('place', f.place)}
            {field('deadline', f.deadline)}
          </div>
          {field('scope', f.scope)}
          {field('description', f.description, { as: 'textarea' }, true)}
        </>
      )}

      {/* attachments */}
      <div className="field">
        <span className="field__label">{f.files}</span>
        <div className={`drop${drag ? ' is-drag' : ''}`}
          onDragOver={(e) => { e.preventDefault(); setDrag(true) }} onDragLeave={() => setDrag(false)}
          onDrop={(e) => { e.preventDefault(); setDrag(false); addFiles(e.dataTransfer.files) }}>
          <button type="button" className="drop__btn" onClick={() => fileInput.current?.click()}><Icon.doc width="20" height="20" />{F.attach.choose}</button>
          <span className="drop__or">{F.attach.drop}</span>
          <input ref={fileInput} type="file" multiple hidden accept={ACCEPT[mode].map((x) => '.' + x).join(',')}
            onChange={(e) => { addFiles(e.target.files); e.target.value = '' }} />
          <span className="drop__hint">{mode === 'production' ? F.attach.hintProduction : mode === 'b2b' ? F.attach.hintB2B : F.attach.hintPrivate}</span>
        </div>
        {files.length > 0 && (
          <ul className="files">
            {files.map((x, i) => (
              <li key={x.name + i}><span className="files__name">{x.name}</span><span className="files__size">{fmtSize(x.size)}</span>
                <button type="button" onClick={() => setFiles(files.filter((_, k) => k !== i))} aria-label={`${F.attach.remove}: ${x.name}`}><Icon.close width="16" height="16" /></button>
              </li>
            ))}
          </ul>
        )}
        {fileError && <p className="field__error">{fileError}</p>}
      </div>
      {mode !== 'private' && field('link', F.attach.linkLabel, { type: 'url', placeholder: 'https://' })}

      {/* honeypot – invisible to people */}
      <input className="hp" tabIndex="-1" autoComplete="off" value={data.website} onChange={set('website')} aria-hidden="true" />

      {status === 'error' && <p className="form__error" role="alert">{F.errors.server}</p>}

      <button type="submit" className="btn btn--primary btn--block" disabled={status === 'sending'}>
        {status === 'sending' ? F.sending : f.submit}<Icon.arrow />
      </button>
      <p className="form__after">{f.after}</p>
      <p className="form__notice">{F.notice} <a href="/ochrana-osobnich-udaju">{F.privacyLink}</a></p>
    </form>
  )
}

// Section at the end of every page: copy + contact details on the left, forms (with tabs) on the right.
// modes: which form tabs this section offers (default private + B2B; the Naše výroba page uses production + private).
// aside: extra content under the copy (e.g. a cross-link).
export function ContactSection({ title, text, image, mode: initialMode = 'private', preselect: initialPreselect, asPage = false, eyebrow, buttons, modes = ['private', 'b2b'], aside }) {
  const { lang } = useLang()
  const F = formsContent[lang]
  const [mode, setMode] = useState(initialMode)
  const [preselect, setPreselect] = useState(initialPreselect)
  const [reference, setReference] = useState(null)
  const [formKey, setFormKey] = useState(0)

  useEffect(() => {
    const onOpen = (e) => {
      const d = e.detail || {}
      if (d.mode && modes.includes(d.mode)) setMode(d.mode)
      if (d.preselect) setPreselect(d.preselect)
      if ('reference' in d) setReference(d.reference || null)
    }
    window.addEventListener('ak:form', onOpen)
    return () => window.removeEventListener('ak:form', onOpen)
  }, [])

  const Title = asPage ? 'h1' : 'h2'
  return (
    <section className={`section section--dark cta${image ? ' cta--image' : ''}${asPage ? ' cta--page' : ''}`} id="kontakt"
      style={image ? { backgroundImage: `linear-gradient(90deg, rgba(31,26,22,.94) 0%, rgba(31,26,22,.86) 50%, rgba(31,26,22,.72) 100%), url(${image})` } : undefined}>
      <div className="container cta__grid">
        <div className="cta__copy">
          {eyebrow && <p className="eyebrow">{eyebrow}</p>}
          <Title className="display"><Rich t={title} /></Title>
          {text && <p>{text}</p>}
          {aside}
          {buttons && (
            <div className="cta__buttons">
              <button type="button" className="btn btn--primary" onClick={() => openForm({ mode: 'private' })}>{buttons[0]}<Icon.arrow /></button>
              <button type="button" className="btn btn--ghost" onClick={() => openForm({ mode: 'b2b' })}>{buttons[1]}<Icon.arrow /></button>
            </div>
          )}
          <ul className="cta__contact">
            <li><Icon.phone /><a href={`tel:${contact.phone.replace(/\s/g, '')}`}>{contact.phone}</a></li>
            <li><Icon.mail /><a href={`mailto:${contact.email}`}>{contact.email}</a></li>
            <li><Icon.whatsapp /><a href={whatsappUrl(lang)} target="_blank" rel="noopener noreferrer">WhatsApp</a></li>
            <li><Icon.person width="16" height="16" /><span>{contact.person.name} — {contact.person.role[lang]}</span></li>
          </ul>
        </div>
        <div className="cta__forms" id="formular">
          <div className="form-tabs" role="tablist" aria-label="Typ poptávky">
            {modes.map((m) => (
              <button key={m} type="button" role="tab" aria-selected={mode === m} className={mode === m ? 'is-active' : ''}
                onClick={() => { setMode(m); setFormKey((k) => k + 1) }}>{F.tabs[m]}</button>
            ))}
          </div>
          <EnquiryForm key={`${mode}-${formKey}`} mode={mode} preselect={mode !== 'b2b' ? preselect : undefined}
            reference={reference} onClearReference={() => setReference(null)} onDone={() => setReference(null)} />
        </div>
      </div>
    </section>
  )
}
