import Link from "next/link";
import { buildWaLink } from "@/lib/site-config";
export const metadata = {
  title: "Panduan Pengajuan dan Klaim",
  description:
    "Kenali langkah konsultasi, pengajuan polis, serta persiapan klaim bersama agen.",
};
export default function Page() {
  return (
    <article className="section page-container">
      <div className="article-body">
        <Link href="/">← Kembali ke beranda</Link>
        <h1>Dari pertanyaan pertama sampai pendampingan klaim.</h1>
        <p>
          Kamu bisa meminta penjelasan di setiap tahap. Berikut peta
          percakapannya; ketentuan rinci tetap mengikuti polis dan prosedur
          resmi perusahaan.
        </p>
        <h2>Mulai perlindungan</h2>
        <ol>
          <li>
            <strong>Ceritakan kebutuhan.</strong> Bahas prioritas, anggaran, dan
            perlindungan yang sudah ada.
          </li>
          <li>
            <strong>Pelajari ilustrasi resmi.</strong> Tinjau manfaat,
            pengecualian, masa tunggu, dan biaya.
          </li>
          <li>
            <strong>Ajukan permintaan asuransi.</strong> Lengkapi SPAJ dan
            riwayat kesehatan secara benar.
          </li>
          <li>
            <strong>Tunggu underwriting.</strong> Hasil dapat berupa diterima,
            diterima dengan ketentuan, ditunda, atau ditolak.
          </li>
          <li>
            <strong>Tinjau polis yang diterbitkan.</strong> Pastikan data,
            manfaat, dan cara mengakses layanan sudah dipahami.
          </li>
        </ol>
        <h2>Saat membutuhkan klaim</h2>
        <ol>
          <li>
            Utamakan kebutuhan perawatan. Cek ketentuan cashless atau
            reimbursement pada polis dan fasilitas kesehatan.
          </li>
          <li>
            Hubungi agen atau layanan resmi untuk memastikan prosedur dan
            dokumen yang sesuai jenis klaim.
          </li>
          <li>
            Siapkan dokumen yang diminta, misalnya formulir, bukti perawatan,
            dan identitas. Persyaratan berbeda menurut produk.
          </li>
          <li>
            Ajukan melalui kanal yang ditentukan perusahaan dan simpan bukti
            pengajuan.
          </li>
          <li>
            Pantau kelengkapan dan hasil penilaian. Persetujuan serta waktu
            pembayaran mengikuti keputusan perusahaan.
          </li>
        </ol>
        <p>
          Gunakan{" "}
          <a
            href="https://www.msiglife.co.id/"
            target="_blank"
            rel="noopener noreferrer"
          >
            situs resmi MSIG Life
          </a>{" "}
          untuk mengakses layanan dan dokumen terbaru. Jangan kirim dokumen
          kesehatan melalui formulir situs ini.
        </p>
        <a
          className="button primary"
          href={buildWaLink(
            "Halo Kharis, saya ingin dibantu memahami prosedur klaim dan dokumen yang diperlukan.",
          )}
          target="_blank"
          rel="noopener noreferrer"
        >
          Diskusi prosedur klaim ↗
        </a>
      </div>
    </article>
  );
}
