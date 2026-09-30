"use client";

import { useState } from "react";
import { LocaleLink } from "@/components/navigation/LocaleLink";
import { mainNavItems, bookingHref } from "@/lib/content/navigation";
import { Button } from "@/components/ui/Button";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { useI18n } from "@/lib/i18n/client";

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
  const { dict } = useI18n();

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-label={open ? dict.nav.closeMenu : dict.nav.openMenu}
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
          <nav aria-label={dict.nav.mainMenuMobile} className="flex flex-col gap-5">
            {mainNavItems.map((item) => (
              <LocaleLink
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="font-heading text-lg text-ink"
              >
                {dict.nav[item.key]}
              </LocaleLink>
            ))}
          </nav>
          <div className="mt-6">
            <Button href={bookingHref} onClick={() => setOpen(false)} className="w-full justify-center">
              {dict.common.bookNow}
            </Button>
          </div>
          {/* Trước đây LanguageSwitcher chỉ hiện từ màn hình `lg` (desktop) — thêm vào menu
              mobile để khách dùng điện thoại cũng đổi được ngôn ngữ. */}
          <div className="mt-6 border-t border-cream-200 pt-4">
            <LanguageSwitcher variant="inline" />
          </div>
        </div>
      )}
    </div>
  );
}
