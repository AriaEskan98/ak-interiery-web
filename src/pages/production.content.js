// Naše výroba – Czech: verbatim from AK_INTERIERY_NASE_VYROBA_WEBAR_CZ_EN.docx (sections 02 and 04).
// Short labels/tags/CTAs that the brief does not word are ours and only restate the approved copy.
// English: our translation – TODO (client): review.
// TODO (client) before relying on it: confirm "přibližně 25 designových variant" of MDF doors (brief section 06).

export const productionContent = {
  cz: {
    // homepage section – brief section 02
    home: {
      eyebrow: 'Naše výroba',
      title: 'Od prvního řezu *po finální detail.*',
      text: 'Vlastní výrobní technologie nám umožňují zpracovávat dřevo, MDF, technický i přírodní kámen a plexisklo. Vyrábíme kuchyně, vestavěné skříně, nábytková dvířka, pracovní desky a další prvky na míru. Nabízíme také zakázkové opracování materiálů pro firemní partnery.',
      points: [
        { title: 'Nábytková výroba', tag: 'Kuchyně, skříně, dvířka, desky', id: 'nabytek' },
        { title: 'CNC a MDF dvířka', tag: 'Řezání, vrtání, frézování', id: 'cnc-mdf' },
        { title: 'Kamenická výroba', tag: 'Technický i přírodní kámen', id: 'kamen' },
        { title: 'Plexisklo', tag: 'Řezání, frézování, gravírování', id: 'plexisklo' },
      ],
      cta: 'Prohlédnout naši výrobu',
    },
    page: {
      crumb: ['Úvod', 'Naše výroba'],
      hero: {
        eyebrow: 'Vlastní výroba na míru',
        title: 'Technologie, přesnost *a řemeslné zpracování.*',
        text: 'Propojujeme vlastní výrobu nábytku, CNC opracování dřeva a MDF, kamenickou výrobu a zpracování plexiskla. Díky různým výrobním technologiím dokážeme připravit jednotlivé dílce i komplexnější zakázkové prvky podle konkrétního zadání.',
        cta1: 'Poptat zakázkovou výrobu',
        cta2: 'Výrobní oblasti',
      },
      overview: {
        eyebrow: 'Výrobní oblasti',
        title: 'Čtyři technologie. *Jedna dílna.*',
        items: [
          { id: 'nabytek', title: 'Nábytek', text: 'Kuchyně, vestavěné skříně, dveře, dvířka a pracovní desky na míru.' },
          { id: 'cnc-mdf', title: 'CNC a MDF dvířka', text: 'Řezání, vrtání a frézování dílců, frézovaná a fóliovaná MDF dvířka.' },
          { id: 'kamen', title: 'Kámen', text: 'Pracovní desky z technického i přírodního kamene, hrany a výřezy.' },
          { id: 'plexisklo', title: 'Plexisklo', text: 'Řezání, frézování, vrtání a gravírování zakázkových prvků.' },
        ],
      },
      chapters: {
        furniture: {
          eyebrow: 'Nábytek', title: 'Nábytková výroba',
          text: 'Vyrábíme kuchyně, vestavěné skříně, interiérové dveře, nábytková dvířka, pracovní desky a další nábytkové prvky na míru. Zaměřujeme se na přesné zpracování a funkční řešení pro konkrétní prostor.',
          tags: ['Kuchyně', 'Vestavěné skříně', 'Interiérové dveře', 'Nábytková dvířka', 'Pracovní desky'],
          links: [['Kuchyně na míru', '/kuchyne-na-miru'], ['Vestavné skříně', '/vestavne-skrine'], ['Nábytek na míru', '/nabytek-na-miru'], ['Dveře', '/dvere']],
        },
        cnc: {
          eyebrow: 'CNC a MDF', title: 'CNC opracování dřeva a MDF',
          text: 'Na CNC strojích řežeme, vrtáme a frézujeme nábytkové dílce. Součástí nabídky jsou frézovaná MDF dvířka v přibližně 25 designových variantách, včetně moderních bezúchytkových dvířek s frézovaným úchopem.',
          tags: ['Řezání', 'Vrtání', 'Frézování', 'Frézovaná MDF dvířka', 'Bezúchytková dvířka'],
        },
        edge: {
          eyebrow: 'Dokončení dílců', title: 'Softforming, vakuové lisování a řezání desek',
          text: 'Softformingová olepovačka umožňuje dokončování tvarovaných hran. Vakuový lis používáme k fóliování frézovaných MDF dvířek včetně hran a tvarových detailů. Pro přesné dělení deskových materiálů využíváme elektronickou a vertikální pilu.',
          tech: [
            ['Softformingová olepovačka', 'Tvarované hrany'],
            ['Vakuový lis', 'Fóliování MDF dvířek'],
            ['Elektronická a vertikální pila', 'Dělení deskových materiálů'],
          ],
        },
        stone: {
          eyebrow: 'Kámen', title: 'Kamenická výroba',
          text: 'Technický i přírodní kámen opracováváme pomocí CNC technologie a mostové pily. Vyrábíme pracovní desky na míru, upravujeme hrany a připravujeme výřezy pro dřezy a varné desky. Podrobnosti o materiálech a dekorech najdete v samostatné sekci Kámen a kamenické realizace.',
          tags: ['CNC technologie', 'Mostová pila', 'Pracovní desky', 'Úprava hran', 'Výřezy pro dřezy a varné desky'],
          cta: 'Prohlédnout kamenické realizace',
        },
        plexi: {
          eyebrow: 'Plexisklo', title: 'Opracování plexiskla',
          text: 'Plexisklo řežeme, frézujeme, vrtáme a gravírujeme podle zadání. Vyrábíme z něj interiérové, reklamní a další zakázkové prvky pro jednotlivé zákazníky i firemní partnery.',
          tags: ['Řezání', 'Frézování', 'Vrtání', 'Gravírování'],
        },
      },
      b2b: {
        eyebrow: 'B2B',
        title: 'Výrobní partner *pro vaše projekty.*',
        text: 'Spolupracujete na interiérovém, stavebním nebo komerčním projektu? Zašlete nám technické zadání a požadovaný rozsah výroby. Možnosti zpracování, termín a cenu posoudíme individuálně.',
        cta: 'Poptat zakázkovou výrobu',
        link: { text: 'Hledáte partnera pro výrobu, dodávku i montáž celého projektu?', label: 'Pro developery a profesionály' },
      },
    },
    // cross-links from other pages
    links: {
      b2b: { text: 'Nábytková výroba, CNC opracování, kámen i plexisklo – vlastní výrobní technologie pro vaše projekty.', label: 'Naše výroba' },
      kitchen: { text: 'Kuchyňské dílce, frézovaná MDF dvířka i kamenné desky vyrábíme ve vlastní výrobě.', label: 'Naše výroba' },
      stone: 'Kamenická výroba v Naší výrobě',
    },
  },

  en: {
    home: {
      eyebrow: 'Our manufacturing',
      title: 'From the first cut *to the final detail.*',
      text: 'Our own manufacturing technology lets us work wood, MDF, technical and natural stone and acrylic glass. We make kitchens, built-in wardrobes, furniture doors, worktops and other bespoke elements. We also offer custom material processing for business partners.',
      points: [
        { title: 'Furniture manufacturing', tag: 'Kitchens, wardrobes, doors, worktops', id: 'nabytek' },
        { title: 'CNC & MDF doors', tag: 'Cutting, drilling, milling', id: 'cnc-mdf' },
        { title: 'Stone fabrication', tag: 'Technical and natural stone', id: 'kamen' },
        { title: 'Acrylic glass', tag: 'Cutting, milling, engraving', id: 'plexisklo' },
      ],
      cta: 'Explore our manufacturing',
    },
    page: {
      crumb: ['Home', 'Our manufacturing'],
      hero: {
        eyebrow: 'In-house bespoke manufacturing',
        title: 'Technology, precision *and craftsmanship.*',
        text: 'We combine our own furniture manufacturing, CNC machining of wood and MDF, stone fabrication and acrylic glass processing. Thanks to these different technologies we can produce individual components as well as more complex bespoke elements to a specific brief.',
        cta1: 'Enquire about custom manufacturing',
        cta2: 'Manufacturing areas',
      },
      overview: {
        eyebrow: 'Manufacturing areas',
        title: 'Four technologies. *One workshop.*',
        items: [
          { id: 'nabytek', title: 'Furniture', text: 'Bespoke kitchens, built-in wardrobes, doors, furniture fronts and worktops.' },
          { id: 'cnc-mdf', title: 'CNC & MDF doors', text: 'Cutting, drilling and milling of components; milled and foiled MDF doors.' },
          { id: 'kamen', title: 'Stone', text: 'Technical and natural stone worktops, edges and cut-outs.' },
          { id: 'plexisklo', title: 'Acrylic glass', text: 'Cutting, milling, drilling and engraving of bespoke elements.' },
        ],
      },
      chapters: {
        furniture: {
          eyebrow: 'Furniture', title: 'Furniture manufacturing',
          text: 'We make bespoke kitchens, built-in wardrobes, interior doors, furniture fronts, worktops and other furniture elements. We focus on precise workmanship and functional solutions for the specific space.',
          tags: ['Kitchens', 'Built-in wardrobes', 'Interior doors', 'Furniture fronts', 'Worktops'],
          links: [['Bespoke kitchens', '/kuchyne-na-miru'], ['Built-in wardrobes', '/vestavne-skrine'], ['Bespoke furniture', '/nabytek-na-miru'], ['Doors', '/dvere']],
        },
        cnc: {
          eyebrow: 'CNC & MDF', title: 'CNC machining of wood and MDF',
          text: 'On our CNC machines we cut, drill and mill furniture components. Our range includes milled MDF doors in approximately 25 design variants, including modern handleless doors with a milled grip.',
          tags: ['Cutting', 'Drilling', 'Milling', 'Milled MDF doors', 'Handleless doors'],
        },
        edge: {
          eyebrow: 'Finishing components', title: 'Softforming, vacuum pressing and panel cutting',
          text: 'A softforming edgebander lets us finish shaped edges. We use a vacuum press to foil milled MDF doors, including edges and shaped details. For precise cutting of panel materials we use an electronic and a vertical panel saw.',
          tech: [
            ['Softforming edgebander', 'Shaped edges'],
            ['Vacuum press', 'Foiling MDF doors'],
            ['Electronic and vertical panel saw', 'Cutting panel materials'],
          ],
        },
        stone: {
          eyebrow: 'Stone', title: 'Stone fabrication',
          text: 'We work technical and natural stone using CNC technology and a bridge saw. We make bespoke worktops, finish edges and prepare cut-outs for sinks and hobs. Details on materials and decors can be found in the separate Stone & stone fabrication section.',
          tags: ['CNC technology', 'Bridge saw', 'Worktops', 'Edge finishing', 'Sink and hob cut-outs'],
          cta: 'View stone fabrication',
        },
        plexi: {
          eyebrow: 'Acrylic glass', title: 'Acrylic glass processing',
          text: 'We cut, mill, drill and engrave acrylic glass to your specification. We use it to make interior, advertising and other bespoke elements for individual customers and business partners.',
          tags: ['Cutting', 'Milling', 'Drilling', 'Engraving'],
        },
      },
      b2b: {
        eyebrow: 'B2B',
        title: 'A manufacturing partner *for your projects.*',
        text: 'Working on an interior, construction or commercial project? Send us the technical brief and the required scope of manufacturing. We assess the processing options, timing and price individually.',
        cta: 'Enquire about custom manufacturing',
        link: { text: 'Looking for a partner to manufacture, deliver and install a whole project?', label: 'For developers & professionals' },
      },
    },
    links: {
      b2b: { text: 'Furniture manufacturing, CNC machining, stone and acrylic glass – our own manufacturing technology for your projects.', label: 'Our manufacturing' },
      kitchen: { text: 'We make kitchen components, milled MDF doors and stone worktops in our own production.', label: 'Our manufacturing' },
      stone: 'Stone fabrication in Our manufacturing',
    },
  },
}
