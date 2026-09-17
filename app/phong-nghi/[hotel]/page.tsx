import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Hero } from "@/components/hero/Hero";
import { Logo } from "@/components/layout/Logo";
import { Container } from "@/components/layout/Container";
import { RoomListWithFilter } from "@/components/room/RoomListWithFilter";
import { properties, getPropertyBySlug } from "@/lib/content/properties";
import { getRoomsByHotel } from "@/lib/content/rooms";

interface Props {
  params: { hotel: string };
}

export function generateStaticParams() {
  return properties.map((p) => ({ hotel: p.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const property = getPropertyBySlug(params.hotel);
  if (!property) return {};
  return {
    title: `Phòng nghỉ ${property.shortName} | Túi Ba Gang`,
    description: `Danh sách hạng phòng tại ${property.fullName}.`,
  };
}

/**
 * Danh sách hạng phòng theo cơ sở — `/phong-nghi/:hotel` (CONFIRMED cấu trúc + tên
 * hạng phòng theo ảnh mockup thật do user cung cấp — xem lib/content/rooms.ts).
 *
 * Bố cục Hero khớp mockup: label nhỏ "TÚI BA GANG {CƠ SỞ}" phía trên, heading lớn
 * "Phòng nghỉ", mô tả ngắn của cơ sở, và logo nhỏ ở góc dưới-phải ảnh.
 */
export default function RoomListPage({ params }: Props) {
  const property = getPropertyBySlug(params.hotel);
  if (!property) {
    notFound();
  }

  const rooms = getRoomsByHotel(property.slug);

  return (
    <>
      <Hero
        size="compact"
        locationTag={`TÚI BA GANG ${property.shortName.toUpperCase()}`}
        headline={["Phòng nghỉ"]}
        description={property.cardDescription}
        image={property.heroImage}
        imageAlt={`Phòng nghỉ tại ${property.fullName}`}
        cornerBadge={<Logo inverse className="h-8 w-auto opacity-90" />}
      />
      <section className="py-16 md:py-20">
        <Container>
          <RoomListWithFilter rooms={rooms} />
        </Container>
      </section>
    </>
  );
}
