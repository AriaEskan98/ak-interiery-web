// "Naše realizace" – homepage section + the project card used on /realizace.
// Renders NOTHING while src/realizace.js has no projects (brief: no placeholders publicly visible).
import { useLang, Rich } from '../lib.jsx'
import { Icon } from './Icons.jsx'
import { homepageProjects, projectPath, hasVideo } from '../realizace.js'
import { workContent } from '../pages/work.content.js'
import '../pages/work.css'

export function ProjectCard({ project: p, priority = false }) {
  const { lang } = useLang()
  const w = workContent[lang]
  const title = p.title[lang] || p.title.cz
  return (
    <li className="pcard">
      <a href={projectPath(p)} className="pcard__link" aria-label={`${w.project.open}: ${title}`}>
        <span className="pcard__img">
          <img src={p.cover} alt="" loading={priority ? 'eager' : 'lazy'} style={p.coverPosition ? { objectPosition: p.coverPosition } : undefined} />
          {hasVideo(p) && <span className="pcard__play" aria-label={w.project.video}><Icon.play /></span>}
        </span>
        <span className="pcard__cat">{w.categories[p.category]}</span>
        <span className="pcard__title">{title}</span>
      </a>
    </li>
  )
}

export function OurWork() {
  const { lang } = useLang()
  const w = workContent[lang].home
  const list = homepageProjects()
  if (!list.length) return null
  return (
    <section className="section section--dark work-home" id="realizace">
      <div className="container">
        <div className="section-head section-head--split">
          <div>
            <p className="eyebrow">{w.eyebrow}</p>
            <h2 className="h2"><Rich t={w.title} /></h2>
          </div>
          <p className="lead work-lead">{w.intro}</p>
        </div>
        {list.length === 1 ? <FeaturedProject project={list[0]} /> : (
          <ul className={`pgrid pgrid--home pgrid--n${list.length}`}>
            {list.map((p) => <ProjectCard key={p.slug} project={p} />)}
          </ul>
        )}
        <div className="work-home__cta">
          <a href="/realizace" className="btn btn--primary">{w.cta}<Icon.arrow /></a>
        </div>
      </div>
    </section>
  )
}

// One project on the homepage: a single wide card (brief: one strong full-room photo, not every view as a project).
export function FeaturedProject({ project: p }) {
  const { lang } = useLang()
  const w = workContent[lang]
  const title = p.title[lang] || p.title.cz
  return (
    <a href={projectPath(p)} className="pfeature">
      <span className="pfeature__img">
        <img src={p.cover} alt={p.coverAlt?.[lang] || title} loading="lazy" style={p.coverPosition ? { objectPosition: p.coverPosition } : undefined} />
      </span>
      <span className="pfeature__body">
        <span className="pcard__cat">{w.categories[p.category]}</span>
        <span className="pfeature__title">{title}</span>
        {p.description && <span className="pfeature__text">{p.description[lang] || p.description.cz}</span>}
        <span className="more">{w.project.open}<Icon.arrow /></span>
      </span>
    </a>
  )
}
