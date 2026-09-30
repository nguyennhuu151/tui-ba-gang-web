"use client";

import { useState } from "react";
import { useI18n } from "@/lib/i18n/client";

/**
 * VideoButton — nút tròn "▶ Xem video" + caption phụ, dùng ở trang Trải nghiệm.
 * CONFIRMED File B trang 4: có 2 dòng — "XEM VIDEO" (nhãn nút) và "Một ngày ở Túi Ba
 * Gang" (caption LUÔN hiển thị bên dưới, không phải tooltip) — bản cũ chỉ có 1 dòng,
 * dòng caption bị nhét nhầm vào phần ghi chú ẩn khi bấm (Phase 6.5 mục 10.1).
 * CHƯA có file video thật (xem docs/open-questions.md F3) — bấm vào vẫn chỉ hiện
 * ghi chú "chưa có sẵn", KHÔNG giả lập mở video giả (tránh gây hiểu lầm là tính năng
 * đã hoàn chỉnh).
 */
export function VideoButton({
  label,
  caption,
}: {
  label?: string;
  caption?: string;
}) {
  const [notice, setNotice] = useState(false);
  const { dict } = useI18n();
  const videoTitle = dict.experiencesPage.video.title;

  return (
    <div className="flex flex-col items-start gap-2">
      <button
        type="button"
        onClick={() => setNotice(true)}
        className="flex items-center gap-3 text-cream-50"
      >
        <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-cream-50/70 transition-colors hover:bg-cream-50/10">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
            <path d="M6 4.5 13.5 9 6 13.5V4.5Z" fill="currentColor" />
          </svg>
        </span>
        <span className="text-left">
          <span className="block text-sm uppercase tracking-label">{label ?? dict.experiencesPage.video.label}</span>
          <span className="block text-xs text-cream-50/75">{caption ?? videoTitle}</span>
        </span>
      </button>
      {notice && (
        <p role="status" className="max-w-xs text-xs text-cream-50/80">
          {dict.experiencesPage.video.unavailable(videoTitle)}
        </p>
      )}
    </div>
  );
}
