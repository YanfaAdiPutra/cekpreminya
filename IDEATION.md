# Cek Preminya — Website Ideation

Agent-branded lead-generation website for an independent MSIG Life insurance agent
in Indonesia, built to extend the reach of the existing Instagram account
[@cekpreminya](https://www.instagram.com/cekpreminya/) into organic Google search.

---

## 1. Business context (research summary)

**@cekpreminya** (Instagram)

- Display name: "Cek Preminya MSIG LIFE"
- Bio: "🏆 Premi Hemat / 🏆 Pelayanan Juara / 👍🏻 Fast Response / Managed by @kharisnantyo"
- ~191 followers — small organic reach, no link-in-bio tool, WhatsApp is the only CTA
- Content: product info, premium simulations, claims updates, testimonials, recruitment posts

**MSIG Life Indonesia** (formerly Sinarmas MSIG Life)

- Part of MS&AD Insurance Group; a new sharia entity (MSIG Sharia Life Insurance
  Indonesia) received its OJK license July 2026
- Product lines relevant to this site:
  - **Smile Wealth Protection (SMART)** — life/wealth protection
  - **Smile Critical Ultima Care (SECURE)** — critical illness
  - **Eka Sehat** / Hospital Cash Plan — health insurance (reimbursement & cashless)
  - **Smile Plan Maxima Syariah** / Eka Link family — sharia unit-link
  - Standard unit-link — protection + investment + riders
  - **VEGA** app — policy self-service for existing customers
- Corporate tagline: "Temukan Kebutuhanmu di Sini"

**Competitive landscape:** cekpremi.com, Cermati Protect, Roojai, Asuransiku.id,
Insureka already rank for generic "cek premi asuransi" terms, but they are
multi-company aggregators. No single-agent MSIG Life site currently competes on
long-tail, trust-driven, WhatsApp-funnel search terms — that's the gap.

**Positioning:** an independent authorized MSIG Life agent site (not the
corporate msig.co.id), same disclosure pattern the Instagram already uses.

---

## 2. Contact & social (confirmed, to use verbatim on the site)

- WhatsApp CTA: **https://wa.me/6281188881419**
- Instagram: **https://www.instagram.com/cekpreminya/**
- Agent handle: **@kharisnantyo**
- No existing link-in-bio/website — this site becomes that hub.

---

## 3. Site structure

| Route                        | Purpose                                                                                                                    | Primary keyword target             |
| ---------------------------- | -------------------------------------------------------------------------------------------------------------------------- | ---------------------------------- |
| `/`                          | Hero + tagline, product overview, testimonials, IG feed embed, sticky WA button                                            | "agen asuransi MSIG Life [kota]"   |
| `/cek-premi`                 | Premium **estimator** (age, gender, coverage need, product type) → shows an illustrative range → captures name + WA number | "cek premi asuransi MSIG"          |
| `/produk/asuransi-jiwa`      | Smile Wealth Protection (SMART)                                                                                            | "asuransi jiwa MSIG"               |
| `/produk/asuransi-kesehatan` | Eka Sehat, Hospital Cash Plan                                                                                              | "asuransi kesehatan MSIG cashless" |
| `/produk/asuransi-kritis`    | Smile Critical Ultima Care (SECURE)                                                                                        | "asuransi penyakit kritis MSIG"    |
| `/produk/unit-link-syariah`  | Eka Link / Smile Plan Maxima Syariah                                                                                       | "unit link syariah MSIG"           |
| `/artikel/[slug]`            | SEO blog (claim guides, comparisons, tips)                                                                                 | long-tail informational queries    |
| `/tentang`                   | Agent bio, credentials, why-trust-me                                                                                       | "agen asuransi terpercaya"         |
| `/faq`                       | Common objections/questions                                                                                                | —                                  |
| `/kontak`                    | WhatsApp + Instagram links, contact form                                                                                   | —                                  |

### `/cek-premi` estimator logic

MSIG doesn't expose a public rate API, so the tool is deliberately **illustrative,
not exact**:

1. Form inputs: usia, jenis kelamin, jenis produk, kebutuhan uang pertanggungan
2. A simple heuristic (age bracket × coverage tier × product type) returns a
   broad range, e.g. "Rp 300rb–600rb/bulan"
3. Clear disclaimer: "Estimasi kasar, bukan penawaran resmi"
4. Submit → prefilled `wa.me` deep link with the lead's inputs, so the agent
   gets full context on WhatsApp and confirms the exact quote personally

---

## 4. SEO strategy

- Metadata + OpenGraph per page, `sitemap.xml`, `robots.txt`
- JSON-LD: `InsuranceAgency`/`LocalBusiness`, `FAQPage`, `Article` (blog posts)
- Local SEO via Google Business Profile if the agent serves a specific city
- Mobile-first, Core Web Vitals focus (most IG → web traffic is mobile)
- Internal linking: blog → product pages → `/cek-premi`
- Every page cross-links to Instagram to reinforce E-E-A-T (real person, active
  social presence) — the site and the IG account are meant to reinforce each other

---

## 5. Visual direction — chosen stock imagery

All sourced from Pexels (free for commercial use, no attribution required).
Picked to match Indonesian-family / trust / consultation themes per section.

| Section                               | Image                                           | Source page                                                                           |
| ------------------------------------- | ----------------------------------------------- | ------------------------------------------------------------------------------------- |
| Home hero                             | Happy family posing together outdoors           | https://www.pexels.com/photo/happy-family-posing-together-outdoors-29857984/          |
| `/produk/asuransi-kesehatan`          | Doctor consulting a patient                     | https://www.pexels.com/photo/doctor-consulting-a-patient-7659873/                     |
| `/produk/asuransi-jiwa` or `/tentang` | Insurance agent sitting next to smiling clients | https://www.pexels.com/photo/insurance-agent-sitting-next-to-smiling-clients-8441861/ |
| `/produk/unit-link-syariah`           | Couple reviewing bills/finances together        | https://www.pexels.com/photo/couple-looking-at-their-bills-6964105/                   |
| `/produk/asuransi-kritis`             | Elderly man consulting an insurance agent       | https://www.pexels.com/photo/an-elderly-man-consulting-an-insurance-agent-8441780/    |

Direct CDN pattern (verified reachable, HTTP 200):
`https://images.pexels.com/photos/{id}/pexels-photo-{id}.jpeg?auto=compress&cs=tinysrgb&w=1600`

---

## 6. Tech stack (decided)

- **Next.js** (App Router) + TypeScript + Tailwind CSS
- Static generation for product/blog pages (best SEO), one API route for the
  premium-estimate form → WhatsApp deep link
- Deploy target: Vercel

---

## 7. Compliance notes

- Present clearly as an **independent authorized MSIG Life agent**, not the
  official corporate MSIG site — same disclosure the Instagram already carries
- Check MSIG's agent/partner brand-use guidelines before using their logo
- `/cek-premi` results must be labeled as estimates, never as binding quotes

---

## 8. Open decisions for next phase (build)

- Final domain name
- Where leads get stored (just WA deep-link vs. also a spreadsheet/DB)
- Specific city/region for local SEO + testimonials to feature
- Whether to embed a live Instagram feed widget or a static curated grid
