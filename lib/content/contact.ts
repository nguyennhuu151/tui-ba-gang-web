/**
 * Nội dung riêng cho trang Liên hệ (`/lien-he`) — CONFIRMED nguyên văn từ File B trang
 * 10 (đối chiếu qua ảnh embedded JPEG trích xuất trực tiếp từ PDF, xem Phase 6.6 mục 4).
 *
 * `cards[slug].description` trùng nội dung với `libraryContent.cards[slug].description`
 * (`lib/content/library.ts`) vì File B dùng lại đúng 1 dòng tagline cho cả 2 trang Thư
 * viện và Liên hệ — đây KHÔNG phải trùng lặp ngẫu nhiên, là xác nhận trực tiếp từ ảnh
 * gốc, nên khai báo riêng ở đây (thay vì import chung) để mỗi trang giữ nguồn nội dung
 * CONFIRMED độc lập của chính nó, tránh 1 trang sau này sửa nội dung của trang kia.
 *
 * `tags` cũng trùng với `libraryContent.cards[slug].tags` — cùng lý do.
 */
export const contactContent = {
  banner: {
    label: "LIÊN HỆ",
    headline: ["Mỗi hành trình,", "một điểm chạm."],
    description:
      "Chọn nơi bạn muốn dừng chân. Chúng tôi luôn sẵn sàng đồng hành cùng kỳ nghỉ của bạn tại Đà Lạt.",
    tagline: "SAME PLACES, A DIFFERENT YOU.",
    image: "/images/contact-banner.jpg",
    topRightTag: ["People", "Places", "Moments", "A warmer you."],
  },
  cards: {
    central: {
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
  /**
   * Section cuối trang — CONFIRMED File B trang 10, trước đó bị thiếu hoàn toàn
   * (Phase 6.6 mục 4.9). Ảnh toàn cảnh núi đồi Đà Lạt trong sương — dùng lại asset
   * sẵn có `destination/dalat/dalat-lake-church-mist.webp` (đã dùng ở trang Trải
   * nghiệm) thay vì trích ảnh riêng từ PDF, vì vùng ảnh gốc ở File B trang 10 có
   * chữ "TÚI BA GANG — ĐÀ LẠT" in thẳng trực tiếp lên ảnh (không tách rời được text
   * khỏi ảnh nền) — tái sử dụng asset đã CONFIRMED đúng chủ đề (núi đồi Đà Lạt trong
   * sương) rồi hiển thị chữ thật bằng HTML/CSS, nhất quán với cách trang Ưu đãi và
   * Trải nghiệm đang làm (không bao giờ dùng ảnh chụp màn hình PDF có chữ nhúng sẵn).
   */
  finalSection: {
    headline: ["TÚI BA GANG", "ĐÀ LẠT"],
    tagline: "Three places. One way of welcoming you.",
    image: "/images/destination/dalat/dalat-lake-church-mist.webp",
  },
} as const;
