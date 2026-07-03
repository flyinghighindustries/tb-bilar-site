import type { TBBilarEntity, Locale } from "@/types/entity";
import { t } from "@/i18n";

type Props = { entity: TBBilarEntity; locale: Locale };

export function CTA({ entity, locale }: Props) {
  const s = t(locale);
  const phone = entity.mainPhone;
  const email = entity.emails?.[0];

  if (!entity.c_ctaHeadline && !entity.c_ctaBody && !email && !phone) return null;

  return (
    <section className="bg-accent text-white py-20 md:py-24">
      <div className="container-page text-center">
        {entity.c_ctaHeadline && (
          <h2 className="font-sans font-bold text-3xl md:text-4xl tracking-tight2 mb-5 max-w-3xl mx-auto">
            {entity.c_ctaHeadline}
          </h2>
        )}
        {entity.c_ctaBody && (
          <p className="text-white/90 text-base md:text-lg max-w-2xl mx-auto mb-10 whitespace-pre-line">
            {entity.c_ctaBody}
          </p>
        )}
        <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
          {email && (
            <a
              href={`mailto:${email}`}
              className="inline-flex items-center justify-center rounded-lg bg-white px-6 py-3.5 text-accent font-bold text-sm md:text-base no-underline transition-colors hover:bg-paper"
            >
              {s.cta.primary}
            </a>
          )}
          {phone && (
            <a
              href={`tel:${phone}`}
              className="inline-flex items-center justify-center rounded-lg border-2 border-white bg-transparent px-6 py-3 text-white font-bold text-sm md:text-base no-underline transition-colors hover:bg-white/10"
            >
              {s.cta.call} {phone}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
