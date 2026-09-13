"use client";

import Link from "next/link";
import { useState } from "react";
import { formatRupiah } from "@/lib/premiumRates";
import { track } from "@/lib/engagement";
import { ARTICLES } from "@/lib/articles";

const myths = [
  {
    question: "Sudah punya asuransi kantor, berarti selalu cukup?",
    answer:
      "Belum tentu. Cek batas manfaat, tanggungan keluarga, dan apa yang terjadi saat hubungan kerja berakhir.",
  },
  {
    question: "Premi termurah pasti pilihan terbaik?",
    answer:
      "Bandingkan manfaat, batas pertanggungan, pengecualian, dan kemampuan membayar dalam jangka panjang. Harga hanya satu bagian.",
  },
  {
    question: "Pengajuan asuransi pasti diterima?",
    answer:
      "Penerimaan bergantung pada underwriting. Hasilnya dapat diterima, diterima dengan ketentuan, ditunda, atau ditolak.",
  },
];
export function LearningTools() {
  const [expenses, setExpenses] = useState(5000000);
  const [years, setYears] = useState(3);
  const [savings, setSavings] = useState(0);
  const [mode, setMode] = useState("family");
  const [openMyth, setOpenMyth] = useState<number | null>(null);
  return (
    <section className="section learning-section" id="belajar">
      <div className="page-container">
        <div className="section-heading">
          <div>
            <span className="eyebrow">SEDIKIT PAHAM, LEBIH TENANG</span>
            <h2>Yuk, buat lebih nyata.</h2>
          </div>
          <p>
            Mainkan angkanya. Kenali pertanyaannya.
            <br />
            Bekal kecil sebelum berdiskusi.
          </p>
        </div>
        <div className="learning-grid">
          <div className="scenario-card">
            <div className="segmented">
              <button
                aria-pressed={mode === "family"}
                onClick={() => {
                  setMode("family");
                  setYears(3);
                }}
              >
                Dana keluarga
              </button>
              <button
                aria-pressed={mode === "retirement"}
                onClick={() => {
                  setMode("retirement");
                  setYears(20);
                }}
              >
                Dana pensiun
              </button>
            </div>
            <h3>
              {mode === "family"
                ? "Berapa dana untuk menjaga keseharian?"
                : "Berapa biaya hidup selama pensiun?"}
            </h3>
            <label htmlFor="expenses">
              Pengeluaran per bulan <strong>{formatRupiah(expenses)}</strong>
            </label>
            <input
              id="expenses"
              type="range"
              min="1000000"
              max="30000000"
              step="500000"
              value={expenses}
              onChange={(e) => setExpenses(Number(e.target.value))}
              onPointerUp={() => track("scenario_adjusted")}
            />
            <label htmlFor="years">
              Jangka waktu <strong>{years} tahun</strong>
            </label>
            <input
              id="years"
              type="range"
              min="1"
              max="30"
              value={years}
              onChange={(e) => setYears(Number(e.target.value))}
            />
            <label htmlFor="savings">Dana yang sudah disiapkan (Rp)</label>
            <input
              id="savings"
              type="number"
              min="0"
              max="1000000000000"
              step="100000"
              className="field"
              value={savings}
              onChange={(e) =>
                setSavings(
                  Math.min(
                    1000000000000,
                    Math.max(0, Number(e.target.value) || 0),
                  ),
                )
              }
            />
            <div className="scenario-total" aria-live="polite">
              <span>Kebutuhan tambahan dengan nilai uang hari ini</span>
              <strong>
                {formatRupiah(Math.max(0, expenses * 12 * years - savings))}
              </strong>
            </div>
            <p>
              Pengeluaran bulanan × 12 × tahun, dikurangi dana yang sudah
              disiapkan (minimum nol). Belum memperhitungkan inflasi, utang,
              atau manfaat polis. Ini ilustrasi biaya hidup, bukan premi atau
              saran uang pertanggungan.
            </p>
          </div>
          <div className="myth-panel">
            <span className="eyebrow">COBA CEK PEMAHAMANMU</span>
            <h3>Pernah dengar yang ini?</h3>
            {myths.map((myth, i) => (
              <div className="myth-card" key={myth.question}>
                <button
                  aria-expanded={openMyth === i}
                  aria-controls={`myth-${i}`}
                  onClick={() => {
                    setOpenMyth(openMyth === i ? null : i);
                    track("myth_opened", { item: i });
                  }}
                >
                  <span>{myth.question}</span>
                  <b>{openMyth === i ? "−" : "↗"}</b>
                </button>
                {openMyth === i && <p id={`myth-${i}`}>{myth.answer}</p>}
              </div>
            ))}
            <Link
              href="/panduan-klaim/"
              className="text-button mt-6 inline-block"
            >
              Pahami proses pengajuan & klaim →
            </Link>
          </div>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {ARTICLES.map((article) => (
            <Link
              key={article.slug}
              href={`/artikel/${article.slug}/`}
              className="rounded-xl border border-[#d9dece] bg-white/60 p-6 transition-colors hover:bg-white"
            >
              <span className="eyebrow">{article.category}</span>
              <h3 className="mt-3 text-lg font-semibold text-[#304736]">
                {article.title}
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-[#6f8068]">
                {article.intro}
              </p>
              <span className="text-button mt-3 inline-block">
                Baca panduan →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
