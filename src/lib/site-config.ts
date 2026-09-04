export interface NavLink {
  href: string;
  label: string;
}

export const SITE = {
  name: "Cek Preminya",
  agentName: "Kharisnantyo",
  agentTitle: "Agen Asuransi MSIG Life",
  tagline: "Premi Hemat, Pelayanan Juara, Fast Response",
  freedomLine:
    "Tempat dimana kamu dibebaskan bertanya dan diberi jawaban jujur atas keingintahuanmu.",
  description:
    "Cek estimasi premi asuransi MSIG Life dan konsultasi langsung dengan agen resmi. Asuransi jiwa (warisan), kesehatan, dana pensiun, dan tunai sakit kritis.",
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

export const SECTION_LINKS: NavLink[] = [
  { href: "#produk", label: "Produk" },
  { href: "#faq", label: "FAQ" },
  { href: "#tentang", label: "Tentang" },
  { href: "#kontak", label: "Kontak" },
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
    name: "Asuransi Jiwa (Warisan)",
    shortName: "Asuransi Jiwa (Warisan)",
    category: "Proteksi Jiwa",
    description:
      "Perencanaan kepastian dana yang akan diterima oleh ahli waris saat nasabah meninggal dunia.",
    image: "agent-clients.jpg",
    highlights: [
      "Biaya balik nama aset dari orang tua / pasangan",
      "Biaya kebutuhan hidup sehari-hari keluarga yang ditinggalkan",
      "Biaya pendidikan anak dan biaya memulai usaha",
      "Alokasi deposito untuk penghidupan dari bunga bank",
    ],
  },
  {
    slug: "asuransi-kesehatan",
    name: "Asuransi Kesehatan",
    shortName: "Asuransi Kesehatan",
    category: "Proteksi Kesehatan",
    description:
      "Pertanggungan biaya-biaya yang muncul dari perawatan di Rumah Sakit, dibayarkan sesuai tagihan.",
    image: "health-consult.jpg",
    highlights: [
      "Dibayarkan sesuai tagihan Rumah Sakit sesuai ketentuan polis",
      "Pilihan pertanggungan mulai dari Rp 3 miliar hingga Rp 47,5 miliar",
      "Tersedia jaringan tim rekanan di berbagai Rumah Sakit",
    ],
  },
  {
    slug: "asuransi-dana-pensiun",
    name: "Asuransi Dana Pensiun",
    shortName: "Asuransi Dana Pensiun",
    category: "Proteksi & Tabungan Hari Tua",
    description:
      "Perencanaan kepastian dana yang akan diterima pemegang polis saat mencapai usia pensiun pilihan.",
    image: "couple-finance.jpg",
    highlights: [
      "Dana cair saat mencapai usia pilihan: 55 / 60 / 75 tahun",
      "Jika nasabah meninggal sebelum usia tersebut, dana diterima ahli waris",
      "Cocok untuk perencanaan hari tua sejak dini",
    ],
  },
  {
    slug: "asuransi-kritis",
    name: "Asuransi Tunai Sakit Kritis",
    shortName: "Tunai Sakit Kritis",
    category: "Proteksi Penyakit Kritis",
    description:
      "Perencanaan kepastian dana tunai yang diterima pemegang polis saat nasabah terdiagnosa sakit kritis.",
    image: "elderly-consult.jpg",
    highlights: [
      "Biaya perawatan dan nutrisi penyembuhan di luar biaya Rumah Sakit",
      "Biaya kebutuhan hidup sehari-hari selama masa pemulihan",
      "Biaya operasional usaha yang terus berjalan",
      "Alokasi untuk kebutuhan tak terduga lainnya",
    ],
  },
];
