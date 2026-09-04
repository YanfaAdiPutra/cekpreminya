import Image from "next/image";
import { PRODUCTS, SITE, buildWaLink, withBasePath } from "@/lib/site-config";
import { ALL_FAQS } from "@/lib/faqs";
import { PremiumEstimatorForm } from "@/components/PremiumEstimatorForm";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Marquee } from "@/components/Marquee";

const TESTIMONIALS = [
  {
    name: "Rina, Jakarta",
    text: "Prosesnya cepat, dijelaskan dengan sabar sampai saya paham manfaat polisnya. Fast response beneran sesuai tagline.",
  },
  {
    name: "Budi, Tangerang",
    text: "Klaim rawat inap dibantu dari awal sampai cair. Komunikasi via WhatsApp jadi lebih mudah dipantau.",
  },
  {
    name: "Sari, Bekasi",
    text: "Konsultasi dana pensiun dijelaskan detail, tidak dipaksa buru-buru ambil keputusan.",
  },
];

const VALUE_PROPS = [
  {
    title: "Konsultasi Transparan",
    description:
      "Penjelasan manfaat, pengecualian, dan biaya disampaikan apa adanya sebelum Anda memutuskan.",
  },
  {
    title: "Pendampingan Klaim",
    description:
      "Dibantu dari pengumpulan dokumen hingga proses klaim selesai, termasuk klaim luar negeri.",
  },
  {
    title: "Respon Cepat",
    description:
      "Chat WhatsApp direspons cepat, tanpa harus antre ke kantor cabang.",
  },
];

const MARQUEE_ITEMS = [
  "PREMI HEMAT",
  "PELAYANAN JUARA",
  "FAST RESPONSE",
  "ASURANSI JIWA (WARISAN)",
  "ASURANSI KESEHATAN",
  "ASURANSI DANA PENSIUN",
  "ASURANSI TUNAI SAKIT KRITIS",
];

