export const is = {
  nav: {
    inventory: "Bílar til sölu",
    services: "Þjónusta",
    about: "Um okkur",
    contact: "Hafa samband",
    seeInventory: "Skoða bíla",
    langSwitch: "EN",
    langSwitchLabel: "English",
  },
  hero: {
    primaryCta: "Skoða bíla",
    secondaryCta: "Hafa samband",
  },
  inventory: {
    heading: "Bílar til sölu",
    fallbackIntro: "Skoðaðu úrval okkar af nýjum og notuðum bílum.",
    priceCta: "Fá verð",
    externalCta: "Skoða allar skráningar á bilasolur.is",
  },
  services: {
    heading: "Þjónustan okkar",
  },
  process: {
    heading: "Ferlið",
  },
  delivery: {
    heading: "Afhendingartími",
    regionColumn: "Svæði",
    timeframeColumn: "Áætlaður tími",
  },
  about: {
    heading: "Um okkur",
    fallbackSubheading: "Traust, fagmennska og góð þjónusta",
    whyHeading: "Af hverju Bílskúrinn?",
  },
  info: {
    heading: "Heimsóttu okkur",
    addressLabel: "Heimilisfang",
    phoneLabel: "Sími",
    emailLabel: "Tölvupóstur",
    hoursLabel: "Opnunartímar",
    mapAriaLabel: "Kort sem sýnir staðsetningu Bílskúrsins",
  },
  form: {
    fields: {
      firstName: { label: "Fornafn", placeholder: "Þitt fornafn" },
      lastName: { label: "Eftirnafn", placeholder: "Þitt eftirnafn" },
      email: { label: "Netfang", placeholder: "þitt@netfang.is" },
      phone: { label: "Símanúmer", placeholder: "+354 896 6310" },
      interest: { label: "Áhugi", placeholder: "Veldu áhugasvið" },
      message: { label: "Skilaboð", placeholder: "Segðu okkur frá þínum óskum..." },
    },
    requiredMark: "*",
    submit: "Senda skilaboð",
    submitting: "Sendi...",
    successHeading: "Takk fyrir!",
    successBody:
      "Skilaboðin þín hafa borist. Við höfum samband við þig eins fljótt og auðið er.",
    errorHeading: "Eitthvað fór úrskeiðis",
    errorBody:
      "Því miður tókst okkur ekki að senda skilaboðin. Prófaðu aftur eða hringdu beint í okkur.",
    errorRetry: "Prófa aftur",
    fallbackHeading: "Hafa samband",
    fallbackIntro:
      "Sendu okkur skilaboð og við munum hafa samband við þig eins fljótt og auðið er.",
  },
  cta: {
    primary: "Sendu okkur tölvupóst",
    or: "eða",
    call: "Hringdu",
  },
  footer: {
    rights: "Öll réttindi áskilin.",
    builtOn: "Vefsíða byggð á Ja+.",
    privacyLink: "Persónuvernd",
    cookieSettings: "Vafrakökustillingar",
  },
  hours: {
    monday: "Mánudagur",
    tuesday: "Þriðjudagur",
    wednesday: "Miðvikudagur",
    thursday: "Fimmtudagur",
    friday: "Föstudagur",
    saturday: "Laugardagur",
    sunday: "Sunnudagur",
    closed: "Lokað",
  },
  cookie: {
    heading: "Vafrakökur á þessari síðu",
    body: "Við notum fyrsta-aðila greiningarvafrakökur til að skilja hvernig síðan er notuð. Engin þriðju-aðila rakning. Þú getur hafnað án þess að það hafi áhrif á virkni síðunnar.",
    learnMore: "Lesa heildarstefnu",
    accept: "Samþykkja",
    reject: "Hafna",
  },
  policy: {
    heading: "Persónuvernd og vafrakökur",
    tabsAriaLabel: "Stefnuhlutar",
    privacyTab: "Persónuvernd",
    cookiesTab: "Vafrakökur",
    close: "Loka",
    privacyFallback:
      "Persónuverndarstefna hefur ekki verið skráð. Breyttu reitnum c_privacyPolicyContent í Yext.",
    cookiesFallback:
      "Vafrakökustefna hefur ekki verið skráð. Breyttu reitnum c_cookiesContent í Yext.",
  },
};

export type Strings = typeof is;
