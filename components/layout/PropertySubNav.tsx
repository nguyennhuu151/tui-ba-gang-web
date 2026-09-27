import { Logo } from "@/components/layout/Logo";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { TabFilter } from "@/components/navigation/TabFilter";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { properties } from "@/lib/content/properties";
import { bookingHref } from "@/lib/content/navigation";
import type { PropertySlug } from "@/lib/types";

/**
 * PropertySubNav — thay thế Header ở `/thu-vien/:hotel` (CONFIRMED — xem
 * docs/page-specifications.md mục 5a và docs/ui-component-spec.md mục 2.1):
 * "Có thanh điều hướng phụ riêng (tab chuyển đổi giữa 3 cơ sở + nút Đặt phòng),
 * không dùng menu chính."
 */
export function PropertySubNav({ activeProperty }: { activeProperty: PropertySlug }) {
  return (
    <header className="sticky top-0 z-30 border-b border-cream-200 bg-cream-50/95 backdrop-blur">
      <Container className="flex min-h-20 flex-wrap items-center justify-between gap-4 py-3 md:h-24 md:flex-nowrap md:py-0">
        <Logo href="/thu-vien" label="Về trang Thư viện" />
        <TabFilter
          activeKey={activeProperty}
          items={properties.map((p) => ({
            key: p.slug,
            label: p.shortName,
            href: `/thu-vien/${p.slug}`,
          }))}
        />
        <div className="flex items-center gap-5">
          <Button href={bookingHref} className="hidden sm:inline-flex" withArrow>
            ĐẶT PHÒNG
          </Button>
          <div className="hidden lg:block">
            <LanguageSwitcher />
          </div>
        </div>
      </Container>
    </header>
  );
}
