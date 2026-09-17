import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { CornerTagList } from "@/components/ui/CornerTagList";
import type { Property } from "@/lib/types";

/**
 * ContactCard — ảnh + tên + tagline + hotline + email + CTA, dùng ở `/lien-he`.
 * CONFIRMED: hotline/email thật cho từng cơ sở (File B trang 10) — xem
 * docs/page-specifications.md mục 7.
 *
 * Phase 6.6 mục 4.3-4.6, 4.8 (bug fix): bản trước đó CHỈ có ảnh + tên + 1 dòng tagline +
 * hotline/email dạng link trơn — thiếu label "Hotline"/"Email", thiếu icon, thiếu tag
 * nhỏ góc dưới-phải (CITY/PEOPLE/CONNECTIONS...), và thiếu hẳn nút "LIÊN HỆ [Tên cơ sở]".
 * Đã đối chiếu trực tiếp ảnh nhúng File B trang 10 và bổ sung đầy đủ theo đúng cấu trúc:
 * ảnh (không đè chữ lên — CONFIRMED tham chiếu dùng khối chữ RIÊNG bên dưới ảnh, không
 * phải overlay, xem ghi chú trong `app/lien-he/page.tsx`) → nhãn "TÚI BA GANG" + tên +
 * gạch chân nhỏ + tagline in nghiêng → Hotline (icon điện thoại) + Email (icon phong bì)
 * → nút "LIÊN HỆ [tên]" + tag nhỏ góc phải.
 *
 * Hành vi CTA "Liên hệ [Tên cơ sở]" là [CHƯA XÁC ĐỊNH] trong mockup (không có form,
 * chỉ có card thông tin) — dùng trực tiếp `tel:` là lựa chọn an toàn nhất (giữ nguyên
 * quyết định đã có từ trước, không tự bịa thêm hành vi như mở modal/trang riêng khi
 * chưa có căn cứ) — đảm bảo nút "điều hướng đúng" (bấm được, gọi được ngay).
 */
export function ContactCard({
  property,
  image,
  description,
  tags,
}: {
  property: Property;
  image: string;
  /** Ghi đè `property.tagline` — dùng tagline riêng CONFIRMED cho trang Liên hệ */
  description?: string;
  /** Tag nhỏ chữ hoa góc dưới-phải khối chữ (CONFIRMED File B trang 10) */
  tags?: readonly string[];
}) {
  const telHref = `tel:${property.contact.hotline.replace(/\s/g, "")}`;

  return (
    <article className="flex flex-col overflow-hidden rounded-lg bg-cream-100">
      <div className="relative aspect-[4/3] w-full">
        <Image
          src={image}
          alt={property.fullName}
          fill
          sizes="(min-width: 768px) 33vw, 100vw"
          className="object-cover"
          style={{ objectPosition: property.cardImageFocus ?? "center" }}
        />
      </div>
      <div className="flex flex-1 flex-col gap-4 p-6">
        <div>
          <p className="section-label">TÚI BA GANG</p>
          <h3 className="mt-1 font-heading text-2xl text-ink">{property.shortName}</h3>
          <span className="mt-2 block h-px w-6 bg-brown-800/30" />
          <p className="mt-3 font-heading text-base italic leading-snug text-ink">
            {description ?? property.tagline}
          </p>
        </div>

        <div className="flex flex-col gap-3 text-sm text-ink">
          <div className="flex items-start gap-2.5">
            <PhoneIcon />
            <div>
              <p className="text-xs uppercase tracking-label text-brown-500">Hotline</p>
              <a href={telHref} className="hover:underline">
                {property.contact.hotline}
              </a>
            </div>
          </div>
          <div className="flex items-start gap-2.5">
            <MailIcon />
            <div>
              <p className="text-xs uppercase tracking-label text-brown-500">Email</p>
              <a href={`mailto:${property.contact.email}`} className="hover:underline">
                {property.contact.email}
              </a>
            </div>
          </div>
        </div>

        {/* Phase 6.8 mục 8.1 (bug fix): cùng nguyên nhân/cách sửa với `OfferCard` (mục
            4) — nút cỡ mặc định + tag 3 dòng dễ không đủ chỗ chung 1 hàng ở card hẹp,
            khiến tag bị đẩy xuống/đè lên nút thay vì nằm ngang hàng, bên phải nút (đúng
            File B trang 10). Đổi nút sang `size="sm"` để nhất quán cách sửa và đủ chỗ,
            và chỉ hiện tag từ `xl:` trở lên — xem giải thích chi tiết ở OfferCard.tsx
            (đã kiểm tra bằng Playwright, cùng vấn đề chật chỗ ở tablet). */}
        <div className="mt-1 flex flex-wrap items-end justify-between gap-3">
          <Button href={telHref} withArrow size="sm">
            LIÊN HỆ {property.shortName.toUpperCase()}
          </Button>
          <CornerTagList lines={tags} inverse={false} className="hidden text-right xl:block" />
        </div>
      </div>
    </article>
  );
}

// Icon điện thoại — dùng lại đúng path đã có ở StickyContactWidget.tsx (giữ nhất quán
// 1 kiểu icon điện thoại duy nhất toàn site, không tự vẽ icon mới).
function PhoneIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true" className="mt-0.5 shrink-0 text-brown-700">
      <path
        d="M4 3h3l1.5 4L6.5 8.5a10 10 0 0 0 5 5L13 11.5l4 1.5v3a1.5 1.5 0 0 1-1.6 1.5C9.4 17.1 2.9 10.6 2.5 4.6A1.5 1.5 0 0 1 4 3Z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true" className="mt-0.5 shrink-0 text-brown-700">
      <rect x="2.5" y="4.5" width="15" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
      <path d="M3 5.5 10 11l7-5.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
