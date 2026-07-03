import type { Strings } from "./is";

export const en: Strings = {
  nav: {
    inventory: "Cars for sale",
    services: "Services",
    about: "About",
    contact: "Contact",
    seeInventory: "See cars",
    langSwitch: "IS",
    langSwitchLabel: "Íslenska",
  },
  hero: {
    primaryCta: "See cars",
    secondaryCta: "Get in touch",
  },
  inventory: {
    heading: "Cars for sale",
    fallbackIntro: "Take a look at our selection of new and used cars.",
    priceCta: "Get price",
    externalCta: "See all listings on bilasolur.is",
  },
  services: {
    heading: "Our services",
  },
  process: {
    heading: "The process",
  },
  delivery: {
    heading: "Delivery time",
    regionColumn: "Region",
    timeframeColumn: "Estimated time",
  },
  about: {
    heading: "About us",
    fallbackSubheading: "Trust, professionalism, and good service",
    whyHeading: "Why Bílskúrinn?",
  },
  info: {
    heading: "Visit us",
    addressLabel: "Address",
    phoneLabel: "Phone",
    emailLabel: "Email",
    hoursLabel: "Hours",
    mapAriaLabel: "Map showing the Bílskúrinn location",
  },
  form: {
    fields: {
      firstName: { label: "First name", placeholder: "Your first name" },
      lastName: { label: "Last name", placeholder: "Your last name" },
      email: { label: "Email", placeholder: "you@example.com" },
      phone: { label: "Phone", placeholder: "+354 896 6310" },
      interest: { label: "Interest", placeholder: "Select an interest" },
      message: { label: "Message", placeholder: "Tell us what you're looking for..." },
    },
    requiredMark: "*",
    submit: "Send message",
    submitting: "Sending...",
    successHeading: "Thanks!",
    successBody: "Your message has been sent. We'll get back to you as soon as possible.",
    errorHeading: "Something went wrong",
    errorBody:
      "Sorry, we couldn't send your message. Please try again or call us directly.",
    errorRetry: "Try again",
    fallbackHeading: "Get in touch",
    fallbackIntro:
      "Send us a message and we'll get back to you as soon as possible.",
  },
  cta: {
    primary: "Email us",
    or: "or",
    call: "Call",
  },
  footer: {
    rights: "All rights reserved.",
    builtOn: "Site built on Yext Pages.",
    privacyLink: "Privacy",
    cookieSettings: "Cookie settings",
  },
  hours: {
    monday: "Monday",
    tuesday: "Tuesday",
    wednesday: "Wednesday",
    thursday: "Thursday",
    friday: "Friday",
    saturday: "Saturday",
    sunday: "Sunday",
    closed: "Closed",
  },
  cookie: {
    heading: "Cookies on this site",
    body: "We use first-party analytics cookies to understand how the site is used. No third-party tracking. You can reject without affecting how the site works.",
    learnMore: "Read the full policy",
    accept: "Accept",
    reject: "Reject",
  },
  policy: {
    heading: "Privacy & cookies",
    tabsAriaLabel: "Policy sections",
    privacyTab: "Privacy",
    cookiesTab: "Cookies",
    close: "Close",
    privacyFallback:
      "Privacy policy content has not been populated yet. Edit the c_privacyPolicyContent field in Yext.",
    cookiesFallback:
      "Cookie policy content has not been populated yet. Edit the c_cookiesContent field in Yext.",
  },
};
