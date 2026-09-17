"use client";

import { useState } from "react";

/**
 * LanguageSwitcher — hiện tại là UI PLACEHOLDER, CHƯA có chức năng chuyển ngôn ngữ thật.
 *
 * Lý do: routing đa ngôn ngữ ([locale] + middleware, theo docs/architecture.md mục 8)
 * chưa được implement ở Phase 5 này (phạm vi Phase 5 chỉ là Homepage tiếng Việt).
 * Component này chỉ dựng đúng GIAO DIỆN đã CONFIRMED trong mockup (nút "VI ⌄" ở Header),
 * để không bị thiếu component khi ghép Header — xem báo cáo cuối Phase 5, mục "Chưa implement".
 *
 * `inverse` — chữ màu sáng khi Header trong suốt, đè trên ảnh hero (Phase 6.5 mục 3).
 * Panel dropdown khi mở vẫn giữ nền đục/chữ tối như cũ để luôn đọc được, bất kể `inverse`.
 */
export function LanguageSwitcher({ inverse = false }: { inverse?: boolean }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={`flex items-center gap-1 text-sm ${inverse ? "text-cream-50" : "text-ink"}`}
      >
        VI
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
          <path d="M2 3.5 5 6.5 8 3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        </svg>
      </button>
      {open && (
        <div className="absolute right-0 top-full z-10 mt-2 min-w-24 rounded-md border border-cream-200 bg-cream-50 py-1 shadow-md">
          <p className="px-3 py-1.5 text-sm text-ink">VI (hiện tại)</p>
          <p className="px-3 py-1.5 text-sm text-brown-600">
            EN — <span className="italic">sắp có</span>
          </p>
        </div>
      )}
    </div>
  );
}
