import Link from "next/link";
import { ARTICLES } from "@/lib/articles";
export const metadata = {
  title: "Panduan Memahami Asuransi",
  description:
    "Bekal sederhana untuk memahami kebutuhan dan estimasi sebelum berkonsultasi.",
};
export default function Page() {
  return (
    <section className="section page-container">
      <div className="article-body">
        <Link href="/">← Beranda</Link>
        <h1>Bekal kecil untuk keputusan besar.</h1>
        <p>
          Mulai dari pertanyaan yang tepat dan angka yang lebih mudah
          dimengerti.
        </p>
        {ARTICLES.map((a) => (
          <article
            key={a.slug}
            className="my-7 rounded-xl border border-slate-200 p-6"
          >
            <span className="eyebrow">{a.category}</span>
            <h2>{a.title}</h2>
            <p>{a.intro}</p>
            <Link href={`/artikel/${a.slug}/`}>Baca panduan →</Link>
          </article>
        ))}
      </div>
    </section>
  );
}
