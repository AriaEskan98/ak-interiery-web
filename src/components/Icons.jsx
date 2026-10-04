// Thin line icons in the style of the logo sheet (1.25px stroke, round joins).
const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.25,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
}

export const Icon = {
  arrow: (p) => (
    <svg viewBox="0 0 24 24" width="18" height="18" {...base} {...p}><path d="M4 12h15M14 7l5 5-5 5" /></svg>
  ),
  arrowLeft: (p) => (
    <svg viewBox="0 0 24 24" width="18" height="18" {...base} {...p}><path d="M20 12H5M10 7l-5 5 5 5" /></svg>
  ),
  close: (p) => (
    <svg viewBox="0 0 24 24" width="22" height="22" {...base} {...p}><path d="M5 5l14 14M19 5L5 19" /></svg>
  ),
  chat: (p) => (
    <svg viewBox="0 0 32 32" width="30" height="30" {...base} {...p}><path d="M16 5c6.6 0 11 4 11 9.5S22.6 24 16 24c-1.3 0-2.6-.2-3.7-.5L6 27l1.8-5.2C5.9 20 5 17.5 5 14.5 5 9 9.4 5 16 5z" /></svg>
  ),
  ruler: (p) => (
    <svg viewBox="0 0 32 32" width="30" height="30" {...base} {...p}><path d="M5 23L23 5l4 4L9 27z" /><path d="M10 18l2 2M13 15l3 3M16 12l2 2M19 9l3 3" /></svg>
  ),
  doc: (p) => (
    <svg viewBox="0 0 32 32" width="30" height="30" {...base} {...p}><path d="M8 4h11l6 6v18H8z" /><path d="M19 4v6h6M12 16h9M12 20h9M12 24h6" /></svg>
  ),
  tag: (p) => (
    <svg viewBox="0 0 32 32" width="30" height="30" {...base} {...p}><path d="M5 16V6h10l12 12-10 10z" /><circle cx="11" cy="12" r="2" /></svg>
  ),
  pencil: (p) => (
    <svg viewBox="0 0 32 32" width="30" height="30" {...base} {...p}><path d="M6 26l2-7L21 6l5 5-13 13z" /><path d="M18 9l5 5M6 26l7-2" /></svg>
  ),
  gear: (p) => (
    <svg viewBox="0 0 32 32" width="30" height="30" {...base} {...p}>
      <circle cx="16" cy="16" r="4" />
      <path d="M16 4v3M16 25v3M4 16h3M25 16h3M7.5 7.5l2.1 2.1M22.4 22.4l2.1 2.1M7.5 24.5l2.1-2.1M22.4 9.6l2.1-2.1" />
      <circle cx="16" cy="16" r="8.5" />
    </svg>
  ),
  home: (p) => (
    <svg viewBox="0 0 32 32" width="30" height="30" {...base} {...p}><path d="M5 15L16 5l11 10M8 12.5V27h16V12.5" /><path d="M13.5 27v-7h5v7" /></svg>
  ),
  diamond: (p) => (
    <svg viewBox="0 0 32 32" width="30" height="30" {...base} {...p}><path d="M9 6h14l5 7-12 14L4 13z" /><path d="M4 13h24M12 6l-2 7 6 14 6-14-2-7" /></svg>
  ),
  person: (p) => (
    <svg viewBox="0 0 32 32" width="30" height="30" {...base} {...p}><circle cx="16" cy="11" r="5" /><path d="M6 27c1.5-5 5.3-8 10-8s8.5 3 10 8" /></svg>
  ),
  phone: (p) => (
    <svg viewBox="0 0 24 24" width="16" height="16" {...base} {...p}><path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a1 1 0 01-1 1A16 16 0 014 5a1 1 0 011-1z" /></svg>
  ),
  mail: (p) => (
    <svg viewBox="0 0 24 24" width="16" height="16" {...base} {...p}><rect x="3" y="5" width="18" height="14" rx="1" /><path d="M3 6l9 7 9-7" /></svg>
  ),
  pin: (p) => (
    <svg viewBox="0 0 24 24" width="16" height="16" {...base} {...p}><path d="M12 21s7-6.2 7-12a7 7 0 10-14 0c0 5.8 7 12 7 12z" /><circle cx="12" cy="9" r="2.5" /></svg>
  ),
  facebook: (p) => (
    <svg viewBox="0 0 24 24" width="16" height="16" {...base} {...p}><path d="M14 8h2V5h-2.5C11 5 10 6.5 10 8.7V11H8v3h2v6h3v-6h2.3l.7-3h-3V9c0-.6.4-1 1-1z" /></svg>
  ),
  instagram: (p) => (
    <svg viewBox="0 0 24 24" width="16" height="16" {...base} {...p}><rect x="4" y="4" width="16" height="16" rx="4.5" /><circle cx="12" cy="12" r="3.6" /><circle cx="16.8" cy="7.2" r=".6" fill="currentColor" /></svg>
  ),
  linkedin: (p) => (
    <svg viewBox="0 0 24 24" width="16" height="16" {...base} {...p}><path d="M7 10v8M7 6.5v.01M11 18v-8M11 13.5c0-2 1.3-3.5 3-3.5s3 1 3 3.5V18" /></svg>
  ),
}

