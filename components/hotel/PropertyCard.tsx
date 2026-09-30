"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import type { Property } from "@/lib/types";
import { useI18n } from "@/lib/i18n/client";

/**
 * PropertyCard — dùng lại ở nhiều trang nhất trong site (Trang chủ, Về chúng tôi,
 * Phòng nghỉ, Thư viện, Trải nghiệm, Liên hệ) — xem docs/ui-component-spec.md mục 3.
 * Accent màu CTA đổi theo cơ sở — xem docs/design-system.md mục 2.2.
 */
export function PropertyCard({
  property,
  index = 0,
  ctaHref,
  ctaLabel,
}: {
  property: Property;
  index?: number;
  /** Mặc định dẫn sang trang Thư viện của cơ sở — truyền riêng khi dùng ở trang khác (vd. `/phong-nghi`) */
  ctaHref?: string;
  ctaLabel?: string;
}) {
  const { dict } = useI18n();

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="flex flex-col overflow-hidden rounded-lg bg-cream-100"
    >
      <div className="relative aspect-[4/3] w-full">
        <Image
          src={property.cardImage}
          alt={property.fullName}
          fill
          sizes="(min-width: 768px) 33vw, 100vw"
          className="object-cover"
          style={{ objectPosition: property.cardImageFocus ?? "center" }}
        />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-6">
        <p className="section-label">TÚI BA GANG</p>
        <h3 className="font-heading text-2xl text-ink">{property.shortName}</h3>
        <p className="text-sm text-brown-600">{property.cardDescription}</p>
        <div className="mt-3">
          <Button
            href={ctaHref ?? `/thu-vien/${property.slug}`}
            variant="ghost"
            accent={property.accent}
          >
            {ctaLabel ?? dict.common.exploreProperty(property.shortName)}
          </Button>
        </div>
      </div>
    </motion.article>
  );
}
