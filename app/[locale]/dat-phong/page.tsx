import type { Metadata } from "next";
import { Hero } from "@/components/hero/Hero";
import { Container } from "@/components/layout/Container";
import { Breadcrumb } from "@/components/navigation/Breadcrumb";
import { BookingPageContent } from "@/components/booking/BookingPageContent";
import { getI18n } from "@/lib/i18n/server";
import { pageMetadata } from "@/lib/i18n/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const { locale, dict } = await getI18n();
  return pageMetadata({
    locale,
    path: "/dat-phong",
    title: dict.meta.booking.title,
    description: dict.meta.booking.description,
  });
}

/**
 * Đặt phòng — `/dat-phong` (CONFIRMED cần có trang; nội dung chi tiết phần lớn
 * [CHƯA XÁC ĐỊNH] vì File B không có mockup cho luồng sau khi tìm phòng — xem
 * docs/page-specifications.md mục 8). Phase 6 chỉ dựng Thanh tìm phòng + khu vực
 * kết quả MOCK, KHÔNG implement luồng thanh toán/thông tin khách (chưa có căn cứ).
 */
export default async function BookingPage({
  searchParams,
}: {
  searchParams: Promise<{ hotel?: string; room?: string }>;
}) {
  const { dict } = await getI18n();
  const resolvedSearchParams = await searchParams;
  return (
    <>
      <Hero
        size="compact"
        locationTag={dict.bookingPage.heroTag}
        headline={dict.bookingPage.heroHeadline}
        image="/images/dat-phong-hero.jpg"
        imageAlt={dict.bookingPage.heroImageAlt}
      />
      <section className="pb-20 md:pb-28">
        <Container>
          <Breadcrumb
            items={[
              { label: dict.common.home, href: "/" },
              { label: dict.nav.booking },
            ]}
          />
          <div className="mt-8 md:mt-10">
            <BookingPageContent initialLocation={resolvedSearchParams.hotel ?? "all"} />
          </div>
        </Container>
      </section>
    </>
  );
}
