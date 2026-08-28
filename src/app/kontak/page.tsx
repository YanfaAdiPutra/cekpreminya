import type { Metadata } from "next";
import { SITE, buildWaLink } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Kontak",
  description: `Hubungi ${SITE.agentName} lewat WhatsApp atau Instagram ${SITE.igHandle} untuk konsultasi asuransi MSIG Life.`,
};

export default function KontakPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
        Hubungi Kami
      </h1>
      <p className="mt-3 text-slate-600">
        Cara tercepat untuk konsultasi adalah lewat WhatsApp. Anda juga bisa
        mengikuti update produk dan testimoni nasabah di Instagram kami.
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        <a
          href={buildWaLink(
            "Halo, saya ingin konsultasi seputar asuransi MSIG Life.",
          )}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col gap-2 rounded-2xl border border-emerald-200 bg-emerald-50 p-6 transition-shadow hover:shadow-md"
        >
          <span className="text-2xl">💬</span>
          <span className="text-lg font-bold text-slate-900">WhatsApp</span>
          <span className="text-sm text-slate-600">{SITE.waNumber}</span>
          <span className="mt-2 text-sm font-semibold text-emerald-700">
            Chat sekarang &rarr;
          </span>
        </a>

        <a
          href={SITE.igLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col gap-2 rounded-2xl border border-slate-200 bg-white p-6 transition-shadow hover:shadow-md"
        >
          <span className="text-2xl">📸</span>
          <span className="text-lg font-bold text-slate-900">Instagram</span>
          <span className="text-sm text-slate-600">{SITE.igHandle}</span>
          <span className="mt-2 text-sm font-semibold text-emerald-700">
            Kunjungi profil &rarr;
          </span>
        </a>
      </div>

      <div className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-6 text-sm text-slate-600">
        <p>
          {SITE.agentName} adalah agen resmi MSIG Life yang beroperasi secara
          independen. Untuk keperluan resmi terkait polis yang sudah berjalan,
          Anda juga dapat menghubungi kantor MSIG Life terdekat atau aplikasi
          VEGA.
        </p>
      </div>
    </div>
  );
}
