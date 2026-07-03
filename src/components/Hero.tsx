import type { TBBilarEntity, Locale } from "@/types/entity";
import { t } from "@/i18n";

type Props = { entity: TBBilarEntity; locale: Locale };

export function Hero({ entity, locale }: Props) {
  const s = t(locale);
  const phone = entity.mainPhone;
  const logoUrl = entity.logo?.image?.url;

  return (
    <section className="bg-accent text-white">
      <div className="container-page py-20 md:py-28 text-center">
        {logoUrl && (
          <img
            src={logoUrl}
            alt={entity.name}
            width={140}
            height={140}
            className="mx-auto mb-10 h-32 w-auto rounded-md object-cover"
            loading="eager"
          />
        )}
        <h1 className="font-sans font-bold text-3xl md:text-5xl leading-tight tracking-tight2 max-w-3xl mx-auto mb-6">
          {entity.c_tagline ?? entity.name}
        </h1>
        {entity.c_heroSubheadline && (
          <p className="text-white/90 text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-10 whitespace-pre-line">
            {entity.c_heroSubheadline}
          </p>
        )}
        <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
          {phone && (
            <a
              href={`tel:${phone}`}
              className="inline-flex items-center justify-center rounded-lg bg-white px-6 py-3.5 text-accent font-bold text-sm md:text-base no-underline transition-colors hover:bg-paper"
            >
              {s.hero.primaryCta}
            </a>
          )}
          <a
            href="#services"
            className="inline-flex items-center justify-center rounded-lg border-2 border-white bg-transparent px-6 py-3 text-white font-bold text-sm md:text-base no-underline transition-colors hover:bg-white/10"
          >
            {s.hero.secondaryCta}
          </a>
        </div>
      </div>
    </section>
  );
}
