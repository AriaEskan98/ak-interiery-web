import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
// Self-hosted fonts (latin + latin-ext for Czech diacritics) – no Google Fonts request
import '@fontsource/playfair-display/latin-400.css'
import '@fontsource/playfair-display/latin-ext-400.css'
import '@fontsource/playfair-display/latin-400-italic.css'
import '@fontsource/playfair-display/latin-ext-400-italic.css'
import '@fontsource/montserrat/latin-400.css'
import '@fontsource/montserrat/latin-ext-400.css'
import '@fontsource/montserrat/latin-500.css'
import '@fontsource/montserrat/latin-ext-500.css'
import '@fontsource/montserrat/latin-600.css'
import '@fontsource/montserrat/latin-ext-600.css'
import './index.css'
import App from './App.jsx'

const root = document.getElementById('root')
const app = <StrictMode><App /></StrictMode>
// Built site: pages are pre-rendered to HTML, React takes them over. Dev server / preview: render fresh.
if (root.hasChildNodes()) hydrateRoot(root, app)
else createRoot(root).render(app)
