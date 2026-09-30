import type { ExperienceItem } from "@/lib/types";
import type { Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";

/**
 * Trải nghiệm — CONFIRMED nguyên văn từ File B trang 4 (đối chiếu qua ảnh embedded
 * JPEG trích xuất trực tiếp từ PDF — xem Phase 6.5 mục 10.3). Khác bản Phase 5/6
 * trước đó: mô tả KHÔNG còn là MOCK, đã thay bằng đúng text tham chiếu. Trang chi
 * tiết riêng cho từng trải nghiệm vẫn [CHƯA XÁC ĐỊNH] (xem docs/open-questions.md F2)
 * nên 3/4 card vẫn dùng neo (anchor), không tự bịa trang đích.
 */
/** Tiêu đề/mô tả theo ngôn ngữ nằm ở `experiences.<slug>` trong lib/i18n/dictionaries. */
const experienceBase: Omit<ExperienceItem, "title" | "description">[] = [
  {
    slug: "mot-buoi-sang-cham",
    image: "/images/experiences/exp-mot-buoi-sang-cham.webp",
  },
  {
    slug: "huong-vi-da-lat",
    image: "/images/experiences/exp-huong-vi-da-lat.webp",
  },
  {
    slug: "nhung-goc-da-lat",
    image: "/images/experiences/exp-nhung-goc-da-lat.webp",
  },
  {
    slug: "o-lai-tan-huong",
    image: "/images/experiences/exp-o-lai-tan-huong.webp",
    // CONFIRMED File B trang 4 (Phase 6.5 mục 10.4): riêng card này dẫn sang Thư viện.
    ctaHref: "/thu-vien",
  },
];

export function getExperiences(locale: Locale): ExperienceItem[] {
  const text = getDictionary(locale).experiences;
  return experienceBase.map((item) => ({ ...item, ...text[item.slug] }));
}
