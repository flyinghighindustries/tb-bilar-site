import { useState } from "react";
import type { TBBilarEntity, Locale } from "@/types/entity";
import { t } from "@/i18n";
import { useConsent } from "@/hooks/useConsent";
import { PolicyDialog } from "@/components/PolicyDialog";

type Props = { entity: TBBilarEntity; locale: Locale };

export function Footer({ entity, locale }: Props) {
  const s = t(locale);
  const year = new Date().getFullYear();
  const { reset } = useConsent();
  const [policyOpen, setPolicyOpen] = useState(false);

  return (
    <>
      <footer className="border-t border-rule py-10">
        <div className="container-page flex flex-col gap-6 md:flex-row md:items-center md:justify-between text-sm text-muted">
          <div>
            <p className="font-sans font-bold text-base text-ink tracking-tight2">{entity.name}</p>
            <p className="mt-1">© {year} {entity.name}. {s.footer.rights}</p>
          </div>
          <ul className="flex flex-wrap items-center gap-6">
            <li>
              <button
                type="button"
                onClick={() => setPolicyOpen(true)}
                className="hover:text-ink underline-offset-4"
              >
                {s.footer.privacyLink}
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={reset}
                className="hover:text-ink underline-offset-4"
                aria-label={s.footer.cookieSettings}
              >
                {s.footer.cookieSettings}
              </button>
            </li>
          </ul>
        </div>
        <p className="container-page text-xs text-muted/70 mt-4">{s.footer.builtOn}</p>
      </footer>

      <PolicyDialog
        open={policyOpen}
        onClose={() => setPolicyOpen(false)}
        entity={entity}
        locale={locale}
      />
    </>
  );
}
