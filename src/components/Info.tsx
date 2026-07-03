import type { TBBilarEntity, Locale } from "@/types/entity";
import { t } from "@/i18n";

type Props = { entity: TBBilarEntity; locale: Locale };

const DAY_KEYS = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
] as const;

export function Info({ entity, locale }: Props) {
  const s = t(locale);
  const phone = entity.mainPhone;
  const email = entity.emails?.[0];
  const addr = entity.address;
  const map = entity.c_mapEmbedUrl;

  const fullAddress = addr
    ? [addr.line1, [addr.postalCode, addr.city].filter(Boolean).join(" ")]
        .filter(Boolean)
        .join(", ")
    : null;

  if (!fullAddress && !phone && !email && !entity.hours && !map) return null;

  return (
    <section className="bg-paper py-20 md:py-28">
      <div className="container-page">
        <h2 className="font-sans font-bold text-3xl md:text-4xl text-form-heading tracking-tight2 text-center mb-12 md:mb-16">
          {s.info.heading}
        </h2>

        <div className="grid gap-10 md:gap-12 md:grid-cols-12">
          <div className="md:col-span-5 space-y-8">
            {fullAddress && (
              <div>
                <p className="eyebrow mb-2">{s.info.addressLabel}</p>
                <p className="text-lg leading-relaxed">{fullAddress}</p>
              </div>
            )}

            {phone && (
              <div>
                <p className="eyebrow mb-2">{s.info.phoneLabel}</p>
                <a
                  href={`tel:${phone}`}
                  className="text-lg no-underline hover:text-accent"
                >
                  {phone}
                </a>
              </div>
            )}

            {email && (
              <div>
                <p className="eyebrow mb-2">{s.info.emailLabel}</p>
                <a
                  href={`mailto:${email}`}
                  className="text-lg no-underline hover:text-accent break-words"
                >
                  {email}
                </a>
              </div>
            )}

            {entity.hours && (
              <div>
                <p className="eyebrow mb-3">{s.info.hoursLabel}</p>
                <ul className="space-y-1">
                  {DAY_KEYS.map((day) => {
                    const value = entity.hours?.[day];
                    if (!value) return null;
                    const label = s.hours[day];
                    if (value.isClosed || !value.openIntervals?.length) {
                      return (
                        <li
                          key={day}
                          className="flex justify-between gap-3 text-base"
                        >
                          <span>{label}</span>
                          <span className="text-muted">{s.hours.closed}</span>
                        </li>
                      );
                    }
                    const interval = value.openIntervals[0];
                    return (
                      <li
                        key={day}
                        className="flex justify-between gap-3 text-base"
                      >
                        <span>{label}</span>
                        <span className="text-muted">
                          {interval.start}–{interval.end}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>

          {map && (
            <div className="md:col-span-7">
              <div className="aspect-[4/3] w-full overflow-hidden rounded-2xl bg-rule shadow-[0_1px_2px_rgba(15,23,42,0.04),_0_4px_12px_rgba(15,23,42,0.04)]">
                <iframe
                  src={map}
                  title={s.info.mapAriaLabel}
                  aria-label={s.info.mapAriaLabel}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-full w-full border-0"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
