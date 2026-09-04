import type { Metadata } from "next";
import { PremiumEstimatorForm } from "@/components/PremiumEstimatorForm";

export const metadata: Metadata = {
  title: "Cek Premi Asuransi MSIG Life",
  description:
    "Cek estimasi premi asuransi jiwa (warisan), kesehatan, dana pensiun, dan tunai sakit kritis MSIG Life sesuai usia dan kebutuhan Anda.",
};

export default function CekPremiPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
          Cek Estimasi Premi Asuransi MSIG Life
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-slate-600">
          Isi data singkat berikut untuk melihat kisaran premi bulanan. Setelah
          itu Anda bisa langsung konfirmasi penawaran resmi lewat WhatsApp.
        </p>
      </div>
      <PremiumEstimatorForm />
    </div>
  );
}
