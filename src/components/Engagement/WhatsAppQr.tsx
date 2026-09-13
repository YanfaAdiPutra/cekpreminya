"use client";
import Image from "next/image";
import { useState } from "react";

export function WhatsAppQr({ href }: { href: string }) {
  const [source, setSource] = useState("");
  const [encodedHref, setEncodedHref] = useState("");
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  async function toggle() {
    if (open && encodedHref === href) {
      setOpen(false);
      return;
    }
    try {
      const qr = await import("qrcode");
      setSource(
        await qr.toDataURL(href, {
          width: 340,
          margin: 4,
          errorCorrectionLevel: "L",
          color: { dark: "#183e36", light: "#ffffff" },
        }),
      );
      setEncodedHref(href);
      setOpen(true);
      setError("");
    } catch {
      setError(
        "QR belum bisa dibuat. Gunakan tombol WhatsApp untuk melanjutkan.",
      );
    }
  }
  return (
    <div className="hidden w-full sm:block">
      <button
        type="button"
        className="text-button"
        aria-expanded={open && encodedHref === href}
        onClick={toggle}
      >
        ▦{" "}
        {open && encodedHref === href
          ? "Tutup kode QR"
          : "Buka di ponsel dengan QR"}
      </button>
      {open && encodedHref === href && (
        <div className="mt-3 w-fit rounded-xl border border-slate-200 bg-white p-3">
          <Image
            unoptimized
            src={source}
            width={280}
            height={280}
            alt="Kode QR untuk membuka percakapan WhatsApp dengan pilihanmu"
          />
          <p className="max-w-[280px] text-center text-xs text-slate-600">
            Pindai dengan kamera ponsel. Tinjau pesannya sebelum mengirim.
          </p>
        </div>
      )}
      <p role="status" className="text-xs">
        {error}
      </p>
    </div>
  );
}
