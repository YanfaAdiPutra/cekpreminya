export interface Article {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  content: string[];
}

export const ARTICLES: Article[] = [
  {
    slug: "cara-klaim-asuransi-msig-life",
    title: "Cara Klaim Asuransi MSIG Life: Panduan Lengkap",
    description:
      "Langkah-langkah mengajukan klaim asuransi MSIG Life, dokumen yang perlu disiapkan, dan tips agar proses klaim berjalan lancar.",
    publishedAt: "2026-07-01",
    content: [
      "Mengajukan klaim asuransi sering terasa membingungkan, terutama bagi nasabah baru. Berikut alur umum klaim di MSIG Life.",
      "1. Laporkan klaim sesegera mungkin setelah kejadian (rawat inap, diagnosis penyakit kritis, atau meninggal dunia) melalui agen atau kontak resmi MSIG Life.",
      "2. Siapkan dokumen pendukung: formulir klaim, kartu identitas, dokumen medis (resume medis, hasil lab), dan salinan polis.",
      "3. Untuk rawat inap dengan fasilitas cashless, tunjukkan kartu peserta di rumah sakit rekanan sehingga tidak perlu membayar di muka.",
      "4. Untuk klaim reimbursement, kumpulkan seluruh kuitansi asli dan kirimkan bersama formulir klaim.",
      "5. Pantau status klaim secara berkala; agen Anda dapat membantu menindaklanjuti ke pihak MSIG Life bila prosesnya lambat.",
      "Tips: semakin lengkap dokumen yang diserahkan di awal, semakin cepat proses verifikasi klaim berjalan.",
    ],
  },
  {
    slug: "asuransi-tradisional-vs-unit-link",
    title: "Asuransi Tradisional vs Unit Link: Mana yang Cocok untuk Anda?",
    description:
      "Perbandingan asuransi tradisional dan unit link dari sisi proteksi, biaya, dan potensi investasi, agar Anda bisa memilih sesuai kebutuhan.",
    publishedAt: "2026-06-15",
    content: [
      "Asuransi tradisional fokus murni pada proteksi: Anda membayar premi tetap dan mendapat santunan sesuai perjanjian bila terjadi risiko yang ditanggung.",
      "Unit link menggabungkan proteksi jiwa dengan investasi. Sebagian premi dialokasikan untuk perlindungan, sebagian lagi untuk instrumen investasi yang dipilih.",
      "Kelebihan asuransi tradisional: premi lebih terjangkau dan predictable, cocok untuk kebutuhan proteksi murni jangka pendek-menengah.",
      "Kelebihan unit link: berpotensi memberikan nilai tunai yang bertumbuh, cocok untuk perencanaan jangka panjang selama Anda memahami risiko investasinya.",
      "Bagi yang menginginkan pengelolaan sesuai prinsip syariah, MSIG Life juga menyediakan varian unit link syariah seperti Eka Link Syariah dan Smile Plan Maxima Syariah.",
      "Rekomendasi terbaik tetap tergantung usia, tujuan keuangan, dan toleransi risiko masing-masing individu — konsultasikan kebutuhan Anda sebelum memutuskan.",
    ],
  },
  {
    slug: "asuransi-kesehatan-vs-bpjs",
    title: "Asuransi Kesehatan Swasta vs BPJS Kesehatan: Perlu Keduanya?",
    description:
      "Memahami perbedaan cakupan BPJS Kesehatan dan asuransi kesehatan swasta seperti MSIG Life, dan kenapa banyak keluarga memilih memiliki keduanya.",
    publishedAt: "2026-05-20",
    content: [
      "BPJS Kesehatan adalah program wajib pemerintah dengan iuran terjangkau dan cakupan luas, namun memiliki batasan seperti antrean dan pilihan kamar/rumah sakit yang terbatas oleh sistem rujukan.",
      "Asuransi kesehatan swasta seperti Eka Sehat memberikan fleksibilitas lebih: pilihan rumah sakit lebih luas, opsi kamar lebih baik, dan proses cashless di rumah sakit rekanan tanpa sistem rujukan berjenjang.",
      "Banyak keluarga memilih memiliki keduanya: BPJS sebagai jaring pengaman dasar, dan asuransi swasta untuk kenyamanan serta kecepatan akses layanan.",
      "Hospital Cash Plan bisa menjadi tambahan menarik karena memberi santunan harian tunai selama rawat inap, tanpa perlu bukti pengeluaran biaya rumah sakit.",
      "Sebelum memutuskan, cek dulu kisaran preminya sesuai usia dan kebutuhan Anda di halaman Cek Premi.",
    ],
  },
];

export const getArticle = (slug: string): Article | undefined => {
  return ARTICLES.find((article) => article.slug === slug);
};
