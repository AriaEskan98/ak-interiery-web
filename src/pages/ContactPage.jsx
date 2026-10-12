// Kontakt – simple, conversion-focused (AK_Kontakt_a_formulare_FINAL_CZ_EN.docx, section 01).
// The two buttons switch between form A (private client) and form B (B2B project).
// Brief: no address, showroom or company registration data until confirmed.
import { useLang } from '../lib.jsx'
import { ContactSection } from '../components/EnquiryForms.jsx'
import { formsContent } from '../forms.content.js'

export default function ContactPage() {
  const { lang } = useLang()
  const c = formsContent[lang].contactPage
  return (
    <div className="panel panel--dark">
      <ContactSection asPage eyebrow={c.eyebrow} title={c.title} text={c.text} buttons={[c.b1, c.b2]} />
    </div>
  )
}
