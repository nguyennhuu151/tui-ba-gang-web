import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { SectionLabel } from "@/components/layout/SectionLabel";
import { Button } from "@/components/ui/Button";
import { Hero } from "@/components/hero/Hero";
import { BookingSearchBar } from "@/components/booking/BookingSearchBar";
import { PropertyCard } from "@/components/hotel/PropertyCard";
import { properties } from "@/lib/content/properties";
import { homepageContent } from "@/lib/content/homepage";

/**
 * Trang chủ (`/`) — CONFIRMED File B trang 1, xem docs/page-specifications.md mục 1.
 *
 * Thứ tự section bám sát ĐÚNG mockup gốc:
 * Hero (+ property selector) → Booking search bar → Giới thiệu thương hiệu →
 * 3 PropertyCard → Banner tagline (đóng vai trò CTA) → Footer (ở layout.tsx).
 *
 * KHÔNG thêm section "Trải nghiệm" ở đây dù có trong danh sách gợi ý chung của Phase 5,
 * vì mockup Trang chủ (File B trang 1) không có section này — nội dung Trải nghiệm
 * thuộc về trang riêng `/trai-nghiem` (xem docs/sitemap.md). Đúng nguyên tắc CLAUDE.md:
 * không tự thêm section không có căn cứ.
 */
export default function HomePage() {
  const { hero, brandIntro, banner } = homepageContent;

  return (
    <>
      <Hero
        size="full"
        locationTag={hero.locationTag}
        headline={[...hero.headline]}
        description={hero.description}
        ctaLabel={hero.ctaLabel}
        ctaHref={hero.ctaHref}
        image="/images/hotel/exterior/hotel-central-exterior-main.webp"
        imageAlt="Túi Ba Gang tại Đà Lạt, Việt Nam"
        showPropertySelector
      />
      <BookingSearchBar />

      {/* Giới thiệu thương hiệu — CONFIRMED File B trang 1 */}
      <section className="py-20 md:py-28">
        <Container className="grid gap-10 md:grid-cols-2 md:items-end">
          <div>
            <SectionLabel>{brandIntro.label}</SectionLabel>
            <h2 className="mt-3 font-heading text-3xl leading-tight text-ink md:text-4xl">
              {brandIntro.headline.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h2>
          </div>
          <div className="flex flex-col gap-4">
            <p className="max-w-md text-sm leading-relaxed text-brown-600">
              {brandIntro.description}
            </p>
            <div>
              <Button href={brandIntro.ctaHref} variant="ghost">
                {brandIntro.ctaLabel}
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* 3 PropertyCard — CONFIRMED File B trang 1 */}
      <section className="pb-20 md:pb-28">
        <Container>
          <div className="grid gap-8 md:grid-cols-3">
            {properties.map((property, index) => (
              <PropertyCard key={property.slug} property={property} index={index} />
            ))}
          </div>
        </Container>
      </section>

      {/* Banner tagline — đóng vai trò CTA cuối trang, CONFIRMED File B trang 1 */}
      <section className="relative flex min-h-[45vh] items-center justify-between overflow-hidden bg-brown-900 px-6 py-16 md:px-16">
        <Image
          src="/images/destination/dalat/dalat-mountain-mist.webp"
          alt="Đà Lạt sương mù"
          fill
          sizes="100vw"
          className="object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-brown-900/40" />
        <div className="relative z-10 font-heading text-3xl uppercase leading-tight text-cream-50 md:text-5xl">
          <span className="block">{banner.line1}</span>
          <span className="block">{banner.line2}</span>
        </div>
        <p className="relative z-10 hidden max-w-xs text-right font-heading text-xl italic text-cream-50 md:block">
          &ldquo;{banner.quote}&rdquo;
        </p>
      </section>
    </>
  );
}
