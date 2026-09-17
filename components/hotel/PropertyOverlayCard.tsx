"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { CornerTagList } from "@/components/ui/CornerTagList";
import type { Property } from "@/lib/types";

/**
 * PropertyOverlayCard — ảnh cơ sở với tên/mô tả/nút đè TRỰC TIẾP lên ảnh (có lớp
 * gradient tối phía dưới để chữ luôn đọc được), khác với `PropertyCard` (ảnh + khối
 * chữ nền riêng bên dưới ảnh).
 *
 * CONFIRMED dùng ở 2 nơi:
 * - Trang Phòng nghỉ (File B trang 3, Phase 6.5 mục 6.2) — không có `showNumber`/`tags`.
 * - Trang Thư viện (File B trang 5, Phase 6.5 mục 12) — có số 01/02/03 (`showNumber`)
 *   và tag nhỏ 3 dòng góc dưới-phải (`tags`, vd. "CITY / PEOPLE / CONNECTIONS").
 * Component viết RIÊNG (không sửa `PropertyCard` đang dùng ở Trang chủ/Về chúng tôi)
 * vì các nơi đó dùng kiểu hiển thị khác — tránh sửa code không liên quan (CLAUDE.md mục 5).
 */
export function PropertyOverlayCard({
  property,
  index = 0,
  ctaHref,
  ctaLabel = "XEM PHÒNG",
  showNumber = false,
  description,
  tags,
}: {
  property: Property;
  index?: number;
  ctaHref?: string;
  ctaLabel?: string;
  showNumber?: boolean;
  /** Ghi đè `property.cardDescription` — dùng khi trang cụ thể hiển thị 1 dòng khác (vd. Thư viện) */
  description?: string;
  /** Tag nhỏ chữ hoa, tối đa vài dòng, đặt góc dưới-phải ảnh (CONFIRMED trang Thư viện) */
  tags?: string[];
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="relative aspect-[3/4] w-full overflow-hidden rounded-lg md:aspect-[4/5]"
    >
      <Image
        src={property.cardImage}
        alt={property.fullName}
        fill
        sizes="(min-width: 768px) 33vw, 100vw"
        className="object-cover"
        style={{ objectPosition: property.cardImageFocus ?? "center" }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-brown-900/85 via-brown-900/15 to-transparent" />

      {showNumber && (
        <div className="absolute left-5 right-5 top-5 flex items-center gap-3 md:left-6 md:right-6 md:top-6">
          <p className="font-heading text-sm text-cream-50/90">{property.order}</p>
          <span className="h-px flex-1 bg-cream-50/40" />
        </div>
      )}

      {/* Bug fix (thay Phase 6.8 mục 3): tag góc dưới-phải và khối chữ/nút trước đây đặt
          CẠNH NHAU (2 cột `absolute` riêng, giới hạn max-w %) nên ở thẻ hẹp (lưới 3 cột,
          tablet ~213-299px) dễ chồng chữ nếu ctaLabel dài — cách sửa cũ là ẨN hẳn tag dưới
          `xl`, làm mất nội dung ở phần lớn viewport. Đổi sang xếp CHỒNG THEO CHIỀU DỌC (tag
          ở trên, khối chữ/nút ở dưới, cùng 1 cột `flex-col` full-width, cách nhau `gap-3`
          cố định) — không còn cạnh tranh chiều ngang nên không chồng nhau ở bất kỳ kích
          thước nào, tag luôn hiển thị đầy đủ thay vì bị ẩn. */}
      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-3 p-5 md:p-6">
        <CornerTagList lines={tags} className="text-right" />
        <div className="flex flex-col items-start gap-1">
          <p className="text-xs uppercase tracking-label text-cream-50/80">TÚI BA GANG</p>
          <h3 className="font-heading text-2xl text-cream-50">{property.shortName}</h3>
          {showNumber && <span className="my-1 block h-px w-6 bg-cream-50/50" />}
          <p className="max-w-full text-sm text-cream-50/85">{description ?? property.cardDescription}</p>
          <div className="mt-3">
            <Button href={ctaHref ?? `/thu-vien/${property.slug}`} variant="outline" inverse size="sm">
              {ctaLabel}
            </Button>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
