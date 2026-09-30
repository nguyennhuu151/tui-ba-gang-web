import type { Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";

/**
 * Nội dung riêng cho trang Liên hệ (`/lien-he`) — CONFIRMED nguyên văn từ File B trang 10.
 * Mô tả + tag trên card từng cơ sở lấy từ `property.listingLine` / `property.tags`.
 */
/** Text theo ngôn ngữ nằm ở `contactPage` trong lib/i18n/dictionaries. */
export function getContactContent(locale: Locale) {
  const dict = getDictionary(locale);
  return {
    banner: {
      label: dict.contactPage.label,
      headline: dict.contactPage.headline,
      description: dict.contactPage.description,
      tagline: "SAME PLACES, A DIFFERENT YOU.",
      image: "/images/contact-banner.jpg",
      topRightTag: ["People", "Places", "Moments", "A warmer you."],
    },
    finalSection: {
      headline: ["TÚI BA GANG", dict.contactPage.finalHeadlineCity],
      tagline: "Three places. One way of welcoming you.",
      image: "/images/destination/dalat/dalat-lake-church-mist.webp",
    },
  };
}
