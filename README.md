# tb-bilar-site

Yext Pages (PagesJS) site for **Bílskúrinn Bílasala** (TB Bílar) — Icelandic
car dealer and vehicle importer.

Companion config repo: [`tb-bilar-config`](https://github.com/flyinghighindustries/tb-bilar-config)
defines the 33 custom fields the site reads from the Knowledge Graph.

## Stack

- **Yext Pages** (`@yext/pages`) — SSG pipeline + stream → template binding
- React 18 + Vite 5
- TypeScript (path alias `@/* → src/*`)
- Tailwind CSS 3
- Node 18 (pinned via `.nvmrc`)

## Entity

Reads location entity **`tb-bilar`** in Yext account **`4764563`**.

- Primary locale: **`is`** (Icelandic) → served at `/index.html`
- Alternate locale: **`en`** → URL `/en`

## Required env vars

Set under Yext → Pages → Sites → (this site) → Site Settings:

| Variable                              | Value                       |
| ------------------------------------- | --------------------------- |
| `YEXT_PUBLIC_LOCATION_ENTITY_ID`      | `tb-bilar`                  |
| `YEXT_PUBLIC_LOCATION_LOCALE_CODE`    | `is,en`                     |
| `YEXT_PUBLIC_EVENTS_API_KEY`          | (optional — Yext Events)    |

Without `YEXT_PUBLIC_EVENTS_API_KEY` the site builds and serves fine;
analytics just doesn't fire.

## Local dev

```bash
nvm use            # picks Node 18 from .nvmrc
npm install
npm run dev        # pages dev — pulls live data from Yext entity
```

## Build

```bash
npm run build      # pages build — produces dist/
```

## File layout

```
src/
├── templates/location.tsx         # entry — stream config + getPath + getHeadConfig + LocationTemplate
├── components/
│   ├── Header.tsx
│   ├── Hero.tsx                   # navy #1E3A5F full-bleed hero
│   ├── Inventory.tsx              # 3-column featured vehicles grid (parallel lists)
│   ├── Services.tsx               # 2 services with icons (Bílasala + Innflutningur)
│   ├── Process.tsx                # 4-step numbered import process
│   ├── Delivery.tsx               # delivery-timeframe table + note
│   ├── About.tsx                  # heading + subheading + body + why-us bullets
│   ├── Info.tsx                   # address + hours + map iframe
│   ├── ContactForm.tsx            # Formcarry-backed form with Interest dropdown
│   ├── CTA.tsx                    # navy CTA banner
│   ├── Footer.tsx
│   ├── CookieBanner.tsx           # GDPR consent — Accept/Reject equal weight
│   └── PolicyDialog.tsx
├── hooks/useConsent.ts
├── i18n/{index,is,en}.ts
├── lib/schema.ts                  # AutoDealer + WebSite JSON-LD
├── types/entity.ts                # TBBilarEntity + zipParallel
└── index.css
```

## Contact form backend

Submissions POST to `https://formcarry.com/s/9ryZCgg6pym` (Formcarry).
The endpoint is hardcoded in `src/components/ContactForm.tsx`. Change it
there if you rotate the form.
