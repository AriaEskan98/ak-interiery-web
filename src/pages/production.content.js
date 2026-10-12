// Naše výroba – Czech: verbatim from AK_INTERIERY_NASE_VYROBA_WEBAR_CZ_EN.docx (sections 02 and 04).
// Short labels/tags/CTAs that the brief does not word are ours and only restate the approved copy.
// English: our translation – TODO (client): review.
// TODO (client) before relying on it: confirm "přibližně 25 designových variant" of MDF doors (brief section 06).

// The five manufacturing areas (number + title, summary line beneath) – verbatim from the 5-point brief.
// `id` = the matching chapter on /nase-vyroba (vacuum foiling is explained in the softforming chapter).
const area = (id, title, tag) => ({ id, title, tag })
const AREAS = {
  cz: [
    area('nabytek', 'Zakázková výroba nábytku', 'Kuchyně · vestavěné skříně · interiérové dveře · nábytek na míru'),
    area('cnc-mdf', 'CNC obrábění dřeva a MDF', 'Přesné řezání · frézování · vrtání · dekorativní profily'),
    area('softforming', 'Vakuové fóliování MDF dvířek', '3D profily · bezúchytková dvířka · matné a lesklé povrchy'),
    area('kamen', 'Kamenická výroba', 'Technický a přírodní kámen · CNC obrábění · pracovní desky'),
    area('plexisklo', 'Výroba z plexiskla', 'Řezání · frézování · gravírování · reklamní a designové prvky'),
  ],
  en: [
    area('nabytek', 'Bespoke furniture manufacturing', 'Kitchens · built-in wardrobes · interior doors · bespoke furniture'),
    area('cnc-mdf', 'CNC machining of wood and MDF', 'Precision cutting · milling · drilling · decorative profiles'),
    area('softforming', 'Vacuum foiling of MDF fronts', '3D profiles · handleless fronts · matt and gloss finishes'),
    area('kamen', 'Stone fabrication', 'Engineered and natural stone · CNC machining · worktops'),
    area('plexisklo', 'Acrylic fabrication', 'Cutting · milling · engraving · signage and design elements'),
  ],
  // \u00ad = soft hyphen: long German compounds break with a hyphen in narrow cards
  de: [
    area('nabytek', 'Möbel\u00adfertigung nach Maß', 'Küchen · Einbauschränke · Innentüren · Möbel nach Maß'),
    area('cnc-mdf', 'CNC-Bearbeitung von Holz und MDF', 'Präziser Zuschnitt · Fräsen · Bohren · dekorative Profile'),
    area('softforming', 'Vakuum\u00adfolierung von MDF-Fronten', '3D-Profile · grifflose Fronten · matte und glänzende Oberflächen'),
    area('kamen', 'Stein\u00adbearbeitung', 'Kunststein und Naturstein · CNC-Bearbeitung · Arbeitsplatten'),
    area('plexisklo', 'Acrylglas\u00adverarbeitung', 'Schneiden · Fräsen · Gravieren · Werbe- und Designelemente'),
  ],
}

