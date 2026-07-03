import type { TBBilarEntity, Locale } from "@/types/entity";
import { t } from "@/i18n";

type Props = { entity: TBBilarEntity; locale: Locale };

export function Header({ entity, locale }: Props) {
  const s = t(locale);
  const phone = entity.mainPhone;
  const otherLocale: Locale = locale === "is" ? "en" : "is";
  const otherLocaleHref = otherLocale === "is" ? "/" : `/${otherLocale}`;
  const selfHref = locale === "is" ? "/" : `/${locale}`;
  const logoUrl = entity.logo?.image?.url;
  const tagline = entity.c_tagline;

  return (
    <header className="border-b border-rule bg-paper/90 backdrop-blur sticky top-0 z-30">
      <div className="container-page flex items-center justify-between gap-4 py-4">
        <a href={selfHref} className="flex items-center gap-3 no-underline shrink-0">
          {logoUrl && (
            <img
              src={logoUrl}
              alt={entity.name}
              width={36}
              height={36}
              className="h-9 w-9 rounded-sm object-cover"
            />
          )}
          <span className="flex flex-col leading-tight">
            <span className="font-sans font-bold text-lg text-form-heading tracking-tight2">{entity.name}</span>
            {tagline && (
              <span className="hidden lg:inline text-xs text-muted">{tagline}</span>
            )}
          </span>
        </a>
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-sm">
          <a href="#inventory" className="no-underline hover:text-accent">{s.nav.inventory}</a>
          <a href="#services" className="no-underline hover:text-accent">{s.nav.services}</a>
          <a href="#about" className="no-underline hover:text-accent">{s.nav.about}</a>
          <a href="#contact" className="no-underline hover:text-accent">{s.nav.contact}</a>
          <a href="#inventory" className="btn-primary !py-2 !px-4 text-xs">
            {s.nav.seeInventory}
          </a>
          <a href={otherLocaleHref} aria-label={s.nav.langSwitchLabel} className="text-muted no-underline hover:text-ink">
            {s.nav.langSwitch}
          </a>
        </nav>
        {phone && (
          <a href={`tel:${phone}`} className="md:hidden btn-primary !px-4 !py-2 text-xs">
            {s.nav.contact}
          </a>
        )}
      </div>
    </header>
  );
}
