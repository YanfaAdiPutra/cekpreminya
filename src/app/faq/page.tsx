import type { Metadata } from "next";
import { SITE } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "FAQ - Pertanyaan Seputar Asuransi MSIG Life",
  description:
    "Jawaban atas pertanyaan umum seputar premi, klaim, dan produk asuransi MSIG Life.",
};

const FAQS = [
  {
    question: "Apakah hasil cek premi di situs ini adalah harga final?",
    answer:
      "Tidak. Hasil di halaman Cek Premi adalah estimasi kasar berdasarkan usia, jenis produk, dan tingkat perlindungan. Premi final ditentukan lewat proses underwriting resmi MSIG Life yang mempertimbangkan kondisi kesehatan dan data lengkap Anda.",
  },
  {
    question: "Apakah situs ini situs resmi MSIG Life?",
    answer: `Bukan. ${SITE.name} dikelola oleh ${SITE.agentName}, agen resmi MSIG Life yang beroperasi secara independen untuk membantu proses konsultasi dan pembelian polis.`,
  },
  {
    question: "Berapa lama proses klaim asuransi MSIG Life?",
    answer:
      "Lama proses klaim bervariasi tergantung jenis produk dan kelengkapan dokumen. Tim kami membantu memastikan dokumen lengkap sejak awal agar proses berjalan secepat mungkin.",
  },
  {
    question: "Apakah unit link syariah berbeda dengan unit link biasa?",
    answer:
      "Ya. Unit link syariah dikelola sesuai prinsip syariah, termasuk dalam hal penempatan investasi dan pengelolaan risiko, dan diawasi oleh Dewan Pengawas Syariah.",
  },
  {
    question: "Bagaimana cara mulai konsultasi?",
    answer:
      "Paling cepat lewat WhatsApp menggunakan tombol yang tersedia di setiap halaman, atau isi form di halaman Cek Premi terlebih dahulu.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export default function FaqPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
        Pertanyaan yang Sering Diajukan
      </h1>
      <div className="mt-8 space-y-6">
        {FAQS.map((faq) => (
          <div
            key={faq.question}
            className="rounded-2xl border border-slate-200 p-6"
          >
            <h2 className="font-bold text-slate-900">{faq.question}</h2>
            <p className="mt-2 text-sm text-slate-600">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
