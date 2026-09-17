import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { SectionLabel } from "@/components/layout/SectionLabel";
import { PropertyOverlayCard } from "@/components/hotel/PropertyOverlayCard";
import { properties } from "@/lib/content/properties";
import { libraryContent } from "@/lib/content/library";

export const metadata: Metadata = {
  title: "Thư viện | Túi Ba Gang",
  description: "Khám phá landing page đầy đủ của từng cơ sở Túi Ba Gang: Central, Ember Style, Little Bay.",
};

/**
 * Thư viện — `/thu-vien` (CONFIRMED — File B trang 5, đối chiếu qua ảnh embedded
 * JPEG trích xuất trực tiếp từ PDF — không có banner ảnh riêng (giống trang Phòng
 * nghỉ), chỉ có text trên nền cream rồi tới ngay 3 ảnh cơ sở — xem Phase 6.5 mục 11
 * + 12. Bản cũ dùng `<Hero>` (ảnh sai `hero-home.jpg`, text sai) + card kiểu ảnh trên/
 * chữ dưới — sai cả text lẫn bố cục, đã thay bằng đúng cấu trúc tham chiếu: số 01/02/03
 * + tên + mô tả + nút overlay TRỰC TIẾP lên ảnh cơ sở.
 *
 * Phase 6.6 mục 3.1 (bug fix): cùng nguyên nhân với `/phong-nghi` mục 1.2 — trang không
 * có Hero, section đầu trước đó chỉ `py-16 md:py-24`, không đủ né Header `fixed`, khiến
 * phần đầu (và do đó cảm giác "mất nav khi cuộn" — nav bị nội dung/Header tranh chỗ ở
 * đầu trang) xảy ra. Đã đổi sang `pt-32 md:pt-40` giống `/phong-nghi`. Nguyên nhân chính
 * của mục 3.1 là do Header.tsx trước đó ẩn/đổi màu theo scroll — đã sửa tận gốc ở
 * `components/layout/Header.tsx` (xem comment tại đó); phần padding này là sửa bổ sung
 * cho khoảng đệm đầu trang.
 */
export default function LibraryIndexPage() {
  const { hero, cards } = libraryContent;

  return (
    <section className="pt-32 pb-16 md:pt-40 md:pb-24">
      <Container>
        <div className="mb-10 flex flex-wrap items-start justify-between gap-6 md:mb-14">
          <div>
            <SectionLabel>{hero.label}</SectionLabel>
            <h1 className="mt-3 font-heading text-3xl leading-tight text-ink md:text-4xl">
              {hero.headline}
            </h1>
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-brown-600">{hero.description}</p>
          </div>
          <p className="hidden text-right font-heading text-lg italic leading-snug text-ink md:block">
            {hero.tag.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {properties.map((property, index) => {
            const card = cards[property.slug];
            return (
              <PropertyOverlayCard
                key={property.slug}
                property={property}
                index={index}
                showNumber
                description={card.description}
                tags={[...card.tags]}
                ctaLabel={`XEM THƯ VIỆN ${property.shortName.toUpperCase()}`}
              />
            );
          })}
        </div>
      </Container>
    </section>
  );
}
