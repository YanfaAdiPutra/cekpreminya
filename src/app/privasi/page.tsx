import Link from "next/link";
export const metadata = {
  title: "Privasi",
  description: "Cara jawaban kuis dan simulasi diproses di Cek Preminya.",
};
export default function Page() {
  return (
    <article className="section page-container">
      <div className="article-body">
        <Link href="/">← Beranda</Link>
        <h1>Privasi, dengan bahasa sederhana.</h1>
        <h2>Kuis dan kalkulator</h2>
        <p>
          Jawaban kuis, tanggal lahir, jenis kelamin, dan pilihan estimasi
          diproses di memori browser selama halaman terbuka. Situs ini tidak
          memiliki database lead atau mengirim input tersebut ke server
          aplikasi. Memuat ulang atau meninggalkan halaman akan mereset jawaban.
        </p>
        <h2>Simpan dan bagikan</h2>
        <p>
          Simpan ringkasan mengunduh berkas teks ke perangkatmu. Bagikan
          menggunakan menu berbagi perangkat atau menyalin ringkasan ke
          clipboard. Ringkasan dapat memuat jawaban kuis dan usia, tetapi tidak
          menyertakan tanggal lahir lengkap.
        </p>
        <h2>WhatsApp dan layanan luar</h2>
        <p>
          Tombol WhatsApp membuka layanan pihak ketiga dengan pesan yang sudah
          diisi. Tinjau pesan sebelum mengirimnya. Saat membuka WhatsApp, isi
          tautan diproses oleh layanan tersebut. WhatsApp, Instagram, serta
          penyedia hosting mempunyai kebijakan privasi masing-masing.
        </p>
        <h2>Pengukuran interaksi</h2>
        <p>
          Situs mengeluarkan peristiwa interaksi lokal, misalnya kuis selesai
          atau plan dipilih. Saat ini tidak ada penyedia analitik eksternal yang
          dihubungkan. Peristiwa ini tidak berisi jawaban kuis, tanggal lahir,
          atau detail kontak. Penyedia hosting dapat memproses data permintaan
          web sesuai kebijakannya.
        </p>
        <h2>Pertanyaan privasi</h2>
        <p>
          Hubungi Kharisnantyo melalui kontak WhatsApp yang tertera di situs
          untuk menanyakan penanganan informasi yang sudah kamu kirim lewat
          konsultasi.
        </p>
      </div>
    </article>
  );
}
