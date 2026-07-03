import type { TBBilarEntity, Locale } from "@/types/entity";
import { zipParallel } from "@/types/entity";
import { t } from "@/i18n";

type Props = { entity: TBBilarEntity; locale: Locale };
type IconProps = { className?: string };

/** Pick an icon based on the service title keyword. */
function pickIcon(title: string): (p: IconProps) => JSX.Element {
  const s = title.toLowerCase();
  if (s.includes("innflutning") || s.includes("import") || s.includes("pöntun") || s.includes("custom")) return GlobeIcon;
  if (s.includes("bílasala") || s.includes("dealer") || s.includes("sale")) return CarIcon;
  if (s.includes("service") || s.includes("þjónusta")) return WrenchIcon;
  return CarIcon;
}

const STROKE = {
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  fill: "none",
};

function CarIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path {...STROKE} d="M5 17V13l2-5h10l2 5v4" />
      <path {...STROKE} d="M3 17h18v3H3z" />
      <circle {...STROKE} cx="7.5" cy="17" r="1.5" />
      <circle {...STROKE} cx="16.5" cy="17" r="1.5" />
      <path {...STROKE} d="M7 13h10" />
    </svg>
  );
}
function GlobeIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <circle {...STROKE} cx="12" cy="12" r="9" />
      <path {...STROKE} d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" />
    </svg>
  );
}
function WrenchIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path {...STROKE} d="M14.7 6.3a4 4 0 0 1 5.65 5.65l-1.41-1.42a2 2 0 1 0-2.82-2.82zM4 20l9-9 1 1-9 9zM12 12l2 2" />
    </svg>
  );
}

export function Services({ entity, locale }: Props) {
  const s = t(locale);

  const items = zipParallel({
    title: entity.services ?? [],
    body: entity.c_serviceBodies ?? [],
  });
  if (items.length === 0) return null;

  return (
    <section id="services" className="bg-form-bg py-20 md:py-28">
      <div className="container-page">
        <div className="text-center max-w-2xl mx-auto mb-14 md:mb-16">
          <h2 className="font-sans font-bold text-3xl md:text-4xl text-form-heading tracking-tight2 mb-4">
            {s.services.heading}
          </h2>
          {entity.c_servicesIntro && (
            <p className="text-muted text-base md:text-lg whitespace-pre-line">
              {entity.c_servicesIntro}
            </p>
          )}
        </div>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-7 max-w-4xl mx-auto">
          {items.map((svc) => {
            const Icon = pickIcon(svc.title);
            return (
              <li
                key={svc.title}
                className="bg-white rounded-2xl p-8 md:p-10 shadow-[0_1px_2px_rgba(15,23,42,0.04),_0_4px_12px_rgba(15,23,42,0.04)]"
              >
                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-accent-soft text-accent">
                  <Icon />
                </div>
                <h3 className="font-sans font-bold text-lg md:text-xl text-form-heading mb-3">
                  {svc.title}
                </h3>
                {svc.body && (
                  <p className="text-muted leading-relaxed text-sm md:text-[15px] whitespace-pre-line">
                    {svc.body}
                  </p>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
