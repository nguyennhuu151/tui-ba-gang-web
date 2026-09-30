import { locale as rootLocale } from "next/root-params";
import { defaultLocale, hasLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";

/**
 * Locale của request hiện tại — CHỈ dùng trong Server Component / generateMetadata
 * (đọc từ segment `app/[locale]` qua `next/root-params`, không cần truyền prop).
 * Component dùng được ở phía client thì dùng `useI18n()` trong lib/i18n/client.ts.
 */
export async function getLocale(): Promise<Locale> {
  const value = await rootLocale();
  return hasLocale(value) ? value : defaultLocale;
}

/** `{ locale, dict }` — `dict` là text của locale hiện tại (lib/i18n/dictionaries/vi.ts | en.ts). */
export async function getI18n() {
  const locale = await getLocale();
  return { locale, dict: getDictionary(locale) };
}
