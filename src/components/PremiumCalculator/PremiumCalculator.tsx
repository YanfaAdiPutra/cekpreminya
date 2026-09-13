"use client";

import { useState } from "react";
import { WhatsAppQr } from "@/components/Engagement/WhatsAppQr";
import { PRODUCTS, buildWaLink } from "@/lib/site-config";
import {
  PREMIUM_RATES,
  formatRupiah,
  quoteProduct,
  type Gender,
} from "@/lib/premiumRates";
import {
  ageFromBirthDate,
  saveSummary,
  summaryText,
  track,
  type Answers,
} from "@/lib/engagement";

export function PremiumCalculator({
  initialProduct = "asuransi-kesehatan",
  context = {},
}: {
  initialProduct?: string;
  context?: Answers;
}) {
  const [slug, setSlug] = useState(initialProduct);
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState<Gender>("pria");
  const [profile, setProfile] = useState<{
    age: number;
    gender: Gender;
  } | null>(null);
  const [billing, setBilling] = useState<"monthly" | "annual">("monthly");
  const [budget, setBudget] = useState(Number(context.budget) || 1000000);
  const [selected, setSelected] = useState("");
  const [error, setError] = useState("");
  const [shareStatus, setShareStatus] = useState("");
  const [showComparison, setShowComparison] = useState(false);
  const product = PREMIUM_RATES[slug];
  const quotes = profile
    ? quoteProduct(slug, profile.age, profile.gender).slice().reverse()
    : [];
  const chosen = quotes.find((q) => q.tier.id === selected);
  const allOutsideBudget =
    quotes.length > 0 && quotes.every((q) => q.monthlyInstallment > budget);
  const summary =
    profile && chosen
      ? [
          "Halo Kharis, saya ingin membahas estimasi ini.",
          Object.keys(context).length ? summaryText(context) : "",
          `Produk: ${product.productName}`,
          `Usia: ${profile.age} tahun; jenis kelamin: ${profile.gender}`,
          `Plan: ${chosen.tier.name}`,
          `Estimasi: ${formatRupiah(billing === "monthly" ? chosen.monthlyInstallment : chosen.annual)} / ${billing === "monthly" ? "bulan" : "tahun"}`,
          `Anggaran bulanan: ${formatRupiah(budget)}`,
          "Mohon konfirmasi ilustrasi resmi, manfaat, pengecualian, dan ketentuan pembayaran.",
        ]
          .filter(Boolean)
          .join("\n")
      : "";
  function calculate(e: React.FormEvent) {
    e.preventDefault();
    const age = ageFromBirthDate(dob);
    if (
      age === null ||
      age < product.inputs.ageMin ||
      age > product.inputs.ageMax
    ) {
      setError(
        `Masukkan tanggal lahir yang valid untuk usia ${product.inputs.ageMin}–${product.inputs.ageMax} tahun.`,
      );
      setProfile(null);
      return;
    }
    setProfile({ age, gender });
    setError("");
    setSelected("");
    setShareStatus("");
    track("calculator_completed", { product: slug });
  }
  async function share() {
    try {
      if (navigator.share)
        await navigator.share({
          title: "Estimasi Cek Preminya",
          text: summary,
        });
      else {
        await navigator.clipboard.writeText(summary);
        setShareStatus("Ringkasan berhasil disalin.");
      }
      track("plan_shared");
    } catch (err) {
      if (!(err instanceof DOMException && err.name === "AbortError"))
        setShareStatus(
          "Bagikan belum tersedia. Silakan simpan ringkasan atau gunakan WhatsApp.",
        );
    }
  }
  return (
    <div className="calculator-shell">
      <div className="calculator-settings">
        <span className="eyebrow">SIMULASI PREMI</span>
        <h3>Pilihanmu, rencanamu.</h3>
        <form onSubmit={calculate} noValidate>
          <label htmlFor="calc-product">Jenis perlindungan</label>
          <select
            id="calc-product"
            className="field"
            value={slug}
            onChange={(e) => {
              setSlug(e.target.value);
              setProfile(null);
              setSelected("");
              setError("");
            }}
          >
            {PRODUCTS.map((p) => (
              <option key={p.slug} value={p.slug}>
                {p.shortName}
              </option>
            ))}
          </select>
          <label htmlFor="calc-dob">Tanggal lahir</label>
          <input
            id="calc-dob"
            className="field"
            type="date"
            required
            value={dob}
            aria-describedby="calc-age-note calc-error"
            onChange={(e) => {
              setDob(e.target.value);
              setProfile(null);
              setSelected("");
            }}
          />
          <small id="calc-age-note">
            Usia masuk pada tabel: {product.inputs.ageMin}–
            {product.inputs.ageMax} tahun. Usia dihitung dari ulang tahun
            terakhir.
          </small>
          <fieldset>
            <legend>Jenis kelamin</legend>
            <div className="segmented">
              {(["pria", "wanita"] as Gender[]).map((v) => (
                <label key={v} className={gender === v ? "chosen" : ""}>
                  <input
                    className="sr-only"
                    type="radio"
                    name="calc-gender"
                    value={v}
                    checked={gender === v}
                    onChange={() => {
                      setGender(v);
                      setProfile(null);
                      setSelected("");
                    }}
                  />
                  {v === "pria" ? "Pria" : "Wanita"}
                </label>
              ))}
            </div>
          </fieldset>
          <p id="calc-error" role="alert" className="text-sm text-red-700">
            {error}
          </p>
          <button className="button primary w-full" type="submit">
            Lihat estimasi premi →
          </button>
        </form>
        <div className="budget-control">
          <label htmlFor="calc-budget">
            Anggaran bulanan <strong>{formatRupiah(budget)}</strong>
          </label>
          <input
            id="calc-budget"
            type="range"
            min="100000"
            max="10000000"
            step="50000"
            value={budget}
            onChange={(e) => setBudget(Number(e.target.value))}
          />
          <small>
            Geser untuk menandai plan dalam anggaran. Manfaat dan harga plan
            tidak berubah.
          </small>
        </div>
      </div>
      <div className="calculator-results">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <span className="eyebrow">BANDINGKAN PILIHAN</span>
          <div className="segmented">
            <button
              onClick={() => setBilling("monthly")}
              aria-pressed={billing === "monthly"}
            >
              Bulanan
            </button>
            <button
              onClick={() => setBilling("annual")}
              aria-pressed={billing === "annual"}
            >
              Tahunan
            </button>
          </div>
        </div>
        {!profile ? (
          <div className="calculator-empty">
            <div className="empty-illustration">
              <span>♡</span>
              <i>✓</i>
            </div>
            <h3>
              Rencana baik dimulai
              <br />
              dengan mengenal pilihan.
            </h3>
            <p>
              Isi tanggal lahir dan jenis kelamin untuk melihat plan yang
              tersedia. Hasil langsung muncul di sini.
            </p>
            <span className="text-xs text-slate-500">
              Tanpa registrasi · Tidak mengirim data pribadi
            </span>
          </div>
        ) : (
          <>
            <p className="my-5 text-sm text-slate-500" role="status">
              {product.productName} · Usia {profile.age} tahun ·{" "}
              {profile.gender === "pria" ? "Pria" : "Wanita"}
            </p>
            {quotes.length === 0 && (
              <p role="status">
                Belum tersedia plan pada usia ini. Hubungi agen untuk pilihan
                lain.
              </p>
            )}
            {allOutsideBudget && (
              <p className="budget-notice">
                Estimasi plan yang tersedia melebihi anggaranmu. Diskusikan
                alternatif bersama agen; tidak perlu memaksakan pilihan.
              </p>
            )}
            <div className="plan-grid">
              {quotes.map((q) => (
                <article
                  key={q.tier.id}
                  className={`plan-card ${selected === q.tier.id ? "selected" : ""}`}
                >
                  <span
                    className={`plan-budget ${q.monthlyInstallment <= budget ? "fits" : ""}`}
                  >
                    {q.monthlyInstallment <= budget
                      ? "Dalam anggaran"
                      : "Di atas anggaran"}
                  </span>
                  <h4>{q.tier.name}</h4>
                  <p className="plan-description">{q.tier.description}</p>
                  <div className="plan-price">
                    {formatRupiah(
                      billing === "monthly" ? q.monthlyInstallment : q.annual,
                    )}
                    <small>/ {billing === "monthly" ? "bulan" : "tahun"}</small>
                  </div>
                  <p className="plan-equivalent">
                    {billing === "annual"
                      ? `Setara ${formatRupiah(q.effectiveMonthly)} / bulan`
                      : `${formatRupiah(q.annual)} / tahun`}
                  </p>
                  <ul>
                    {q.tier.benefits.map((b) => (
                      <li key={b}>
                        <span>✓</span>
                        {b}
                      </li>
                    ))}
                  </ul>
                  <button
                    className={`button ${selected === q.tier.id ? "primary" : "secondary"}`}
                    aria-pressed={selected === q.tier.id}
                    onClick={() => {
                      setSelected(q.tier.id);
                      setShareStatus("");
                      track("plan_selected", {
                        product: slug,
                        tier: q.tier.id,
                      });
                    }}
                  >
                    {selected === q.tier.id
                      ? "✓ Dipilih untuk diskusi"
                      : "Pilih untuk diskusi"}
                  </button>
                </article>
              ))}
            </div>
            <button
              className="text-button mt-5"
              aria-expanded={showComparison}
              onClick={() => {
                setShowComparison(!showComparison);
                track("comparison_opened");
              }}
            >
              {showComparison
                ? "Tutup tabel perbandingan −"
                : "Lihat tabel perbandingan +"}
            </button>
            {showComparison && (
              <div className="comparison-scroll">
                <table>
                  <caption>Perbandingan estimasi {product.productName}</caption>
                  <thead>
                    <tr>
                      <th>Ringkasan</th>
                      {quotes.map((q) => (
                        <th key={q.tier.id}>{q.tier.name}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th>Bulanan</th>
                      {quotes.map((q) => (
                        <td key={q.tier.id}>
                          {formatRupiah(q.monthlyInstallment)}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <th>Tahunan</th>
                      {quotes.map((q) => (
                        <td key={q.tier.id}>{formatRupiah(q.annual)}</td>
                      ))}
                    </tr>
                    <tr>
                      <th>Manfaat pada tabel</th>
                      {quotes.map((q) => (
                        <td key={q.tier.id}>{q.tier.benefits.join("; ")}</td>
                      ))}
                    </tr>
                    <tr>
                      <th>Perlu dikonfirmasi</th>
                      {quotes.map((q) => (
                        <td key={q.tier.id}>
                          Pengecualian, masa tunggu, ketentuan pembayaran, dan
                          underwriting.
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
            {chosen && (
              <div className="plan-handoff" aria-live="polite">
                <div>
                  <span className="eyebrow">PILIHAN UNTUK DIBAHAS</span>
                  <strong>{chosen.tier.name}</strong>
                  <small>
                    {formatRupiah(
                      billing === "monthly"
                        ? chosen.monthlyInstallment
                        : chosen.annual,
                    )}{" "}
                    / {billing === "monthly" ? "bulan" : "tahun"} · estimasi
                  </small>
                </div>
                <a
                  className="button primary"
                  href={buildWaLink(summary)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    track("whatsapp_clicked", {
                      source: "calculator",
                      product: slug,
                    })
                  }
                >
                  Diskusi plan ini ↗
                </a>
                <div className="flex w-full flex-wrap gap-5">
                  <button
                    className="text-button"
                    onClick={() => saveSummary(summary)}
                  >
                    ↓ Simpan estimasi
                  </button>
                  <button className="text-button" onClick={share}>
                    Bagikan estimasi
                  </button>
                </div>
                <p role="status" className="text-sm">
                  {shareStatus}
                </p>
              </div>
            )}
          </>
        )}
        {chosen && <WhatsAppQr href={buildWaLink(summary)} />}
        <details className="estimate-note">
          <summary>Tentang angka estimasi ini</summary>
          <p>
            Tabel pada situs belum mencantumkan sumber dan tanggal persetujuan.
            Angka hanya untuk diskusi awal, bukan penawaran resmi. Bulanan
            dihitung dari premi tahunan dibagi (12 − bulan diskon pada tabel);
            setara bulanan adalah tahunan ÷ 12. Konfirmasi harga, manfaat, masa
            tunggu, pengecualian, dan frekuensi pembayaran dengan agen. Produk
            pensiun hanya ditampilkan bila usia masuk lebih kecil dari target
            usia pencairan.
          </p>
        </details>
        <p className="mt-4 text-xs leading-relaxed text-slate-500">
          Estimasi ilustratif. Harga dan penerimaan akhir mengikuti ilustrasi
          resmi serta underwriting. Slider anggaran tidak mengubah manfaat atau
          menjamin kecocokan produk.
        </p>
      </div>
    </div>
  );
}
