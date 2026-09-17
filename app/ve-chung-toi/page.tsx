import type { Metadata } from "next";
import Image from "next/image";
import { Hero } from "@/components/hero/Hero";
import { Container } from "@/components/layout/Container";
import { SectionLabel } from "@/components/layout/SectionLabel";
import { PropertyCard } from "@/components/hotel/PropertyCard";
import { properties } from "@/lib/content/properties";

export const metadata: Metadata = {
  title: "Về chúng tôi | Túi Ba Gang",
  description:
    "Câu chuyện thương hiệu Túi Ba Gang — 3 không gian lưu trú riêng biệt tại Đà Lạt: Central, Ember Style, Little Bay.",
};

/**
 * Về chúng tôi — `/ve-chung-toi` (CONFIRMED khung + nội dung — File B trang 2,
 * đối chiếu trực tiếp qua ảnh render PDF ở DPI cao, xem docs/page-specifications.md
 * mục 2). Toàn bộ text bên dưới là NGUYÊN VĂN từ File B trang 2 (Phase 6.5 mục 5,
 * không còn đoạn MOCK/placeholder nào — khác với bản Phase 5/6 trước đó).
 */

// Nguyên văn "Our Story" — File B trang 2, đúng thứ tự đoạn, KHÔNG rút gọn.
const OUR_STORY_PARAGRAPHS = [
  "Túi Ba Gang bắt đầu từ một hình ảnh rất quen thuộc trong đời sống người Việt xưa — chiếc túi nhỏ theo người trên những hành trình xa, chứa đựng những gì cần thiết và thân thuộc.",
  "Từ hình ảnh ấy, chúng tôi tìm thấy một cách để nói về nơi lưu trú: một không gian vừa đủ, được chăm chút vừa đủ, để mỗi hành trình trở nên trọn vẹn hơn.",
  "Túi Ba Gang được tạo nên tại Đà Lạt với sự trân trọng dành cho kiến trúc, chất liệu, thiên nhiên và những khoảng thời gian riêng tư của mỗi vị khách.",
  "Mỗi nơi có một cá tính khác nhau. Nhưng tất cả cùng chia sẻ một tinh thần — sự tinh tế không phô trương, sự chăm sóc được thể hiện trong từng chi tiết, và một cảm giác dễ chịu khi ở lại.",
  "Bởi đôi khi, những điều đáng nhớ nhất của một chuyến đi lại là những điều rất nhỏ.",
];

export default function AboutPage() {
  return (
    <>
      {/* Banner đầu trang — CONFIRMED File B trang 2 (nhãn "CÂU CHUYỆN", không phải
          "VỀ CHÚNG TÔI" như bản cũ — chữ "VỀ CHÚNG TÔI" chỉ là tên tab trên menu,
          không phải nội dung banner). Dòng mô tả giữ đúng 2 dòng như tham chiếu. */}
      <Hero
        size="compact"
        locationTag="CÂU CHUYỆN"
        headline={["Túi Ba Gang"]}
        description={["Mang theo những điều thân quen.", "Lưu lại những điều đáng nhớ."]}
        image="/images/about/about-story-hero.webp"
        imageAlt="Không gian Túi Ba Gang nhìn ra Đà Lạt"
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
      <section className="py-20 md:py-28">
        <Container className="grid gap-10 md:grid-cols-[1fr_0.9fr_0.55fr] md:items-start">
          <div>
            <SectionLabel>OUR STORY</SectionLabel>
            <h2 className="mt-4 font-heading text-2xl leading-tight text-ink md:text-3xl">
              <span className="block">Một chiếc túi,</span>
              <span className="block">một hành trình,</span>
              <span className="block">và những điều ở lại.</span>
            </h2>
            <div className="mt-6 flex flex-col gap-4 text-sm leading-relaxed text-brown-600">
              {OUR_STORY_PARAGRAPHS.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>

          <div className="relative aspect-[4/7] w-full overflow-hidden rounded-lg">
            <Image
              src="/images/about/about-story-main.webp"
              alt="Túi vải Túi Ba Gang và cuốn sổ &quot;The Journey Stays With You&quot;"
              fill
              sizes="(min-width: 768px) 35vw, 100vw"
              className="object-cover"
            />
          </div>

          <div className="flex flex-col gap-4">
            <p className="font-heading text-lg italic leading-snug text-ink">
              A small bag for a bigger journey
            </p>
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg">
              <Image
                src="/images/about/about-story-pine.webp"
                alt="Lá thông đọng sương ở Đà Lạt"
                fill
                sizes="(min-width: 768px) 20vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg">
              <Image
                src="/images/about/about-story-valley.webp"
                alt="Thung lũng sương mù Đà Lạt nhìn từ xa"
                fill
                sizes="(min-width: 768px) 20vw, 50vw"
                className="object-cover"
              />
            </div>
            <p className="text-xs uppercase leading-relaxed tracking-label text-brown-600">
              Đà Lạt,
              <br />
              Luôn có những điều dịu dàng
              <br />
              Để ta muốn quay lại.
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
            alt="Đà Lạt sương mù"
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
              Ba không gian, một tinh thần.
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-cream-50/85">
              Mỗi nơi là một sắc thái khác nhau của Đà Lạt, nhưng đều hướng đến cùng một điều: để
              bạn cảm nhận nhiều hơn từ hành trình của mình.
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
          alt="Đà Lạt sương mù"
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
            Mang theo những điều thân quen.
          </p>
          <p className="text-sm text-cream-50/85 md:text-base">Lưu lại những điều đáng nhớ.</p>
          <div className="mx-auto mt-4 h-px w-10 bg-cream-50/40 md:ml-auto md:mr-0" />
          <p className="mt-3 text-xs uppercase tracking-label text-cream-50/70">
            MORE THAN A STAY.
          </p>
        </div>
      </section>
    </>
  );
}
