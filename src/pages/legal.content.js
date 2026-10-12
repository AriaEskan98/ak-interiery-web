// Privacy policy and terms of use – TEMPLATES written for how this website actually works.
// TODO (client): fill in company details in site.config.js (`company`) and have both texts reviewed by a lawyer
// before launch. Retention periods and processors below are sensible defaults – confirm they match reality.
// {legalName} {ico} {address} {directors} {privacyEmail} {effectiveFrom} are filled in from site.config.js.

export const legalContent = {
  cz: {
    updated: 'Účinné od',
    contents: 'Obsah',
    privacy: {
      eyebrow: 'Právní informace',
      title: 'Ochrana *osobních údajů.*',
      intro: 'Vážíme si vaší důvěry. Na této stránce vysvětlujeme, jaké osobní údaje při používání našeho webu zpracováváme, proč, jak dlouho a jaká máte práva.',
      sections: [
        { h: 'Kdo vaše údaje zpracovává', p: [
          'Správcem osobních údajů je {legalName}, IČO {ico}, se sídlem {address} (dále jen „AK Interiéry“ nebo „my“).',
          'V záležitostech osobních údajů nás můžete kontaktovat na e-mailu {privacyEmail}.',
        ] },
        { h: 'Jaké údaje zpracováváme', list: [
          'Poptávka soukromého klienta: jméno a příjmení, telefon, e-mail, město / místo realizace, o co máte zájem, fáze a termín projektu, vaše zpráva a soubory, které přiložíte (např. fotografie prostoru nebo půdorys).',
          'B2B poptávka: název společnosti, kontaktní osoba, telefon, e-mail, typ společnosti a informace o projektu (typ, místo, rozsah, termín, popis) včetně přiložených podkladů a odkazů.',
          'Newsletter: e-mailová adresa.',
          'Komunikace: údaje, které nám sdělíte e-mailem nebo telefonicky v souvislosti s vaší poptávkou nebo zakázkou.',
          'Technické údaje: při odeslání formuláře dočasně zpracováváme IP adresu a dobu vyplňování k ochraně před zneužitím a spamem.',
        ] },
        { h: 'Proč a na jakém základě', list: [
          'Vyřízení poptávky a příprava nabídky – jednání o smlouvě na vaši žádost (čl. 6 odst. 1 písm. b) GDPR).',
          'Plnění smlouvy, pokud se stanete naším zákazníkem (čl. 6 odst. 1 písm. b) GDPR) a plnění zákonných povinností, např. účetních a daňových (čl. 6 odst. 1 písm. c) GDPR).',
          'Zasílání newsletteru – váš souhlas, který můžete kdykoli odvolat (čl. 6 odst. 1 písm. a) GDPR).',
          'Ochrana webu před zneužitím – náš oprávněný zájem (čl. 6 odst. 1 písm. f) GDPR).',
        ] },
        { h: 'Jak dlouho údaje uchováváme', list: [
          'Poptávky, ze kterých nevznikne zakázka, včetně přiložených souborů: nejdéle 3 roky od poslední komunikace.',
          'Údaje související se zakázkou: po dobu trvání smlouvy a následně po dobu stanovenou právními předpisy (např. účetní doklady 10 let).',
          'Newsletter: do odvolání souhlasu nebo odhlášení.',
          'Technické údaje k ochraně před zneužitím: několik hodin.',
        ] },
        { h: 'Kdo k údajům má přístup', p: [
          'Vaše údaje nepředáváme třetím stranám k marketingovým účelům. Pracují s nimi pouze naši pracovníci a zpracovatelé, kteří nám zajišťují technický provoz: poskytovatel hostingu webu, poskytovatel e-mailových služeb a případně služba pro rozesílání newsletteru. Se zpracovateli máme uzavřené smlouvy o zpracování osobních údajů.',
          'Údaje nepředáváme mimo Evropskou unii, pokud to není nezbytné; v takovém případě jen s odpovídajícími zárukami podle GDPR.',
        ] },
        { h: 'Cookies a úložiště prohlížeče', p: [
          'Náš web nepoužívá analytické ani marketingové cookies. V prohlížeči si ukládáme pouze zvolený jazyk webu (CZ/EN), což je nezbytné pro jeho fungování a nevyžaduje souhlas.',
          'Pokud v budoucnu začneme používat měřicí nebo marketingové nástroje, budeme vás předem žádat o souhlas.',
        ] },
        { h: 'Vaše práva', list: [
          'Právo na přístup k údajům, které o vás zpracováváme.',
          'Právo na opravu nepřesných údajů.',
          'Právo na výmaz („být zapomenut“), pokud pro zpracování nemáme zákonný důvod.',
          'Právo na omezení zpracování a právo na přenositelnost údajů.',
          'Právo vznést námitku proti zpracování na základě oprávněného zájmu.',
          'Právo kdykoli odvolat souhlas (např. odhlášením z newsletteru) – odvolání nemá vliv na zpracování před ním.',
          'Právo podat stížnost u Úřadu pro ochranu osobních údajů (www.uoou.cz).',
        ], after: 'Svá práva můžete uplatnit e-mailem na {privacyEmail}. Odpovíme bez zbytečného odkladu, nejpozději do jednoho měsíce.' },
      ],
    },
    terms: {
      eyebrow: 'Právní informace',
      title: 'Podmínky *použití webu.*',
      intro: 'Tyto podmínky upravují používání webových stránek AK Interiéry. Používáním webu s nimi souhlasíte.',
      sections: [
        { h: 'Provozovatel', p: ['Provozovatelem webu je {legalName}, IČO {ico}, se sídlem {address}. Jednatelé: {directors}.'] },
        { h: 'Informační charakter obsahu', p: [
          'Obsah webu má informativní charakter a nepředstavuje návrh na uzavření smlouvy. Konkrétní rozsah, cena a termíny realizace jsou vždy předmětem individuální nabídky a smlouvy.',
          'Odesláním poptávkového formuláře nevzniká smluvní vztah ani povinnost cokoli objednat.',
        ] },
        { h: 'Fotografie a vizualizace', p: [
          'Některé fotografie na webu jsou ilustrační vizualizace, které ukazují charakter našich služeb. Nejde o fotografie konkrétních realizovaných zakázek, pokud to u nich není výslovně uvedeno. Skutečné realizace prezentujeme v sekci Realizace.',
          'Barvy a povrchy materiálů se mohou na různých obrazovkách zobrazovat odlišně od skutečnosti.',
        ] },
        { h: 'Autorská práva', p: [
          'Texty, fotografie, grafika, logo a další obsah webu jsou chráněny autorským právem. Bez našeho předchozího písemného souhlasu je nelze kopírovat, šířit ani jinak využívat k jiným než osobním účelům.',
        ] },
        { h: 'Odkazy na jiné weby', p: ['Web může obsahovat odkazy na stránky třetích stran (např. sociální sítě). Za jejich obsah ani za zpracování údajů na nich neodpovídáme.'] },
        { h: 'Odpovědnost', p: ['Obsah webu pravidelně aktualizujeme a dbáme na jeho správnost, nemůžeme však zaručit jeho úplnost a bezchybnost ani nepřetržitou dostupnost webu.'] },
        { h: 'Osobní údaje', p: ['Informace o zpracování osobních údajů najdete na stránce Ochrana osobních údajů.'], link: { href: '/ochrana-osobnich-udaju', label: 'Ochrana osobních údajů' } },
        { h: 'Rozhodné právo', p: ['Tyto podmínky se řídí právním řádem České republiky. Provozovatel si vyhrazuje právo podmínky kdykoli změnit; platí vždy verze zveřejněná na tomto webu.'] },
      ],
    },
  },

  en: {
    updated: 'Effective from',
    contents: 'Contents',
    privacy: {
      eyebrow: 'Legal information',
      title: 'Privacy *policy.*',
      intro: 'We value your trust. This page explains what personal data we process when you use our website, why, for how long, and what your rights are.',
      sections: [
        { h: 'Who processes your data', p: [
          'The data controller is {legalName}, company ID {ico}, registered office {address} ("AK Interiors" or "we").',
          'For any privacy matters, contact us at {privacyEmail}.',
        ] },
        { h: 'What data we process', list: [
          'Private client enquiry: full name, phone, email, city / project location, what you are interested in, project stage and timing, your message and any files you attach (e.g. photos of the space or a floor plan).',
          'B2B enquiry: company name, contact person, phone, email, company type and project information (type, location, scope, timing, description) including attached documents and links.',
          'Newsletter: email address.',
          'Communication: information you share with us by email or phone in connection with your enquiry or project.',
          'Technical data: when you submit a form we temporarily process your IP address and the time taken to fill it in, to prevent abuse and spam.',
        ] },
        { h: 'Why and on what legal basis', list: [
          'Handling your enquiry and preparing a quotation – steps taken at your request before entering into a contract (Art. 6(1)(b) GDPR).',
          'Performing a contract if you become our customer (Art. 6(1)(b) GDPR) and meeting legal obligations such as accounting and tax (Art. 6(1)(c) GDPR).',
          'Sending the newsletter – your consent, which you can withdraw at any time (Art. 6(1)(a) GDPR).',
          'Protecting the website against abuse – our legitimate interest (Art. 6(1)(f) GDPR).',
        ] },
        { h: 'How long we keep data', list: [
          'Enquiries that do not lead to a project, including attached files: up to 3 years from the last communication.',
          'Project-related data: for the duration of the contract and then for the period required by law (e.g. accounting records for 10 years).',
          'Newsletter: until you withdraw consent or unsubscribe.',
          'Technical anti-abuse data: a few hours.',
        ] },
        { h: 'Who has access to the data', p: [
          'We do not pass your data to third parties for marketing. It is handled only by our staff and by processors who run our technical operations: the website host, the email service provider and, where used, a newsletter service. We have data processing agreements with these processors.',
          'We do not transfer data outside the European Union unless necessary, and then only with appropriate safeguards under the GDPR.',
        ] },
        { h: 'Cookies and browser storage', p: [
          'This website does not use analytics or marketing cookies. We only store the chosen site language (CZ/EN) in your browser, which is necessary for the site to work and does not require consent.',
          'If we start using measurement or marketing tools in the future, we will ask for your consent first.',
        ] },
        { h: 'Your rights', list: [
          'The right of access to the data we process about you.',
          'The right to rectification of inaccurate data.',
          'The right to erasure ("to be forgotten") where we have no legal reason to keep it.',
          'The right to restriction of processing and the right to data portability.',
          'The right to object to processing based on legitimate interest.',
          'The right to withdraw consent at any time (e.g. by unsubscribing) – this does not affect processing before withdrawal.',
          'The right to lodge a complaint with the Czech Office for Personal Data Protection (www.uoou.cz).',
        ], after: 'You can exercise your rights by email at {privacyEmail}. We will reply without undue delay and within one month at the latest.' },
      ],
    },
    terms: {
      eyebrow: 'Legal information',
      title: 'Terms *of use.*',
      intro: 'These terms govern the use of the AK Interiors website. By using the website you agree to them.',
      sections: [
        { h: 'Operator', p: ['The website is operated by {legalName}, company ID {ico}, registered office {address}. Managing directors: {directors}.'] },
        { h: 'Informational content', p: [
          'The content of this website is for information only and does not constitute an offer to enter into a contract. The scope, price and timing of any project are always subject to an individual quotation and contract.',
          'Submitting the enquiry form does not create a contract or any obligation to order.',
        ] },
        { h: 'Photos and visualisations', p: [
          'Some images on this website are illustrative visualisations showing the character of our services. They are not photos of specific completed projects unless explicitly stated. Real projects are presented in the Projects section.',
          'Colours and surfaces may look different on different screens.',
        ] },
        { h: 'Copyright', p: ['Texts, photos, graphics, the logo and other content are protected by copyright. They may not be copied, distributed or used for anything other than personal purposes without our prior written consent.'] },
        { h: 'Links to other websites', p: ['The website may contain links to third-party sites (e.g. social networks). We are not responsible for their content or how they process data.'] },
        { h: 'Liability', p: ['We update the content regularly and take care that it is correct, but we cannot guarantee that it is complete and error-free or that the website is always available.'] },
        { h: 'Personal data', p: ['Information about how we process personal data is on the Privacy policy page.'], link: { href: '/ochrana-osobnich-udaju', label: 'Privacy policy' } },
        { h: 'Governing law', p: ['These terms are governed by the laws of the Czech Republic. The operator may change the terms at any time; the version published on this website applies.'] },
      ],
    },
  },
}

// German: MASTER DE 1.0 supplied only the link labels, not the policy texts (they must not be published unfinished).
// The German pages therefore show German headings and a short note, followed by the complete Czech text (lang="cs").
// TODO (client): replace with a reviewed German translation when available.
legalContent.de = {
  updated: 'Gültig ab',
  contents: 'Inhalt',
  bodyLang: 'cs',
  privacy: {
    eyebrow: 'Rechtliche Hinweise',
    title: 'Datenschutz*hinweise.*',
    intro: 'Die deutsche Fassung dieser Hinweise wird derzeit vorbereitet. Nachfolgend finden Sie den vollständigen Text in tschechischer Sprache.',
    sections: legalContent.cz.privacy.sections,
  },
  terms: {
    eyebrow: 'Rechtliche Hinweise',
    title: 'Nutzungs*bedingungen.*',
    intro: 'Die deutsche Fassung der Nutzungsbedingungen wird derzeit vorbereitet. Nachfolgend finden Sie den vollständigen Text in tschechischer Sprache.',
    sections: legalContent.cz.terms.sections,
  },
}
