"use client";

import { usePathname } from "next/navigation";
import { LOCALE_COOKIE, localeFromPathname, stripLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";

/** Locale hiện tại phía client — đọc từ URL nên dùng được cả ở global-error/not-found. */
export function useLocale(): Locale {
  return localeFromPathname(usePathname());
}

/** `{ locale, dict }` phía client — cùng dạng với `getI18n()` ở server. */
export function useI18n() {
  const locale = useLocale();
  return { locale, dict: getDictionary(locale) };
}

/** Pathname đã bỏ tiền tố locale — dùng để so khớp menu đang active, trang có Hero... */
export function usePathnameWithoutLocale(): string {
  return stripLocale(usePathname() ?? "/");
}

/** Ghi nhớ ngôn ngữ khách chọn (1 năm) — proxy.ts đọc cookie này khi chuyển hướng URL chưa có locale. */
export function persistLocale(locale: Locale) {
  document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=31536000; samesite=lax`;
}