// Logo recreated as type from 13_Logo_Reference.png.
// TODO (client): replace with the final vector logo (SVG) when available.
export function Logo({ compact = false }) {
  return (
    <span className={`logo${compact ? ' logo--compact' : ''}`} aria-label="AK Interiéry">
      <span className="logo__mark" aria-hidden="true">
        <span className="logo__a">A</span>
        <span className="logo__k">K</span>
      </span>
      <span className="logo__word" aria-hidden="true">Interiéry</span>
      {!compact && <span className="logo__sub" aria-hidden="true">Na míru</span>}
    </span>
  )
}

// Drawn pergola used until a real pergola photo is supplied (portrait, matches card ratio 4:4.4).
export function PergolaArt() {
  const slats = Array.from({ length: 9 }, (_, i) => i)
  return (
    <svg className="pergola-art" viewBox="0 0 400 440" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id="pg-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3A2F28" />
          <stop offset=".75" stopColor="#2A231E" />
          <stop offset="1" stopColor="#1F1A16" />
        </linearGradient>
        <radialGradient id="pg-sun" cx=".72" cy=".52" r=".35">
          <stop offset="0" stopColor="#C9B79E" stopOpacity=".28" />
          <stop offset="1" stopColor="#C9B79E" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="400" height="440" fill="url(#pg-sky)" />
      <rect width="400" height="440" fill="url(#pg-sun)" />
      {/* horizon / hills */}
      <path d="M0 300 C80 284 140 292 210 280 S340 270 400 282 V440 H0z" fill="#1F1A16" opacity=".55" />
      <g fill="none" stroke="#C9B79E" strokeLinecap="round" strokeLinejoin="round">
        {/* roof frame in perspective */}
        <path d="M58 132 L318 108 L362 140 L96 168 Z" strokeWidth="1.5" />
        {slats.map((i) => {
          const t = (i + 1) / 10
          return <path key={i} d={`M${58 + 260 * t} ${132 - 24 * t} L${96 + 266 * t} ${168 - 28 * t}`} strokeWidth="1" opacity=".75" />
        })}
        {/* posts */}
        <path d="M96 168 V352 M362 140 V334" strokeWidth="1.5" />
        <path d="M58 132 V318 M318 108 V300" strokeWidth="1" opacity=".55" />
        {/* deck */}
        <path d="M30 356 L96 352 L362 334 L392 332" strokeWidth="1" opacity=".5" />
        <path d="M58 318 L318 300" strokeWidth="1" opacity=".3" />
        {/* lounge sofa */}
        <path d="M150 318 L292 308 L292 290 L150 300 Z" strokeWidth="1.2" opacity=".85" />
        <path d="M150 300 L150 284 L292 274 L292 290" strokeWidth="1.2" opacity=".85" />
        <path d="M196 314 L196 297 M244 311 L244 294" strokeWidth="1" opacity=".5" />
        {/* hanging light */}
        <path d="M224 152 V200" strokeWidth=".8" opacity=".6" />
      </g>
      <circle cx="224" cy="206" r="6" fill="#C9B79E" opacity=".9" />
      <circle cx="224" cy="206" r="22" fill="#C9B79E" opacity=".12" />
    </svg>
  )
}
