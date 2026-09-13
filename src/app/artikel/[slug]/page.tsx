import Link from "next/link";
import { notFound } from "next/navigation";
import { ARTICLES } from "@/lib/articles";
export const dynamicParams = false;
export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = ARTICLES.find((a) => a.slug === slug);
  return { title: article?.title, description: article?.intro };
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = ARTICLES.find((a) => a.slug === slug);
  if (!article) notFound();
  return (
    <article className="section page-container">
      <div className="article-body">
        <Link href="/artikel/">← Semua panduan</Link>
        <span className="eyebrow mt-8">{article.category}</span>
        <h1>{article.title}</h1>
        <p>{article.intro}</p>
        {article.sections.map((s) => (
          <section key={s.title}>
            <h2>{s.title}</h2>
            <p>{s.body}</p>
          </section>
        ))}
        <Link href="/cek-kebutuhan/" className="button primary mt-7">
          Kenali kebutuhanmu →
        </Link>
      </div>
    </article>
  );
}
