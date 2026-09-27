import type { MetadataRoute } from "next";
import { bookingHref, mainNavItems } from "@/lib/content/navigation";
import { properties } from "@/lib/content/properties";
import { rooms } from "@/lib/content/rooms";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "/",
    ...mainNavItems.map((item) => item.href),
    bookingHref,
    ...properties.flatMap((p) => [`/thu-vien/${p.slug}`, `/phong-nghi/${p.slug}`]),
    ...rooms.map((r) => `/phong-nghi/${r.hotel}/${r.slug}`),
  ];
  return paths.map((path) => ({ url: `${siteUrl}${path === "/" ? "" : path}` }));
}
