import type { Metadata } from "next";
import Image from "next/image";
import { SITE, buildWaLink, withBasePath } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Tentang Kami",
  description: `Kenalan dengan ${SITE.agentName}, agen resmi MSIG Life yang mengelola ${SITE.name}.`,
};

export default function TentangPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
        Tentang {SITE.name}
      </h1>

      <div className="mt-8 grid gap-8 sm:grid-cols-[200px_1fr] sm:items-start">
        <div className="relative h-48 w-48 overflow-hidden rounded-full border-4 border-brand/20 shadow-sm">
          <Image
            src={withBasePath("/images/agent-clients.jpg")}
            alt={`${SITE.agentName}, ${SITE.agentTitle}`}
            fill
            className="object-cover"
          />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-900">{SITE.agentName}</h2>
          <p className="text-brand">{SITE.agentTitle}</p>
          <p className="mt-4 text-slate-600">
            {SITE.name} adalah kanal digital dari {SITE.agentName}, agen resmi
            MSIG Life yang berfokus membantu keluarga Indonesia memilih
            perlindungan yang tepat sesuai kebutuhan dan anggaran — bukan
            sekadar menjual produk termahal.
          </p>
          <p className="mt-4 text-slate-600">
            Filosofi kerja kami sederhana:{" "}
            <strong>Premi Hemat, Pelayanan Juara, Fast Response</strong> —
            direkomendasikan melalui Instagram {SITE.igHandle} dan kini hadir di
            situs ini agar lebih mudah ditemukan dan diakses kapan saja.
          </p>
        </div>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 p-6">
          <h3 className="font-bold text-slate-900">Konsultasi Transparan</h3>
          <p className="mt-2 text-sm text-slate-600">
            Penjelasan manfaat, pengecualian, dan biaya disampaikan apa adanya
            sebelum Anda memutuskan.
          </p>
        </div>
        <div className="rounded-2xl border border-slate-200 p-6">
          <h3 className="font-bold text-slate-900">Pendampingan Klaim</h3>
          <p className="mt-2 text-sm text-slate-600">
            Dibantu dari pengumpulan dokumen hingga proses klaim selesai.
          </p>
        </div>
        <div className="rounded-2xl border border-slate-200 p-6">
          <h3 className="font-bold text-slate-900">Respon Cepat</h3>
          <p className="mt-2 text-sm text-slate-600">
            Pertanyaan lewat WhatsApp maupun Instagram dijawab tanpa perlu antre
            di kantor cabang.
          </p>
        </div>
      </div>

      <div className="mt-12 rounded-2xl bg-brand p-8 text-center text-white">
        <p className="text-lg font-semibold">
          Punya pertanyaan seputar asuransi MSIG Life?
        </p>
        <a
          href={buildWaLink(
            "Halo, saya ingin bertanya seputar produk MSIG Life.",
          )}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-block rounded-full bg-white px-6 py-3 text-sm font-semibold text-whatsapp-dark transition-colors hover:bg-white/90"
        >
          Chat WhatsApp {SITE.agentName}
        </a>
      </div>
    </div>
  );
}
