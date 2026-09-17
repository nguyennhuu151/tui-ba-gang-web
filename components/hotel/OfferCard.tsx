import type { ReactElement } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { CornerTagList } from "@/components/ui/CornerTagList";
import { getPropertyBySlug } from "@/lib/content/properties";
import type { Offer, OfferBenefit } from "@/lib/types";

/**
 * OfferCard — ảnh nền cơ sở + chữ/nút đè TRỰC TIẾP lên ảnh (có lớp gradient tối phía
 * dưới để chữ luôn đọc được) — CONFIRMED File B trang 9, Phase 6.5 mục 16. Thay cho
 * bản cũ dùng bố cục ảnh-trên/khối-chữ-nền-trắng-dưới (không khớp tham chiếu) và icon
 * check dùng chung cho mọi quyền lợi (tham chiếu có icon riêng từng dòng).
 *
 * CTA "Khám phá ưu đãi" dẫn đi đâu là [CHƯA XÁC ĐỊNH] (trang riêng hay modal — xem
 * docs/page-specifications.md mục 6). Quyết định tạm thời (giữ nguyên từ Phase 6): dẫn
 * sang `/lien-he` kèm query `offer` để khách liên hệ trực tiếp cơ sở tương ứng — an
 * toàn hơn là tạo 1 trang chi tiết chưa có căn cứ nội dung. Cần xác nhận lại khi có yêu
 * cầu rõ hơn.
 */
export function OfferCard({ offer }: { offer: Offer }) {
  const property = getPropertyBySlug(offer.property);

  return (
    <article className="relative flex aspect-[3/4] w-full flex-col overflow-hidden rounded-lg md:aspect-[4/5]">
      <Image
        src={offer.image}
        alt={offer.name}
        fill
        sizes="(min-width: 768px) 33vw, 100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-brown-900/90 via-brown-900/35 to-brown-900/10" />

      <div className="relative z-10 flex flex-1 flex-col justify-end gap-3 p-5 md:p-6">
        <div>
          <p className="text-xs uppercase tracking-label text-cream-50/80">
            {property ? property.fullName.toUpperCase() : offer.property}
          </p>
          <h3 className="mt-1 font-heading text-2xl text-cream-50">{offer.name}</h3>
          <p className="mt-1 text-sm text-cream-50/85">{offer.description}</p>
          <p className="mt-2 text-xs uppercase tracking-label text-cream-50/70">{offer.dateRangeLabel}</p>
        </div>

        <ul className="flex flex-col gap-2 rounded-md bg-brown-900/60 p-4">
          {offer.benefits.map((benefit) => (
            <li key={benefit.text} className="flex items-start gap-2.5 text-xs leading-relaxed text-cream-50/90">
              <BenefitIcon icon={benefit.icon} />
              <span>{benefit.text}</span>
            </li>
          ))}
        </ul>

        {/* Phase 6.8 mục 4 (bug fix): ở màn hình tablet/card hẹp, nút mặc định ("md")
            cộng với tag 3 dòng chữ hoa (dài nhất "A DIFFERENT YOU") không đủ chỗ trên
            cùng 1 hàng → `flex-wrap` đẩy tag xuống dòng, đè/chồng lên nút. Đổi nút sang
            `size="sm"` (cùng cách đã dùng cho `PropertyOverlayCard` ở Phase 6.6, mục
            3.2) để rảnh thêm chỗ ngang cho tag luôn nằm cùng hàng, bên phải nút, đúng
            bố cục File B trang 9 (không dùng absolute tuỳ tiện). Đồng thời chỉ HIỆN tag
            từ `xl:` trở lên (như `PropertyOverlayCard`) — đã kiểm tra bằng Playwright,
            ở 768-1024px thẻ vẫn quá hẹp để tag + nút không chồng nhau dù đã thu nhỏ. */}
        <div className="mt-1 flex flex-wrap items-end justify-between gap-3">
          <Button href={`/lien-he?offer=${offer.slug}`} variant="outline" inverse size="sm">
            KHÁM PHÁ ƯU ĐÃI
          </Button>
          <CornerTagList lines={offer.tag} className="hidden text-right xl:block" />
        </div>
      </div>
    </article>
  );
}

const BENEFIT_ICONS: Record<OfferBenefit["icon"], ReactElement> = {
  bed: (
    <path d="M2 12.5V6a1 1 0 0 1 1-1h2.5a1 1 0 0 1 1 1v2.5h5V6a1 1 0 0 1 1-1H15a1 1 0 0 1 1 1v6.5M2 10.5h14M2 12.5v-1M16 12.5v-1" strokeLinecap="round" strokeLinejoin="round" />
  ),
  cup: (
    <path d="M3 4h9v5.5A4.5 4.5 0 0 1 7.5 14 4.5 4.5 0 0 1 3 9.5V4Zm9 1h1.3a1.8 1.8 0 0 1 0 3.6H12M3 14h9" strokeLinecap="round" strokeLinejoin="round" />
  ),
  gift: (
    <path d="M2.5 6.5h13v2.5h-13V6.5Zm.8 2.5h11.4V15H3.3V9Zm5.7-2.5V15M9 6.5C7.5 6.5 6 5.8 6 4.5A1.8 1.8 0 0 1 9 3.2c0 1.8-1.5 3.3-1.5 3.3S9 6.5 9 6.5Zm0 0c1.5 0 3-.7 3-2A1.8 1.8 0 0 0 9 1.7c0 1.8 1.5 3.3 1.5 3.3S9 6.5 9 6.5Z" strokeLinecap="round" strokeLinejoin="round" />
  ),
  swirl: (
    <path d="M9 15c3-1 4.5-3.5 3.7-6.3C12 6.3 9.7 5 7.7 6c-1.5.8-2 2.6-1 3.8 1 1.1 2.7.9 3.3-.3.5-1-.1-2-1.2-2" strokeLinecap="round" strokeLinejoin="round" />
  ),
  star: (
    <path d="M9 2.5 11 7l5 .6-3.6 3.3.9 4.8L9 13.2l-4.3 2.5.9-4.8L2 7.6 7 7 9 2.5Z" strokeLinecap="round" strokeLinejoin="round" />
  ),
  clock: (
    <>
      <circle cx="9" cy="9" r="6.5" />
      <path d="M9 5.5V9l3 1.8" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  leaf: (
    <path d="M15 3C7 3 3 7 3 15c8 0 12-4 12-12ZM3 15c2-4 5-7 9-9" strokeLinecap="round" strokeLinejoin="round" />
  ),
  lotus: (
    <path
      d="M9 3c1 2 1 4 0 6-1-2-1-4 0-6ZM4 6c1.8 1 3 2.6 3 4.5-2 0-3.6-1.2-4.6-3A6 6 0 0 1 4 6Zm10 0c-1.8 1-3 2.6-3 4.5 2 0 3.6-1.2 4.6-3A6 6 0 0 0 14 6ZM9 9.5c2.5 0 4.5 1.8 4.5 4.5h-9C4.5 11.3 6.5 9.5 9 9.5Z"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  tent: (
    <path d="M9 3 15.5 15h-13L9 3Zm0 0v12M6 15l3-6M12 15 9 9" strokeLinecap="round" strokeLinejoin="round" />
  ),
};

function BenefitIcon({ icon }: { icon: OfferBenefit["icon"] }) {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 18 18"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      aria-hidden="true"
      className="mt-0.5 shrink-0"
    >
      {BENEFIT_ICONS[icon]}
    </svg>
  );
}
