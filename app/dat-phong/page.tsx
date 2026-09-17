import type { Metadata } from "next";
import { Hero } from "@/components/hero/Hero";
import { BookingPageContent } from "@/components/booking/BookingPageContent";

export const metadata: Metadata = {
  title: "Đặt phòng | Túi Ba Gang",
  description: "Tìm và đặt phòng tại Central, Ember Style, Little Bay.",
};

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
  const resolvedSearchParams = await searchParams;
  return (
    <>
      <Hero
        size="compact"
        locationTag="ĐẶT PHÒNG"
        headline={["Tìm phòng trống", "tại 3 cơ sở."]}
        image="/images/dat-phong-hero.jpg"
        imageAlt="Đặt phòng Túi Ba Gang"
      />
      <section className="pb-20 md:pb-28">
        <BookingPageContent initialLocation={resolvedSearchParams.hotel ?? "all"} />
      </section>
    </>
  );
}
