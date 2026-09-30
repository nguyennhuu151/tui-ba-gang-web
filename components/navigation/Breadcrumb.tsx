import { LocaleLink } from "@/components/navigation/LocaleLink";

/**
 * Breadcrumb — đường dẫn quay lại, dùng ở trang chi tiết hạng phòng
 * (`/phong-nghi/:hotel/:roomSlug`) — xem docs/ui-component-spec.md mục 2.2.
 */
export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="flex flex-wrap items-center gap-3 py-3 text-sm text-brown-600"
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <span key={`${item.label}-${index}`} className="flex items-center gap-3">
            {item.href && !isLast ? (
              <LocaleLink
                href={item.href}
                className="py-1 leading-6 hover:text-ink hover:underline"
              >
                {item.label}
              </LocaleLink>
            ) : (
              <span
                aria-current={isLast ? "page" : undefined}
                className={`py-1 leading-6 ${isLast ? "font-medium text-ink" : ""}`}
              >
                {item.label}
              </span>
            )}
            {!isLast && (
              <span aria-hidden="true" className="text-brown-400">
                /
              </span>
            )}
          </span>
        );
      })}
    </nav>
  );
}
