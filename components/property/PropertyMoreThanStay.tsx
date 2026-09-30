import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { SectionLabel } from "@/components/layout/SectionLabel";
import { Button } from "@/components/ui/Button";
import { TextLines } from "@/components/ui/TextLines";
import type { Property } from "@/lib/types";

/** More than a stay — CHỈ Little Bay, thay cho preview phòng (CONFIRMED File B trang 8). */
export function PropertyMoreThanStay({ property }: { property: Property }) {
  if (!property.moreThanStay) return null;

  return (
    <section className="pb-20 md:pb-28">
      <Container className="grid gap-10 md:grid-cols-2 md:items-center">
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg">
          <Image
            src={property.moreThanStay.image}
            alt={property.moreThanStay.heading.join(" ")}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
        <div>
          <SectionLabel>{property.moreThanStay.label}</SectionLabel>
          <h2 className="mt-4 font-heading text-2xl leading-tight text-ink md:text-3xl">
            <TextLines lines={property.moreThanStay.heading} />
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-brown-600">{property.moreThanStay.paragraph}</p>
          <div className="mt-4">
            <Button href={`/phong-nghi/${property.slug}`} variant="ghost">
              {property.moreThanStay.linkLabel}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
