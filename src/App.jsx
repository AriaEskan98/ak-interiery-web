import { LangProvider } from './lib.jsx'
import { RouterProvider, useRoute } from './router.jsx'
import { Header } from './components/Top.jsx'
import { HeaderModern } from './components/HeaderModern.jsx'
import { Footer } from './components/Bottom.jsx'
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
import { PrivacyPage, TermsPage } from './pages/LegalPage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'
import { useSeo } from './seo.js'

const PAGES = { home: HomePage, wardrobes: WardrobesPage, complete: CompletePage, kitchen: KitchenPage, doors: DoorsPage, furniture: FurniturePage, privacy: PrivacyPage, terms: TermsPage, notfound: NotFoundPage }

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
      {snap && <SnapDots />}
    </>
  )
}

function Routes() {
  const { route } = useRoute()
  useSeo(route)
  return <PageShell key={route} Page={PAGES[route] || HomePage} />
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
