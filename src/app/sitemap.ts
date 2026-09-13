import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site-config";
import { PRODUCTS } from "@/lib/site-config";
import { ARTICLES } from "@/lib/articles";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    "",
    "/cek-kebutuhan/",
    "/cek-premi/",
    "/panduan-klaim/",
    "/privasi/",
    "/tentang-kharis/",
    "/artikel/",
    ...ARTICLES.map((a) => `/artikel/${a.slug}/`),
    ...PRODUCTS.map((p) => `/produk/${p.slug}/`),
  ].map((path) => ({ url: `${SITE.url}${path}` }));
}
