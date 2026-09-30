import type { Metadata } from "next";
import Image from "next/image";
import { Hero } from "@/components/hero/Hero";
import { Container } from "@/components/layout/Container";
import { Breadcrumb } from "@/components/navigation/Breadcrumb";
import { SectionLabel } from "@/components/layout/SectionLabel";
import { PropertyCard } from "@/components/hotel/PropertyCard";
import { getProperties } from "@/lib/content/properties";
import { getI18n } from "@/lib/i18n/server";
import { pageMetadata } from "@/lib/i18n/metadata";
import { TextLines } from "@/components/ui/TextLines";

export async function generateMetadata(): Promise<Metadata> {
  const { locale, dict } = await getI18n();
  return pageMetadata({
    locale,
    path: "/ve-chung-toi",
    title: dict.meta.about.title,
    description: dict.meta.about.description,
  });
}

/**
 * Về chúng tôi — `/ve-chung-toi` (CONFIRMED khung + nội dung — File B trang 2,
 * đối chiếu trực tiếp qua ảnh render PDF ở DPI cao, xem docs/page-specifications.md
 * mục 2). Toàn bộ text bên dưới là NGUYÊN VĂN từ File B trang 2 (Phase 6.5 mục 5,
 * không còn đoạn MOCK/placeholder nào — khác với bản Phase 5/6 trước đó).
 */
