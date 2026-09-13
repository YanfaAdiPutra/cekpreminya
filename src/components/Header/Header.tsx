"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SECTION_LINKS, SITE, withBasePath } from "@/lib/site-config";

export const Header = (): React.ReactElement => {
  const pathname = usePathname();
  const sectionHref = (href: string) =>
    pathname === "/" ? href : withBasePath(`/${href}`);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeHref, setActiveHref] = useState<string | null>(null);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  useEffect(() => {
    const handleScroll = (): void => {
      setIsScrolled(window.scrollY > 24);
      if (window.scrollY < 200) setActiveHref(null);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sections = SECTION_LINKS.map((link) =>
      document.querySelector(link.href),
    ).filter((el): el is Element => el !== null);

    if (sections.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible) {
          setActiveHref(`#${visible.target.id}`);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [pathname]);

  return (
    <header
      className={`sticky top-0 z-40 transition-colors duration-300 ${
        isScrolled
          ? "border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur"
          : "border-b border-transparent bg-white/70 backdrop-blur"
      }`}
    >
      <div className="page-container flex items-center justify-between gap-4 py-4">
        <Link
          href="/"
          onClick={closeMobileMenu}
          className="flex items-baseline gap-2"
        >
          <span className="flex items-center gap-2 text-lg font-bold tracking-tight text-brand">
            <span
              aria-hidden="true"
              className="grid h-8 w-8 place-items-center rounded-full bg-brand text-base text-white"
            >
              c.
            </span>
            cekpreminya<span className="text-brand-cyan">.</span>
          </span>
          <span className="hidden text-xs text-slate-500 sm:inline">
            MSIG Life
          </span>
        </Link>

        <nav
          className="hidden items-center gap-5 text-xs font-medium text-slate-600 lg:flex"
          aria-label="Navigasi utama"
        >
          {SECTION_LINKS.map((link) => (
            <a
              key={link.href}
              href={sectionHref(link.href)}
              className={`transition-colors hover:text-brand ${
                activeHref === link.href ? "text-brand" : ""
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 xl:flex">
          <a
            href={sectionHref("#cek-premi")}
            className="rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-dark"
          >
            Cek Premi
          </a>
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
            {SECTION_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={sectionHref(link.href)}
                  onClick={closeMobileMenu}
                  className="block rounded-lg px-3 py-2 transition-colors hover:bg-brand/5 hover:text-brand"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-4 flex flex-col gap-2">
            <a
              href={sectionHref("#cek-premi")}
              onClick={closeMobileMenu}
              className="rounded-full bg-brand px-4 py-2.5 text-center text-sm font-semibold text-white transition-colors hover:bg-brand-dark"
            >
              Cek Premi
            </a>
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
