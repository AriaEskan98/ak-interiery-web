// /realizace – all real AK projects with category filters, and /realizace/<slug> – one project.
// Data: src/realizace.js. With no projects, /realizace shows only its heading, intro and the enquiry form.
import { useEffect, useRef, useState } from 'react'
import { useLang, Rich, openForm } from '../lib.jsx'
import { useRoute } from '../router.jsx'
import { Icon } from '../components/Icons.jsx'
import { ContactSection } from '../components/EnquiryForms.jsx'
import { ProjectCard, FeaturedProject } from '../components/OurWork.jsx'
import { Lightbox } from '../components/Lightbox.jsx'
import { projects, projectBySlug, usedCategories, visualisations, hasVideo, projectVideos } from '../realizace.js'
import { workContent } from './work.content.js'
import NotFoundPage from './NotFoundPage.jsx'
import './shared.css'
import './work.css'

// Silent clip (no audio track) that plays only while on screen; still frame for reduced-motion users.
function VideoTile({ v, lang, onOpen, label }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el || window.matchMedia?.('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) el.play().catch(() => {}); else el.pause() }, { threshold: 0.35 })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return (
    <li className="vclip">
      <button type="button" className="vclip__frame" onClick={onOpen} aria-label={`${label}: ${v.label[lang]}`}>
        <video ref={ref} poster={v.poster} muted loop playsInline preload="none" aria-hidden="true" tabIndex={-1}>
          <source src={v.webm} type="video/webm" />
          <source src={v.src} type="video/mp4" />
        </video>
        <span className="vclip__badge" aria-hidden="true"><Icon.play /></span>
      </button>
      <span className="vclip__label">{v.label[lang]}</span>
    </li>
  )
}

