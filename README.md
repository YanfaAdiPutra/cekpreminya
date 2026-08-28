# Cek Preminya

Landing page SEO untuk agen resmi MSIG Life ([@cekpreminya](https://www.instagram.com/cekpreminya/)) — cek estimasi premi, info produk, dan konsultasi lewat WhatsApp.

See [`IDEATION.md`](./IDEATION.md) for the full concept/strategy behind this site.

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
```

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds the static export and publishes it to GitHub Pages at:

https://yanfaadiputra.github.io/cekpreminya/

(Enable Pages once, under repo Settings → Pages → Source → GitHub Actions.)
