import type { Metadata } from "next";
import { ALL_FAQS } from "@/lib/faqs";

export const metadata: Metadata = {
  title: "FAQ - Pertanyaan Seputar Asuransi MSIG Life",
  description:
    "Jawaban atas pertanyaan umum seputar premi, pendaftaran, underwriting, dan klaim asuransi MSIG Life.",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: ALL_FAQS.map((faq) => ({
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
        Hal-Hal yang Sering Ditanyakan
      </h1>
      <p className="mt-3 text-slate-600">
        Tempat dimana kamu dibebaskan bertanya dan diberi jawaban jujur atas
        keingintahuanmu.
      </p>
      <div className="mt-8 space-y-6">
        {ALL_FAQS.map((faq) => (
          <div
            key={faq.question}
            className="rounded-2xl border border-slate-200 p-6"
          >
            <h2 className="font-bold text-slate-900">+ {faq.question}</h2>
            <p className="mt-2 text-sm text-slate-600">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
