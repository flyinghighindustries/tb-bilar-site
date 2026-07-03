import type { TBBilarEntity, Locale } from "@/types/entity";
import { zipParallel } from "@/types/entity";
import { t } from "@/i18n";

type Props = { entity: TBBilarEntity; locale: Locale };

export function Delivery({ entity, locale }: Props) {
  const s = t(locale);
  const rows = zipParallel({
    region: entity.c_deliveryRegions ?? [],
    timeframe: entity.c_deliveryTimeframes ?? [],
  });
  if (rows.length === 0 && !entity.c_deliveryNote) return null;

  return (
    <section className="bg-form-bg py-20 md:py-28">
      <div className="container-page max-w-3xl">
        <h2 className="font-sans font-bold text-3xl md:text-4xl text-form-heading tracking-tight2 text-center mb-12 md:mb-14">
          {s.delivery.heading}
        </h2>

        {rows.length > 0 && (
          <div className="bg-white rounded-2xl overflow-hidden shadow-[0_1px_2px_rgba(15,23,42,0.04),_0_4px_12px_rgba(15,23,42,0.04)]">
            <table className="w-full text-left">
              <thead className="bg-accent text-white">
                <tr>
                  <th scope="col" className="px-6 py-4 text-sm font-bold uppercase tracking-[0.12em]">
                    {s.delivery.regionColumn}
                  </th>
                  <th scope="col" className="px-6 py-4 text-sm font-bold uppercase tracking-[0.12em]">
                    {s.delivery.timeframeColumn}
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r, i) => (
                  <tr
                    key={r.region + i}
                    className={i % 2 === 0 ? "bg-white" : "bg-form-bg"}
                  >
                    <td className="px-6 py-4 text-form-heading font-semibold">{r.region}</td>
                    <td className="px-6 py-4 text-muted">{r.timeframe}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {entity.c_deliveryNote && (
          <p className="mt-6 text-sm text-muted text-center whitespace-pre-line">
            {entity.c_deliveryNote}
          </p>
        )}
      </div>
    </section>
  );
}
