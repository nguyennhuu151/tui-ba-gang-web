import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { SectionLabel } from "@/components/layout/SectionLabel";
import { PropertyOverlayCard } from "@/components/hotel/PropertyOverlayCard";
import { properties } from "@/lib/content/properties";

export const metadata: Metadata = {
  title: "Phòng nghỉ | Túi Ba Gang",
  description: "Chọn 1 trong 3 cơ sở Túi Ba Gang để xem danh sách hạng phòng: Central, Ember Style, Little Bay.",
};

/**
 * Phòng nghỉ — `/phong-nghi` (CONFIRMED — File B trang 3, đối chiếu qua ảnh embedded
 * JPEG trích xuất trực tiếp từ PDF — không có banner ảnh tối kiểu Hero như các trang
 * khác; bố cục thật là 2 cột: text bên trái + 3 ảnh cơ sở bên phải (ảnh cơ sở CHÍNH
 * LÀ nơi hiển thị tên/nút "Xem phòng" đè lên, không phải section riêng bên dưới) —
 * xem Phase 6.5 mục 6.1 + 6.2. Bản cũ dùng `<Hero>` + `PropertyCard` tách rời là SAI
 * bố cục tham chiếu, đã thay bằng đúng cấu trúc này.
 *
 * Phase 6.6 mục 1.2 (bug fix): trang này không có Hero nên section đầu tiên trước đó
 * chỉ dùng `py-16 md:py-24` (64px/96px) — KHÔNG đủ để né Header `position: fixed`
 * (cao 80px mobile / 96px desktop), khiến phần đầu nội dung bị Header đè lên, đặc biệt
 * ở mobile — đây là nguyên nhân hợp lý nhất gây cảm giác "footer bị nhảy lên trên" (nội
 * dung phía trên bị che/kéo lên chồng vào Header). Đã đổi sang `pt-32 md:pt-40` (khớp
 * đúng khoảng đệm đã dùng đúng ở trang chi tiết phòng `[hotel]/[room]/page.tsx`), giữ
 * nguyên padding-bottom cũ.
 */
export default function RoomsIndexPage() {
  return (
    <section className="pt-32 pb-16 md:pt-40 md:pb-24">
      <Container className="grid gap-10 lg:grid-cols-[0.85fr_2.3fr] lg:items-start">
        <div>
          <SectionLabel>PHÒNG NGHỈ</SectionLabel>
          <h1 className="mt-4 font-heading text-3xl leading-tight text-ink md:text-4xl">
            <span className="block">Ba nơi dừng chân,</span>
            <span className="block">ba sắc thái Đà Lạt.</span>
          </h1>
          <p className="mt-5 text-sm leading-relaxed text-brown-600">
            Dù là một kỳ nghỉ giữa lòng thành phố, một góc yên bình bên hồ, hay một không gian ấm
            áp mang dấu ấn riêng, Túi Ba Gang luôn có một nơi phù hợp dành cho bạn.
          </p>
          <p className="mt-6 font-heading text-lg italic leading-snug text-ink">
            A little stay
            <br />
            A deeper connection.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {properties.map((property, index) => (
            <PropertyOverlayCard
              key={property.slug}
              property={property}
              index={index}
              ctaHref={`/phong-nghi/${property.slug}`}
              ctaLabel="XEM PHÒNG"
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
