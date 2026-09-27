"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { CornerTagList } from "@/components/ui/CornerTagList";
import type { Property } from "@/lib/types";

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
  description?: string;
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

      <div className="absolute inset-x-0 bottom-0 flex max-w-[55%] flex-col items-start gap-1 p-5 pb-[calc(100%*0.18+1.25rem)] md:max-w-[58%] md:p-6 md:pb-[calc(100%*0.16+1.5rem)]">
        <p className="text-xs uppercase tracking-label text-cream-50/80">TÚI BA GANG</p>
        <h3 className="font-heading text-2xl text-cream-50">{property.shortName}</h3>
        {showNumber && <span className="my-1 block h-px w-6 bg-cream-50/50" />}
        <p className="max-w-full text-sm text-cream-50/85">{description ?? property.cardDescription}</p>
      </div>

      <div className="absolute left-5 right-5 bottom-5 flex w-[calc(100%-2.5rem)] items-end justify-between gap-4 md:left-6 md:right-6 md:bottom-6 md:w-[calc(100%-3rem)]">
        <Button href={ctaHref ?? `/thu-vien/${property.slug}`} variant="outline" inverse size="sm">
          {ctaLabel}
        </Button>
        {tags && tags.length > 0 && (
          <ul className="flex max-w-[45%] flex-col gap-[2px]">
            {tags.slice(0, 3).map((tag) => (
              <li
                key={tag}
                className="whitespace-nowrap text-[9px] uppercase tracking-[0.12em] leading-tight text-cream-50/80 md:text-[10px] md:tracking-[0.13em]"
              >
                {tag}
              </li>
            ))}
          </ul>
        )}
      </div>
    </motion.article>
  );
}
