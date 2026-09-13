# Cek Preminya

Landing page SEO untuk agen resmi MSIG Life ([@cekpreminya](https://www.instagram.com/cekpreminya/)) — cek estimasi premi, info produk, dan konsultasi lewat WhatsApp.

See [`IDEATION.md`](./IDEATION.md) for the full concept/strategy behind this site.
The current interactive implementation, event hooks, validation rules, and remaining owner inputs are documented in [`ENGAGEMENT.md`](./ENGAGEMENT.md).

## Stack

Next.js (App Router) + TypeScript + Tailwind CSS, built as a fully static export for GitHub Pages.

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Building

```bash
npm run build       # local/Vercel build, no basePath
npm run build:gh    # static export for GitHub Pages, output in ./out with /cekpreminya basePath
npm run preview     # preview the export at http://127.0.0.1:4173/cekpreminya/
npm run test:e2e    # build and test desktop/mobile journeys in installed Google Chrome
```

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds the static export and publishes it to GitHub Pages at:

https://yanfaadiputra.github.io/cekpreminya/

(Enable Pages once, under repo Settings → Pages → Source → GitHub Actions.)
