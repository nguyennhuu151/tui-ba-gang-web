import type { Metadata } from "next";
import { locales, ogLocales, type Locale } from "@/lib/i18n/config";
import { siteName } from "@/lib/site";

/** Ảnh chia sẻ mặc định (Open Graph) khi trang không có ảnh riêng. */
export const DEFAULT_OG_IMAGE = "/images/hero-home.jpg";

/**
 * Metadata cho 1 trang theo locale: title, description, canonical và hreflang trỏ sang
 * phiên bản ngôn ngữ còn lại. `path` là đường dẫn KHÔNG có tiền tố locale (vd. "/uu-dai").
 * Next.js ghi đè nguyên object `openGraph` của layout (không gộp từng field), nên phải khai
 * báo đủ các field ở đây.
 */
export function pageMetadata({
  locale,
  path,
  title,
  description,
  image = DEFAULT_OG_IMAGE,
}: {
  locale: Locale;
  path: string;
  title: string;
  description?: string;
  image?: string;
}): Metadata {
  const suffix = path === "/" ? "" : path;
  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}${suffix}`,
      languages: {
        ...Object.fromEntries(locales.map((l) => [l, `/${l}${suffix}`])),
        "x-default": `/vi${suffix}`,
      },
    },
    openGraph: {
      type: "website",
      siteName,
      locale: ogLocales[locale],
      alternateLocale: locales.filter((l) => l !== locale).map((l) => ogLocales[l]),
      url: `/${locale}${suffix}`,
      title,
      description,
      images: [{ url: image, alt: siteName }],
    },
  };
}
