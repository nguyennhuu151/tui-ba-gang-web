import { Container } from "@/components/layout/Container";
import { SectionLabel } from "@/components/layout/SectionLabel";
import { TextLines } from "@/components/ui/TextLines";
import { AmenityIconList } from "@/components/hotel/AmenityIconList";
import type { Property } from "@/lib/types";

/** Tiện nghi — nền be + icon ngang có gạch phân cách (Central/Little Bay) hoặc nền tối (Ember Style, `amenitiesSection.dark`). */
export function PropertyAmenitiesSection({ property }: { property: Property }) {
  const isDarkAmenities = Boolean(property.amenitiesSection.dark);

  return (
    <section className={isDarkAmenities ? "bg-brown-900 py-16 md:py-20" : "bg-cream-200 py-16 md:py-20"}>
      <Container
        className={isDarkAmenities ? undefined : "md:grid md:grid-cols-[0.8fr_2.2fr] md:items-center md:gap-10"}
      >
        <div>
          {property.amenitiesSection.label && (
            <SectionLabel className={isDarkAmenities ? "text-cream-50/70" : undefined}>
              {property.amenitiesSection.label}
            </SectionLabel>
          )}
          <h2
            className={`mt-3 font-heading text-2xl leading-tight md:text-3xl ${
              isDarkAmenities ? "text-cream-50" : "text-ink"
            }`}
          >
            <TextLines lines={property.amenitiesSection.heading} />
          </h2>
        </div>
        <div className={isDarkAmenities ? "mt-8" : "mt-8 md:mt-0"}>
          <AmenityIconList items={property.amenities} dark={isDarkAmenities} divided={!isDarkAmenities} />
        </div>
      </Container>
    </section>
  );
}
