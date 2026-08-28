import Link from "next/link";
import { NAV_LINKS, SITE } from "@/lib/site-config";

export const Footer = (): React.ReactElement => {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-16 border-t border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-10 text-sm text-slate-600">
        <div className="grid gap-8 sm:grid-cols-3">
          <div>
            <p className="text-base font-bold text-brand">{SITE.name}</p>
            <p className="mt-2">{SITE.tagline}</p>
            <p className="mt-2 text-xs text-slate-500">
              {SITE.agentName} &middot; {SITE.agentTitle}
            </p>
          </div>
          <div>
            <p className="font-semibold text-slate-800">Navigasi</p>
            <ul className="mt-2 space-y-1">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-brand">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-semibold text-slate-800">Hubungi Kami</p>
            <ul className="mt-2 space-y-1">
              <li>
                <a
                  href={SITE.waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-whatsapp"
                >
                  WhatsApp: {SITE.waNumber}
                </a>
              </li>
              <li>
                <a
                  href={SITE.igLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-brand-cyan"
                >
                  Instagram: {SITE.igHandle}
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-slate-200 pt-6 text-xs text-slate-500">
          <p>
            &copy; {year} {SITE.name}. {SITE.agentName} adalah agen resmi MSIG
            Life yang beroperasi secara independen. Situs ini bukan situs resmi
            PT Asuransi MSIG Life Indonesia.
          </p>
        </div>
      </div>
    </footer>
  );
};
