import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PRODUCTS, buildWaLink } from "@/lib/site-config";

export const dynamicParams = false;
export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = PRODUCTS.find((p) => p.slug === slug);
  return { title: product?.name, description: product?.description };
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = PRODUCTS.find((p) => p.slug === slug);
  if (!product) notFound();
  return (
    <article className="section page-container">
      <div className="article-body">
        <Link href="/#produk">← Semua perlindungan</Link>
        <span className="eyebrow mt-9">{product.category}</span>
        <h1>{product.name}</h1>
        <p>{product.description}</p>
        <h2>Untuk kebutuhan apa?</h2>
        <ul>
          {product.highlights.map((h) => (
            <li key={h}>{h}</li>
          ))}
        </ul>
        <h2>Yang perlu dibahas sebelum memilih</h2>
        <ol>
          <li>
            Manfaat yang sudah kamu miliki melalui BPJS, kantor, atau polis
            pribadi.
          </li>
          <li>
            Batas manfaat, masa tunggu, pengecualian, serta syarat klaim dalam
            dokumen resmi produk.
          </li>
          <li>
            Jumlah premi, lama pembayaran, dan perubahan biaya yang mungkin
            berlaku.
          </li>
          <li>Usia masuk, riwayat kesehatan, dan keputusan underwriting.</li>
        </ol>
        <p>
          Halaman ini menjelaskan kategori kebutuhan. Manfaat dan penerimaan
          mengikuti produk serta polis yang dipilih. Minta ilustrasi resmi dan
          Ringkasan Informasi Produk dan Layanan sebelum mengambil keputusan.
        </p>
        <div className="flex flex-wrap gap-3 mt-8">
          <Link className="button primary" href="/cek-premi/">
            Bandingkan estimasi →
          </Link>
          <a
            className="button secondary"
            href={buildWaLink(
              `Halo Kharis, saya ingin memahami ${product.name}. Mohon informasi manfaat, pengecualian, dan ilustrasi resmi.`,
            )}
            target="_blank"
            rel="noopener noreferrer"
          >
            Tanya tentang produk ini ↗
          </a>
        </div>
      </div>
    </article>
  );
}
