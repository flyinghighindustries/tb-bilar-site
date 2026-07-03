import type { TBBilarEntity, Locale } from "@/types/entity";
import { zipParallel } from "@/types/entity";
import { t } from "@/i18n";

type Props = { entity: TBBilarEntity; locale: Locale };

export function Process({ entity, locale }: Props) {
  const s = t(locale);
  const steps = zipParallel({
    title: entity.c_processStepTitles ?? [],
    body: entity.c_processStepBodies ?? [],
  });
  if (steps.length === 0) return null;

  return (
    <section className="bg-paper py-20 md:py-28">
      <div className="container-page">
        <h2 className="font-sans font-bold text-3xl md:text-4xl text-form-heading tracking-tight2 text-center mb-14 md:mb-16">
          {s.process.heading}
        </h2>
        <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {steps.map((step, i) => (
            <li
              key={step.title}
              className="relative bg-white rounded-2xl p-7 shadow-[0_1px_2px_rgba(15,23,42,0.04),_0_4px_12px_rgba(15,23,42,0.04)]"
            >
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-accent text-white font-sans font-bold mb-5">
                {String(i + 1).padStart(2, "0")}
              </div>
              <h3 className="font-sans font-bold text-lg text-form-heading mb-3">
                {step.title}
              </h3>
              {step.body && (
                <p className="text-muted text-sm leading-relaxed whitespace-pre-line">
                  {step.body}
                </p>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
