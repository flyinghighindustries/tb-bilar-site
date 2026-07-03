import type { TBBilarEntity, Locale } from "@/types/entity";
import { t } from "@/i18n";

type Props = { entity: TBBilarEntity; locale: Locale };

export function About({ entity, locale }: Props) {
  const s = t(locale);
  const body = entity.c_aboutBody ?? entity.description ?? "";
  const subheading = entity.c_aboutSubheading ?? s.about.fallbackSubheading;
  const image = entity.c_aboutImage?.image ?? entity.photoGallery?.[1]?.image;
  const whyItems = entity.c_whyItems ?? [];

  if (!body && whyItems.length === 0 && !image?.url) return null;

  return (
    <section id="about" className="bg-paper py-20 md:py-28">
      <div className="container-page">
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <h2 className="font-sans font-bold text-3xl md:text-4xl text-form-heading tracking-tight2 mb-3">
            {entity.c_aboutHeading ?? s.about.heading}
          </h2>
          {subheading && (
            <p className="text-accent text-base md:text-lg font-semibold">
              {subheading}
            </p>
          )}
        </div>

        <div className="grid md:grid-cols-12 gap-10 md:gap-14 items-start">
          <div className="md:col-span-7">
            {body && (
              <div className="prose-none text-base md:text-lg text-muted leading-relaxed max-w-prose mb-8 whitespace-pre-line">
                {body}
              </div>
            )}

            {whyItems.length > 0 && (
              <div className="mt-4">
                <h3 className="font-sans font-bold text-xl md:text-2xl text-form-heading tracking-tight2 mb-5">
                  {s.about.whyHeading}
                </h3>
                <ul className="space-y-3">
                  {whyItems.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-base md:text-[17px] text-form-heading"
                    >
                      <span
                        aria-hidden
                        className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-accent-soft text-accent shrink-0"
                      >
                        <svg viewBox="0 0 20 20" className="h-3 w-3" fill="none" aria-hidden>
                          <path d="M4 10l4 4 8-8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {image?.url && (
            <div className="md:col-span-5">
              <div className="aspect-[4/5] w-full overflow-hidden rounded-2xl bg-rule">
                <img
                  src={image.url}
                  alt={image.alternateText ?? entity.name}
                  width={image.width}
                  height={image.height}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
