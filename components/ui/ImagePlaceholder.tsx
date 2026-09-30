"use client";

import { useI18n } from "@/lib/i18n/client";

/**
 * ImagePlaceholder — ô trống dùng để CHỪA SẴN chỗ cho ảnh thật sẽ thêm sau này,
 * khác với ảnh minh hoạ tạm thời (public/images/*.jpg) — ô này cố ý không có ảnh
 * để rõ ràng là "chưa có nội dung" thay vì trông giống ảnh thật đã xong.
 * Khi có ảnh thật: thay bằng <Image> bình thường, xoá component này khỏi chỗ dùng.
 */
export function ImagePlaceholder({
  label,
  className = "",
}: {
  label?: string;
  className?: string;
}) {
  const { dict } = useI18n();

  return (
    <div
      className={`flex items-center justify-center rounded-lg border-2 border-dashed border-cream-200 bg-cream-100 ${className}`}
    >
      <div className="flex flex-col items-center gap-2 px-6 text-center text-brown-600">
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
          <rect x="3" y="5" width="22" height="18" rx="2" stroke="currentColor" strokeWidth="1.4" />
          <circle cx="10" cy="12" r="2" stroke="currentColor" strokeWidth="1.4" />
          <path d="M3 19l6-6 4 4 5-5 7 7" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
        </svg>
        <p className="text-xs">{label ?? dict.common.imageComingSoon}</p>
      </div>
    </div>
  );
}
