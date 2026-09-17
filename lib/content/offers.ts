import type { Offer } from "@/lib/types";

/**
 * Ưu đãi — CONFIRMED nguyên văn từ File B trang 9 (đối chiếu qua ảnh embedded JPEG
 * trích xuất trực tiếp từ PDF, xem Phase 6.5 mục 16). Trước đó `description` của Ember
 * Style/Little Bay và icon từng quyền lợi là MOCK do chưa có nguyên văn — nay đã thay
 * bằng nội dung CONFIRMED.
 *
 * `slug` là tự thêm (kỹ thuật, dùng cho URL `/lien-he?offer=...`), không phải nội dung
 * nghiệp vụ.
 */
export const offers: Offer[] = [
  {
    property: "central",
    slug: "stay-a-little-longer",
    name: "Stay a Little Longer",
    description: "Thêm một đêm để Đà Lạt chậm lại một chút.",
    dateRangeLabel: "01.09 — 30.11.2026",
    benefits: [
      { icon: "bed", text: "Giảm 15% khi đặt từ 2 đêm" },
      { icon: "cup", text: "Tặng bữa sáng cho 2 khách" },
      { icon: "gift", text: "Miễn phí nâng hạng phòng (tùy tình trạng phòng)" },
    ],
    tag: ["CITY", "PEOPLE", "CONNECTIONS"],
    image: "/images/offer-central.jpg",
  },
  {
    property: "ember-style",
    slug: "a-warmer-you",
    name: "A Warmer You",
    description: "Kỳ nghỉ ấm áp hơn với những đặc quyền riêng.",
    dateRangeLabel: "15.09 — 31.12.2026",
    benefits: [
      { icon: "swirl", text: "Tặng 01 set trà chiều cho 2 khách" },
      { icon: "star", text: "Ưu đãi 10% dịch vụ F&B" },
      { icon: "clock", text: "Nhận phòng sớm / Trả phòng muộn (tùy tình trạng phòng)" },
    ],
    tag: ["PEOPLE", "MOMENTS", "A WARMER YOU"],
    image: "/images/offer-ember-style.jpg",
  },
  {
    property: "little-bay",
    slug: "a-little-getaway",
    name: "A Little Getaway",
    description: "Tách mình khỏi phố, chạm vào thiên nhiên.",
    dateRangeLabel: "01.10 — 31.12.2026",
    benefits: [
      { icon: "leaf", text: "Giảm 10% khi đặt từ 2 đêm" },
      { icon: "lotus", text: "Tặng trải nghiệm trà & thiền sáng" },
      { icon: "tent", text: "Miễn phí hoạt động ngoài trời (tùy lịch trình)" },
    ],
    tag: ["NATURE", "RELAXATION", "A DIFFERENT YOU"],
    image: "/images/offer-little-bay.jpg",
  },
];