export const productionContent = {
  cz: {
    // homepage section – brief section 02
    home: {
      eyebrow: 'Naše výroba',
      title: 'Od prvního řezu *po finální detail.*',
      text: 'Vlastní výrobní technologie nám umožňují zpracovávat dřevo, MDF, technický i přírodní kámen a plexisklo. Vyrábíme kuchyně, vestavěné skříně, nábytková dvířka, pracovní desky a další prvky na míru. Nabízíme také zakázkové opracování materiálů pro firemní partnery.',
      // 5 points – AK_INTERIERY_VYROBA_5_BODU_CZ_DE_EN (12. 10. 2026), shared with the page overview
      points: AREAS.cz,
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
        title: 'Pět výrobních oblastí. *Jedna dílna.*',
        items: AREAS.cz,
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
      points: AREAS.en,
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
        title: 'Five areas of manufacturing. *One workshop.*',
        items: AREAS.en,
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
  // German – MASTER DE 1.0, chapters 02.06 and 09 + the 5-point overview. CNC text: the number-free default (09.04.02)
  // until the ~25 designs are confirmed. Lines marked UI were not in the document.
  de: {
    home: {
      eyebrow: 'Eigene Fertigung',
      title: 'Vom ersten Schnitt *bis zum letzten Detail.*',
      text: 'Mit unserer eigenen Fertigungstechnik bearbeiten wir Holz, MDF, Kunststein, Naturstein und Acrylglas. Wir fertigen Küchen, Einbauschränke, Möbelfronten, Arbeitsplatten und weitere Elemente nach Maß. Für Geschäftspartner übernehmen wir auch die auftragsbezogene Materialbearbeitung.',
      points: AREAS.de,
      cta: 'Unsere Fertigung entdecken',
    },
    page: {
      crumb: ['Startseite', 'Eigene Fertigung'],
      hero: {
        eyebrow: 'Eigene Fertigung nach Maß',
        title: 'Technologie, Präzision *und handwerkliche Verarbeitung.*',
        text: 'Wir verbinden eigene Möbelfertigung, CNC-Bearbeitung von Holz und MDF, Steinbearbeitung und die Verarbeitung von Acrylglas. Mit unseren Fertigungsmöglichkeiten stellen wir einzelne Bauteile ebenso wie komplexere maßgefertigte Elemente nach konkreter Vorgabe her.',
        cta1: 'Fertigungsanfrage senden',
        cta2: 'Unsere Möglichkeiten ansehen',
      },
      overview: {
        eyebrow: 'Fertigungsbereiche', // UI
        title: 'Fünf Fertigungsbereiche. *Eine Werkstatt.*', // UI
        items: AREAS.de,
      },
      chapters: {
        furniture: {
          eyebrow: 'Möbel', title: 'Möbel und Bauteile nach Maß.',
          text: 'Wir fertigen Küchen, Einbauschränke, Innentüren, Möbelfronten, Arbeitsplatten und weitere Möbelbauteile nach Maß. Im Mittelpunkt stehen präzise Verarbeitung und funktionale Lösungen für den jeweiligen Raum.',
          tags: ['Küchen', 'Einbauschränke', 'Innentüren', 'Möbelfronten', 'Arbeitsplatten'],
          links: [['Küchen nach Maß', '/kuchyne-na-miru'], ['Einbauschränke', '/vestavne-skrine'], ['Möbel nach Maß', '/nabytek-na-miru'], ['Türen & Innenausbau-Elemente', '/dvere']],
        },
        cnc: {
          eyebrow: 'CNC und MDF', title: 'CNC-Bearbeitung von Holz und MDF.',
          text: 'Auf unseren CNC-Maschinen schneiden, bohren und fräsen wir Möbelbauteile. Zum Angebot gehören gefräste MDF-Möbelfronten in unterschiedlichen Designs, darunter grifflose Fronten mit eingefräster Griffmulde.',
          tags: ['Schneiden', 'Bohren', 'Fräsen', 'Gefräste MDF-Fronten', 'Grifflose Fronten'],
        },
        edge: {
          eyebrow: 'Kanten und Oberflächen', title: 'Kantenbearbeitung, Folierung und Plattenzuschnitt.',
          text: 'Mit der Softforming-Kantenanleimmaschine bearbeiten wir profilierte Kanten von Fronten und Möbelbauteilen. Die Vakuumpresse ermöglicht das Folieren gefräster MDF-Fronten einschließlich ihrer Kanten und Konturen. Für den präzisen Zuschnitt von Plattenmaterialien setzen wir außerdem eine elektronisch gesteuerte Säge und eine vertikale Plattensäge ein.',
          tech: [
            ['Softforming-Kantenanleimmaschine', 'Profilierte Kanten'],
            ['Vakuumpresse', 'Folieren gefräster MDF-Fronten'],
            ['Elektronisch gesteuerte Säge und vertikale Plattensäge', 'Zuschnitt von Plattenmaterialien'],
          ],
        },
        stone: {
          eyebrow: 'Stein', title: 'Kunststein und Naturstein aus eigener Bearbeitung.',
          text: 'Wir bearbeiten Kunststein und Naturstein mit CNC-Technik und Brückensäge. Dabei entstehen Arbeitsplatten nach Maß, bearbeitete Kanten und Ausschnitte für Spülen und Kochfelder. Weitere Informationen zu Materialien und Dekoren finden Sie im Bereich Stein und Steinverarbeitung.',
          tags: ['CNC-Technik', 'Brückensäge', 'Arbeitsplatten', 'Kantenbearbeitung', 'Ausschnitte für Spülen und Kochfelder'],
          cta: 'Stein und Steinverarbeitung entdecken',
        },
        plexi: {
          eyebrow: 'Acrylglas', title: 'Acrylglas nach Ihren Vorgaben.',
          text: 'Wir schneiden, fräsen, bohren und gravieren Acrylglas nach Auftrag. Daraus fertigen wir Einrichtungselemente, Werbeelemente und weitere individuelle Produkte für Privatkunden und Geschäftspartner.',
          tags: ['Schneiden', 'Fräsen', 'Bohren', 'Gravieren'],
        },
      },
      b2b: {
        eyebrow: 'Fertigung für Geschäftskunden',
        title: 'Ein Fertigungspartner *für Ihre Projekte.*',
        text: 'Planen Sie ein Einrichtungs-, Bau- oder Gewerbeprojekt? Senden Sie uns Ihre technischen Vorgaben und den gewünschten Fertigungsumfang. Bearbeitungsmöglichkeiten, Termine und Preis prüfen wir individuell.',
        cta: 'Auftragsfertigung anfragen',
        link: { text: 'Sie suchen einen Partner für Fertigung, Lieferung und Montage eines gesamten Projekts?', label: 'Mehr zur B2B-Zusammenarbeit' },
      },
    },
    links: {
      b2b: { text: 'Möbelfertigung, CNC-Bearbeitung, Stein und Acrylglas – eigene Fertigungstechnik für Ihre Projekte.', label: 'Eigene Fertigung' }, // UI
      kitchen: { text: 'Küchenbauteile, gefräste MDF-Fronten und Steinarbeitsplatten fertigen wir in unserer eigenen Fertigung.', label: 'Eigene Fertigung' }, // UI
      stone: 'Unsere Fertigung entdecken',
    },
  },
}
