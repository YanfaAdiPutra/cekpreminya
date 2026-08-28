import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PRODUCTS, SITE, buildWaLink, withBasePath } from "@/lib/site-config";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export const generateStaticParams = (): { slug: string }[] => {
  return PRODUCTS.map((product) => ({ slug: product.slug }));
};

const getProduct = (slug: string) => {
  return PRODUCTS.find((product) => product.slug === slug);
};

export const generateMetadata = async ({
  params,
}: ProductPageProps): Promise<Metadata> => {
  const { slug } = await params;
  const product = getProduct(slug);

  if (!product) {
    return { title: "Produk Tidak Ditemukan" };
  }

  return {
    title: `${product.shortName} - ${product.name}`,
    description: product.description,
  };
};

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProduct(slug);

  if (!product) {
    notFound();
  }

  const waMessage = `Halo, saya tertarik konsultasi ${product.name} (${product.shortName}) dari MSIG Life.`;

  return (
    <div>
      <section className="bg-emerald-50">
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-14 lg:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
              {product.category}
            </p>
            <h1 className="mt-2 text-3xl font-extrabold text-slate-900 sm:text-4xl">
              {product.shortName}
            </h1>
            <p className="mt-1 text-lg text-slate-500">{product.name}</p>
            <p className="mt-4 text-slate-600">{product.description}</p>
            <a
              href={buildWaLink(waMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-block rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-emerald-700"
            >
              Konsultasi via WhatsApp
            </a>
          </div>
          <div className="relative h-64 w-full overflow-hidden rounded-3xl shadow-lg sm:h-80">
            <Image
              src={withBasePath(`/images/${product.image}`)}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-14">
        <h2 className="text-2xl font-bold text-slate-900">Manfaat Utama</h2>
        <ul className="mt-6 space-y-4">
          {product.highlights.map((highlight) => (
            <li key={highlight} className="flex items-start gap-3">
              <span className="mt-1 text-emerald-600">✔</span>
              <span className="text-slate-700">{highlight}</span>
            </li>
          ))}
        </ul>

        <div className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-6">
          <p className="text-slate-700">
            Ingin tahu kisaran preminya sesuai usia dan kebutuhan Anda?
          </p>
          <Link
            href="/cek-premi"
            className="mt-3 inline-block rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-emerald-700"
          >
            Cek Estimasi Premi {product.shortName}
          </Link>
        </div>

        <p className="mt-8 text-xs text-slate-400">
          Nama produk dan manfaat mengikuti ketentuan resmi MSIG Life dan dapat
          berubah sewaktu-waktu. {SITE.agentName} akan memberikan informasi
          produk terbaru saat konsultasi.
        </p>
      </section>
    </div>
  );
}
