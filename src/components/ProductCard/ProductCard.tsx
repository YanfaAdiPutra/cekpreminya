import Image from "next/image";
import Link from "next/link";
import { withBasePath, type ProductSummary } from "@/lib/site-config";

export interface ProductCardProps {
  product: ProductSummary;
}

export const ProductCard = ({
  product,
}: ProductCardProps): React.ReactElement => {
  return (
    <Link
      href={`/produk/${product.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="relative h-44 w-full overflow-hidden">
        <Image
          src={withBasePath(`/images/${product.image}`)}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <span className="text-xs font-semibold uppercase tracking-wide text-emerald-600">
          {product.category}
        </span>
        <h3 className="text-lg font-bold text-slate-900">
          {product.shortName}
        </h3>
        <p className="text-sm text-slate-600">{product.description}</p>
        <span className="mt-auto pt-2 text-sm font-semibold text-emerald-700">
          Pelajari lebih lanjut &rarr;
        </span>
      </div>
    </Link>
  );
};
