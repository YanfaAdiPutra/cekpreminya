import type { MetadataRoute } from "next";
import { ARTICLES } from "@/lib/articles";
import { PRODUCTS, SITE } from "@/lib/site-config";

export const dynamic = "force-static";

const STATIC_ROUTES = [
  "",
  "/cek-premi",
  "/tentang",
  "/faq",
  "/kontak",
  "/artikel",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries = STATIC_ROUTES.map((route) => ({
    url: `${SITE.url}${route}`,
  }));

  const productEntries = PRODUCTS.map((product) => ({
    url: `${SITE.url}/produk/${product.slug}`,
  }));

  const articleEntries = ARTICLES.map((article) => ({
    url: `${SITE.url}/artikel/${article.slug}`,
    lastModified: article.publishedAt,
  }));

  return [...staticEntries, ...productEntries, ...articleEntries];
}
