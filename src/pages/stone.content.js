// Kámen a kamenické realizace – page copy.
// TODO (client): no text document was supplied for this page – BOTH Czech and English are our drafts, written from
// the brief (technical + natural stone, collection of 7 decors, in-house cutting, milling, custom fabrication,
// measuring, delivery and installation). Please review and approve before publishing.
// Deliberately avoided: material performance claims (heat/scratch resistance etc.), named natural stones,
// supplier/brand names, prices and capacities – add them only once verified.

export const stoneContent = {
  cz: {
    crumb: ['Úvod', 'Kámen a kamenické realizace'],
    hero: {
      eyebrow: 'Kámen a kamenické realizace',
      title: ['Kámen zpracovaný', '*přesně na míru.*'],
      text: 'Technický i přírodní kámen pro kuchyně, koupelny, interiéry i individuální projekty. Kámen řežeme, frézujeme a upravujeme ve vlastní dílně – od zaměření až po montáž.',
      claim: 'Materiál. Výroba. Montáž.',
      cta1: 'Poptat kamenné prvky',
      cta2: 'Kolekce dekorů',
    },
    technical: {
      eyebrow: 'Technický kámen',
      title: 'Technický kámen. *Jednotný vzhled, přesný formát.*',
      p1: 'Technický kámen je vyráběný materiál s rovnoměrným a předvídatelným vzhledem. Dobře se proto plánuje i pro větší plochy a navazující prvky – pracovní desky, ostrůvky, obklady nebo koupelnové desky.',
      p2: 'Desku zpracujeme ve vlastní dílně přesně podle zaměření: řez, výřezy pro dřez a varnou desku, úpravu hran i finální montáž.',
      specsTitle: 'Standardní formát desky',
      specs: [['Délka', '3 200 mm'], ['Šířka', '1 600 mm'], ['Tloušťka', '20 mm'], ['Plocha', '5,12 m²']],
      specsNote: 'Rozměry odpovídají standardnímu formátu desky. Dostupnost dekorů a konkrétní parametry vždy ověříme pro vaši zakázku.',
    },
    natural: {
      eyebrow: 'Přírodní kámen',
      title: 'Přírodní kámen. *Každá deska je originál.*',
      p1: 'Přírodní kámen nese kresbu, kterou nelze zopakovat. Každá deska je jiná – v žilkování, odstínu i struktuře – a právě to dává interiéru výjimečný charakter.',
      p2: 'Konkrétní materiál vybíráme společně podle projektu, místa použití a nároků na údržbu. Poradíme, kde přírodní kámen dává smysl a kde je praktičtější technický.',
      points: ['Jedinečná kresba každé desky', 'Výběr materiálu podle projektu a místa použití', 'Zpracování a montáž na míru'],
    },
    decors: {
      eyebrow: 'Kolekce dekorů',
      title: 'Kolekce {n} dekorů *technického kamene.*',
      text: 'Každý dekor má svůj název a číslo. Klikněte na fotografii pro detail a tlačítkem „Poptat tento dekor“ nám pošlete poptávku – vybraný dekor v ní uvedeme automaticky.',
      type: 'Technický kámen',
      label: 'Dekor',
      enquire: 'Poptat tento dekor',
      view: 'Zobrazit fotografii',
      photosShort: 'foto',
      photoKinds: { warehouse: 'deska ve skladu', detail: 'detail hrany' },
      pendingTitle: 'Kolekci právě připravujeme.',
      pendingText: 'Fotografie a přehled všech dekorů zveřejníme po finálním ověření vzorků a dostupnosti. Pokud plánujete projekt už teď, napište nám – aktuální nabídku dekorů vám rádi pošleme.',
      pendingCta: 'Vyžádat aktuální nabídku',
    },
    fabrication: {
      eyebrow: 'Vlastní kamenická výroba',
      title: 'Od zaměření po montáž. *Ve vlastní dílně.*',
      text: 'Kámen zpracováváme ve vlastní dílně. Máme tak pod kontrolou přesnost zpracování i návaznost na další prvky interiéru.',
      steps: [
        { title: 'Zaměření', text: 'Prostor přesně zaměříme, aby deska navázala na nábytek, stěny i spotřebiče.' },
        { title: 'Řezání', text: 'Desky řežeme na míru podle zaměření a výkresu.' },
        { title: 'Frézování', text: 'Frézujeme výřezy pro dřezy, varné desky, baterie a další prvky.' },
        { title: 'Výroba na míru', text: 'Upravíme hrany, spoje a detaily podle konkrétního projektu.' },
        { title: 'Doprava', text: 'Hotové díly bezpečně dopravíme na místo realizace.' },
        { title: 'Montáž', text: 'Kámen osadíme, dokončíme detaily a předáme hotovou práci.' },
      ],
    },
    applications: {
      eyebrow: 'Použití a zakázky na míru',
      title: 'Kámen tam, *kde má smysl.*',
      text: 'Kámen zpracujeme pro jednotlivé prvky i jako součást celého interiéru nebo developerského projektu.',
      items: [
        ['Kuchyňské pracovní desky a ostrůvky', '/kuchyne-na-miru'],
        ['Koupelnové desky'],
        ['Obklady stěn a kuchyňské zástěny'],
        ['Parapety'],
        ['Stoly a nábytkové prvky'],
        ['Atypické a projektové zakázky', '/pro-profesionaly'],
      ],
      customTitle: 'Máte vlastní zadání?',
      customText: 'Pošlete nám výkres, fotografii nebo popis. Posoudíme, zda je realizace v kameni možná, a navrhneme řešení.',
      b2b: 'Pro developery a profesionály',
    },
    // link to the real project (our copy – TODO client: review)
    project: { eyebrow: 'Z našich realizací', text: 'Kamenný ostrůvek a pracovní desky v moderní kuchyni.', cta: 'Zobrazit realizaci' },
    cta: {
      title: 'Plánujete kámen? *Připravíme ho na míru.*',
      text: 'Pošlete nám rozměry, výkres nebo fotografii prostoru. Ozveme se vám s návrhem řešení a dalším postupem.',
    },
  },

  en: {
    crumb: ['Home', 'Stone & stone fabrication'],
    hero: {
      eyebrow: 'Stone & stone fabrication',
      title: ['Stone, worked', '*precisely to measure.*'],
      text: 'Technical and natural stone for kitchens, bathrooms, interiors and individual projects. We cut, mill and finish stone in our own workshop – from measuring to installation.',
      claim: 'Material. Fabrication. Installation.',
      cta1: 'Enquire about stone',
      cta2: 'Decor collection',
    },
    technical: {
      eyebrow: 'Technical stone',
      title: 'Technical stone. *Consistent look, precise format.*',
      p1: 'Technical stone is a manufactured material with an even, predictable appearance. That makes it easy to plan for larger surfaces and connected elements – worktops, islands, wall cladding or bathroom tops.',
      p2: 'We fabricate the slab in our own workshop exactly to the measurements: cutting, cut-outs for the sink and hob, edge finishing and final installation.',
      specsTitle: 'Standard slab format',
      specs: [['Length', '3,200 mm'], ['Width', '1,600 mm'], ['Thickness', '20 mm'], ['Area', '5.12 m²']],
      specsNote: 'Dimensions refer to the standard slab format. We always confirm decor availability and exact specifications for your project.',
    },
    natural: {
      eyebrow: 'Natural stone',
      title: 'Natural stone. *Every slab is an original.*',
      p1: 'Natural stone carries a pattern that can never be repeated. Every slab is different – in veining, tone and texture – and that is what gives an interior its exceptional character.',
      p2: 'We choose the specific material together, based on the project, where it will be used and the care it needs. We will advise where natural stone makes sense and where technical stone is more practical.',
      points: ['A unique pattern in every slab', 'Material chosen for the project and its use', 'Bespoke fabrication and installation'],
    },
    decors: {
      eyebrow: 'Decor collection',
      title: 'A collection of {n} *technical stone decors.*',
      text: 'Every decor has its own name and number. Click a photo for detail, and use “Enquire about this decor” to send us an enquiry – the selected decor is included automatically.',
      type: 'Technical stone',
      label: 'Decor',
      enquire: 'Enquire about this decor',
      view: 'View photo',
      photosShort: 'photos',
      photoKinds: { warehouse: 'slab in the warehouse', detail: 'edge detail' },
      pendingTitle: 'The collection is being prepared.',
      pendingText: 'We will publish photos and an overview of all decors once samples and availability are confirmed. If you are planning a project now, write to us – we will gladly send you the current range.',
      pendingCta: 'Request the current range',
    },
    fabrication: {
      eyebrow: 'In-house stone fabrication',
      title: 'From measuring to installation. *In our own workshop.*',
      text: 'We work stone in our own workshop. That keeps the precision of fabrication and the fit with the rest of the interior under our control.',
      steps: [
        { title: 'Measuring', text: 'We measure the space precisely so the slab fits the furniture, walls and appliances.' },
        { title: 'Cutting', text: 'We cut slabs to size from the measurements and drawings.' },
        { title: 'Milling', text: 'We mill cut-outs for sinks, hobs, taps and other elements.' },
        { title: 'Custom fabrication', text: 'We finish edges, joints and details for the specific project.' },
        { title: 'Delivery', text: 'We deliver the finished pieces safely to the site.' },
        { title: 'Installation', text: 'We fit the stone, finish the details and hand over the completed work.' },
      ],
    },
    applications: {
      eyebrow: 'Applications & custom projects',
      title: 'Stone where *it makes sense.*',
      text: 'We fabricate stone for individual elements as well as part of a whole interior or development project.',
      items: [
        ['Kitchen worktops and islands', '/kuchyne-na-miru'],
        ['Bathroom vanity tops'],
        ['Wall cladding and kitchen splashbacks'],
        ['Window sills'],
        ['Tables and furniture elements'],
        ['Bespoke and project work', '/pro-profesionaly'],
      ],
      customTitle: 'Have your own brief?',
      customText: 'Send us a drawing, a photo or a description. We will assess whether it can be made in stone and propose a solution.',
      b2b: 'For developers & professionals',
    },
    project: { eyebrow: 'From our projects', text: 'A stone island and worktops in a modern kitchen.', cta: 'View project' },
    cta: {
      title: 'Planning stone? *We will make it to measure.*',
      text: 'Send us the dimensions, a drawing or a photo of the space. We will get back to you with a proposed solution and next steps.',
    },
  },
  // German – MASTER DE 1.0, chapter 08 (mapped onto the existing page sections). Lines marked UI were not in the document.
  de: {
    crumb: ['Startseite', 'Stein und Steinverarbeitung'],
    hero: {
      eyebrow: 'Stein und Steinverarbeitung',
      title: ['Ausdrucksstarke Materialien.', '*Präzise nach Maß verarbeitet.*'],
      text: 'Wir bearbeiten Kunststein und Naturstein in unserer eigenen Fertigung. Aus Platten entstehen Arbeitsplatten und individuelle Elemente für Küchen, Bäder und weitere Innenraumprojekte.',
      claim: 'Materialauswahl. Eigene Bearbeitung. Individuelle Fertigung.',
      cta1: 'Steinprojekt anfragen',
      cta2: 'Dekore ansehen',
    },
    technical: {
      eyebrow: 'Kunststein',
      title: 'Vom Plattenmaterial *zum fertigen Bauteil.*',
      p1: 'Dekorative Plattenmaterialien für individuell gefertigte Arbeitsplatten und weitere Einrichtungselemente. Zusammensetzung, Oberfläche und Eignung richten sich nach dem jeweiligen Produkt.',
      p2: 'Wir bieten ganze Platten sowie Zuschnitte und maßgefertigte Elemente an. Die Ausführung stimmen wir auf das gewählte Material, die erforderlichen Maße und den vorgesehenen Einsatz ab.',
      specsTitle: 'Plattenformat und Bearbeitung',
      specs: [['Länge', '3.200 mm'], ['Breite', '1.600 mm'], ['Stärke', '20 mm'], ['Fläche je Platte', '5,12 m²']],
      specsNote: 'Format, Oberfläche und Verfügbarkeit bestätigen wir für das gewählte Material im Rahmen Ihres Angebots.',
    },
    natural: {
      eyebrow: 'Naturstein',
      title: 'Naturstein. *Jede Platte ein Unikat.*', // UI
      p1: 'Individuelle Lösungen aus Naturstein, darunter Granit und Marmor. Material und Ausführung wählen wir passend zum jeweiligen Projekt.',
      p2: 'Zum Leistungsumfang können Aufmaß, Bearbeitung, Transport und Montage gehören. Die konkreten Leistungen legen wir im Angebot fest.',
      points: ['Jede Platte mit eigener Zeichnung', 'Material passend zu Projekt und Einsatz', 'Individuelle Bearbeitung und Montage'], // UI
    },
    decors: {
      eyebrow: 'Kunststein-Kollektion',
      title: 'Wählen Sie *nach Ihrem Stil.*',
      text: 'Entdecken Sie unsere Auswahl an Dekoren. Wählen Sie das gewünschte Erscheinungsbild und senden Sie uns eine Anfrage. Die passende Ausführung und die erforderlichen Maße stimmen wir anschließend mit Ihnen ab.',
      type: 'Kunststein',
      label: 'Dekor',
      enquire: 'Dieses Dekor anfragen',
      view: 'Dekor vergrößern',
      photosShort: 'Fotos', // UI
      photoKinds: { warehouse: 'Platte im Lager', detail: 'Kantendetail' }, // UI
      pendingTitle: 'Die Kollektion wird vorbereitet.', // UI
      pendingText: 'Fotos und eine Übersicht aller Dekore veröffentlichen wir, sobald Muster und Verfügbarkeit bestätigt sind. Planen Sie bereits ein Projekt? Schreiben Sie uns – wir senden Ihnen gerne das aktuelle Angebot.', // UI
      pendingCta: 'Aktuelles Angebot anfragen', // UI
    },
    fabrication: {
      eyebrow: 'Eigene Steinbearbeitung',
      title: 'Präzise bearbeitet *für Ihr Projekt.*',
      text: 'Mit CNC-Steinbearbeitung und Brückensäge schneiden und bearbeiten wir Kunststein und Naturstein. Wir fertigen Arbeitsplatten nach Maß und bearbeiten Kanten sowie Ausschnitte für Spülen und Kochfelder.',
      steps: [ // 08.10 – Von Ihrer Anfrage zum fertigen Element
        { title: 'Anfrage', text: 'Sie senden uns Ihre Vorstellungen, Maße oder vorhandenen Unterlagen.' },
        { title: 'Material und Einsatz', text: 'Wir besprechen das gewünschte Material und den vorgesehenen Einsatz.' },
        { title: 'Aufmaß und Abstimmung', text: 'Wir klären Maße, Bearbeitung, Kanten und notwendige Ausschnitte.' },
        { title: 'Angebot', text: 'Sie erhalten ein Angebot für den abgestimmten Leistungsumfang.' },
        { title: 'Fertigung', text: 'Wir bearbeiten das Material entsprechend der vereinbarten Ausführung.' },
        { title: 'Lieferung und Montage', text: 'Transport und Montage erfolgen nach dem vereinbarten Umfang.' },
      ],
    },
    applications: {
      eyebrow: 'Einsatzbereiche', // UI
      title: 'Steinlösungen *für unterschiedliche Räume.*',
      text: 'Wir fertigen Steinelemente einzeln oder als Teil einer gesamten Einrichtung bzw. eines Bauprojekts.', // UI
      items: [
        ['Küchenarbeitsplatten und Inseln', '/kuchyne-na-miru'],
        ['Waschtischplatten und Badmöbel'],
        ['Wandverkleidungen und ergänzende Elemente'],
        ['Empfangsbereiche und gewerbliche Innenräume', '/pro-profesionaly'],
      ],
      customTitle: 'Sie haben eine eigene Vorgabe?', // UI
      customText: 'Senden Sie uns eine Zeichnung, ein Foto oder eine Beschreibung. Wir prüfen, ob sich die Ausführung in Stein umsetzen lässt, und schlagen eine Lösung vor.', // UI
      b2b: 'Für Geschäftskunden',
    },
    project: { eyebrow: 'Unsere Arbeiten', text: 'Steininsel und Arbeitsplatten in einer modernen Küche.', cta: 'Projekt ansehen' },
    cta: {
      title: 'Welches Steinprojekt *möchten Sie umsetzen?*',
      text: 'Senden Sie uns eine Beschreibung, Maße oder eine Zeichnung. Wir prüfen die Möglichkeiten und besprechen den nächsten Schritt.',
    },
  },
}
