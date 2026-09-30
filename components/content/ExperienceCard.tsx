"use client";

import Image from "next/image";
import { LocaleLink } from "@/components/navigation/LocaleLink";
import type { ExperienceItem } from "@/lib/types";
import { useI18n } from "@/lib/i18n/client";

/**
 * ExperienceCard — card giới thiệu trải nghiệm Đà Lạt, dùng ở `/trai-nghiem`.
 * Số thứ tự (01/02/03/04) đè trên ảnh — CONFIRMED File B trang 4. Link "KHÁM PHÁ" —
 * CONFIRMED có ở mọi card (Phase 6.5 mục 10.3); dùng `item.ctaHref` khi có (vd. "Ở lại
 * tận hưởng" dẫn sang Thư viện — mục 10.4), còn lại dùng neo (anchor) cuộn tới đúng
 * card vì chưa có trang chi tiết riêng cho từng trải nghiệm ([CHƯA XÁC ĐỊNH] — xem
 * docs/open-questions.md F2), không tự bịa trang đích.
 */
export function ExperienceCard({
  item,
  index = 0,
}: {
  item: ExperienceItem;
  index?: number;
}) {
  const { dict } = useI18n();
  const number = String(index + 1).padStart(2, "0");

  return (
    <article id={item.slug} className="flex flex-col overflow-hidden rounded-lg bg-cream-100">
      <div className="relative aspect-[4/3] w-full">
        <Image src={item.image} alt={item.title} fill sizes="(min-width: 768px) 25vw, 100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-brown-900/60 via-transparent to-transparent" />
        <p className="absolute bottom-3 left-4 font-heading text-lg text-cream-50">{number}</p>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <h3 className="font-heading text-xl text-ink">{item.title}</h3>
        <p className="text-sm text-brown-600">{item.description}</p>
        <LocaleLink
          href={item.ctaHref ?? `#${item.slug}`}
          className="mt-1 inline-flex w-fit items-center gap-2 text-xs font-medium uppercase tracking-label text-ink underline-offset-4 hover:underline"
        >
          {dict.common.explore}
          <span aria-hidden="true">→</span>
        </LocaleLink>
      </div>
    </article>
  );
}
