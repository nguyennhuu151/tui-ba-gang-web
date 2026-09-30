import type { Offer, OfferBenefit } from "@/lib/types";
import type { Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";

/**
 * Ưu đãi — CONFIRMED nguyên văn từ File B trang 9 (đối chiếu qua ảnh embedded JPEG
 * trích xuất trực tiếp từ PDF, xem Phase 6.5 mục 16). Trước đó `description` của Ember
 * Style/Little Bay và icon từng quyền lợi là MOCK do chưa có nguyên văn — nay đã thay
 * bằng nội dung CONFIRMED.
 *
 * `slug` là tự thêm (kỹ thuật, dùng cho URL `/lien-he?offer=...`), không phải nội dung
 * nghiệp vụ.
 *
 * i18n: tên ưu đãi, ngày và tag vốn là tiếng Anh/số nên dùng chung; mô tả và nội dung quyền
 * lợi theo ngôn ngữ nằm ở `offers.<slug>` trong lib/i18n/dictionaries (quyền lợi ghép theo
 * thứ tự với `benefitIcons` bên dưới).
 */
const offerBase: (Omit<Offer, "description" | "benefits"> & { benefitIcons: OfferBenefit["icon"][] })[] = [
  {
    property: "central",
    slug: "stay-a-little-longer",
    name: "Stay a Little Longer",
    dateRangeLabel: "01.09 — 30.11.2026",
    benefitIcons: ["bed", "cup", "gift"],
    tag: ["CITY", "PEOPLE", "CONNECTIONS"],
    image: "/images/offer-central.jpg",
  },
  {
    property: "ember-style",
    slug: "a-warmer-you",
    name: "A Warmer You",
    dateRangeLabel: "15.09 — 31.12.2026",
    benefitIcons: ["swirl", "star", "clock"],
    tag: ["PEOPLE", "MOMENTS", "A WARMER YOU"],
    image: "/images/offer-ember-style.jpg",
  },
  {
    property: "little-bay",
    slug: "a-little-getaway",
    name: "A Little Getaway",
    dateRangeLabel: "01.10 — 31.12.2026",
    benefitIcons: ["leaf", "lotus", "tent"],
    tag: ["NATURE", "RELAXATION", "A DIFFERENT YOU"],
    image: "/images/offer-little-bay.jpg",
  },
];

const cache = new Map<Locale, Offer[]>();

export function getOffers(locale: Locale): Offer[] {
  let list = cache.get(locale);
  if (!list) {
    const text = getDictionary(locale).offers;
    list = offerBase.map(({ benefitIcons, ...offer }) => ({
      ...offer,
      description: text[offer.slug].description,
      benefits: benefitIcons.map((icon, index) => ({ icon, text: text[offer.slug].benefits[index] })),
    }));
    cache.set(locale, list);
  }
  return list;
}
