/**
 * Cấu hình đa ngôn ngữ (i18n) — xem docs/technical-decisions.md #8.
 * URL luôn có tiền tố locale: `/vi/...`, `/en/...`. Đường dẫn không có tiền tố (vd. link cũ
 * `/phong-nghi`) được `proxy.ts` chuyển hướng sang locale phù hợp.
 */

export const locales = ["vi", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "vi";

/** Cookie ghi nhớ ngôn ngữ khách đã chọn qua LanguageSwitcher — proxy.ts đọc khi chuyển hướng. */
export const LOCALE_COOKIE = "NEXT_LOCALE";

export const ogLocales: Record<Locale, string> = { vi: "vi_VN", en: "en_US" };

export function hasLocale(value: string | undefined): value is Locale {
  return locales.includes(value as Locale);
}

/** Lấy locale từ segment đầu của pathname (`/en/uu-dai` → "en"), không có thì trả về locale mặc định. */
export function localeFromPathname(pathname: string | null | undefined): Locale {
  const segment = pathname?.split("/")[1];
  return hasLocale(segment) ? segment : defaultLocale;
}

/** Bỏ tiền tố locale: `/en/uu-dai` → `/uu-dai`, `/en` → `/`. */
export function stripLocale(pathname: string): string {
  const segment = pathname.split("/")[1];
  if (!hasLocale(segment)) return pathname;
  return pathname.slice(segment.length + 1) || "/";
}

/**
 * Thêm tiền tố locale cho link nội bộ (`/uu-dai` → `/en/uu-dai`). Link ngoài, `tel:`,
 * `mailto:`, neo `#...` giữ nguyên.
 */
export function localizeHref(href: string, locale: Locale): string {
  if (!href.startsWith("/") || href.startsWith("//")) return href;
  if (hasLocale(href.split(/[/?#]/)[1])) return href;
  return href === "/" ? `/${locale}` : `/${locale}${href}`;
}
