"use client";

import { useCallback, useState } from "react";
import { buildWaLink } from "@/lib/site-config";
import {
  estimatePremium,
  formatRupiah,
  type EstimatorInput,
  type ProductType,
} from "./estimateLogic";

const PRODUCT_OPTIONS: { value: ProductType; label: string }[] = [
  { value: "asuransi-jiwa", label: "Asuransi Jiwa" },
  { value: "asuransi-kesehatan", label: "Asuransi Kesehatan" },
  { value: "asuransi-kritis", label: "Asuransi Penyakit Kritis" },
  { value: "unit-link-syariah", label: "Unit Link Syariah" },
];

const DEFAULT_INPUT: EstimatorInput = {
  age: 30,
  gender: "pria",
  productType: "asuransi-jiwa",
  coverageTier: "menengah",
};

export const PremiumEstimatorForm = (): React.ReactElement => {
  const [input, setInput] = useState<EstimatorInput>(DEFAULT_INPUT);
  const [name, setName] = useState("");
  const [result, setResult] = useState<ReturnType<
    typeof estimatePremium
  > | null>(null);

  const handleAgeChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const age = Number(event.target.value);
      setInput((prev) => ({ ...prev, age }));
    },
    [],
  );

  const handleGenderChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const gender = event.target.value as EstimatorInput["gender"];
      setInput((prev) => ({ ...prev, gender }));
    },
    [],
  );

  const handleProductChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const productType = event.target.value as ProductType;
      setInput((prev) => ({ ...prev, productType }));
    },
    [],
  );

  const handleTierChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const coverageTier = event.target.value as EstimatorInput["coverageTier"];
      setInput((prev) => ({ ...prev, coverageTier }));
    },
    [],
  );

  const handleNameChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setName(event.target.value);
    },
    [],
  );

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setResult(estimatePremium(input));
    },
    [input],
  );

  const productLabel =
    PRODUCT_OPTIONS.find((option) => option.value === input.productType)
      ?.label ?? input.productType;

  const waMessage = result
    ? `Halo, saya ${name || "(nama)"}, usia ${input.age} tahun. Saya cek estimasi premi ${productLabel} di angka ${formatRupiah(result.minMonthly)}-${formatRupiah(result.maxMonthly)}/bulan. Boleh dibantu penawaran resminya?`
    : "";

  return (
    <div className="mx-auto max-w-2xl">
      <form
        onSubmit={handleSubmit}
        className="space-y-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
      >
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-semibold text-slate-800"
          >
            Nama
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={handleNameChange}
            placeholder="Nama Anda"
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-brand focus:outline-none"
          />
        </div>

        <div>
          <label
            htmlFor="age"
            className="block text-sm font-semibold text-slate-800"
          >
            Usia: {input.age} tahun
          </label>
          <input
            id="age"
            type="range"
            min={17}
            max={65}
            value={input.age}
            onChange={handleAgeChange}
            className="mt-2 w-full accent-brand"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor="gender"
              className="block text-sm font-semibold text-slate-800"
            >
              Jenis Kelamin
            </label>
            <select
              id="gender"
              value={input.gender}
              onChange={handleGenderChange}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-brand focus:outline-none"
            >
              <option value="pria">Pria</option>
              <option value="wanita">Wanita</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="productType"
              className="block text-sm font-semibold text-slate-800"
            >
              Jenis Produk
            </label>
            <select
              id="productType"
              value={input.productType}
              onChange={handleProductChange}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-brand focus:outline-none"
            >
              {PRODUCT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label
            htmlFor="coverageTier"
            className="block text-sm font-semibold text-slate-800"
          >
            Tingkat Perlindungan yang Diinginkan
          </label>
          <select
            id="coverageTier"
            value={input.coverageTier}
            onChange={handleTierChange}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-brand focus:outline-none"
          >
            <option value="dasar">Dasar</option>
            <option value="menengah">Menengah</option>
            <option value="premium">Premium</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-dark"
        >
          Cek Estimasi Premi
        </button>
      </form>

      {result ? (
        <div className="mt-6 rounded-2xl border border-brand/20 bg-brand/5 p-6 sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-cyan">
            Estimasi Premi Bulanan
          </p>
          <p className="mt-2 text-3xl font-extrabold text-brand">
            {formatRupiah(result.minMonthly)} -{" "}
            {formatRupiah(result.maxMonthly)}
          </p>
          <p className="mt-3 text-sm text-slate-600">
            Ini adalah <strong>estimasi kasar</strong>, bukan penawaran resmi
            dari MSIG Life. Premi sebenarnya ditentukan lewat proses
            underwriting yang mempertimbangkan kondisi kesehatan dan data
            lengkap Anda.
          </p>
          <a
            href={buildWaLink(waMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-block rounded-full bg-whatsapp px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-whatsapp-dark"
          >
            Konfirmasi Penawaran Resmi via WhatsApp
          </a>
        </div>
      ) : null}
    </div>
  );
};
