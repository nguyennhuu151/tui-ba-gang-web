/**
 * Nội dung tĩnh của Trang chủ — nguyên văn CONFIRMED từ File B trang 1
 * (xem docs/page-specifications.md mục 1 và docs/requirements-analysis.md).
 * Không thêm section/nội dung nào ngoài phạm vi đã xác nhận.
 */
export const homepageContent = {
  hero: {
    locationTag: "ĐÀ LẠT, VIỆT NAM",
    headline: ["Ba không gian,", "một tinh thần."],
    description:
      "Khám phá những cách khác nhau để trải nghiệm Đà Lạt cùng Túi Ba Gang.",
    ctaLabel: "KHÁM PHÁ NGAY",
    ctaHref: "/phong-nghi",
  },
  brandIntro: {
    label: "TÚI BA GANG",
    headline: ["Giữa lòng Đà Lạt,", "một trải nghiệm rất riêng."],
    description:
      "Túi Ba Gang là nơi giao thoa giữa nét đẹp bản địa và hơi thở hiện đại, mang đến cho bạn những khoảng khắc an yên giữa lòng thành phố sương mù.",
    ctaLabel: "CÂU CHUYỆN CỦA CHÚNG TÔI",
    ctaHref: "/ve-chung-toi",
  },
  ourStaysLabel: "TÚI BA GANG",
  banner: {
    line1: "SAME PLACES,",
    line2: "A DIFFERENT YOU.",
    quote: "Có những chuyến đi không chỉ để đến, mà để trở về với chính mình.",
  },
} as const;
