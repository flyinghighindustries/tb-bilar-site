import type { TBBilarEntity, Locale } from "@/types/entity";
import { zipParallel } from "@/types/entity";
import { t } from "@/i18n";

type Props = { entity: TBBilarEntity; locale: Locale };

export function Inventory({ entity, locale }: Props) {
  const s = t(locale);

  const vehicles = zipParallel({
    make: entity.c_vehicleMakes ?? [],
    model: entity.c_vehicleModels ?? [],
    status: entity.c_vehicleStatuses ?? [],
    price: entity.c_vehiclePrices ?? [],
    image: entity.c_vehicleImages ?? [],
    url: entity.c_vehicleUrls ?? [],
  });

  if (vehicles.length === 0 && !entity.c_inventoryExternalUrl) return null;

  return (
    <section id="inventory" className="bg-paper py-20 md:py-28">
      <div className="container-page">
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <h2 className="font-sans font-bold text-3xl md:text-4xl text-form-heading tracking-tight2 mb-4">
            {s.inventory.heading}
          </h2>
          <p className="text-muted text-base md:text-lg whitespace-pre-line">
            {entity.c_inventoryIntro ?? s.inventory.fallbackIntro}
          </p>
        </div>

        {vehicles.length > 0 && (
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7">
            {vehicles.map((v, i) => {
              const label = [v.make, v.model].filter(Boolean).join(" ") || `Vehicle ${i + 1}`;
              return (
                <li
                  key={label + i}
                  className="bg-white rounded-2xl overflow-hidden shadow-[0_1px_2px_rgba(15,23,42,0.04),_0_4px_12px_rgba(15,23,42,0.04)] transition-shadow hover:shadow-[0_2px_4px_rgba(15,23,42,0.06),_0_12px_24px_rgba(15,23,42,0.08)] flex flex-col"
                >
                  {v.image?.image?.url ? (
                    <div className="aspect-[16/10] bg-rule">
                      <img
                        src={v.image.image.url}
                        alt={label}
                        width={v.image.image.width}
                        height={v.image.image.height}
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  ) : (
                    <div className="aspect-[16/10] bg-accent-soft" aria-hidden />
                  )}
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <h3 className="font-sans font-bold text-lg text-form-heading">{label}</h3>
                      {v.status && (
                        <span className="shrink-0 text-xs uppercase tracking-[0.14em] font-bold text-accent bg-accent-soft rounded-md px-2.5 py-1">
                          {v.status}
                        </span>
                      )}
                    </div>
                    {v.price && (
                      <p className="text-muted text-sm mb-6">{v.price}</p>
                    )}
                    <a
                      href={v.url || "#contact"}
                      target={v.url ? "_blank" : undefined}
                      rel={v.url ? "noopener noreferrer" : undefined}
                      className="mt-auto inline-flex items-center gap-2 text-sm font-semibold no-underline text-accent hover:text-accent-dark"
                    >
                      {s.inventory.priceCta}
                      <span aria-hidden>→</span>
                    </a>
                  </div>
                </li>
              );
            })}
          </ul>
        )}

        {entity.c_inventoryExternalUrl && (
          <div className="mt-12 text-center">
            <a
              href={entity.c_inventoryExternalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm md:text-base font-bold text-accent no-underline hover:text-accent-dark"
            >
              {s.inventory.externalCta}
              <span aria-hidden>→</span>
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
