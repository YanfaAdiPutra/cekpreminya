import Image from "next/image";
import Link from "next/link";
import { PRODUCTS, SITE, withBasePath } from "@/lib/site-config";
import { CORE_FAQS } from "@/lib/faqs";
import { ProductCard } from "@/components/ProductCard";

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
              <Link
                href="/cek-premi"
                className="rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-dark"
              >
                Cek Estimasi Premi
              </Link>
              <a
                href={SITE.igLink}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition-colors hover:border-brand-cyan hover:text-brand-cyan"
              >
                Lihat Instagram {SITE.igHandle}
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

      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold text-slate-900">
            Produk MSIG Life yang Bisa Dicek Preminya
          </h2>
          <p className="mt-2 text-slate-600">
            Empat kategori proteksi paling banyak ditanyakan pelanggan kami.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PRODUCTS.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold text-slate-900">
              Kenapa Cek Premi di Sini
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-3">
            {VALUE_PROPS.map((value) => (
              <div
                key={value.title}
                className="rounded-2xl bg-white p-6 shadow-sm"
              >
                <h3 className="font-bold text-slate-900">{value.title}</h3>
                <p className="mt-2 text-sm text-slate-600">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-16">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold text-slate-900">
            Hal-Hal yang Sering Ditanyakan
          </h2>
        </div>
        <ul className="space-y-3">
          {CORE_FAQS.map((faq) => (
            <li key={faq.question}>
              <Link
                href="/faq"
                className="block rounded-xl border border-slate-200 px-5 py-4 font-medium text-slate-800 transition-colors hover:border-brand hover:text-brand"
              >
                + {faq.question}
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-6 text-center">
          <Link
            href="/faq"
            className="text-sm font-semibold text-brand hover:text-brand-dark"
          >
            Lihat semua jawabannya &rarr;
          </Link>
        </div>
      </section>

      <section className="bg-brand py-16 text-white">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-3xl font-bold">Langsung Tuliskan Pertanyaanmu</h2>
          <p className="mt-3 text-white/80">
            Kami percaya keputusan asuransi terbaik lahir dari pertanyaan yang
            dijawab jujur, bukan sekadar penawaran.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              href="/cek-premi"
              className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-brand transition-colors hover:bg-white/90"
            >
              Cek Estimasi Premi
            </Link>
            <a
              href={SITE.waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-white px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-whatsapp hover:bg-whatsapp"
            >
              WhatsApp: Kharis Cekpreminya
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold text-slate-900">
            Kata Nasabah Kami
          </h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-3">
          {TESTIMONIALS.map((testimonial) => (
            <blockquote
              key={testimonial.name}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <p className="text-sm italic text-slate-600">
                &ldquo;{testimonial.text}&rdquo;
              </p>
              <footer className="mt-4 text-sm font-semibold text-slate-900">
                {testimonial.name}
              </footer>
            </blockquote>
          ))}
        </div>
      </section>
    </div>
  );
}
