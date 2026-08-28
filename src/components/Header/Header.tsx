"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import { NAV_LINKS, PRODUCTS, SITE } from "@/lib/site-config";

export const Header = (): React.ReactElement => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link
          href="/"
          onClick={closeMobileMenu}
          className="flex items-baseline gap-2"
        >
          <span className="text-lg font-bold text-brand">{SITE.name}</span>
          <span className="hidden text-xs text-slate-500 sm:inline">
            MSIG Life
          </span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 lg:flex">
          <Link href="/" className="transition-colors hover:text-brand">
            Beranda
          </Link>

          <div className="group relative">
            <button
              type="button"
              className="flex items-center gap-1 transition-colors group-hover:text-brand"
            >
              Produk
              <span aria-hidden="true" className="text-xs">
                &#9662;
              </span>
            </button>
            <div className="invisible absolute left-0 top-full w-64 rounded-xl border border-slate-200 bg-white p-2 opacity-0 shadow-lg transition-opacity group-hover:visible group-hover:opacity-100">
              {PRODUCTS.map((product) => (
                <Link
                  key={product.slug}
                  href={`/produk/${product.slug}`}
                  className="block rounded-lg px-3 py-2 text-sm text-slate-700 transition-colors hover:bg-brand/5 hover:text-brand"
                >
                  {product.shortName}
                </Link>
              ))}
            </div>
          </div>

          <Link href="/artikel" className="transition-colors hover:text-brand">
            Artikel
          </Link>
          <Link href="/faq" className="transition-colors hover:text-brand">
            FAQ
          </Link>
          <Link href="/tentang" className="transition-colors hover:text-brand">
            Tentang
          </Link>
          <Link href="/kontak" className="transition-colors hover:text-brand">
            Kontak
          </Link>
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href="/cek-premi"
            className="rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-dark"
          >
            Cek Premi
          </Link>
          <a
            href={SITE.waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-whatsapp px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-whatsapp-dark"
          >
            WhatsApp
          </a>
        </div>

        <button
          type="button"
          onClick={toggleMobileMenu}
          aria-expanded={isMobileMenuOpen}
          aria-label="Buka menu navigasi"
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-700 lg:hidden"
        >
          <span aria-hidden="true" className="text-xl">
            {isMobileMenuOpen ? "✕" : "☰"}
          </span>
        </button>
      </div>

      {isMobileMenuOpen ? (
        <nav className="border-t border-slate-200 bg-white px-4 py-4 lg:hidden">
          <ul className="flex flex-col gap-1 text-sm font-medium text-slate-700">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={closeMobileMenu}
                  className="block rounded-lg px-3 py-2 transition-colors hover:bg-brand/5 hover:text-brand"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <p className="mt-4 px-3 text-xs font-semibold uppercase tracking-wide text-brand-cyan">
            Produk
          </p>
          <ul className="mt-1 flex flex-col gap-1 text-sm font-medium text-slate-700">
            {PRODUCTS.map((product) => (
              <li key={product.slug}>
                <Link
                  href={`/produk/${product.slug}`}
                  onClick={closeMobileMenu}
                  className="block rounded-lg px-3 py-2 transition-colors hover:bg-brand/5 hover:text-brand"
                >
                  {product.shortName}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-4 flex flex-col gap-2">
            <Link
              href="/cek-premi"
              onClick={closeMobileMenu}
              className="rounded-full bg-brand px-4 py-2.5 text-center text-sm font-semibold text-white transition-colors hover:bg-brand-dark"
            >
              Cek Premi
            </Link>
            <a
              href={SITE.waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-whatsapp px-4 py-2.5 text-center text-sm font-semibold text-white transition-colors hover:bg-whatsapp-dark"
            >
              WhatsApp
            </a>
          </div>
        </nav>
      ) : null}
    </header>
  );
};
