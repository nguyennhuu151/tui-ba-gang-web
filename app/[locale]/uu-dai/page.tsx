import type { Metadata } from "next";
import Image from "next/image";
import { Hero } from "@/components/hero/Hero";
import { Container } from "@/components/layout/Container";
import { Breadcrumb } from "@/components/navigation/Breadcrumb";
import { OfferListWithFilter } from "@/components/hotel/OfferListWithFilter";
import { getOffers } from "@/lib/content/offers";
import { getI18n } from "@/lib/i18n/server";
import { pageMetadata } from "@/lib/i18n/metadata";
import { TextLines } from "@/components/ui/TextLines";

export async function generateMetadata(): Promise<Metadata> {
  const { locale, dict } = await getI18n();
  return pageMetadata({
    locale,
    path: "/uu-dai",
    title: dict.meta.offers.title,
    description: dict.meta.offers.description,
  });
}

/**
 * Ưu đãi — `/uu-dai` (CONFIRMED — File B trang 9, đối chiếu qua ảnh embedded JPEG
 * trích xuất trực tiếp từ PDF, xem docs/page-specifications.md mục 6 và Phase 6.5 mục
 * 16). Hero trước đó dùng lại ảnh `hero-home.jpg` của Trang chủ (sai) — đã thay ảnh
 * riêng. Mục cuối trang "Một điều đặc biệt đang được chuẩn bị." trước đó bị thiếu hoàn
 * toàn — đã thêm.
 */
export default async function OffersPage() {
  const { locale, dict } = await getI18n();

  return (
    <>
      <Hero
        size="compact"
        locationTag={dict.offersPage.heroTag}
        headline={dict.offersPage.heroHeadline}
        description={dict.offersPage.heroDescription}
        image="/images/hero-offers.jpg"
        imageAlt={dict.offersPage.heroImageAlt}
        topRightTag={["PEOPLE", "PLACES", "MOMENTS", "A WARMER YOU"]}
      >
        <div className="flex items-center gap-3">
          <span className="h-px w-8 shrink-0 bg-cream-50/50" />
          <span className="text-xs uppercase tracking-label text-cream-50/85">SAME PLACES, A DIFFERENT YOU.</span>
        </div>
      </Hero>

      <div className="pt-4 px-6 md:px-10">
        <Breadcrumb
            items={[
              { label: dict.common.home, href: "/" },
              { label: dict.nav.offers },
            ]}
          />
      </div>

      <section className="pb-32">
        <Container>
          <div className="mt-6">
            <OfferListWithFilter offers={getOffers(locale)} />
          </div>
        </Container>
      </section>

      {/* "Một điều đặc biệt đang được chuẩn bị." — CONFIRMED File B trang 9, trước đó
          bị thiếu hoàn toàn ở bản cũ (Phase 6.5 mục 16). */}
      <section className="relative flex min-h-[35vh] items-center justify-center overflow-hidden px-6 py-16 text-center">
        <Image
          src="/images/destination/dalat/dalat-mountain-mist.webp"
          alt={dict.offersPage.comingImageAlt}
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-cream-50/80" />
        <div className="relative z-10 flex flex-col items-center gap-3">
          <h2 className="font-heading text-2xl leading-tight text-ink md:text-3xl">
            <TextLines lines={dict.offersPage.comingHeading} />
          </h2>
          <p className="max-w-md text-sm leading-relaxed text-brown-600">
            {dict.offersPage.comingDescription}
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
