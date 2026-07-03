import type { TBBilarEntity, Locale } from "@/types/entity";

const SITE_DOMAIN = "https://bilsk.is";

export function canonicalUrl(locale: Locale): string {
  return locale === "is" ? `${SITE_DOMAIN}/` : `${SITE_DOMAIN}/${locale}`;
}

/** schema.org AutoDealer JSON-LD for Bílskúrinn Bílasala. */
export function autoDealerSchema(entity: TBBilarEntity, locale: Locale) {
  const phone = entity.mainPhone;
  const email = entity.emails?.[0];
  const heroUrl = entity.c_heroImage?.image?.url ?? entity.logo?.image?.url;

  const openingHoursSpec = hoursToSpec(entity);
  const sameAs = [
    entity.websiteUrl?.url,
    entity.facebookPageUrl,
    entity.instagramHandle ? `https://www.instagram.com/${entity.instagramHandle}` : null,
  ].filter(Boolean);

  return {
    "@context": "https://schema.org",
    "@type": "AutoDealer",
    name: entity.name,
    description: entity.c_heroSubheadline ?? entity.description,
    url: canonicalUrl(locale),
    image: heroUrl,
    logo: entity.logo?.image?.url,
    telephone: phone,
    email: email ? `mailto:${email}` : undefined,
    foundingDate: entity.yearEstablished ? String(entity.yearEstablished) : undefined,
    address: entity.address
      ? {
          "@type": "PostalAddress",
          streetAddress: entity.address.line1,
          addressLocality: entity.address.city,
          postalCode: entity.address.postalCode,
          addressCountry: entity.address.countryCode ?? "IS",
        }
      : undefined,
    openingHoursSpecification: openingHoursSpec.length ? openingHoursSpec : undefined,
    areaServed: { "@type": "Country", name: "Iceland" },
    knowsAbout: entity.services ?? [],
    sameAs: sameAs.length ? sameAs : undefined,
  };
}

export function websiteSchema(entity: TBBilarEntity) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: entity.name,
    url: SITE_DOMAIN,
    inLanguage: ["is", "en"],
  };
}

const DAY_NAME_TO_SCHEMA: Record<string, string> = {
  monday: "Monday",
  tuesday: "Tuesday",
  wednesday: "Wednesday",
  thursday: "Thursday",
  friday: "Friday",
  saturday: "Saturday",
  sunday: "Sunday",
};

function hoursToSpec(entity: TBBilarEntity) {
  if (!entity.hours) return [];
  const out: Array<Record<string, unknown>> = [];
  for (const [day, value] of Object.entries(entity.hours)) {
    if (!value || value.isClosed || !value.openIntervals?.length) continue;
    const schemaDay = DAY_NAME_TO_SCHEMA[day];
    if (!schemaDay) continue;
    for (const interval of value.openIntervals) {
      out.push({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: schemaDay,
        opens: interval.start,
        closes: interval.end,
      });
    }
  }
  return out;
}

export function allSchemas(entity: TBBilarEntity, locale: Locale) {
  return [autoDealerSchema(entity, locale), websiteSchema(entity)];
}
