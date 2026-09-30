"use client";

import { LocaleLink } from "@/components/navigation/LocaleLink";
import { usePathnameWithoutLocale } from "@/lib/i18n/client";

/**
 * TabFilter — tab có gạch chân khi active, dùng lại cho 2 nơi (theo đúng
 * docs/ui-component-spec.md mục 2.2):
 * - `PropertySubNav` (mỗi tab là 1 LINK sang trang khác — truyền `href`)
 * - Filter "Tất cả ưu đãi / Central / Ember Style / Little Bay" ở trang Ưu đãi,
 *   và filter chip hạng phòng ở trang Phòng nghỉ (mỗi tab là 1 NÚT đổi state
 *   trong cùng trang — truyền `onSelect`, không truyền `href`)
 */
export interface TabFilterItem {
  key: string;
  label: string;
  href?: string;
}

export function TabFilter({
  items,
  activeKey,
  onSelect,
  className = "",
}: {
  items: TabFilterItem[];
  activeKey: string;
  onSelect?: (key: string) => void;
  className?: string;
}) {
  const pathname = usePathnameWithoutLocale();

  return (
    <div className={`flex flex-wrap items-center gap-6 ${className}`} role="tablist">
      {items.map((item) => {
        const isActive = item.href ? pathname === item.href : item.key === activeKey;
        const classes = `pb-1 text-sm transition-colors ${
          isActive
            ? "border-b-2 border-brown-800 font-medium text-ink"
            : "border-b-2 border-transparent text-brown-600 hover:text-ink"
        }`;

        if (item.href) {
          return (
            <LocaleLink key={item.key} href={item.href} role="tab" aria-selected={isActive} className={classes}>
              {item.label}
            </LocaleLink>
          );
        }

        return (
          <button
            key={item.key}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onSelect?.(item.key)}
            className={classes}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
