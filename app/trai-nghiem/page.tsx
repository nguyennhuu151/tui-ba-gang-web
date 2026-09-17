import type { Metadata } from "next";
import Image from "next/image";
import { Hero } from "@/components/hero/Hero";
import { VideoButton } from "@/components/hero/VideoButton";
import { Container } from "@/components/layout/Container";
import { SectionLabel } from "@/components/layout/SectionLabel";
import { Button } from "@/components/ui/Button";
import { ExperienceCard } from "@/components/content/ExperienceCard";
import { PropertyCard } from "@/components/hotel/PropertyCard";
import { experiences } from "@/lib/content/experiences";
import { properties } from "@/lib/content/properties";

export const metadata: Metadata = {
  title: "Trải nghiệm | Túi Ba Gang",
  description: "Trải nghiệm Đà Lạt theo phong cách Túi Ba Gang.",
};

/**
 * Trải nghiệm — `/trai-nghiem` (CONFIRMED nguyên văn — File B trang 4, đối chiếu qua
 * ảnh embedded JPEG trích xuất trực tiếp từ PDF — xem Phase 6.5 mục 10). Danh sách
 * địa điểm ăn uống/tham quan cụ thể vẫn [CHƯA XÁC ĐỊNH] (docs/open-questions.md F2)
 * nên khối "Khám phá Đà Lạt" chỉ là banner giới thiệu (đúng như mockup — mockup cũng
 * KHÔNG liệt kê địa điểm cụ thể nào), nút dùng neo tới chính section vì chưa có trang
 * đích được xác nhận.
 */
export default function ExperiencesPage() {
  return (
    <>
      <Hero
        size="compact"
        locationTag="ĐÀ LẠT, VIỆT NAM"
        headline={["Đà Lạt,", "theo cách của", "Túi Ba Gang."]}
        description={["Những khoảnh khắc chậm rãi,", "những điều vừa đủ để nhớ."]}
        image="/images/experiences/trai-nghiem-hero.webp"
        imageAlt="Trải nghiệm Đà Lạt cùng Túi Ba Gang"
      >
        <VideoButton />
      </Hero>

      <section className="py-20 md:py-28">
        <Container>
          <div className="mb-10 flex flex-wrap items-center justify-between gap-4 border-b border-cream-200 pb-6">
            <p className="section-label">NHỮNG TRẢI NGHIỆM ĐÁNG NHỚ</p>
            <p className="max-w-sm text-sm text-brown-600">
              Những điều làm nên một Đà Lạt rất riêng tại Túi Ba Gang.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {experiences.map((item, index) => (
              <ExperienceCard key={item.slug} item={item} index={index} />
            ))}
          </div>
        </Container>
      </section>

      {/* Đà Lạt còn rất nhiều điều để khám phá — CONFIRMED File B trang 4. Nút dẫn tới
          danh sách địa điểm cụ thể [CHƯA XÁC ĐỊNH nội dung/trang đích] — xem
          docs/open-questions.md F2, docs/sitemap.md — nên tạm dùng neo tới section này,
          không tự tạo 1 trang liệt kê chưa có căn cứ. */}
      <section
        id="kham-pha-da-lat"
        className="relative flex min-h-[35vh] items-center overflow-hidden bg-brown-900 px-6 py-16 md:px-16"
      >
        <Image
          src="/images/destination/dalat/dalat-lake-church-mist.webp"
          alt="Đà Lạt sương mù nhìn từ hồ"
          fill
          sizes="100vw"
          className="object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-brown-900/45" />
        <div className="relative z-10">
          <h2 className="font-heading text-3xl leading-tight text-cream-50 md:text-4xl">
            <span className="block">Đà Lạt</span>
            <span className="block">còn rất nhiều điều</span>
            <span className="block">để khám phá.</span>
          </h2>
          <div className="mt-6">
            <Button href="#kham-pha-da-lat" variant="outline" inverse>
              KHÁM PHÁ ĐÀ LẠT
            </Button>
          </div>
        </div>
        <p className="absolute bottom-8 right-6 z-10 hidden flex-col text-right text-xs uppercase leading-relaxed tracking-label text-cream-50/80 md:flex md:right-16">
          <span>NATURE</span>
          <span>PEOPLE</span>
          <span>CULTURE</span>
          <span>A SLOWER WAY</span>
        </p>
      </section>

      {/* OUR STAYS — CONFIRMED File B trang 4 (section này thiếu hoàn toàn ở bản cũ) —
          xem Phase 6.5 mục 10.5. CTA "XEM PHÒNG" → /phong-nghi/:hotel CONFIRMED
          (docs/page-specifications.md mục 4: "card cơ sở dẫn sang /phong-nghi").
          Phase 6.6 mục 2.1 (bug fix): bố cục trước đó SAI so với tham chiếu — khối chữ
          (label/heading/mô tả + chữ ký "Same place...") nằm thành 1 hàng riêng PHÍA
          TRÊN, rồi 3 ảnh cơ sở xếp thành hàng RIÊNG bên dưới, đồng thời section không có
          padding-top (`pb-20` không có `pt`) nên phần chữ "OUR STAYS" bị dính sát/đè lên
          section tối phía trên. Đối chiếu trực tiếp File B trang 4 (khối "OUR STAYS"):
          khối chữ và 3 ảnh cơ sở nằm CHUNG 1 hàng — chữ là 1 cột bên TRÁI, 3 ảnh xếp bên
          PHẢI, độ rộng cột chữ xấp xỉ bằng 1 cột ảnh. Đã đổi sang lưới 4 cột đều
          (`md:grid-cols-4`, 1 cột chữ + 3 cột ảnh, căn giữa theo chiều dọc) và thêm
          padding-top cho section để tách khỏi section phía trên. Mobile: không đặt
          `grid-cols` ở base nên tự động xếp dọc từng khối (chữ rồi lần lượt 3 card),
          không có horizontal overflow. */}
      <section className="pt-16 pb-20 md:pt-20 md:pb-28">
        <Container>
          <div className="grid gap-8 md:grid-cols-4 md:items-center">
            <div>
              <SectionLabel>OUR STAYS</SectionLabel>
              <h2 className="mt-3 font-heading text-3xl leading-tight text-ink md:text-4xl">
                <span className="block">Hẹn gặp bạn</span>
                <span className="block">ở Đà Lạt.</span>
              </h2>
              <p className="mt-2 text-sm text-brown-600">Ba không gian, một tinh thần.</p>
              <p className="mt-6 font-heading text-lg italic leading-snug text-ink">
                Same place
                <br />
                A different you
              </p>
            </div>
            {properties.map((property, index) => (
              <PropertyCard
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
    </>
  );
}
