import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { Breadcrumb } from "@/components/navigation/Breadcrumb";
import { RoomGallery } from "@/components/room/RoomGallery";
import { Button } from "@/components/ui/Button";
import { getPropertyBySlug } from "@/lib/content/properties";
import { rooms, getRoom } from "@/lib/content/rooms";

interface Props {
  params: Promise<{ hotel: string; room: string }>;
}

export function generateStaticParams() {
  return rooms.map((r) => ({ hotel: r.hotel, room: r.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { hotel, room: roomSlug } = await params;
  const room = getRoom(hotel, roomSlug);
  if (!room) return {};
  return {
    title: `${room.name} | Túi Ba Gang`,
    description: room.description,
  };
}

/**
 * Chi tiết hạng phòng — `/phong-nghi/:hotel/:room-slug` (CONFIRMED cần có trang —
 * xem docs/page-specifications.md mục 3b). Giá và tiện nghi chi tiết
 * [CHƯA XÁC ĐỊNH] — dùng mock ở lib/content/rooms.ts.
 */
export default async function RoomDetailPage({ params }: Props) {
  const { hotel, room: roomSlug } = await params;
  const property = getPropertyBySlug(hotel);
  const room = getRoom(hotel, roomSlug);

  if (!property || !room) {
    notFound();
  }

  return (
    // Trang này KHÔNG có Hero ở đầu nên Header (nay là `fixed`, xem components/layout/Header.tsx
    // — Phase 6.5 mục 3) sẽ đè lên nội dung nếu không bù khoảng trống bằng đúng chiều cao Header
    // (h-20/md:h-24) + khoảng cách gốc (py-10/md:py-14).
    <section className="pt-32 pb-10 md:pt-40 md:pb-14">
      <Container>
        <Breadcrumb
          items={[
            { label: "Phòng nghỉ", href: "/phong-nghi" },
            { label: property.shortName, href: `/phong-nghi/${property.slug}` },
            { label: room.name },
          ]}
        />

        <div className="mt-6 grid gap-10 md:grid-cols-[1.4fr_1fr]">
          <RoomGallery images={room.images} alt={room.name} />

          <div>
            <h1 className="font-heading text-3xl text-ink md:text-4xl">{room.name}</h1>
            <p className="mt-2 text-sm uppercase tracking-label text-brown-600">
              {room.maxGuests} khách · {room.sizeSqm}m²
            </p>
            <p className="mt-5 text-sm leading-relaxed text-brown-600">{room.description}</p>

            <div className="mt-6">
              <p className="section-label">TIỆN NGHI</p>
              <ul className="mt-3 flex flex-col gap-1.5 text-sm text-brown-600">
                {room.amenities.map((amenity) => (
                  <li key={amenity}>{amenity}</li>
                ))}
              </ul>
            </div>

            <p className="mt-6 text-xs text-brown-600">
              {/* [CHƯA XÁC ĐỊNH] — File B không hiển thị giá, xem docs/functional-requirements.md 5.3 */}
              Giá phòng sẽ được hiển thị khi kiểm tra phòng trống thực tế qua ezCloud.
            </p>

            <div className="mt-6">
              <Button href={`/dat-phong?hotel=${property.slug}&room=${room.slug}`} withArrow>
                ĐẶT PHÒNG NÀY
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
