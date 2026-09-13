"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { PRODUCTS, SITE, buildWaLink, withBasePath } from "@/lib/site-config";
import { LIFE_STAGES, recommend, track, type Answers } from "@/lib/engagement";
import { ProtectionFinder } from "./ProtectionFinder";
import { PremiumCalculator } from "@/components/PremiumCalculator";
import { LearningTools } from "./LearningTools";
import { ALL_FAQS } from "@/lib/faqs";

const productQuestions = [
  "Kalau aku tak lagi ada, bagaimana keluarga?",
  "Kalau harus dirawat, sudah siap biayanya?",
  "Nanti pensiun, ingin hidup seperti apa?",
  "Saat pemulihan, siapa yang menjaga penghasilan?",
];
const icons = ["♡", "+", "☀", "✳"];

export function EngagementHome({
  mode = "home",
}: {
  mode?: "home" | "quiz" | "calculator";
}) {
  const [stage, setStage] = useState("");
  const [answers, setAnswers] = useState<Answers>({});
  const [calculatorSlug, setCalculatorSlug] = useState("asuransi-kesehatan");
  const [calculatorVersion, setCalculatorVersion] = useState(0);
  const [activeProduct, setActiveProduct] = useState(1);
  const [faqSearch, setFaqSearch] = useState("");
  const [topic, setTopic] = useState("Memilih perlindungan");
  const [contactTime, setContactTime] = useState("Chat sekarang");
  const selectedProduct = PRODUCTS[activeProduct];
  function choosePlan(slug: string) {
    setCalculatorSlug(slug);
    setCalculatorVersion((n) => n + 1);
    track("product_selected", { product: slug });
  }
  function receiveResult(value: Answers) {
    setAnswers(value);
    choosePlan(recommend(value).slug);
  }
  function chooseStage(value: string) {
    setStage(value);
    track("life_stage_selected");
    document
      .getElementById("cek-kebutuhan")
      ?.scrollIntoView({ behavior: "smooth" });
  }
  const filteredFaqs = ALL_FAQS.filter((f) =>
    `${f.question} ${f.answer}`.toLowerCase().includes(faqSearch.toLowerCase()),
  );
  return (
    <>
      {mode === "home" && (
        <>
          <section className="hero-section">
            <div className="page-container hero-grid">
              <div className="hero-copy">
                <span className="hero-kicker">
                  <span /> KENALI KEBUTUHANMU, MULAI DARI SINI
                </span>
                <h1>
                  Hidup penuh rencana.
                  <br />
                  Proteksi bikin
                  <br />
                  <em>lebih tenang.</em>
                </h1>
                <p>
                  Setiap hidup punya cerita. Temukan perlindungan yang sesuai
                  dengan ceritamu, satu pertanyaan sederhana dalam satu waktu.
                </p>
                <div className="hero-actions">
                  <a
                    className="button primary"
                    href="#cek-kebutuhan"
                    onClick={() => track("hero_cta", { action: "quiz" })}
                  >
                    Bantu saya memilih <span>↗</span>
                  </a>
                  <a
                    className="button quiet"
                    href="#cek-premi"
                    onClick={() => track("hero_cta", { action: "calculator" })}
                  >
                    Langsung cek premi →
                  </a>
                </div>
                <div className="hero-assurance">
                  <span>✓ Tanpa isi nomor telepon</span>
                  <span>✓ Bebas bertanya</span>
                </div>
              </div>
              <div className="hero-visual">
                <div className="hero-photo">
                  <Image
                    src={withBasePath("/images/hero-family.jpg")}
                    alt="Momen kebersamaan keluarga di luar ruangan"
                    fill
                    priority
                    sizes="(max-width: 800px) 100vw, 48vw"
                    className="object-cover"
                  />
                  <div className="photo-caption">
                    Untuk momen yang ingin
                    <br />
                    kamu jaga, selamanya.
                  </div>
                </div>
                <div className="hero-note">
                  <span className="note-icon">♡</span>
                  <div>
                    <strong>Yang berharga, dijaga.</strong>
                    <small>Mulai dari kebutuhanmu.</small>
                  </div>
                  <span className="note-check">✓</span>
                </div>
                <span className="hero-stamp">
                  Rencana baik
                  <br />
                  <strong>
                    dimulai
                    <br />
                    hari ini.
                  </strong>
                  <span>↗</span>
                </span>
              </div>
            </div>
          </section>
          <div className="promise-strip">
            <div className="page-container">
              <span>KENAL LEBIH DEKAT</span>
              <strong>Konsultasi transparan</strong>
              <i>✳</i>
              <strong>Pendampingan klaim</strong>
              <i>✳</i>
              <strong>Ruang untuk bertanya</strong>
              <span>CEKPREMINYA × MSIG LIFE</span>
            </div>
          </div>
          <section className="section page-container life-section">
            <div className="section-heading">
              <div>
                <span className="eyebrow">SETIAP FASE, CERITA BERBEDA</span>
                <h2>Kamu sedang di fase apa?</h2>
              </div>
              <p>
                Pilih ceritamu. Kita mulai dari yang
                <br className="hidden sm:block" /> paling dekat dengan hidupmu.
              </p>
            </div>
            <div className="life-grid">
              {LIFE_STAGES.map((s) => (
                <button
                  key={s.id}
                  className={`life-card ${stage === s.id ? "selected" : ""}`}
                  aria-pressed={stage === s.id}
                  onClick={() => chooseStage(s.id)}
                >
                  <span className="life-icon">{s.icon}</span>
                  <strong>{s.label}</strong>
                  <small>{s.detail}</small>
                  <span className="life-arrow">↗</span>
                </button>
              ))}
            </div>
          </section>
        </>
      )}
      {mode !== "calculator" && (
        <section id="cek-kebutuhan" className="section page-container">
          <ProtectionFinder
            key={stage}
            initialStage={stage || undefined}
            onResult={receiveResult}
          />
        </section>
      )}
      {mode === "home" && (
        <section id="produk" className="section products-section">
          <div className="page-container">
            <div className="section-heading">
              <div>
                <span className="eyebrow">BUKAN SEKADAR PRODUK</span>
                <h2>
                  Yang kamu jaga,
                  <br />
                  yang kita pikirkan bersama.
                </h2>
              </div>
              <p>
                Empat jenis perlindungan.
                <br />
                Masing-masing punya peran.
              </p>
            </div>
            <div
              className="product-tabs"
              aria-label="Pilih kategori perlindungan"
            >
              {PRODUCTS.map((p, i) => (
                <button
                  key={p.slug}
                  aria-pressed={activeProduct === i}
                  onClick={() => {
                    setActiveProduct(i);
                    track("product_expanded", { product: p.slug });
                  }}
                  className={activeProduct === i ? "active" : ""}
                >
                  <span>{icons[i]}</span>
                  {p.shortName.replace("Asuransi ", "")}
                </button>
              ))}
            </div>
            <div className="product-feature" key={selectedProduct.slug}>
              <div className="product-photo">
                <Image
                  src={withBasePath(`/images/${selectedProduct.image}`)}
                  alt={`Ilustrasi ${selectedProduct.category.toLowerCase()}`}
                  fill
                  sizes="(max-width: 800px) 100vw, 42vw"
                  className="object-cover"
                />
                <span>{selectedProduct.category}</span>
              </div>
              <div className="product-description">
                <span className="eyebrow">
                  PERTANYAAN YANG LAYAK DITANYAKAN
                </span>
                <h3>{productQuestions[activeProduct]}</h3>
                <p>{selectedProduct.description}</p>
                <ul>
                  {selectedProduct.highlights.map((h) => (
                    <li key={h}>
                      <span>✓</span>
                      {h}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-3">
                  <a
                    className="button primary"
                    href="#cek-premi"
                    onClick={() => choosePlan(selectedProduct.slug)}
                  >
                    Lihat estimasi →
                  </a>
                  <Link
                    className="button quiet"
                    href={`/produk/${selectedProduct.slug}/`}
                  >
                    Kenali manfaatnya ↗
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
      <section id="cek-premi" className="section page-container">
        <div className="section-heading">
          <div>
            <span className="eyebrow">ANGKA YANG LEBIH MUDAH DIPAHAMI</span>
            {mode === "calculator" ? (
              <h1 className="section-title">
                Cek dulu. Bandingkan.
                <br />
                Baru putuskan.
              </h1>
            ) : (
              <h2>
                Cek dulu. Bandingkan.
                <br />
                Baru putuskan.
              </h2>
            )}
          </div>
          <p>
            Jelajahi estimasi dari tabel yang tersedia.
            <br />
            Ilustrasi resmi dikonfirmasi bersama agen.
          </p>
        </div>
        <PremiumCalculator
          key={calculatorVersion}
          initialProduct={calculatorSlug}
          context={answers}
        />
      </section>
      {mode === "home" && (
        <>
          <LearningTools />
          <section id="tentang" className="section page-container">
            <div className="agent-panel">
              <div className="agent-monogram" aria-hidden="true">
                K<span>CEKPREMINYA</span>
              </div>
              <div>
                <span className="eyebrow">
                  ADA ORANG DI BALIK SETIAP JAWABAN
                </span>
                <h2>Halo, saya Kharisnantyo.</h2>
                <p>
                  Teman diskusi untuk memahami pilihan asuransi MSIG Life.
                  Ceritakan kebutuhanmu, tanyakan manfaat dan pengecualiannya,
                  lalu ambil keputusan dengan lebih tenang.
                </p>
                <a
                  href={SITE.igLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-button"
                >
                  Kenal lebih dekat di {SITE.igHandle} ↗
                </a>
                <Link href="/tentang-kharis/" className="text-button ml-5">
                  Tentang Kharis →
                </Link>
              </div>
              <div className="agent-quote">
                “Bertanya bebas.
                <br />
                Jawaban jujur.”<small>{SITE.tagline}</small>
              </div>
            </div>
          </section>
          <section id="faq" className="section page-container faq-layout">
            <div>
              <span className="eyebrow">NGGAK PERLU SUNGKAN</span>
              <h2>
                Pertanyaan kecil.
                <br />
                Kejelasan besar.
              </h2>
              <p className="mt-4 text-slate-500">
                Belum menemukan jawabanmu?
                <br />
                Tanyakan langsung ke Kharis.
              </p>
              <a
                className="text-button mt-5 inline-block"
                href={buildWaLink(
                  "Halo Kharis, saya punya pertanyaan tentang asuransi.",
                )}
                target="_blank"
                rel="noopener noreferrer"
              >
                Tanya via WhatsApp ↗
              </a>
            </div>
            <div>
              <label className="sr-only" htmlFor="faq-search">
                Cari pertanyaan
              </label>
              <input
                id="faq-search"
                className="field mb-5"
                placeholder="Cari pertanyaan, misalnya: klaim"
                value={faqSearch}
                onChange={(e) => setFaqSearch(e.target.value)}
              />
              <div className="faq-list">
                {filteredFaqs.map((f, i) => (
                  <details
                    key={f.question}
                    onToggle={(e) => {
                      if (e.currentTarget.open)
                        track("faq_opened", { item: ALL_FAQS.indexOf(f) });
                    }}
                  >
                    <summary>
                      <span>
                        <small>0{i + 1}</small>
                        {f.question}
                      </span>
                      <b aria-hidden="true">+</b>
                    </summary>
                    <p>{f.answer}</p>
                  </details>
                ))}
                {filteredFaqs.length === 0 && (
                  <p role="status" className="py-5 text-slate-500">
                    Belum ada jawaban yang cocok. Coba kata lain atau tanyakan
                    lewat WhatsApp.
                  </p>
                )}
              </div>
            </div>
          </section>
          <section id="kontak" className="section page-container">
            <div className="contact-panel">
              <div>
                <span className="eyebrow light">
                  LANGKAH BERIKUTNYA, SESANTAI ITU
                </span>
                <h2>
                  Obrolan baik.
                  <br />
                  Keputusan lebih yakin.
                </h2>
                <p>
                  Mulai dengan satu pertanyaan.
                  <br />
                  Konsultasi tanpa kewajiban membeli.
                </p>
              </div>
              <div className="contact-form">
                <label htmlFor="contact-topic">
                  Apa yang ingin kamu bahas?
                </label>
                <select
                  id="contact-topic"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                >
                  {[
                    "Memilih perlindungan",
                    "Membandingkan premi",
                    "Memahami manfaat & pengecualian",
                    "Bantuan proses klaim",
                  ].map((v) => (
                    <option key={v}>{v}</option>
                  ))}
                </select>
                <label htmlFor="contact-time">
                  Kapan nyaman untuk dihubungi?
                </label>
                <select
                  id="contact-time"
                  value={contactTime}
                  onChange={(e) => setContactTime(e.target.value)}
                >
                  {[
                    "Chat sekarang",
                    "Pagi (09.00–12.00)",
                    "Siang (12.00–17.00)",
                    "Sore (17.00–19.00)",
                  ].map((v) => (
                    <option key={v}>{v}</option>
                  ))}
                </select>
                <a
                  className="button mint"
                  href={buildWaLink(
                    `Halo Kharis, saya ingin diskusi: ${topic}.\nPreferensi waktu (WIB): ${contactTime}.\nBoleh konfirmasi waktu yang tersedia?`,
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    track("whatsapp_clicked", { source: "contact" })
                  }
                >
                  Mulai obrolan di WhatsApp ↗
                </a>
                <small>
                  Preferensi waktu dikirim lewat chat, belum merupakan
                  reservasi.
                </small>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
}
