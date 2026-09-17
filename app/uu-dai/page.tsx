import type { Metadata } from "next";
import Image from "next/image";
import { Hero } from "@/components/hero/Hero";
import { Container } from "@/components/layout/Container";
import { OfferListWithFilter } from "@/components/hotel/OfferListWithFilter";
import { offers } from "@/lib/content/offers";

export const metadata: Metadata = {
  title: "Ưu đãi | Túi Ba Gang",
  description: "Các chương trình ưu đãi hiện có tại Central, Ember Style và Little Bay.",
};

/**
 * Ưu đãi — `/uu-dai` (CONFIRMED — File B trang 9, đối chiếu qua ảnh embedded JPEG
 * trích xuất trực tiếp từ PDF, xem docs/page-specifications.md mục 6 và Phase 6.5 mục
 * 16). Hero trước đó dùng lại ảnh `hero-home.jpg` của Trang chủ (sai) — đã thay ảnh
 * riêng. Mục cuối trang "Một điều đặc biệt đang được chuẩn bị." trước đó bị thiếu hoàn
 * toàn — đã thêm.
 */
export default function OffersPage() {
  return (
    <>
      <Hero
        size="compact"
        locationTag="ƯU ĐÃI"
        headline={["Những điều đặc biệt,", "dành cho kỳ nghỉ của bạn."]}
        description="Khám phá những đặc quyền và trải nghiệm đang diễn ra tại Túi Ba Gang."
        image="/images/hero-offers.jpg"
        imageAlt="Góc nhìn sương sớm từ ban công Túi Ba Gang"
        topRightTag={["PEOPLE", "PLACES", "MOMENTS", "A WARMER YOU"]}
      >
        <div className="flex items-center gap-3">
          <span className="h-px w-8 shrink-0 bg-cream-50/50" />
          <span className="text-xs uppercase tracking-label text-cream-50/85">SAME PLACES, A DIFFERENT YOU.</span>
        </div>
      </Hero>

      <section className="py-16 md:py-20">
        <Container>
          <OfferListWithFilter offers={offers} />
        </Container>
      </section>

      {/* "Một điều đặc biệt đang được chuẩn bị." — CONFIRMED File B trang 9, trước đó
          bị thiếu hoàn toàn ở bản cũ (Phase 6.5 mục 16). */}
      <section className="relative flex min-h-[35vh] items-center justify-center overflow-hidden px-6 py-16 text-center">
        <Image
          src="/images/destination/dalat/dalat-mountain-mist.webp"
          alt="Núi rừng Đà Lạt trong sương"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-cream-50/80" />
        <div className="relative z-10 flex flex-col items-center gap-3">
          <h2 className="font-heading text-2xl leading-tight text-ink md:text-3xl">
            <span className="block">Một điều đặc biệt</span>
            <span className="block">đang được chuẩn bị.</span>
          </h2>
          <p className="max-w-md text-sm leading-relaxed text-brown-600">
            Những trải nghiệm và đặc quyền mới từ Túi Ba Gang sẽ sớm được cập nhật.
          </p>
          <div className="mt-2 flex items-center gap-3">
            <span className="h-px w-8 shrink-0 bg-brown-800/40" />
            <span className="text-xs uppercase tracking-label text-brown-700">SAME PLACES, A DIFFERENT YOU.</span>
          </div>
        </div>
      </section>
    </>
  );
}
