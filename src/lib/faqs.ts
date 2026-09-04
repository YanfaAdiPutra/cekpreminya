export interface FaqItem {
  question: string;
  answer: string;
}

export const CORE_FAQS: FaqItem[] = [
  {
    question: "Berapa preminya?",
    answer:
      "Premi pada tiap asuransi bersifat personal. Tanggal, bulan, tahun lahir beserta jenis kelamin menjadi syarat perhitungan besaran preminya. Pada produk asuransi jiwa, dana pensiun, tunai sakit kritis, dan tahapan dana pasti, berapa besar nominal yang diinginkan juga perlu dituliskan.",
  },
  {
    question: "Bagaimana cara mendaftarnya?",
    answer:
      "Mengisi data diri sesuai pertanyaan pada SPAJ (Surat Permintaan Asuransi Jiwa), beserta riwayat kesehatan secara lengkap dan sebenar-benarnya, kemudian agen akan memprosesnya melalui sistem keagenan yang selanjutnya akan diverifikasi kembali oleh calon nasabah atas kebenaran permintaan / pengajuan asuransinya.",
  },
  {
    question: "Apakah pasti diterima?",
    answer:
      "Agen hanya bisa menjawab sebatas pengalaman yang dimilikinya dan tidak bisa dijadikan acuan, hasil akhir mutlak mengacu pada keputusan underwriting melalui pernyataan resmi hasil pengajuan SPAJ. Keputusan pengajuan ini berisi salah satu dari 4 jawaban: diterima, diterima dengan catatan, ditunda, atau ditolak.",
  },
  {
    question: "Bagaimana cara klaimnya?",
    answer:
      "Secara umum, klaim asuransi kesehatan sangat sederhana, cukup menunjukkan kartu Rumah Sakit. Namun, kehadiran agen merupakan nilai tambah yang luar biasa. Melalui website ini Anda akan dilayani oleh agen berpengalaman dalam pengurusan klaim baik dengan nilai ratusan ribu, ratusan juta, bahkan miliaran rupiah. Dilengkapi jaringan tim rekanan di berbagai Rumah Sakit, serta layanan pendampingan klaim luar negeri.",
  },
];

export const SITE_FAQS: FaqItem[] = [
  {
    question: "Apakah hasil cek premi di situs ini adalah harga final?",
    answer:
      "Tidak. Hasil di halaman Cek Premi adalah estimasi kasar berdasarkan tanggal lahir, jenis kelamin, dan nominal yang diinginkan. Premi final ditentukan lewat proses underwriting resmi MSIG Life melalui pengajuan SPAJ.",
  },
  {
    question: "Apakah situs ini situs resmi MSIG Life?",
    answer:
      "Bukan. Cek Preminya dikelola oleh Kharisnantyo, agen resmi MSIG Life yang beroperasi secara independen untuk membantu proses konsultasi dan pengajuan polis.",
  },
  {
    question: "Bagaimana cara mulai konsultasi?",
    answer:
      "Paling cepat dengan langsung menuliskan pertanyaanmu lewat WhatsApp menggunakan tombol yang tersedia di setiap halaman, atau isi form di halaman Cek Premi terlebih dahulu.",
  },
];

export const ALL_FAQS: FaqItem[] = [...CORE_FAQS, ...SITE_FAQS];
