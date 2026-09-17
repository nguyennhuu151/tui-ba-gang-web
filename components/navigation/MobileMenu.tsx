"use client";

import { useState } from "react";
import Link from "next/link";
import { mainNavItems, bookingHref } from "@/lib/content/navigation";
import { Button } from "@/components/ui/Button";

/**
 * MobileMenu — menu dạng hamburger/drawer cho màn hình < lg.
 * Căn cứ: docs/responsive-spec.md mục 3.1 (dựa trên icon hamburger quan sát được
 * ở trang 6 và trang 8 của File B).
 *
 * `inverse` — chỉ áp dụng cho icon hamburger lúc ĐÓNG (đè trên ảnh hero, Header trong
 * suốt — Phase 6.5 mục 3); panel drawer khi mở vẫn giữ nền đục/chữ tối như cũ.
 */
export function MobileMenu({ inverse = false }: { inverse?: boolean }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-label={open ? "Đóng menu" : "Mở menu"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className={`flex h-9 w-9 items-center justify-center ${
          inverse && !open ? "text-cream-50" : "text-ink"
        }`}
      >
        {open ? (
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
            <path d="M4 4l14 14M18 4 4 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
            <path d="M3 6h16M3 11h16M3 16h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        )}
      </button>

      {open && (
        <div className="fixed inset-x-0 top-[80px] z-40 border-t border-cream-200 bg-cream-50 px-6 py-6 shadow-lg">
          <nav aria-label="Menu chính (mobile)" className="flex flex-col gap-5">
            {mainNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="font-heading text-lg text-ink"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="mt-6">
            <Button href={bookingHref} onClick={() => setOpen(false)} className="w-full justify-center">
              ĐẶT PHÒNG
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
