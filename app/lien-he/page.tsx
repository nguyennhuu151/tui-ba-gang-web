import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { ContactCard } from "@/components/hotel/ContactCard";
import { CornerTagList } from "@/components/ui/CornerTagList";
import { properties } from "@/lib/content/properties";
import { offers } from "@/lib/content/offers";
import { contactContent } from "@/lib/content/contact";

export const metadata: Metadata = {
  title: "Liên hệ | Túi Ba Gang",
  description: "Thông tin liên hệ (hotline, email) của Central, Ember Style và Little Bay.",
};

const CONTACT_IMAGES: Record<string, string> = {
  central: "/images/contact-central.jpg",
  "ember-style": "/images/contact-ember-style.jpg",
  "little-bay": "/images/contact-little-bay.jpg",
};

/**
 * Liên hệ — `/lien-he` (CONFIRMED, có dữ liệu thật — File B trang 10, xem
 * docs/page-specifications.md mục 7). Không có bản đồ trong mockup — đúng lưu ý
 * trong page-specifications.md, không tự thêm Google Maps.
 *
 * Phase 6.6 mục 4 (bug fix, sửa mở rộng nhất trong phase này) — đối chiếu TRỰC TIẾP
 * ảnh nhúng gốc File B trang 10 (trích bằng `pdfimages`, không dùng ảnh chụp màn hình
 * PDF) và phát hiện trang cũ sai/thiếu rất nhiều so với tham chiếu:
 *
 * 4.1+4.2 — Banner trước đó dùng lại `<Hero>` dùng chung (ảnh SAI — tái sử dụng
 * `hero-home.jpg` của Trang chủ, text SAI — "Chúng tôi luôn sẵn sàng hỗ trợ." không có
 * trong PDF). Tham chiếu thật là bố cục CHIA ĐÔI: khối chữ trên nền cream bên TRÁI +
 * ảnh nội thất (cửa sổ/bàn/đèn/bình hoa) bleed sát mép phải màn hình — khác hẳn kiểu
 * Hero ảnh-full-bleed-có-overlay-tối dùng ở mọi trang khác, nên KHÔNG dùng lại
 * component `<Hero>` chung (ép vào sẽ sai bố cục tham chiếu) — viết section riêng cho
 * đúng trang này, tương tự cách trang Trải nghiệm/Ưu đãi đã có section riêng cho phần
 * không dùng chung được.
 *
 * 4.3-4.6, 4.8 — `ContactCard` bổ sung tagline CONFIRMED riêng (khác `property.tagline`
 * dùng ở các trang khác), label "Hotline"/"Email" + icon, tag nhỏ góc phải, và nút
 * "LIÊN HỆ [tên]" — xem chi tiết trong `components/hotel/ContactCard.tsx`.
 *
 * 4.4 — LƯU Ý QUAN TRỌNG: bản mô tả bug (tiếng Anh) yêu cầu "chữ đè lên ảnh, nền
 * trong suốt, không dùng card nền trắng riêng". Đã kiểm tra TRỰC TIẾP ảnh nhúng gốc
 * File B trang 10 (phóng to từng card) và xác nhận tham chiếu thật KHÔNG đè chữ lên
 * ảnh — chữ nằm ở khối RIÊNG bên dưới ảnh, nền cream giống nền trang (không phải card
 * trắng tách biệt, nhưng cũng không phải overlay lên ảnh). Theo đúng nguyên tắc
 * CLAUDE.md mục 2 ("File PDF là nguồn sự thật"), đã làm theo ẢNH GỐC thay vì mô tả —
 * giữ cấu trúc ảnh-trên/chữ-dưới hiện có (đã đúng), chỉ bổ sung nội dung còn thiếu.
 * Cần xác nhận lại với người yêu cầu nếu ý muốn thực sự là overlay.
 *
 * 4.7 — Ảnh 3 cơ sở trước đó (`contact-*.jpg`) thực chất là ảnh chụp NGUYÊN 1 trang
 * mockup khác (`/thu-vien/:hotel` hoặc `/phong-nghi/:hotel`) — còn nguyên nav bar, nút
 * "ĐẶT PHÒNG", heading, mô tả, nút CTA của trang đó đè lên ảnh toà nhà — đúng lỗi
 * "ảnh bị cắt/nhúng sai" trong mục Image Quality Rules (chụp màn hình mockup, có chữ
 * nhúng sẵn). Đã thay bằng ảnh mới cắt SẠCH (chỉ còn kiến trúc toà nhà, giữ nguyên
 * kiến trúc gốc — không dùng AI vẽ lại) từ đúng ảnh nhúng gốc File B trang 6/7/8 (ảnh
 * hero riêng từng cơ sở, độ phân giải gốc cao hơn nhiều so với bản cắt cũ).
 *
 * 4.9 — Section cuối "TÚI BA GANG — ĐÀ LẠT / Three places. One way of welcoming you."
 * trước đó thiếu hoàn toàn — đã thêm, xem ghi chú trong `lib/content/contact.ts` về lý
 * do dùng lại ảnh núi đồi sương mù có sẵn thay vì trích ảnh có chữ nhúng sẵn từ PDF.
 */
