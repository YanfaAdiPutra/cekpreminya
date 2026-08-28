import { SITE } from "@/lib/site-config";

export const WhatsAppFloatingButton = (): React.ReactElement => {
  return (
    <a
      href={SITE.waLink}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat via WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full bg-whatsapp px-5 py-3 text-sm font-semibold text-white shadow-lg transition-transform hover:scale-105 hover:bg-whatsapp-dark"
    >
      <span aria-hidden="true">💬</span>
      Chat WhatsApp
    </a>
  );
};