export default async function AboutPage() {
  const { locale, dict } = await getI18n();
  const properties = getProperties(locale);

  return (
    <>
      {/* Banner đầu trang — CONFIRMED File B trang 2 (nhãn "CÂU CHUYỆN", không phải
          "VỀ CHÚNG TÔI" như bản cũ — chữ "VỀ CHÚNG TÔI" chỉ là tên tab trên menu,
          không phải nội dung banner). Dòng mô tả giữ đúng 2 dòng như tham chiếu. */}
      <Hero
        size="compact"
        locationTag={dict.about.heroTag}
        headline={["Túi Ba Gang"]}
        description={dict.about.heroDescription}
        image="/images/about/about-story-hero.webp"
        imageAlt={dict.about.heroImageAlt}
      >
        {/* Tag nhỏ có gạch ngang phía trước — CONFIRMED File B trang 2 (nằm cùng vị trí
            hàng CTA ở các Hero khác, nhưng trang này không có nút CTA). */}
        <div className="flex items-center gap-3">
          <span className="h-px w-8 bg-cream-50/50" />
          <span className="text-xs uppercase tracking-label text-cream-50/85">
            MORE THAN A STAY
          </span>
        </div>
      </Hero>

      {/* Our Story — bố cục 3 phần: text | ảnh chính | 2 ảnh nhỏ xếp chồng + caption,
          CONFIRMED File B trang 2 (khác bản cũ chỉ có 1 ảnh placeholder). */}
      <div className="py-4 px-6 md:px-10">
        <Breadcrumb
        items={[
          { label: dict.common.home, href: "/" },
          { label: dict.nav.about },
        ]}
      />
      </div>
      <section className="pb-20 md:pb-28">
        <Container className="grid gap-10 md:grid-cols-[1fr_0.9fr_0.55fr] md:items-stretch">
          <div>
            <div className="mt-4">
              <SectionLabel>OUR STORY</SectionLabel>
            </div>
            <h2 className="mt-4 font-heading text-2xl leading-tight text-ink md:text-3xl">
              <TextLines lines={dict.about.storyHeading} />
            </h2>
            <div className="mt-6 flex flex-col gap-4 text-sm leading-relaxed text-brown-600">
              {dict.about.storyParagraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>

          <div className="relative h-full w-full overflow-hidden rounded-lg">
            <Image
              src="/images/about/about-story-main.webp"
              alt={dict.about.storyImageAlt}
              fill
              sizes="(min-width: 768px) 35vw, 100vw"
              className="object-cover"
            />
          </div>

          <div className="flex h-full flex-col justify-between gap-4">
            <p className="font-heading text-lg italic leading-snug text-ink">
              A small bag for a bigger journey
            </p>
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg">
              <Image
                src="/images/about/about-story-pine.webp"
                alt={dict.about.pineImageAlt}
                fill
                className="object-cover"
              />
            </div>
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg">
              <Image
                src="/images/about/about-story-valley.webp"
                alt={dict.about.valleyImageAlt}
                fill
                className="object-cover"
              />
            </div>
            <p className="text-xs uppercase leading-relaxed tracking-label text-brown-600">
              <TextLines lines={dict.about.dalatNote} />
            </p>
          </div>
        </Container>
      </section>

      {/* THREE PLACES, ONE SPIRIT — CONFIRMED File B trang 2: text nằm TRÊN ảnh
          banner Đà Lạt (không phải trên nền cream trơn như bản cũ), 3 PropertyCard
          nằm NGAY BÊN DƯỚI banner này — xem Phase 6.5 mục 5.4. */}
      <section className="pb-20 md:pb-28">
        <div className="relative flex min-h-[32vh] items-center justify-center overflow-hidden bg-brown-900 px-6 py-16 text-center md:px-16">
          <Image
            src="/images/destination/dalat/dalat-church-mist.webp"
            alt={dict.common.mistyDalat}
            fill
            sizes="100vw"
            className="object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-brown-900/50" />
          <div className="relative z-10">
            <p className="text-xs uppercase tracking-label text-cream-50/80">
              THREE PLACES. ONE SPIRIT.
            </p>
            <h2 className="mt-3 font-heading text-3xl text-cream-50 md:text-4xl">
              {dict.common.threeSpaces}
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-cream-50/85">
              {dict.about.spiritDescription}
            </p>
          </div>
        </div>

        <Container>
          <div className="mt-10 grid gap-8 md:grid-cols-3 md:mt-14">
            {properties.map((property, index) => (
              <PropertyCard key={property.slug} property={property} index={index} />
            ))}
          </div>
        </Container>
      </section>

      {/* Banner đóng trang — CONFIRMED File B trang 2: chữ ký tay "Same place, a
          different you" bên trái, "Túi Ba Gang / Mang theo những điều thân quen. /
          Lưu lại những điều đáng nhớ." + "MORE THAN A STAY." bên phải — xem Phase
          6.5 mục 5.5. Dùng lại ảnh núi sương Đà Lạt đã có ở Trang chủ (cùng nguồn File
          B, chất lượng tốt hơn bản crop riêng của trang này — xem báo cáo cuối phase). */}
      <section className="relative flex min-h-[45vh] items-center justify-between overflow-hidden bg-brown-900 px-6 py-16 md:px-16">
        <Image
          src="/images/destination/dalat/dalat-mountain-mist.webp"
          alt={dict.common.mistyDalat}
          fill
          sizes="100vw"
          className="object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-brown-900/40" />
        <p className="relative z-10 hidden max-w-xs font-heading text-xl italic leading-relaxed text-cream-50 md:block">
          Same place,
          <br />A different you
        </p>
        <div className="relative z-10 mx-auto text-center md:mx-0 md:ml-auto md:text-right">
          <p className="font-heading text-2xl text-cream-50 md:text-3xl">Túi Ba Gang</p>
          <p className="mt-2 text-sm text-cream-50/85 md:text-base">
            {dict.about.closingLines[0]}
          </p>
          <p className="text-sm text-cream-50/85 md:text-base">
            {dict.about.closingLines[1]}
          </p>
          <div className="mx-auto mt-4 h-px w-10 bg-cream-50/40 md:ml-auto md:mr-0" />
          <p className="mt-3 text-xs uppercase tracking-label text-cream-50/70">
            MORE THAN A STAY.
          </p>
        </div>
      </section>
    </>
  );
}
