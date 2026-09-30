import type { Metadata } from "next";
import Image from "next/image";
import { Hero } from "@/components/hero/Hero";
import { VideoButton } from "@/components/hero/VideoButton";
import { Container } from "@/components/layout/Container";
import { Breadcrumb } from "@/components/navigation/Breadcrumb";
import { SectionLabel } from "@/components/layout/SectionLabel";
import { Button } from "@/components/ui/Button";
import { ExperienceCard } from "@/components/content/ExperienceCard";
import { PropertyCard } from "@/components/hotel/PropertyCard";
import { getExperiences } from "@/lib/content/experiences";
import { getProperties } from "@/lib/content/properties";
import { getI18n } from "@/lib/i18n/server";
import { pageMetadata } from "@/lib/i18n/metadata";
import { TextLines } from "@/components/ui/TextLines";

export async function generateMetadata(): Promise<Metadata> {
  const { locale, dict } = await getI18n();
  return pageMetadata({
    locale,
    path: "/trai-nghiem",
    title: dict.meta.experiences.title,
    description: dict.meta.experiences.description,
  });
}

/**
 * Trải nghiệm — `/trai-nghiem` (CONFIRMED nguyên văn — File B trang 4, đối chiếu qua
 * ảnh embedded JPEG trích xuất trực tiếp từ PDF — xem Phase 6.5 mục 10). Danh sách
 * địa điểm ăn uống/tham quan cụ thể vẫn [CHƯA XÁC ĐỊNH] (docs/open-questions.md F2)
 * nên khối "Khám phá Đà Lạt" chỉ là banner giới thiệu (đúng như mockup — mockup cũng
 * KHÔNG liệt kê địa điểm cụ thể nào), nút dùng neo tới chính section vì chưa có trang
 * đích được xác nhận.
 */
export default async function ExperiencesPage() {
  const { locale, dict } = await getI18n();
  const experiences = getExperiences(locale);
  const properties = getProperties(locale);

  return (
    <>
      <Hero
        size="compact"
        locationTag={dict.common.dalatVietnam}
        headline={dict.experiencesPage.heroHeadline}
        description={dict.experiencesPage.heroDescription}
        image="/images/experiences/trai-nghiem-hero.webp"
        imageAlt={dict.experiencesPage.heroImageAlt}
      >
        <VideoButton />
      </Hero>
      <div className="py-4 px-6 md:px-10">
        <Breadcrumb
            items={[
              { label: dict.common.home, href: "/" },
              { label: dict.nav.experiences },
            ]}
          />
      </div>

      <section className="pb-20 md:pb-28">
        <Container>
          <div className="mt-6 mb-10 flex flex-wrap items-center justify-between gap-4 border-b border-cream-200 pb-6">
            <p className="section-label">{dict.experiencesPage.listLabel}</p>
            <p className="max-w-sm text-sm text-brown-600">
              {dict.experiencesPage.listDescription}
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
          alt={dict.experiencesPage.discoverImageAlt}
          fill
          sizes="100vw"
          className="object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-brown-900/45" />
        <div className="relative z-10">
          <h2 className="font-heading text-3xl leading-tight text-cream-50 md:text-4xl">
            <TextLines lines={dict.experiencesPage.discoverHeading} />
          </h2>
          <div className="mt-6">
            <Button href="#kham-pha-da-lat" variant="outline" inverse>
              {dict.experiencesPage.discoverCta}
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

      <section className="pt-16 pb-20 md:pt-20 md:pb-28">
        <Container>
          <div className="grid gap-8 md:grid-cols-4 md:items-center">
            <div>
              <SectionLabel>OUR STAYS</SectionLabel>
              <h2 className="mt-3 font-heading text-3xl leading-tight text-ink md:text-4xl">
                <TextLines lines={dict.experiencesPage.staysHeading} />
              </h2>
              <p className="mt-2 text-sm text-brown-600">
                {dict.common.threeSpaces}
              </p>
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
                ctaLabel={dict.common.viewRooms}
              />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
