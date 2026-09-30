import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Hero } from "@/components/hero/Hero";
import { Logo } from "@/components/layout/Logo";
import { Container } from "@/components/layout/Container";
import { Breadcrumb } from "@/components/navigation/Breadcrumb";
import { ComingSoonScreen } from "@/components/ui/ComingSoonScreen";
import { RoomListWithFilter } from "@/components/room/RoomListWithFilter";
import { propertySlugs, getPropertyBySlug } from "@/lib/content/properties";
import { getRoomsByHotel } from "@/lib/content/rooms";
import { getI18n } from "@/lib/i18n/server";
import { pageMetadata } from "@/lib/i18n/metadata";

interface Props {
  params: Promise<{ hotel: string }>;
}

export function generateStaticParams() {
  return propertySlugs.map((hotel) => ({ hotel }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { hotel } = await params;
  const { locale, dict } = await getI18n();
  const property = getPropertyBySlug(hotel, locale);
  if (!property) return {};
  return pageMetadata({
    locale,
    path: `/phong-nghi/${hotel}`,
    title: dict.meta.propertyRoomsTitle(property.shortName),
    description: dict.meta.propertyRoomsDescription(property.fullName),
    image: property.heroImage,
  });
}

/**
 * Danh sách hạng phòng theo cơ sở — `/phong-nghi/:hotel` (CONFIRMED cấu trúc + tên
 * hạng phòng theo ảnh mockup thật do user cung cấp — xem lib/content/rooms.ts).
 *
 * Bố cục Hero khớp mockup: label nhỏ "TÚI BA GANG {CƠ SỞ}" phía trên, heading lớn
 * "Phòng nghỉ", mô tả ngắn của cơ sở, và logo nhỏ ở góc dưới-phải ảnh.
 */
export default async function RoomListPage({ params }: Props) {
  const { hotel } = await params;
  const { locale, dict } = await getI18n();
  const property = getPropertyBySlug(hotel, locale);
  if (!property) {
    notFound();
  }

  if (property.status === "coming-soon") {
    return (
      <section className="flex min-h-screen items-center bg-cream-50 pt-32 pb-16 md:pt-40 md:pb-24">
        <Container className="w-full">
          <ComingSoonScreen property={property} />
        </Container>
      </section>
    );
  }

  const rooms = getRoomsByHotel(property.slug, locale);

  return (
    <>
      <Hero
        size="compact"
        locationTag={`TÚI BA GANG ${property.shortName.toUpperCase()}`}
        headline={[dict.roomsPage.heroHeadline]}
        description={property.cardDescription}
        image={property.heroImage}
        imageAlt={dict.roomsPage.heroImageAlt(property.fullName)}
        cornerBadge={<Logo inverse className="h-8 w-auto opacity-90" />}
      />
      <section className="py-16 md:py-20">
        <Container>
          <Breadcrumb
            items={[
              { label: dict.common.home, href: "/" },
              { label: dict.nav.rooms, href: "/phong-nghi" },
              { label: property.shortName },
            ]}
          />
          <div className="mt-8">
            <RoomListWithFilter rooms={rooms} />
          </div>
        </Container>
      </section>
    </>
  );
}
