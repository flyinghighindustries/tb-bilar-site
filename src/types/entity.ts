export type Locale = "is" | "en";

export type YextImageRef = {
  url: string;
  width?: number;
  height?: number;
  alternateText?: string;
};
export type YextImage = { image: YextImageRef };

export type Address = {
  line1?: string;
  line2?: string;
  city?: string;
  region?: string;
  postalCode?: string;
  countryCode?: string;
};

export type HoursInterval = { start: string; end: string };
export type HoursDay = { openIntervals?: HoursInterval[]; isClosed?: boolean };
export type Hours = {
  monday?: HoursDay;
  tuesday?: HoursDay;
  wednesday?: HoursDay;
  thursday?: HoursDay;
  friday?: HoursDay;
  saturday?: HoursDay;
  sunday?: HoursDay;
};

/**
 * Shape of the TB Bílar `location` entity once the Yext stream resolves.
 * Parallel-list fields (vehicles, process steps, delivery timeframes,
 * why-us items) are zipped at render time.
 */
export type TBBilarEntity = {
  id: string;
  name: string;
  slug?: string;

  address?: Address;
  mainPhone?: string;
  emails: string[];
  hours?: Hours;
  description?: string;
  websiteUrl?: { url?: string; displayUrl?: string };

  services?: string[];
  photoGallery?: YextImage[];
  logo?: YextImage;
  yearEstablished?: number;
  facebookPageUrl?: string;
  instagramHandle?: string;

  c_tagline?: string;
  c_heroEyebrow?: string;
  c_heroSubheadline?: string;
  c_heroImage?: YextImage;

  c_inventoryIntro?: string;
  c_vehicleMakes?: string[];
  c_vehicleModels?: string[];
  c_vehicleStatuses?: string[];
  c_vehiclePrices?: string[];
  c_vehicleImages?: YextImage[];
  c_vehicleUrls?: string[];
  c_inventoryExternalUrl?: string;

  c_servicesIntro?: string;
  c_serviceBodies?: string[];

  c_processStepTitles?: string[];
  c_processStepBodies?: string[];

  c_deliveryRegions?: string[];
  c_deliveryTimeframes?: string[];
  c_deliveryNote?: string;

  c_aboutHeading?: string;
  c_aboutSubheading?: string;
  c_aboutBody?: string;
  c_aboutImage?: YextImage;
  c_whyItems?: string[];

  c_mapEmbedUrl?: string;

  c_formHeading?: string;
  c_formIntro?: string;
  c_formInterestOptions?: string[];

  c_ctaHeadline?: string;
  c_ctaBody?: string;

  c_favicon?: YextImage;
  c_ogImage?: YextImage;

  c_privacyPolicyContent?: string;
  c_cookiesContent?: string;

  meta: { locale: Locale };
};

export function zipParallel<T extends Record<string, readonly unknown[]>>(
  columns: T,
): Array<{ [K in keyof T]: T[K][number] }> {
  const keys = Object.keys(columns) as Array<keyof T>;
  const length = Math.max(...keys.map((k) => columns[k]?.length ?? 0));
  return Array.from({ length }, (_, i) => {
    const row = {} as { [K in keyof T]: T[K][number] };
    for (const k of keys) row[k] = columns[k]?.[i];
    return row;
  });
}
