"use client";

import { useCallback, useState } from "react";
import { PRODUCTS, buildWaLink } from "@/lib/site-config";
import {
  PREMIUM_RATES,
  formatRupiah,
  quoteProduct,
  type Gender,
  type TierPricing,
} from "@/lib/premiumRates";

const CALCULATOR_PRODUCTS = PRODUCTS.filter(
  (product) => PREMIUM_RATES[product.slug],
);

export const PremiumCalculator = (): React.ReactElement => {
  const [productSlug, setProductSlug] = useState(
    CALCULATOR_PRODUCTS[0]?.slug ?? "",
  );
  const [age, setAge] = useState("");
  const [gender, setGender] = useState<Gender>("pria");
  const [error, setError] = useState("");
  const [quotes, setQuotes] = useState<TierPricing[] | null>(null);
  const [revealedCount, setRevealedCount] = useState(1);

  const product = PREMIUM_RATES[productSlug];
  const productMeta = CALCULATOR_PRODUCTS.find((p) => p.slug === productSlug);

  const handleSelectProduct = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      const target = (event.target as HTMLElement).closest<HTMLButtonElement>(
        "button[data-slug]",
      );
      const slug = target?.dataset.slug;
      if (!slug) {
        return;
      }
      setProductSlug(slug);
      setQuotes(null);
      setError("");
    },
    [],
  );

  const handleAgeChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setAge(event.target.value);
    },
    [],
  );

  const handleGenderChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setGender(event.target.value as Gender);
    },
    [],
  );

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const ageNumber = Number(age);

      if (!product) {
        return;
      }
      if (
        !age ||
        Number.isNaN(ageNumber) ||
        ageNumber < product.inputs.ageMin ||
        ageNumber > product.inputs.ageMax
      ) {
        setError(
          `Masukkan umur antara ${product.inputs.ageMin} - ${product.inputs.ageMax} tahun.`,
        );
        setQuotes(null);
        return;
      }

      const result = quoteProduct(productSlug, ageNumber, gender);
      if (result.length === 0) {
        setError("Tidak ditemukan tabel premi untuk usia ini.");
        setQuotes(null);
        return;
      }

      setError("");
      setQuotes(result);
      setRevealedCount(1);
    },
    [age, gender, product, productSlug],
  );

  const handleReset = useCallback(() => {
    setQuotes(null);
    setError("");
  }, []);

  const handleRevealMore = useCallback(() => {
    setRevealedCount((prev) => prev + 1);
  }, []);

  if (!product || !productMeta) {
    return <></>;
  }

  const genderLabel = gender === "pria" ? "Pria" : "Wanita";

  return (
    <div className="mx-auto max-w-2xl">
      <div
        onClick={handleSelectProduct}
        className="mb-6 flex flex-wrap justify-center gap-2"
      >
        {CALCULATOR_PRODUCTS.map((item) => (
          <button
            key={item.slug}
            type="button"
            data-slug={item.slug}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
              item.slug === productSlug
                ? "bg-brand text-white"
                : "border border-slate-300 text-slate-700 hover:border-brand hover:text-brand"
            }`}
          >
            {item.shortName}
          </button>
        ))}
      </div>

      {!quotes ? (
        <form
          onSubmit={handleSubmit}
          className="space-y-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
        >
          <p className="text-sm text-slate-500">{product.productName}</p>
          <div>
            <label
              htmlFor="calc-age"
              className="block text-sm font-semibold text-slate-800"
            >
              Umur (tahun)
            </label>
            <input
              id="calc-age"
              type="number"
              min={product.inputs.ageMin}
              max={product.inputs.ageMax}
              value={age}
              onChange={handleAgeChange}
              placeholder={`Contoh: ${Math.round(
                (product.inputs.ageMin + product.inputs.ageMax) / 2,
              )}`}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-brand focus:outline-none"
            />
          </div>

          <div>
            <p className="text-sm font-semibold text-slate-800">
              Jenis Kelamin
            </p>
            <div className="mt-2 grid grid-cols-2 gap-3">
              {(["pria", "wanita"] as Gender[]).map((option) => (
                <label
                  key={option}
                  className={`flex cursor-pointer items-center justify-center rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
                    gender === option
                      ? "border-brand bg-brand/5 text-brand"
                      : "border-slate-300 text-slate-700"
                  }`}
                >
                  <input
                    type="radio"
                    name="gender"
                    value={option}
                    checked={gender === option}
                    onChange={handleGenderChange}
                    className="sr-only"
                  />
                  {option === "pria" ? "Pria" : "Wanita"}
                </label>
              ))}
            </div>
          </div>

          {error ? <p className="text-sm text-red-600">{error}</p> : null}

          <button
            type="submit"
            className="w-full rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-dark"
          >
            Lihat Harga
          </button>
        </form>
      ) : (
        <div className="space-y-4">
          {quotes
            .slice(0, revealedCount)
            .map(({ tier, annual, monthlyInstallment, effectiveMonthly }) => {
              const waMessage = `Halo Kharis, saya tertarik dengan ${product.productName} MSIG Life.\nPlan: ${tier.name}\nUsia: ${age} tahun (${genderLabel})\nPremi: ${formatRupiah(monthlyInstallment)}/bulan.\nBoleh minta info lebih lanjut?`;

              return (
                <div
                  key={tier.id}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
                >
                  <span className="inline-block rounded-full bg-brand px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
                    {tier.badge}
                  </span>
                  <h3 className="mt-3 text-xl font-bold text-slate-900">
                    {tier.name}
                  </h3>
                  <p className="mt-1 text-sm text-slate-600">
                    {tier.description}
                  </p>
                  <ul className="mt-4 space-y-2">
                    {tier.benefits.map((benefit) => (
                      <li key={benefit} className="flex items-start gap-2">
                        <span className="mt-1 text-brand-cyan">✔</span>
                        <span className="text-sm text-slate-700">
                          {benefit}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <p className="mt-5 text-3xl font-extrabold text-brand">
                    {formatRupiah(monthlyInstallment)}
                    <span className="text-base font-medium text-slate-500">
                      {" "}
                      / bulan
                    </span>
                  </p>
                  <p className="mt-1 text-sm text-slate-500">
                    atau {formatRupiah(annual)} / tahun (={" "}
                    {formatRupiah(effectiveMonthly)} /bulan —{" "}
                    <span className="font-semibold text-brand-cyan">
                      DISKON {tier.annualDiscountMonths} BULAN
                    </span>
                    )
                  </p>

                  <a
                    href={buildWaLink(waMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group mt-5 inline-flex items-center gap-3 rounded-full bg-whatsapp py-2 pl-5 pr-2 text-sm font-semibold text-white transition-colors hover:bg-whatsapp-dark"
                  >
                    Chat via WhatsApp
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15 transition-transform group-hover:translate-x-1">
                      &rarr;
                    </span>
                  </a>
                </div>
              );
            })}

          {revealedCount < quotes.length ? (
            <button
              type="button"
              onClick={handleRevealMore}
              className="w-full text-center text-sm font-semibold text-brand hover:text-brand-dark"
            >
              Ingin opsi yang lebih terjangkau
              {revealedCount > 1 ? " lagi" : ""}?
            </button>
          ) : null}

          <button
            type="button"
            onClick={handleReset}
            className="block text-center text-sm font-semibold text-slate-500 hover:text-slate-700"
          >
            &larr; Cek ulang dengan data lain
          </button>
        </div>
      )}

      <p className="mt-6 text-center text-xs text-slate-400">
        Harga bersifat estimasi berdasarkan tabel premi dan dapat berubah sesuai
        ketentuan underwriting (riwayat penyakit, BMI, dll).
      </p>
    </div>
  );
};
