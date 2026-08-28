import type { Metadata } from "next";
import Link from "next/link";
import { ARTICLES } from "@/lib/articles";

export const metadata: Metadata = {
  title: "Artikel Asuransi MSIG Life",
  description:
    "Panduan klaim, perbandingan produk, dan tips memilih asuransi MSIG Life yang tepat untuk kebutuhan Anda.",
};

export default function ArtikelIndexPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
        Artikel &amp; Panduan
      </h1>
      <p className="mt-3 text-slate-600">
        Kumpulan panduan seputar asuransi MSIG Life untuk membantu Anda
        mengambil keputusan yang tepat.
      </p>

      <div className="mt-10 space-y-6">
        {ARTICLES.map((article) => (
          <Link
            key={article.slug}
            href={`/artikel/${article.slug}`}
            className="block rounded-2xl border border-slate-200 p-6 transition-shadow hover:shadow-md"
          >
            <p className="text-xs uppercase tracking-wide text-slate-400">
              {new Date(article.publishedAt).toLocaleDateString("id-ID", {
                dateStyle: "long",
              })}
            </p>
            <h2 className="mt-2 text-xl font-bold text-slate-900">
              {article.title}
            </h2>
            <p className="mt-2 text-sm text-slate-600">{article.description}</p>
            <span className="mt-3 inline-block text-sm font-semibold text-emerald-700">
              Baca selengkapnya &rarr;
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
