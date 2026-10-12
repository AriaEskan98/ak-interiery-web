import { LangProvider } from './lib.jsx'
import { RouterProvider, useRoute } from './router.jsx'
import { Header } from './components/Top.jsx'
import { HeaderModern } from './components/HeaderModern.jsx'
import { Footer } from './components/Bottom.jsx'
import { WhatsAppButton } from './components/WhatsAppButton.jsx'
import { headerStyle, scrollReveal, sectionTransition } from './site.config.js'
import { useScrollReveal } from './reveal.js'
import { useStackedSections } from './stack.js'
import { useSnapPages, SnapDots } from './snap.jsx'
import HomePage from './pages/HomePage.jsx'
import WardrobesPage from './pages/WardrobesPage.jsx'
import CompletePage from './pages/CompletePage.jsx'
import KitchenPage from './pages/KitchenPage.jsx'
import DoorsPage from './pages/DoorsPage.jsx'
import FurniturePage from './pages/FurniturePage.jsx'
import StonePage from './pages/StonePage.jsx'
import { PrivacyPage, TermsPage } from './pages/LegalPage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'
import B2BPage from './pages/B2BPage.jsx'
import AboutPage from './pages/AboutPage.jsx'
import ContactPage from './pages/ContactPage.jsx'
import { WorkPage, ProjectPage } from './pages/WorkPages.jsx'
import ProductionPage from './pages/ProductionPage.jsx'
import { useSeo } from './seo.js'

const PAGES = { home: HomePage, wardrobes: WardrobesPage, complete: CompletePage, kitchen: KitchenPage, doors: DoorsPage, furniture: FurniturePage, stone: StonePage, privacy: PrivacyPage, terms: TermsPage, notfound: NotFoundPage, b2b: B2BPage, about: AboutPage, contact: ContactPage, work: WorkPage, project: ProjectPage, production: ProductionPage }

// Page transitions are set up per page, so they re-initialise when the page changes.
function PageShell({ Page }) {
  const snap = sectionTransition === 'snap'
  useScrollReveal(scrollReveal)
  useStackedSections(snap || sectionTransition === 'stack')
  useSnapPages(snap)
  return (
    <>
      <main className="stack"><Page /></main>
      <Footer />
      <WhatsAppButton />
      {snap && <SnapDots />}
    </>
  )
}

function Routes() {
  const { route, path } = useRoute()
  useSeo(route, path)
  return <PageShell key={route === 'project' ? path : route} Page={PAGES[route] || HomePage} />
}

export default function App({ initialPath }) {
  return (
    <LangProvider>
      <RouterProvider initialPath={initialPath}>
        {headerStyle === 'classic' ? <Header /> : <HeaderModern />}
        <Routes />
      </RouterProvider>
    </LangProvider>
  )
}
