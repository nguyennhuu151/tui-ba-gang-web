import type { ExperienceItem } from "@/lib/types";

/**
 * Trải nghiệm — CONFIRMED nguyên văn từ File B trang 4 (đối chiếu qua ảnh embedded
 * JPEG trích xuất trực tiếp từ PDF — xem Phase 6.5 mục 10.3). Khác bản Phase 5/6
 * trước đó: mô tả KHÔNG còn là MOCK, đã thay bằng đúng text tham chiếu. Trang chi
 * tiết riêng cho từng trải nghiệm vẫn [CHƯA XÁC ĐỊNH] (xem docs/open-questions.md F2)
 * nên 3/4 card vẫn dùng neo (anchor), không tự bịa trang đích.
 */
export const experiences: ExperienceItem[] = [
  {
    slug: "mot-buoi-sang-cham",
    title: "Một buổi sáng chậm",
    description: "Cà phê và ánh nắng đầu ngày.",
    image: "/images/experiences/exp-mot-buoi-sang-cham.webp",
  },
  {
    slug: "huong-vi-da-lat",
    title: "Hương vị Đà Lạt",
    description: "Những nơi ngon mà chúng tôi yêu thích.",
    image: "/images/experiences/exp-huong-vi-da-lat.webp",
  },
  {
    slug: "nhung-goc-da-lat",
    title: "Những góc Đà Lạt",
    description: "Một vài nơi đáng để ghé qua.",
    image: "/images/experiences/exp-nhung-goc-da-lat.webp",
  },
  {
    slug: "o-lai-tan-huong",
    title: "Ở lại tận hưởng",
    description: "Đôi khi kỳ nghỉ đẹp nhất là không cần đi đâu.",
    image: "/images/experiences/exp-o-lai-tan-huong.webp",
    // CONFIRMED File B trang 4 (Phase 6.5 mục 10.4): riêng card này dẫn sang Thư viện.
    ctaHref: "/thu-vien",
  },
];
