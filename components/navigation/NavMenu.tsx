"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { mainNavItems } from "@/lib/content/navigation";

/**
 * NavMenu — menu chính 6 mục, có gạch chân khi active.
 * Xem docs/design-system.md mục 8 (Header): "Khi nhấn vào tab sẽ có gạch chân hiển thị".
 *
 * `inverse` — chữ màu sáng (dùng khi Header trong suốt, đè trên ảnh hero) thay cho
 * màu tối mặc định — xem Header.tsx (Phase 6.5 mục 3).
 */
export function NavMenu({ inverse = false }: { inverse?: boolean }) {
  const pathname = usePathname();

  return (
    <nav aria-label="Menu chính" className="hidden items-center gap-8 lg:flex">
      {mainNavItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
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
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
