import "../index.css";
import type {
  GetHeadConfig,
  GetPath,
  HeadConfig,
  TemplateConfig,
  TemplateProps,
  TemplateRenderProps,
} from "@yext/pages";
import type { TBBilarEntity, Locale } from "@/types/entity";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Inventory } from "@/components/Inventory";
import { Services } from "@/components/Services";
import { Process } from "@/components/Process";
import { Delivery } from "@/components/Delivery";
import { About } from "@/components/About";
import { Info } from "@/components/Info";
import { ContactForm } from "@/components/ContactForm";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";
import { CookieBanner } from "@/components/CookieBanner";
import { AnalyticsProvider } from "@yext/pages-components";
import { allSchemas, canonicalUrl } from "@/lib/schema";

// Env vars set in Yext → Pages → Sites → Site Settings:
//   YEXT_PUBLIC_LOCATION_ENTITY_ID    "tb-bilar" (TB Bílar entity id)
//   YEXT_PUBLIC_LOCATION_LOCALE_CODE  "is,en"
//   YEXT_PUBLIC_EVENTS_API_KEY        Yext Events API key (optional)
const ENTITY_ID = process.env.YEXT_PUBLIC_LOCATION_ENTITY_ID ?? "";
const LOCALES = (process.env.YEXT_PUBLIC_LOCATION_LOCALE_CODE ?? "is,en")
  .split(",")
  .map((l) => l.trim())
  .filter(Boolean);
const EVENTS_API_KEY = process.env.YEXT_PUBLIC_EVENTS_API_KEY ?? "";

export const config: TemplateConfig = {
  name: "tb-bilar-location",
  stream: {
    $id: "tb-bilar-stream",
    filter: { entityIds: ENTITY_ID ? [ENTITY_ID] : [] },
    fields: [
      // Identity / built-in
      "id",
      "name",
      "slug",
      "address",
      "mainPhone",
      "emails",
      "hours",
      "description",
      "websiteUrl",
      "services",
      "photoGallery",
      "logo",
      "yearEstablished",
      "facebookPageUrl",
      "instagramHandle",
      // Hero
      "c_tagline",
      "c_heroEyebrow",
      "c_heroSubheadline",
      "c_heroImage",
      // Inventory
      "c_inventoryIntro",
      "c_vehicleMakes",
      "c_vehicleModels",
      "c_vehicleStatuses",
      "c_vehiclePrices",
      "c_vehicleImages",
      "c_vehicleUrls",
      "c_inventoryExternalUrl",
      // Services
      "c_servicesIntro",
      "c_serviceBodies",
      // Process
      "c_processStepTitles",
      "c_processStepBodies",
      // Delivery
      "c_deliveryRegions",
      "c_deliveryTimeframes",
      "c_deliveryNote",
      // About
      "c_aboutHeading",
      "c_aboutSubheading",
      "c_aboutBody",
      "c_aboutImage",
      "c_whyItems",
      // Contact / form / map
      "c_mapEmbedUrl",
      "c_formHeading",
      "c_formIntro",
      "c_formInterestOptions",
      // CTA
      "c_ctaHeadline",
      "c_ctaBody",
      // SEO
      "c_favicon",
      "c_ogImage",
      // Legal
      "c_privacyPolicyContent",
      "c_cookiesContent",
    ],
    localization: { locales: LOCALES, primary: false },
  },
};

export const getPath: GetPath<TemplateProps> = ({ document }) => {
  // Set slug per language profile in Yext UI:
  //   is (primary): slug "index.html" → served at /index.html (canonical root)
  //   en (alternate): slug "en" → URL /en
  if (document.slug) return document.slug;
  const locale = (document.meta?.locale ?? "is") as Locale;
  return locale === "is" ? "index" : `${locale}/${document.id}`;
};

export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = ({ document }): HeadConfig => {
  const doc = document as TemplateRenderProps["document"] & TBBilarEntity;
  const locale = (doc.meta?.locale ?? "is") as Locale;
  const tagline = doc.c_tagline ?? doc.description ?? doc.name;
  const title = `${doc.name} — ${tagline}`;
  const description = doc.c_heroSubheadline ?? doc.description ?? "";

  const ogImage =
    doc.c_ogImage?.image?.url ??
    doc.c_heroImage?.image?.url ??
    doc.photoGallery?.[0]?.image?.url ??
    doc.logo?.image?.url ??
    "";
  const faviconUrl = doc.c_favicon?.image?.url ?? doc.logo?.image?.url;

  const schemas = allSchemas(doc, locale);

  return {
    title,
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1",
    lang: locale,
    tags: [
      { type: "meta", attributes: { name: "description", content: description } },
      { type: "meta", attributes: { name: "robots", content: "index,follow" } },

      { type: "meta", attributes: { property: "og:title", content: title } },
      { type: "meta", attributes: { property: "og:description", content: description } },
      { type: "meta", attributes: { property: "og:type", content: "website" } },
      { type: "meta", attributes: { property: "og:url", content: canonicalUrl(locale) } },
      { type: "meta", attributes: { property: "og:locale", content: locale === "is" ? "is_IS" : "en_US" } },
      ...(ogImage ? [{ type: "meta" as const, attributes: { property: "og:image", content: ogImage } }] : []),

      { type: "meta", attributes: { name: "twitter:card", content: "summary_large_image" } },
      { type: "meta", attributes: { name: "twitter:title", content: title } },
      { type: "meta", attributes: { name: "twitter:description", content: description } },
      ...(ogImage ? [{ type: "meta" as const, attributes: { name: "twitter:image", content: ogImage } }] : []),

      { type: "link", attributes: { rel: "canonical", href: canonicalUrl(locale) } },
      { type: "link", attributes: { rel: "alternate", hreflang: "is", href: canonicalUrl("is") } },
      { type: "link", attributes: { rel: "alternate", hreflang: "en", href: canonicalUrl("en") } },
      { type: "link", attributes: { rel: "alternate", hreflang: "x-default", href: canonicalUrl("is") } },

      ...(faviconUrl
        ? [{ type: "link" as const, attributes: { rel: "icon", href: faviconUrl } }]
        : []),

      ...schemas.map((schema) => ({
        type: "script" as const,
        attributes: { type: "application/ld+json" },
        children: JSON.stringify(schema).replace(/</g, "\\u003c"),
      })),
    ],
  };
};

type Doc = TemplateRenderProps["document"] & TBBilarEntity;

const LocationTemplate = (props: TemplateRenderProps) => {
  const doc = props.document as Doc;
  const locale = (doc.meta?.locale ?? "is") as Locale;

  const page = (
    <div className="min-h-screen flex flex-col">
      <Header entity={doc} locale={locale} />
      <main className="flex-1">
        <Hero entity={doc} locale={locale} />
        <Inventory entity={doc} locale={locale} />
        <Services entity={doc} locale={locale} />
        <Process entity={doc} locale={locale} />
        <Delivery entity={doc} locale={locale} />
        <About entity={doc} locale={locale} />
        <Info entity={doc} locale={locale} />
        <ContactForm entity={doc} locale={locale} />
        <CTA entity={doc} locale={locale} />
      </main>
      <Footer entity={doc} locale={locale} />
      <CookieBanner entity={doc} locale={locale} />
    </div>
  );

  if (!EVENTS_API_KEY) return page;

  return (
    <AnalyticsProvider
      apiKey={EVENTS_API_KEY}
      templateData={props as never}
      currency="ISK"
      productionDomains={["bilsk.is"]}
      requireOptIn={true}
    >
      {page}
    </AnalyticsProvider>
  );
};

export default LocationTemplate;
