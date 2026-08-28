import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ARTICLES, getArticle } from "@/lib/articles";
import { buildWaLink } from "@/lib/site-config";

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export const generateStaticParams = (): { slug: string }[] => {
  return ARTICLES.map((article) => ({ slug: article.slug }));
};

export const generateMetadata = async ({
  params,
}: ArticlePageProps): Promise<Metadata> => {
  const { slug } = await params;
  const article = getArticle(slug);

  if (!article) {
    return { title: "Artikel Tidak Ditemukan" };
  }

  return {
    title: article.title,
    description: article.description,
  };
};

const articleJsonLd = (
  title: string,
  description: string,
  publishedAt: string,
) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  headline: title,
  description,
  datePublished: publishedAt,
});

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = getArticle(slug);

  if (!article) {
    notFound();
  }

  return (
    <article className="mx-auto max-w-3xl px-4 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articleJsonLd(
              article.title,
              article.description,
              article.publishedAt,
            ),
          ),
        }}
      />
      <p className="text-xs uppercase tracking-wide text-slate-400">
        {new Date(article.publishedAt).toLocaleDateString("id-ID", {
          dateStyle: "long",
        })}
      </p>
      <h1 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">
        {article.title}
      </h1>

      <div className="prose prose-slate mt-8 max-w-none">
        {article.content.map((paragraph) => (
          <p key={paragraph.slice(0, 40)} className="mb-4 text-slate-700">
            {paragraph}
          </p>
        ))}
      </div>

      <div className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-6">
        <p className="text-slate-700">
          Masih ada pertanyaan setelah membaca artikel ini?
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            href="/cek-premi"
            className="rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-emerald-700"
          >
            Cek Estimasi Premi
          </Link>
          <a
            href={buildWaLink(
              `Halo, saya baru baca artikel "${article.title}" dan ingin bertanya lebih lanjut.`,
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:border-emerald-600 hover:text-emerald-700"
          >
            Tanya via WhatsApp
          </a>
        </div>
      </div>
    </article>
  );
}