export function WorkPage() {
  const { lang } = useLang()
  const w = workContent[lang]
  const cats = usedCategories()
  const [filter, setFilter] = useState('all')
  const [vizOpen, setVizOpen] = useState(null)
  const [videoOpen, setVideoOpen] = useState(null)
  const shown = filter === 'all' ? projects : projects.filter((p) => p.category === filter)
  return (
    <>
      <div className="panel panel--dark">
        <section className="work-hero" id="top">
          <div className="container">
            <nav className="crumbs" aria-label="Drobečková navigace">
              <a href="/">{w.page.crumb[0]}</a><span aria-hidden="true">/</span><span aria-current="page">{w.page.crumb[1]}</span>
            </nav>
            <p className="eyebrow hero__reveal" style={{ '--d': '.05s' }}>{w.page.eyebrow}</p>
            <h1 className="work-hero__title hero__reveal" style={{ '--d': '.15s' }}><Rich t={w.page.title} /></h1>
            <p className="work-hero__intro hero__reveal" style={{ '--d': '.3s' }}>{w.page.intro}</p>
          </div>
        </section>
      </div>

      {projects.length > 0 && (
        <div className="panel panel--light">
          <section className="section section--light work-list" id="projekty">
            <div className="container">
              {cats.length > 1 && (
                <div className="work-filter" role="group" aria-label={w.page.filterLabel}>
                  {['all', ...cats].map((id) => (
                    <button key={id} type="button" aria-pressed={filter === id} className={filter === id ? 'is-on' : ''} onClick={() => setFilter(id)}>
                      {id === 'all' ? w.page.all : w.categories[id]}
                    </button>
                  ))}
                </div>
              )}
              {shown.length === 1 ? <FeaturedProject project={shown[0]} /> : (
                <ul className="pgrid">
                  {shown.map((p, i) => <ProjectCard key={p.slug} project={p} priority={i < 3} />)}
                </ul>
              )}
            </div>
          </section>
        </div>
      )}

      {/* Videa z realizací – silent clips, client-supplied 12. 10. 2026 */}
      {projectVideos.length > 0 && (
        <div className="panel panel--warm">
          <section className="section vclips" id="videa">
            <div className="container">
              <div className="section-head section-head--split">
                <div>
                  <p className="eyebrow">{w.videos.eyebrow}</p>
                  <h2 className="h2"><Rich t={w.videos.title} /></h2>
                </div>
                <p className="lead vclips__intro">{w.videos.intro}</p>
              </div>
              <ul className="vclips__grid">
                {projectVideos.map((v, i) => <VideoTile key={v.src} v={v} lang={lang} label={w.project.video} onOpen={() => setVideoOpen(i)} />)}
              </ul>
            </div>
          </section>
        </div>
      )}
      {videoOpen !== null && (
        <Lightbox items={projectVideos.map((v) => ({ video: true, src: v.src, webm: v.webm, poster: v.poster, alt: v.label[lang], caption: v.label[lang] }))}
          index={videoOpen} onIndex={setVideoOpen} onClose={() => setVideoOpen(null)} />
      )}

      {/* Návrhy a vizualizace – renderings, kept strictly apart from completed work (media brief, section 05) */}
      {visualisations.length > 0 && (
        <div className="panel panel--dark">
          <section className="section section--dark viz" id="navrhy-a-vizualizace">
            <div className="container">
              <div className="section-head section-head--split">
                <div>
                  <p className="eyebrow">{w.viz.eyebrow}</p>
                  <h2 className="h2">{w.viz.title}</h2>
                </div>
                <div className="viz__intro">
                  <p>{w.viz.intro}</p>
                  <p className="viz__note">{w.viz.note}</p>
                </div>
              </div>
              <ul className="viz__grid">
                {visualisations.map((v, i) => (
                  <li key={i} className="viz__item">
                    <button type="button" onClick={() => setVizOpen(i)} aria-label={v.label[lang]}>
                      <img src={v.src} alt={v.label[lang]} loading="lazy" />
                      <span className="viz__badge">{w.viz.badge}</span>
                    </button>
                    <span className="viz__label">{v.label[lang]}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </div>
      )}
      {vizOpen !== null && (
        <Lightbox items={visualisations.map((v) => ({ src: v.src, alt: v.label[lang], caption: `${v.label[lang]} · ${w.viz.badge}` }))}
          index={vizOpen} onIndex={setVizOpen} onClose={() => setVizOpen(null)} />
      )}

      <div className="panel panel--dark">
        <ContactSection title={w.contact.title} text={w.contact.text} />
      </div>
    </>
  )
}

export function ProjectPage() {
  const { lang } = useLang()
  const { path } = useRoute()
  const w = workContent[lang]
  const p = projectBySlug(path.split('/').filter(Boolean)[1])
  const [viewing, setViewing] = useState(null)
  if (!p) return <NotFoundPage />

  const title = p.title[lang] || p.title.cz
  const tx = (o) => (o ? o[lang] || o.cz : '')
  const images = (p.media || []).filter((m) => m.type === 'image')
  const enquire = (e) => {
    e?.preventDefault()
    openForm({ mode: 'private', reference: { kind: 'project', id: p.slug, label: p.title.cz } })
  }

  return (
    <>
      <div className="panel panel--dark">
        <section className="project-hero" id="top">
          <div className="container">
            <nav className="crumbs" aria-label="Drobečková navigace">
              <a href="/">{w.page.crumb[0]}</a><span aria-hidden="true">/</span>
              <a href="/realizace">{w.page.crumb[1]}</a><span aria-hidden="true">/</span>
              <span aria-current="page">{title}</span>
            </nav>
            <p className="eyebrow">{w.categories[p.category]}</p>
            <h1 className="work-hero__title">{title}</h1>
          </div>
          <div className="container project-hero__media">
            <img src={p.cover} alt={p.coverAlt?.[lang] || title} fetchPriority="high" />
          </div>
        </section>
      </div>

      <div className="panel panel--light">
        <section className="section section--light project-body">
          <div className="container project-body__grid">
            <div className="project-body__text">
              {tx(p.description).split(/\n{2,}/).map((para, i) => <p key={i}>{para}</p>)}
              <div className="project-body__actions">
                <a href="#formular" onClick={enquire} className="btn btn--dark">{w.project.cta}<Icon.arrow /></a>
                <a href="/realizace" className="more">{w.project.back}<Icon.arrow /></a>
              </div>
            </div>
            {p.scope && tx(p.scope)?.length > 0 && (
              <aside className="project-scope">
                <p className="project-scope__title">{w.project.scope}</p>
                <ul>{tx(p.scope).map((x) => <li key={x}>{x}</li>)}</ul>
              </aside>
            )}
          </div>

          {p.media?.length > 0 && (
            <div className="container project-gallery">
              <h2 className="project-gallery__title">{hasVideo(p) ? w.project.gallery : w.project.photos}</h2>
              <ul className="project-gallery__grid">
                {p.media.map((m, i) => (
                  <li key={i} className={`pmedia pmedia--${m.type}`}>
                    {m.type === 'video' ? (
                      // click-to-play, controls, never autoplay with sound (brief)
                      <video controls preload="none" playsInline poster={m.poster} aria-label={tx(m.alt)}>
                        {m.webm && <source src={m.webm} type="video/webm" />}
                        <source src={m.src} type="video/mp4" />
                      </video>
                    ) : (
                      <button type="button" onClick={() => setViewing(images.indexOf(m))} aria-label={tx(m.alt)}>
                        <img src={m.src} alt={tx(m.alt)} loading="lazy" />
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>
      </div>

      {viewing !== null && (
        <Lightbox items={images.map((m) => ({ src: m.src, alt: tx(m.alt), caption: title }))}
          index={viewing} onIndex={setViewing} onClose={() => setViewing(null)} />
      )}

      <div className="panel panel--dark">
        <ContactSection title={w.contact.title} text={w.contact.text} />
      </div>
    </>
  )
}
