export interface NavLink {
  href: string;
  label: string;
}

export const SITE = {
  name: "Cek Preminya",
  agentName: "Kharisnantyo",
  agentTitle: "Agen Asuransi MSIG Life",
  tagline: "Premi Hemat, Pelayanan Juara, Fast Response",
  description:
    "Cek estimasi premi asuransi MSIG Life dan konsultasi langsung dengan agen resmi. Asuransi jiwa, kesehatan, penyakit kritis, dan unit link syariah.",
  waNumber: "6281188881419",
  waLink: "https://wa.me/6281188881419",
  igHandle: "@cekpreminya",
  igLink: "https://www.instagram.com/cekpreminya/",
  url: "https://yanfaadiputra.github.io/cekpreminya",
} as const;

export const buildWaLink = (message: string): string => {
  return `${SITE.waLink}?text=${encodeURIComponent(message)}`;
};

export const withBasePath = (path: string): string => {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  return `${basePath}${path}`;
};

export const NAV_LINKS: NavLink[] = [
  { href: "/", label: "Beranda" },
  { href: "/artikel", label: "Artikel" },
  { href: "/faq", label: "FAQ" },
  { href: "/tentang", label: "Tentang" },
  { href: "/kontak", label: "Kontak" },
];

export interface ProductSummary {
  slug: string;
  name: string;
  shortName: string;
  category: string;
  description: string;
  image: string;
  highlights: string[];
}

export const PRODUCTS: ProductSummary[] = [
  {
    slug: "asuransi-jiwa",
    name: "Smile Wealth Protection (SMART)",
    shortName: "Asuransi Jiwa",
    category: "Proteksi Jiwa",
    description:
      "Perlindungan jiwa menyeluruh yang memastikan keluarga tetap terjaga secara finansial apa pun yang terjadi.",
    image: "agent-clients.jpg",
    highlights: [
      "Santunan meninggal dunia untuk keluarga",
      "Bisa disesuaikan dengan usia dan tahap hidup",
      "Cocok sebagai fondasi proteksi keuangan keluarga",
    ],
  },
  {
    slug: "asuransi-kesehatan",
    name: "Eka Sehat & Hospital Cash Plan",
    shortName: "Asuransi Kesehatan",
    category: "Proteksi Kesehatan",
    description:
      "Biaya rumah sakit dan rawat inap ditanggung, tersedia opsi cashless maupun reimbursement.",
    image: "health-consult.jpg",
    highlights: [
      "Opsi cashless di rumah sakit rekanan",
      "Santunan harian rawat inap (Hospital Cash Plan)",
      "Reimbursement untuk fleksibilitas pilihan RS",
    ],
  },
  {
    slug: "asuransi-kritis",
    name: "Smile Critical Ultima Care (SECURE)",
    shortName: "Penyakit Kritis",
    category: "Proteksi Penyakit Kritis",
    description:
      "Santunan tunai saat terdiagnosis penyakit kritis, membantu biaya pengobatan tanpa mengganggu tabungan.",
    image: "elderly-consult.jpg",
    highlights: [
      "Santunan tunai saat diagnosis penyakit kritis",
      "Membantu menutup biaya di luar tanggungan BPJS",
      "Penting untuk usia 35+ atau riwayat keluarga penyakit kritis",
    ],
  },
  {
    slug: "unit-link-syariah",
    name: "Eka Link & Smile Plan Maxima Syariah",
    shortName: "Unit Link Syariah",
    category: "Proteksi & Investasi Syariah",
    description:
      "Kombinasi proteksi jiwa dan investasi yang dikelola sesuai prinsip syariah.",
    image: "couple-finance.jpg",
    highlights: [
      "Dikelola sesuai prinsip syariah",
      "Proteksi jiwa + potensi nilai investasi",
      "Fleksibel untuk perencanaan jangka panjang",
    ],
  },
];
