import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { Breadcrumb } from "@/components/navigation/Breadcrumb";
import { ComingSoonScreen } from "@/components/ui/ComingSoonScreen";
import { RoomGallery } from "@/components/room/RoomGallery";
import { Button } from "@/components/ui/Button";
import { getPropertyBySlug } from "@/lib/content/properties";
import { getRooms, getRoom } from "@/lib/content/rooms";
import { getI18n } from "@/lib/i18n/server";
import { pageMetadata } from "@/lib/i18n/metadata";

interface Props {
  params: Promise<{ hotel: string; room: string }>;
}

export function generateStaticParams() {
  return getRooms("vi").map((r) => ({ hotel: r.hotel, room: r.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { hotel, room: roomSlug } = await params;
  const { locale } = await getI18n();
  const room = getRoom(hotel, roomSlug, locale);
  if (!room) return {};
  return pageMetadata({
    locale,
    path: `/phong-nghi/${hotel}/${roomSlug}`,
    title: `${room.name} | Túi Ba Gang`,
    description: room.description,
    image: room.images[0],
  });
}

/**
 * Chi tiết hạng phòng — `/phong-nghi/:hotel/:room-slug` (CONFIRMED cần có trang —
 * xem docs/page-specifications.md mục 3b). Giá và tiện nghi chi tiết
 * [CHƯA XÁC ĐỊNH] — dùng mock ở lib/content/rooms.ts.
 */
export default async function RoomDetailPage({ params }: Props) {
  const { hotel, room: roomSlug } = await params;
  const { locale, dict } = await getI18n();
  const property = getPropertyBySlug(hotel, locale);
  const room = getRoom(hotel, roomSlug, locale);

  if (!property || !room) {
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

  return (
    <section className="pt-32 pb-10 md:pt-40 md:pb-14">
      <Container>
        <Breadcrumb
          items={[
            { label: dict.common.home, href: "/" },
            { label: dict.nav.rooms, href: "/phong-nghi" },
            { label: property.shortName, href: `/phong-nghi/${property.slug}` },
            { label: room.name },
          ]}
        />

        <div className="mt-6 grid gap-10 md:grid-cols-[1.4fr_1fr]">
          <RoomGallery images={room.images} alt={room.name} />

          <div>
            <h1 className="font-heading text-3xl text-ink md:text-4xl">{room.name}</h1>
            <p className="mt-2 text-sm uppercase tracking-label text-brown-600">
              {dict.common.guests(room.maxGuests)} · {room.sizeSqm}m²
            </p>
            <p className="mt-5 text-sm leading-relaxed text-brown-600">{room.description}</p>

            <div className="mt-6">
              <p className="section-label">{dict.roomsPage.amenities}</p>
              <ul className="mt-3 flex flex-col gap-1.5 text-sm text-brown-600">
                {room.amenities.map((amenity) => (
                  <li key={amenity}>{amenity}</li>
                ))}
              </ul>
            </div>

            <p className="mt-6 text-xs text-brown-600">
              {/* [CHƯA XÁC ĐỊNH] — File B không hiển thị giá, xem docs/functional-requirements.md 5.3 */}
              {dict.roomsPage.priceNote}
            </p>

            <div className="mt-6">
              <Button href={`/dat-phong?hotel=${property.slug}&room=${room.slug}`} withArrow>
                {dict.roomsPage.bookThisRoom}
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
