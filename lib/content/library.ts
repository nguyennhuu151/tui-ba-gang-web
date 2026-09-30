import type { Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";

/**
 * Nội dung riêng cho trang Thư viện (`/thu-vien`) — CONFIRMED nguyên văn từ File B trang 5.
 * Mô tả + tag trên card từng cơ sở lấy từ `property.listingLine` / `property.tags`
 * (dùng chung với trang Liên hệ — File B dùng lại đúng các dòng này cho cả 2 trang).
 */
/** Text theo ngôn ngữ nằm ở `libraryPage` trong lib/i18n/dictionaries. */
export function getLibraryContent(locale: Locale) {
  const dict = getDictionary(locale);
  return {
    hero: {
      label: dict.libraryPage.label,
      headline: dict.libraryPage.headline,
      description: dict.libraryPage.description,
      tag: ["People", "Places", "Moments", "A warmer you."],
    },
  };
}
