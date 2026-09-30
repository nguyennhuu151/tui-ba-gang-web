import { Container } from "@/components/layout/Container";
import { SectionLabel } from "@/components/layout/SectionLabel";
import { Button } from "@/components/ui/Button";
import { RoomCard } from "@/components/room/RoomCard";
import type { Property, RoomType } from "@/lib/types";

/** Preview hạng phòng của cơ sở, `rooms` đã được cắt theo `roomsSection.previewCount` ở trang. */
export function PropertyRoomsPreview({ property, rooms }: { property: Property; rooms: RoomType[] }) {
  if (!property.roomsSection) return null;

  return (
    <section className="py-20 md:py-28">
      <Container
        className={`grid gap-8 md:items-center ${
          rooms.length >= 4 ? "md:grid-cols-5" : "md:grid-cols-4"
        }`}
      >
        <div>
          <SectionLabel>{property.roomsSection.label}</SectionLabel>
          <h2 className="mt-3 font-heading text-2xl leading-tight text-ink md:text-3xl">
            {property.roomsSection.heading}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-brown-600">{property.roomsSection.subheading}</p>
          <div className="mt-8">
            <Button href={`/phong-nghi/${property.slug}`} variant="ghost">
              {property.roomsSection.ctaLabel}
            </Button>
          </div>
        </div>
        {rooms.map((room) => (
          <RoomCard key={room.slug} room={room} variant="compact" />
        ))}
      </Container>
    </section>
  );
}
