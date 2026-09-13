import Link from "next/link";
import { SITE, buildWaLink } from "@/lib/site-config";
export const metadata = {
  title: "Tentang Kharisnantyo",
  description:
    "Kenali Kharisnantyo dan cara memulai konsultasi bersama Cek Preminya.",
};
export default function Page() {
  return (
    <article className="section page-container">
      <div className="article-body">
        <Link href="/">← Beranda</Link>
        <h1>Halo, saya Kharisnantyo.</h1>
        <p>
          Cek Preminya adalah kanal konsultasi asuransi MSIG Life yang saya
          kelola secara independen. Di sini kamu bisa mulai dengan pertanyaan,
          mengeksplorasi estimasi, dan meminta penjelasan mengenai pilihan
          perlindungan.
        </p>
        <h2>Ruang untuk pertanyaanmu</h2>
        <p>
          Ceritakan kebutuhan dan anggaranmu. Kita bisa membahas manfaat,
          pengecualian, serta proses pengajuan sebelum kamu memutuskan. Kamu
          dapat meminta identitas keagenan dan dokumen resmi saat konsultasi.
        </p>
        <h2>Kenal lebih dekat</h2>
        <p>
          Ikuti kegiatan dan informasi melalui{" "}
          <a href={SITE.igLink} target="_blank" rel="noopener noreferrer">
            {SITE.igHandle} di Instagram
          </a>
          . Situs ini bukan situs korporat MSIG Life.
        </p>
        <a
          className="button primary"
          href={buildWaLink(
            "Halo Kharis, saya ingin mengenal layanan konsultasi Cek Preminya. Boleh minta informasi identitas keagenan dan pilihan perlindungan?",
          )}
          target="_blank"
          rel="noopener noreferrer"
        >
          Mulai percakapan ↗
        </a>
      </div>
    </article>
  );
}
