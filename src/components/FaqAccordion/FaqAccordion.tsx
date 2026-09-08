import type { FaqItem } from "@/lib/faqs";

export interface FaqAccordionProps {
  items: FaqItem[];
}

export const FaqAccordion = ({
  items,
}: FaqAccordionProps): React.ReactElement => {
  return (
    <div className="space-y-4">
      {items.map((faq) => (
        <details
          key={faq.question}
          className="group rounded-2xl border border-slate-200 p-6"
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold text-slate-900 marker:content-none [&::-webkit-details-marker]:hidden">
            <span>{faq.question}</span>
            <span
              aria-hidden="true"
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand transition-transform duration-200 group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <p className="mt-3 text-sm text-slate-600">{faq.answer}</p>
        </details>
      ))}
    </div>
  );
};
