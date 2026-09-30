"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { locales, type Locale } from "@/lib/i18n/config";
import { persistLocale, useI18n, usePathnameWithoutLocale } from "@/lib/i18n/client";

const LABELS: Record<Locale, string> = { vi: "Tiếng Việt", en: "English" };

/**
 * LanguageSwitcher — chuyển VI/EN, giữ nguyên trang đang xem (`/vi/uu-dai` ↔ `/en/uu-dai`)
 * kèm query/hash. Lựa chọn được lưu vào cookie để lần sau vào `/` (hoặc link không có
 * locale) `proxy.ts` đưa khách về đúng ngôn ngữ đã chọn.
 *
 * `inverse` — chữ màu sáng khi Header trong suốt, đè trên ảnh hero (Phase 6.5 mục 3).
 * `variant="inline"` — 2 nút nằm ngang, dùng trong menu mobile.
 */
export function LanguageSwitcher({
  inverse = false,
  variant = "dropdown",
}: {
  inverse?: boolean;
  variant?: "dropdown" | "inline";
}) {
  const { locale, dict } = useI18n();
  const pathname = usePathnameWithoutLocale();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  function switchTo(next: Locale) {
    setOpen(false);
    if (next === locale) return;
    persistLocale(next);
    const suffix = pathname === "/" ? "" : pathname;
    router.push(`/${next}${suffix}${window.location.search}${window.location.hash}`);
  }

  if (variant === "inline") {
    return (
      <div className="flex items-center gap-4 text-sm" role="group" aria-label={dict.language.label}>
        {locales.map((l) => (
          <button
            key={l}
            type="button"
            lang={l}
            onClick={() => switchTo(l)}
            aria-pressed={l === locale}
            className={l === locale ? "font-medium text-ink underline underline-offset-4" : "text-brown-600"}
          >
            {LABELS[l]}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={dict.language.choose}
        className={`flex items-center gap-1 text-sm uppercase ${inverse ? "text-cream-50" : "text-ink"}`}
      >
        {locale}
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
          <path d="M2 3.5 5 6.5 8 3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        </svg>
      </button>
      {open && (
        <ul
          role="listbox"
          aria-label={dict.language.label}
          className="absolute right-0 top-full z-10 mt-2 min-w-32 rounded-md border border-cream-200 bg-cream-50 py-1 shadow-md"
        >
          {locales.map((l) => (
            <li key={l} role="option" aria-selected={l === locale}>
              <button
                type="button"
                lang={l}
                onClick={() => switchTo(l)}
                className={`block w-full px-3 py-1.5 text-left text-sm hover:bg-cream-100 ${
                  l === locale ? "font-medium text-ink" : "text-brown-600"
                }`}
              >
                {LABELS[l]}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
