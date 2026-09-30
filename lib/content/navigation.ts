/**
 * Menu chính — CONFIRMED từ File B trang 1 (xem docs/sitemap.md).
 * KHÔNG thêm mục nào ngoài danh sách đã xác nhận.
 * Nhãn menu lấy theo `key` trong `nav` của lib/i18n/dictionaries (`dict.nav[item.key]`).
 * `href` là đường dẫn không có locale — dùng qua `LocaleLink` để tự thêm `/vi`, `/en`.
 * URL giữ slug tiếng Việt cho cả bản EN (không dịch slug).
 */
export const mainNavItems = [
  { key: "about", href: "/ve-chung-toi" },
  { key: "rooms", href: "/phong-nghi" },
  { key: "experiences", href: "/trai-nghiem" },
  { key: "library", href: "/thu-vien" },
  { key: "offers", href: "/uu-dai" },
  { key: "contact", href: "/lien-he" },
] as const;

export const bookingHref = "/dat-phong";
