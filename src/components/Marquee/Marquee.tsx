export interface MarqueeProps {
  items: string[];
}

export const Marquee = ({ items }: MarqueeProps): React.ReactElement => {
  const content = `${items.join("   •   ")}   •   `;

  return (
    <div className="overflow-hidden bg-brand py-3">
      <div className="flex w-max animate-marquee whitespace-nowrap text-sm font-semibold uppercase tracking-wide text-white">
        <span className="px-4">{content}</span>
        <span className="px-4" aria-hidden="true">
          {content}
        </span>
      </div>
    </div>
  );
};
