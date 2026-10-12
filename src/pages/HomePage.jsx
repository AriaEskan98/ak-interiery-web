import { Hero, Services, CompleteInterior, Process, Statement } from '../components/Top.jsx'
import { useLang } from '../lib.jsx'
import { B2B, About, ContactCTA } from '../components/Bottom.jsx'
import { OurWork } from '../components/OurWork.jsx'
import { Production } from '../components/Production.jsx'
import { projects } from '../realizace.js'
import { sectionTransition, statementImages } from '../site.config.js'

// Section order follows "2. POŘADÍ HOMEPAGE" in the KONTROLNI_VZOR PDF, plus "Naše realizace" directly after
// the service cards (AK_INTERIERY_NASE_REALIZACE brief) – shown only once real projects exist.
// Each .panel is one "page" for the page transitions.
export default function HomePage() {
  const snap = sectionTransition === 'snap'
  const { t } = useLang()
  const band = <Statement image={statementImages.home} eyebrow={t.statement.eyebrow} line={t.statement.line} id="detail" />
  return (
    <>
      <div className="panel panel--dark"><Hero /></div>
      {snap ? (
        <>
          <div className="panel panel--light"><Services /></div>
          {projects.length > 0 && <div className="panel panel--dark"><OurWork /></div>}
          <div className="panel panel--warm"><Production /></div>
          <div className="panel panel--light"><CompleteInterior /></div>
          <div className="panel panel--dark">{band}</div>
          <div className="panel panel--light"><Process /></div>
        </>
      ) : (
        <>
          <div className="panel panel--light"><Services /></div>
          {projects.length > 0 && <div className="panel panel--dark"><OurWork /></div>}
          {/* Naše výroba – directly after Naše realizace (AK_INTERIERY_NASE_VYROBA brief, section 01) */}
          <div className="panel panel--warm"><Production /></div>
          <div className="panel panel--light">
            <CompleteInterior />
            {band}
            <Process />
          </div>
        </>
      )}
      <div className="panel panel--warm"><B2B /></div>
      <div className="panel panel--light"><About /></div>
      <div className="panel panel--dark"><ContactCTA /></div>
    </>
  )
}
