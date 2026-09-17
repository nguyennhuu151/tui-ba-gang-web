import type { ReactElement } from "react";
import type { AmenityItem } from "@/lib/types";

/**
 * AmenityIconList — danh sách icon tiện nghi, khác nhau theo từng cơ sở — xem
 * docs/ui-component-spec.md mục 2.5. Icon set tối giản, tự vẽ (không phụ thuộc thư
 * viện icon ngoài, đúng nguyên tắc "không over-engineering").
 *
 * Hỗ trợ 2 kiểu hiển thị, tự động chọn dựa trên dữ liệu (CONFIRMED File B trang 6/7/8,
 * Phase 6.5 mục 13-15):
 * - `title` có giá trị → icon tròn + tiêu đề + mô tả (Central, Little Bay).
 * - Ngược lại → icon + nhãn ngắn, dùng `dark` khi nằm trên nền tối (Ember Style).
 */
const ICONS: Record<AmenityItem["icon"], ReactElement> = {
  wifi: (
    <path d="M2 7.5a10 10 0 0 1 14 0M4.6 10a6.4 6.4 0 0 1 8.8 0M7.2 12.6a2.8 2.8 0 0 1 3.6 0M9 15h.01" strokeLinecap="round" strokeLinejoin="round" />
  ),
  pool: (
    <path d="M2 12c1.5 1.3 3 1.3 4.5 0s3-1.3 4.5 0 3 1.3 4.5 0M4 8h10M6 5l2-2 2 2" strokeLinecap="round" strokeLinejoin="round" />
  ),
  breakfast: (
    <path d="M3 5h9v4a4.5 4.5 0 0 1-9 0V5Zm9 1h1.5a2 2 0 0 1 0 4H12M3 15h9" strokeLinecap="round" strokeLinejoin="round" />
  ),
  parking: (
    <path d="M4 3h4a3 3 0 0 1 0 6H6v5M4 3v11" strokeLinecap="round" strokeLinejoin="round" />
  ),
  spa: (
    <path d="M9 2c1.5 2 2.5 4 2.5 6A2.5 2.5 0 0 1 9 10.5 2.5 2.5 0 0 1 6.5 8C6.5 6 7.5 4 9 2ZM9 10.5V16" strokeLinecap="round" strokeLinejoin="round" />
  ),
  bar: (
    <path d="M3 3h12l-5 6.5V15h2M8 15h2M8 9.5 3 3" strokeLinecap="round" strokeLinejoin="round" />
  ),
  pet: (
    <path d="M5 6a1.5 1.5 0 1 1 0-3M13 6a1.5 1.5 0 1 0 0-3M4 9a1.3 1.3 0 1 1 0-2.6M14 9a1.3 1.3 0 1 0 0-2.6M9 8c2.2 0 4 1.6 4 3.6C13 14 10 16 9 16s-4-2-4-4.4C5 9.6 6.8 8 9 8Z" strokeLinecap="round" strokeLinejoin="round" />
  ),
  view: (
    <path d="M2 13l4-5 3 3 3-4 4 6H2Z" strokeLinecap="round" strokeLinejoin="round" />
  ),
  pin: (
    <>
      <path d="M9 16s5-4.7 5-8.6A5 5 0 1 0 4 7.4C4 11.3 9 16 9 16Z" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="9" cy="7.3" r="1.7" />
    </>
  ),
  bed: (
    <path d="M2 14V6a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v3h4V6a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v8M2 11h14M2 15v-1M16 15v-1" strokeLinecap="round" strokeLinejoin="round" />
  ),
  crown: (
    <path d="M3 13h12l1-7-4 3-3-5-3 5-4-3 1 7Z" strokeLinecap="round" strokeLinejoin="round" />
  ),
  lotus: (
    <path
      d="M9 3c1 2 1 4 0 6-1-2-1-4 0-6ZM4 6c1.8 1 3 2.6 3 4.5-2 0-3.6-1.2-4.6-3A6 6 0 0 1 4 6Zm10 0c-1.8 1-3 2.6-3 4.5 2 0 3.6-1.2 4.6-3A6 6 0 0 0 14 6ZM9 9.5c2.5 0 4.5 1.8 4.5 4.5h-9C4.5 11.3 6.5 9.5 9 9.5Z"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  sparkle: (
    <path d="M9 2l1.3 4.7L15 8l-4.7 1.3L9 14l-1.3-4.7L3 8l4.7-1.3L9 2Z" strokeLinejoin="round" />
  ),
  heart: (
    <path d="M9 15S2.5 10.8 2.5 6.6A3.6 3.6 0 0 1 9 4.4a3.6 3.6 0 0 1 6.5 2.2C15.5 10.8 9 15 9 15Z" strokeLinecap="round" strokeLinejoin="round" />
  ),
  leaf: (
    <path d="M15 3C7 3 3 7 3 15c8 0 12-4 12-12ZM3 15c2-4 5-7 9-9" strokeLinecap="round" strokeLinejoin="round" />
  ),
  pine: (
    <path d="M9 2 5.5 7h2L4.5 12h2L4 16h10l-2.5-4h2L11 12h2L9 2Z" strokeLinecap="round" strokeLinejoin="round" />
  ),
};

/**
 * `divided` — Phase 6.8 mục 5.3/7.2: CONFIRMED File B trang 6/8 dùng icon nét mảnh
 * KHÔNG có khung tròn bao quanh (khác kiểu icon+khung tròn ở nơi khác trên site), và có
 * gạch dọc mảnh phân cách giữa từng mục thay vì để rời rạc. Chỉ bật cho Central/Little
 * Bay (nền sáng) — Ember Style (`dark`) giữ nguyên kiểu icon+nhãn đơn giản đã đúng.
 */
export function AmenityIconList({
  items,
  dark = false,
  divided = false,
}: {
  items: AmenityItem[];
  dark?: boolean;
  divided?: boolean;
}) {
  const hasDetail = items.some((item) => item.title);

  const iconWrapClass = dark
    ? "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-cream-50/40 text-cream-50"
    : "flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-cream-100 text-brown-800";

  if (hasDetail) {
    const colsClass =
      items.length >= 5 ? "md:grid-cols-5" : items.length === 4 ? "md:grid-cols-4" : items.length === 3 ? "md:grid-cols-3" : "md:grid-cols-2";

    if (divided) {
      return (
        <ul className={`grid grid-cols-2 gap-x-6 gap-y-8 ${colsClass}`}>
          {items.map((item, index) => (
            <li
              key={item.title}
              className={`flex flex-col items-start gap-3 ${index > 0 ? "md:border-l md:border-brown-800/15 md:pl-6" : ""}`}
            >
              <svg width="22" height="22" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.1" className="text-brown-800" aria-hidden="true">
                {ICONS[item.icon]}
              </svg>
              <div>
                <p className="text-xs font-medium uppercase tracking-label text-ink">{item.title}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-brown-600">{item.description}</p>
              </div>
            </li>
          ))}
        </ul>
      );
    }

    return (
      <ul className={`grid grid-cols-2 gap-x-6 gap-y-8 ${colsClass}`}>
        {items.map((item) => (
          <li key={item.title} className="flex flex-col items-start gap-3">
            <span className={iconWrapClass}>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true">
                {ICONS[item.icon]}
              </svg>
            </span>
            <div>
              <p className={`text-xs font-medium uppercase tracking-label ${dark ? "text-cream-50" : "text-ink"}`}>{item.title}</p>
              <p className={`mt-1.5 text-sm leading-relaxed ${dark ? "text-cream-50/75" : "text-brown-600"}`}>{item.description}</p>
            </div>
          </li>
        ))}
      </ul>
    );
  }

  const colsClass =
    items.length >= 5 ? "md:grid-cols-5" : items.length === 4 ? "md:grid-cols-4" : items.length === 3 ? "md:grid-cols-3" : "md:grid-cols-2";

  return (
    <ul className={`grid grid-cols-2 gap-x-6 gap-y-4 ${colsClass}`}>
      {items.map((item) => (
        <li key={item.label} className="flex items-center gap-3">
          <span className={iconWrapClass}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true">
              {ICONS[item.icon]}
            </svg>
          </span>
          <span className={`text-sm ${dark ? "text-cream-50/85" : "text-brown-600"}`}>{item.label}</span>
        </li>
      ))}
    </ul>
  );
}
