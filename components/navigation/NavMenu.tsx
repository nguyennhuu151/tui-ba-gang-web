"use client";

import { LocaleLink } from "@/components/navigation/LocaleLink";
import { mainNavItems } from "@/lib/content/navigation";
import { useI18n, usePathnameWithoutLocale } from "@/lib/i18n/client";

/**
 * NavMenu — menu chính 6 mục, có gạch chân khi active.
 * Xem docs/design-system.md mục 8 (Header): "Khi nhấn vào tab sẽ có gạch chân hiển thị".
 *
 * `inverse` — chữ màu sáng (dùng khi Header trong suốt, đè trên ảnh hero) thay cho
 * màu tối mặc định — xem Header.tsx (Phase 6.5 mục 3).
 */
export function NavMenu({ inverse = false }: { inverse?: boolean }) {
  const pathname = usePathnameWithoutLocale();
  const { dict } = useI18n();

  return (
    <nav aria-label={dict.nav.mainMenu} className="hidden items-center gap-8 lg:flex">
      {mainNavItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <LocaleLink
            key={item.href}
            href={item.href}
            className={`text-sm transition-colors ${
              inverse ? "text-cream-50 hover:text-cream-100" : "text-ink hover:text-brown-800"
            } ${
              isActive
                ? inverse
                  ? "underline decoration-cream-50 underline-offset-8"
                  : "underline decoration-brown-800 underline-offset-8"
                : ""
            }`}
          >
            {dict.nav[item.key]}
          </LocaleLink>
        );
      })}
    </nav>
  );
}