export default function HomePage() {
  return (
    <div>
      <section className="bg-gradient-to-b from-brand/5 to-white">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 lg:grid-cols-2 lg:py-24">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-cyan">
              Agen Resmi MSIG Life
            </p>
            <h1 className="mt-3 text-4xl font-extrabold leading-tight text-slate-900 sm:text-5xl">
              {SITE.tagline}
            </h1>
            <p className="mt-4 text-lg text-slate-600">{SITE.freedomLine}</p>
            <p className="mt-2 text-slate-600">
              Bertanya bebas dan dapatkan jawaban jujur soal asuransi jiwa
              (warisan), kesehatan, dana pensiun, dan tunai sakit kritis dari
              MSIG Life, lalu lanjutkan konsultasi langsung dengan agen resmi.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#cek-premi"
                className="group inline-flex items-center gap-3 rounded-full bg-brand py-2 pl-6 pr-2 text-sm font-semibold text-white transition-colors hover:bg-brand-dark"
              >
                Cek Estimasi Premi
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15 transition-transform group-hover:translate-x-1">
                  &rarr;
                </span>
              </a>
              <a
                href={SITE.igLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 rounded-full border border-slate-300 py-2 pl-6 pr-2 text-sm font-semibold text-slate-700 transition-colors hover:border-brand-cyan hover:text-brand-cyan"
              >
                Lihat Instagram {SITE.igHandle}
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 transition-transform group-hover:translate-x-1">
                  &rarr;
                </span>
              </a>
            </div>
          </div>
          <div className="relative h-72 w-full overflow-hidden rounded-3xl shadow-lg sm:h-96">
            <Image
              src={withBasePath("/images/hero-family.jpg")}
              alt="Keluarga yang terlindungi oleh asuransi MSIG Life"
              fill
              priority
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <Marquee items={MARQUEE_ITEMS} />

      <section
        id="produk"
        className="mx-auto max-w-6xl scroll-mt-20 px-4 py-16"
      >
        <ScrollReveal className="mb-10 text-center">
          <h2 className="text-3xl font-bold text-slate-900">
            Produk MSIG Life yang Bisa Dicek Preminya
          </h2>
          <p className="mt-2 text-slate-600">
            Empat kategori proteksi paling banyak ditanyakan pelanggan kami.
          </p>
        </ScrollReveal>
        <div className="space-y-6">
          {PRODUCTS.map((product, index) => (
            <ScrollReveal key={product.slug}>
              <div
                className={`flex flex-col gap-6 rounded-3xl border border-slate-200 p-6 sm:p-8 lg:flex-row lg:items-center ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                <div className="relative h-56 w-full shrink-0 overflow-hidden rounded-2xl lg:w-80">
                  <Image
                    src={withBasePath(`/images/${product.image}`)}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <span className="text-xs font-semibold uppercase tracking-wide text-brand-cyan">
                    {product.category}
                  </span>
                  <h3 className="mt-1 text-2xl font-bold text-slate-900">
                    {product.shortName}
                  </h3>
                  <p className="mt-2 text-slate-600">{product.description}</p>
                  <ul className="mt-4 space-y-2">
                    {product.highlights.map((highlight) => (
                      <li key={highlight} className="flex items-start gap-2">
                        <span className="mt-1 text-brand-cyan">✔</span>
                        <span className="text-sm text-slate-700">
                          {highlight}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <a
                    href={buildWaLink(
                      `Halo, saya tertarik konsultasi ${product.name} dari MSIG Life.`,
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group mt-5 inline-flex items-center gap-3 rounded-full bg-whatsapp py-2 pl-5 pr-2 text-sm font-semibold text-white transition-colors hover:bg-whatsapp-dark"
                  >
                    Konsultasi via WhatsApp
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15 transition-transform group-hover:translate-x-1">
                      &rarr;
                    </span>
                  </a>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-6xl px-4">
          <ScrollReveal className="mb-10 text-center">
            <h2 className="text-3xl font-bold text-slate-900">
              Kenapa Cek Premi di Sini
            </h2>
          </ScrollReveal>
          <div className="grid gap-6 sm:grid-cols-3">
            {VALUE_PROPS.map((value) => (
              <ScrollReveal key={value.title}>
                <div className="h-full rounded-2xl bg-white p-6 shadow-sm">
                  <h3 className="font-bold text-slate-900">{value.title}</h3>
                  <p className="mt-2 text-sm text-slate-600">
                    {value.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section id="cek-premi" className="scroll-mt-20 px-4 py-16">
        <ScrollReveal className="mb-10 text-center">
          <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
            Cek Estimasi Premi
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-slate-600">
            Isi data singkat berikut untuk melihat kisaran premi bulanan.
            Setelah itu Anda bisa langsung konfirmasi penawaran resmi lewat
            WhatsApp.
          </p>
        </ScrollReveal>
        <ScrollReveal>
          <PremiumEstimatorForm />
        </ScrollReveal>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <ScrollReveal className="mb-10 text-center">
          <h2 className="text-3xl font-bold text-slate-900">
            Kata Nasabah Kami
          </h2>
        </ScrollReveal>
        <div className="grid gap-6 sm:grid-cols-3">
          {TESTIMONIALS.map((testimonial) => (
            <ScrollReveal key={testimonial.name}>
              <blockquote className="h-full rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-sm italic text-slate-600">
                  &ldquo;{testimonial.text}&rdquo;
                </p>
                <footer className="mt-4 text-sm font-semibold text-slate-900">
                  {testimonial.name}
                </footer>
              </blockquote>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <section id="faq" className="mx-auto max-w-3xl scroll-mt-20 px-4 py-16">
        <ScrollReveal>
          <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
            Hal-Hal yang Sering Ditanyakan
          </h2>
          <p className="mt-3 text-slate-600">{SITE.freedomLine}</p>
        </ScrollReveal>
        <div className="mt-8 space-y-4">
          {ALL_FAQS.map((faq) => (
            <ScrollReveal key={faq.question}>
              <div className="rounded-2xl border border-slate-200 p-6">
                <h3 className="font-bold text-slate-900">+ {faq.question}</h3>
                <p className="mt-2 text-sm text-slate-600">{faq.answer}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <section id="tentang" className="scroll-mt-20 bg-slate-50 py-16">
        <div className="mx-auto max-w-4xl px-4">
          <ScrollReveal>
            <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
              Tentang {SITE.name}
            </h2>
          </ScrollReveal>
          <ScrollReveal>
            <div className="mt-8 grid gap-8 sm:grid-cols-[200px_1fr] sm:items-start">
              <div className="relative h-48 w-48 overflow-hidden rounded-full border-4 border-brand/20 shadow-sm">
                <Image
                  src={withBasePath("/images/agent-clients.jpg")}
                  alt={`${SITE.agentName}, ${SITE.agentTitle}`}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">
                  {SITE.agentName}
                </h3>
                <p className="text-brand">{SITE.agentTitle}</p>
                <p className="mt-4 text-slate-600">
                  {SITE.name} adalah kanal digital dari {SITE.agentName}, agen
                  resmi MSIG Life yang berfokus membantu keluarga Indonesia
                  memilih perlindungan yang tepat sesuai kebutuhan dan anggaran
                  — bukan sekadar menjual produk termahal.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section id="kontak" className="scroll-mt-20 bg-brand py-16 text-white">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <ScrollReveal>
            <h2 className="text-3xl font-bold">
              Langsung Tuliskan Pertanyaanmu
            </h2>
            <p className="mt-3 text-white/80">
              Kami percaya keputusan asuransi terbaik lahir dari pertanyaan yang
              dijawab jujur, bukan sekadar penawaran.
            </p>
          </ScrollReveal>
          <ScrollReveal className="mt-8 grid gap-4 sm:grid-cols-2">
            <a
              href={buildWaLink(
                "Halo, saya ingin bertanya seputar produk MSIG Life.",
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col gap-1 rounded-2xl bg-white/10 p-6 text-left transition-colors hover:bg-white/15"
            >
              <span className="text-2xl">💬</span>
              <span className="font-bold">WhatsApp: Kharis Cekpreminya</span>
              <span className="text-sm text-white/70">{SITE.waNumber}</span>
            </a>
            <a
              href={SITE.igLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col gap-1 rounded-2xl bg-white/10 p-6 text-left transition-colors hover:bg-white/15"
            >
              <span className="text-2xl">📸</span>
              <span className="font-bold">Instagram</span>
              <span className="text-sm text-white/70">{SITE.igHandle}</span>
            </a>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
