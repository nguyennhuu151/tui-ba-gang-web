import type { Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";

/**
 * Nội dung tĩnh của Trang chủ — nguyên văn CONFIRMED từ File B trang 1
 * (xem docs/page-specifications.md mục 1 và docs/requirements-analysis.md).
 * Không thêm section/nội dung nào ngoài phạm vi đã xác nhận.
 */
/** Text theo ngôn ngữ nằm ở `home` trong lib/i18n/dictionaries; ở đây chỉ có phần dùng chung. */
export function getHomepageContent(locale: Locale) {
  const { home } = getDictionary(locale);
  return {
    hero: { ...home.hero, ctaHref: "/phong-nghi" },
    brandIntro: { label: "TÚI BA GANG", ...home.brandIntro, ctaHref: "/ve-chung-toi" },
    ourStaysLabel: "TÚI BA GANG",
    banner: {
      line1: "SAME PLACES,",
      line2: "A DIFFERENT YOU.",
      quote: home.bannerQuote,
    },
  };
}