export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ offer?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const offerFromQuery = resolvedSearchParams.offer
    ? offers.find((o) => o.slug === resolvedSearchParams.offer)
    : undefined;
  const { banner, cards, finalSection } = contactContent;

  return (
    <>
      {/*
        Banner chia đôi — xem giải thích ở JSDoc phía trên.

        Phase 6.7: Header giờ trong suốt (bg-transparent) và trang này KHÔNG nằm trong
        nhóm route có Hero (`HERO_EXACT_PATHS`/`HOTEL_HERO_PATTERN` ở Header.tsx) nên
        Header hiển thị chữ TỐI (inverse=false) ở đây — hợp lý cho nửa trái (nền cream)
        nhưng nửa phải trước đó ảnh bleed sát đỉnh (`inset-y-0`) nghĩa là Header sẽ đè
        1 phần lên ẢNH, không phải nền cream, khiến chữ tối có thể khó đọc tại đúng vùng
        đó. Đã đẩy ảnh xuống dưới đúng chiều cao Header (`top-20 md:top-24` thay vì
        `inset-y-0`, và thêm `mt-20 md:mt-0` cho ảnh mobile) để dải trên cùng toàn bộ
        chiều ngang trang (chỗ Header đè lên) LUÔN là nền cream — Header dùng 1 màu chữ
        tối duy nhất, đọc được ổn định trên cả hàng, không cần tách nửa trái/phải.
      */}
      <section className="relative overflow-hidden bg-cream-50">
        <div className="absolute right-0 top-20 bottom-0 hidden w-1/2 md:top-24 md:block">
          <Image
            src={banner.image}
            alt="Góc nghỉ ngơi tại Túi Ba Gang, cửa sổ nhìn ra núi đồi Đà Lạt trong sương"
            fill
            priority
            sizes="50vw"
            className="object-cover"
          />
          {/* Phase 6.8 mục 1.2 (bug fix): trước đó dùng kiểu chữ riêng (italic, không
              uppercase, cỡ/opacity khác) cho CÙNG 1 loại tag "People/Places/Moments/..."
              đang dùng ở Hero các trang khác — không đồng bộ. Đổi sang `CornerTagList`
              dùng chung, giữ nguyên vị trí riêng của trang này (góc trên-phải đúng vùng
              ảnh banner, khác toạ độ Hero vì banner này không dùng component `<Hero>`
              chung — xem giải thích kiến trúc ở đầu file). */}
          <CornerTagList
            lines={banner.topRightTag}
            className="absolute right-6 top-8 z-10 text-right md:right-10"
          />
        </div>

        {/* Ảnh trên mobile — hiển thị dạng full-width phía trên khối chữ thay vì bleed
            nửa màn hình (không đủ chỗ ở màn hình hẹp) — "Mobile: adapt naturally". Đẩy
            xuống `mt-20` (đúng chiều cao Header mobile) vì lý do đã giải thích ở trên. */}
        <div className="relative mt-20 h-56 w-full md:hidden">
          <Image
            src={banner.image}
            alt="Góc nghỉ ngơi tại Túi Ba Gang, cửa sổ nhìn ra núi đồi Đà Lạt trong sương"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>

        <Container className="relative flex min-h-[280px] items-center py-12 md:min-h-[460px] md:py-0">
          <div className="max-w-sm md:max-w-md md:pr-10">
            <p className="text-xs font-medium uppercase tracking-label text-brown-600">{banner.label}</p>
            <h1 className="mt-4 font-heading text-4xl leading-tight text-ink md:text-5xl">
              {banner.headline.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h1>
            <p className="mt-5 text-sm leading-relaxed text-brown-600">{banner.description}</p>
            <div className="mt-6 flex items-center gap-3">
              <span className="h-px w-8 shrink-0 bg-brown-800/40" />
              <span className="text-xs uppercase tracking-label text-brown-700">{banner.tagline}</span>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-16 md:py-20">
        <Container>
          {offerFromQuery && (
            <p className="mb-8 rounded-md bg-cream-100 px-4 py-3 text-sm text-brown-600">
              Bạn quan tâm ưu đãi <strong className="text-ink">{offerFromQuery.name}</strong> — vui lòng liên hệ
              trực tiếp cơ sở {properties.find((p) => p.slug === offerFromQuery.property)?.shortName} bên dưới.
            </p>
          )}
          <div className="grid gap-8 md:grid-cols-3">
            {properties.map((property) => {
              const card = cards[property.slug];
              return (
                <ContactCard
                  key={property.slug}
                  property={property}
                  image={CONTACT_IMAGES[property.slug]}
                  description={card.description}
                  tags={card.tags}
                />
              );
            })}
          </div>
        </Container>
      </section>

      {/* "TÚI BA GANG — ĐÀ LẠT" — CONFIRMED File B trang 10, xem lib/content/contact.ts */}
      <section className="relative flex min-h-[30vh] items-center justify-center overflow-hidden px-6 py-14 text-center">
        <Image
          src={finalSection.image}
          alt="Núi đồi Đà Lạt trong sương, nhìn từ Túi Ba Gang"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-cream-50/75" />
        <div className="relative z-10 flex flex-col items-center gap-3">
          <h2 className="font-heading text-2xl leading-tight text-ink md:text-3xl">
            {finalSection.headline.join(" — ")}
          </h2>
          {/* Phase 6.8 mục 8.2 (bug fix): trước đó dùng serif in nghiêng riêng
              (`font-heading italic`) — khác kiểu với MỌI tagline dạng "gạch ngang +
              chữ hoa cách chữ rộng" đang dùng nhất quán ở nơi khác trong cùng hệ thống
              (vd. `banner.tagline` ngay phía trên trong CÙNG trang này, hay "SAME
              PLACES, A DIFFERENT YOU" ở Trải nghiệm/Ưu đãi). Đổi về đúng kiểu dùng
              chung đó để nhất quán toàn site, đúng yêu cầu "match font-family/size/
              weight/letter-spacing/line-height/positioning used elsewhere". */}
          <div className="flex items-center gap-3">
            <span className="h-px w-8 shrink-0 bg-brown-800/40" />
            <span className="text-xs uppercase tracking-label text-brown-700">{finalSection.tagline}</span>
          </div>
        </div>
      </section>
    </>
  );
}
