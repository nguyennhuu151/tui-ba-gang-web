import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { SectionLabel } from "@/components/layout/SectionLabel";
import { Button } from "@/components/ui/Button";
import { TextLines } from "@/components/ui/TextLines";
import type { Property } from "@/lib/types";
import { getI18n } from "@/lib/i18n/server";

/** Ẩm thực — ảnh lớn + mô tả + ảnh vuông có caption (CONFIRMED File B trang 6, Phase 6.8 mục 5.5). */
export async function PropertyDiningSection({ property }: { property: Property }) {
  if (!property.dining) return null;
  const { dict } = await getI18n();

  return (
    <section className="pb-20 md:pb-28">
      <Container className="grid gap-8 md:grid-cols-[1.2fr_1fr_0.8fr] md:items-center">
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg">
          <Image
            src={property.dining.image}
            alt={property.dining.title}
            fill
            sizes="(min-width: 768px) 35vw, 100vw"
            className="object-cover"
          />
        </div>
        <div>
          <SectionLabel>{property.dining.label}</SectionLabel>
          <h3 className="mt-3 font-heading text-2xl text-ink md:text-3xl">{property.dining.title}</h3>
          <p className="mt-4 text-sm leading-relaxed text-brown-600">{property.dining.description}</p>
          {property.dining.ctaLabel && (
            <div className="mt-4">
              {/* Đích đến [CHƯA XÁC ĐỊNH] — mockup không có trang ẩm thực riêng, tạm
                  dẫn sang trang phòng nghỉ của cơ sở, cùng cách xử lý an toàn đã
                  dùng cho `story.ctaLabel`/`moreThanStay.linkLabel` ở trên. */}
              <Button href={`/phong-nghi/${property.slug}`} variant="ghost">
                {property.dining.ctaLabel}
              </Button>
            </div>
          )}
        </div>
        {property.dining.secondaryImage && (
          <div>
            <div className="relative aspect-square w-full max-w-[220px] overflow-hidden rounded-lg md:max-w-none">
              <Image
                src={property.dining.secondaryImage}
                alt={dict.libraryPage.closeUp(property.dining.title)}
                fill
                sizes="(min-width: 768px) 20vw, 45vw"
                className="object-cover"
              />
              {property.dining.secondaryCaption && property.dining.secondaryCaption.length > 0 && (
                <p className="absolute bottom-4 right-4 z-10 text-right font-heading text-lg italic leading-tight text-cream-50">
                  <TextLines lines={property.dining.secondaryCaption} />
                </p>
              )}
            </div>
            {property.dining.note && (
              <p className="mt-3 max-w-[220px] text-xs uppercase leading-relaxed tracking-label text-brown-500 md:max-w-none">
                {property.dining.note}
              </p>
            )}
          </div>
        )}
      </Container>
    </section>
  );
}
