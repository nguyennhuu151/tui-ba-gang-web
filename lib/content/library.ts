/**
 * Nội dung riêng cho trang Thư viện (`/thu-vien`) — CONFIRMED nguyên văn từ File B
 * trang 5 (đối chiếu qua ảnh embedded JPEG trích xuất trực tiếp từ PDF, xem Phase 6.5
 * mục 11 + 12).
 *
 * `cards[slug].description` khác với `property.cardDescription` ở `properties.ts` với
 * Little Bay — CONFIRMED trang Thư viện hiển thị "A little bay by Túi Ba Gang." (không
 * phải "Bình yên bên hồ, gần gũi thiên nhiên." như ở Trang chủ/Phòng nghỉ). Đây không
 * phải lỗi — tham chiếu PDF thật sự dùng 2 dòng khác nhau cho cùng 1 cơ sở tuỳ theo
 * trang, nên để riêng ở đây thay vì sửa field dùng chung `cardDescription` (tránh ảnh
 * hưởng các trang khác đã CONFIRMED đúng).
 */
export const libraryContent = {
  hero: {
    label: "THƯ VIỆN",
    headline: "Ba không gian, một tinh thần.",
    description: "Khám phá những cách khác nhau để trải nghiệm Đà Lạt cùng Túi Ba Gang.",
    tag: ["People", "Places", "Moments", "A warmer you."],
  },
  cards: {
    central: {
      // Phase 6.6 (bug fix bổ sung, phát hiện khi đối chiếu ảnh nhúng File B trang 10
      // cho mục 4.3): "gắn hơn" là lỗi chính tả so với tham chiếu gốc "gần hơn".
      description: "Ở giữa Đà Lạt, gần hơn với mọi cuộc hẹn.",
      tags: ["CITY", "PEOPLE", "CONNECTIONS"],
    },
    "ember-style": {
      description: "Ấm áp. Tinh tế. Năng lượng.",
      tags: ["PEOPLE", "MOMENTS", "A WARMER YOU"],
    },
    "little-bay": {
      description: "A little bay by Túi Ba Gang.",
      tags: ["NATURE", "RELAXATION", "A DIFFERENT YOU"],
    },
  },
} as const;
