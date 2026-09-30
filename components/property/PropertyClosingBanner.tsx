import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { TextLines } from "@/components/ui/TextLines";
import type { Property } from "@/lib/types";

/** Banner CTA đặt phòng cuối trang cơ sở. */
export function PropertyClosingBanner({ property }: { property: Property }) {
  if (!property.closingBanner) return null;

  return (
    <section className="relative flex min-h-[30vh] items-center overflow-hidden bg-brown-900 px-6 py-14 text-center md:text-left">
      <Container className="relative z-10 flex flex-col items-center gap-5 md:flex-row md:items-center md:justify-between md:gap-6">
        <div>
          <p className="font-heading text-2xl leading-snug text-cream-50 md:text-3xl">
            <TextLines lines={property.closingBanner.tag} />
          </p>
          {property.closingBanner.subtitle && (
            <p className="mt-1 font-heading text-base italic text-cream-50/80">{property.closingBanner.subtitle}</p>
          )}
          <p className="mt-2 flex items-center justify-center gap-3 text-xs uppercase tracking-label text-cream-50/70 md:justify-start">
            <span className="h-px w-6 shrink-0 bg-cream-50/40" />
            TÚI BA GANG {property.shortName.toUpperCase()}
          </p>
        </div>
        <Button href="/dat-phong" inverse className="shrink-0">
          {property.closingBanner.ctaLabel}
        </Button>
      </Container>
    </section>
  );
}
