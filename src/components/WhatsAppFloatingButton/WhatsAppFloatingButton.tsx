import { SITE } from "@/lib/site-config";

export const WhatsAppFloatingButton = (): React.ReactElement => {
  return (
    <a
      href={SITE.waLink}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat via WhatsApp"
      className="fixed bottom-4 right-4 z-50 flex items-center gap-2 rounded-full bg-[#183e36] px-4 py-3 text-xs font-semibold text-white shadow-lg transition-transform hover:scale-105"
    >
      <span aria-hidden="true">💬</span>
      Chat WhatsApp
    </a>
  );
};
