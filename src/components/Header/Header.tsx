import Link from "next/link";
import { NAV_LINKS, SITE } from "@/lib/site-config";

export const Header = (): React.ReactElement => {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-lg font-bold text-emerald-700">
            {SITE.name}
          </span>
          <span className="hidden text-xs text-slate-500 sm:inline">
            MSIG Life
          </span>
        </Link>
        <nav className="hidden gap-5 text-sm font-medium text-slate-600 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-emerald-700"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <a
          href={SITE.waLink}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-emerald-700"
        >
          WhatsApp
        </a>
      </div>
    </header>
  );
};
