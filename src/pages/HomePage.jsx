import { Hero, Services, CompleteInterior, Process, Statement } from '../components/Top.jsx'
import { useLang } from '../lib.jsx'
import { Projects, B2B, About, ContactCTA } from '../components/Bottom.jsx'
import { sectionTransition, statementImages } from '../site.config.js'

// Section order follows "2. POŘADÍ HOMEPAGE" in the KONTROLNI_VZOR PDF.
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
          <div className="panel panel--light"><CompleteInterior /></div>
          <div className="panel panel--dark">{band}</div>
          <div className="panel panel--light"><Process /></div>
        </>
      ) : (
        <div className="panel panel--light">
          <Services />
          <CompleteInterior />
          {band}
          <Process />
        </div>
      )}
      <div className="panel panel--dark"><Projects /></div>
      <div className="panel panel--warm"><B2B /></div>
      <div className="panel panel--light"><About /></div>
      <div className="panel panel--dark"><ContactCTA /></div>
    </>
  )
}
