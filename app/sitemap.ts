import type { MetadataRoute } from "next";
import { bookingHref, mainNavItems } from "@/lib/content/navigation";
import { propertySlugs } from "@/lib/content/properties";
import { getRooms } from "@/lib/content/rooms";
import { locales } from "@/lib/i18n/config";
import { siteUrl } from "@/lib/site";

/** Mỗi trang có 1 URL cho từng ngôn ngữ, kèm hreflang trỏ sang bản ngôn ngữ còn lại. */
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "/",
    ...mainNavItems.map((item) => item.href),
    bookingHref,
    ...propertySlugs.flatMap((slug) => [`/thu-vien/${slug}`, `/phong-nghi/${slug}`]),
    ...getRooms("vi").map((r) => `/phong-nghi/${r.hotel}/${r.slug}`),
  ];
  const urlFor = (locale: string, path: string) => `${siteUrl}/${locale}${path === "/" ? "" : path}`;

  return paths.flatMap((path) =>
    locales.map((locale) => ({
      url: urlFor(locale, path),
      alternates: { languages: Object.fromEntries(locales.map((l) => [l, urlFor(l, path)])) },
    })),
  );
}
