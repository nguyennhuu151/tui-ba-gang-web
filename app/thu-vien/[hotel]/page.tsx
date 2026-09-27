import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Hero } from "@/components/hero/Hero";
import { Container } from "@/components/layout/Container";
import { Breadcrumb } from "@/components/navigation/Breadcrumb";
import { SectionLabel } from "@/components/layout/SectionLabel";
import { Button } from "@/components/ui/Button";
import { AmenityIconList } from "@/components/hotel/AmenityIconList";
import { RoomCard } from "@/components/room/RoomCard";
import { ComingSoonScreen } from "@/components/ui/ComingSoonScreen";
import { properties, getPropertyBySlug } from "@/lib/content/properties";
import { getRoomsByHotel } from "@/lib/content/rooms";

interface Props {
  params: Promise<{ hotel: string }>;
}

export function generateStaticParams() {
  return properties.map((p) => ({ hotel: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { hotel } = await params;
  const property = getPropertyBySlug(hotel);
  if (!property) return {};
  return {
    title: `${property.fullName} | Túi Ba Gang`,
    description: `${property.tagline} — ${property.cardDescription}`,
  };
}


export default async function PropertyLandingPage({ params }: Props) {
  const { hotel } = await params;
  const property = getPropertyBySlug(hotel);
  if (!property) {
    notFound();
  }

  if (["ember-style", "little-bay"].includes(hotel)) {
    return (
      <section className="flex min-h-screen items-center bg-cream-50">
        <Container className="w-full">
          <ComingSoonScreen hotel={hotel} />
        </Container>
      </section>
    );
  }

  const previewRoomsRaw = getRoomsByHotel(property.slug).slice(0, property.roomsSection?.previewCount ?? 3);
  const previewRooms =
    property.slug === "central"
      ? previewRoomsRaw.map((room, index) => ({
          ...room,
          images: [`/images/room-central-deluxe-plus-${(index % 2) + 1}.jpg`],
        }))
      : previewRoomsRaw;
  const introAnchor = `story-${property.slug}`;
  const isDarkAmenities = Boolean(property.amenitiesSection.dark);

  return (
    <>
      <Hero
        size="compact"
        locationTag={property.slug === "little-bay" ? undefined : "TÚI BA GANG"}
        headline={property.heroHeadline ?? [property.shortName]}
        subheadline={property.heroSubheadline}
        ctaLabel={`KHÁM PHÁ ${property.shortName.toUpperCase()}`}
        ctaHref={`#${introAnchor}`}
        image={property.heroImage}
        imageAlt={property.fullName}
        topRightTag={property.heroTopRightTag}
        dashTag={
          <div className="flex items-center gap-3">
            <span className="h-px w-8 shrink-0 bg-cream-50/50" />
            <span className="text-xs uppercase leading-relaxed tracking-label text-cream-50/85">
              {property.heroDashTag.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </span>
          </div>
        }
      />

      <div className="pt-4 px-6 md:px-10">
        <Breadcrumb
          items={[
            { label: "Trang chủ", href: "/" },
            { label: "Thư viện", href: "/thu-vien" },
            { label: property.shortName },
          ]}
        />
      </div>
      {property.story && (
        <section id={introAnchor} className="pb-28">
          <Container>
            <div className="mt-6 grid gap-10 md:grid-cols-[1fr_1.2fr] md:items-center">
              <div>
              <SectionLabel>{property.story.label}</SectionLabel>
              <h2 className="mt-4 font-heading text-2xl leading-tight text-ink md:text-3xl">
                {property.story.heading.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </h2>
              <div className="mt-4 flex flex-col gap-4">
                {property.story.paragraphs.map((p) => (
                  <p key={p} className="text-sm leading-relaxed text-brown-600">
                    {p}
                  </p>
                ))}
              </div>
              <div className="mt-5 flex items-center gap-3">
                <span className="h-px w-6 shrink-0 bg-brown-800/40" />
                <Button href={`/phong-nghi/${property.slug}`} variant="ghost">
                  {property.story.ctaLabel}
                </Button>
              </div>
            </div>

            {property.story.images.length >= 3 ? (
              <div className="grid grid-cols-2 gap-4">
                <div className="relative row-span-2 aspect-[3/4] w-full overflow-hidden rounded-lg">
                  <Image
                    src={property.story.images[0]}
                    alt={`${property.fullName} — Our Story`}
                    fill
                    sizes="(min-width: 768px) 30vw, 50vw"
                    className="object-cover"
                  />
                </div>
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg">
                  <Image
                    src={property.story.images[1]}
                    alt={`${property.fullName} — Our Story`}
                    fill
                    sizes="(min-width: 768px) 25vw, 50vw"
                    className="object-cover"
                  />
                </div>
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg">
                  <Image
                    src={property.story.images[2]}
                    alt={`${property.fullName} — Our Story`}
                    fill
                    sizes="(min-width: 768px) 25vw, 50vw"
                    className="object-cover"
                  />
                </div>
              </div>
            ) : (
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg">
                <Image
                  src={property.story.images[0]}
                  alt={`${property.fullName} — Our Story`}
                  fill
                  sizes="(min-width: 768px) 55vw, 100vw"
                  className="object-cover"
                />
              </div>
            )}
            </div>
          </Container>
        </section>
      )}

      {/* 3 "mood tile" — CHỈ Little Bay, thay cho "Our Story" (CONFIRMED File B trang 8,
          Phase 6.5 mục 15). */}
      {property.moodTiles && (
        <section id={introAnchor} className="py-20 md:py-28">
          <Container>
            <Breadcrumb
              items={[
                { label: "Trang chủ", href: "/" },
                { label: "Thư viện", href: "/thu-vien" },
                { label: property.shortName },
              ]}
            />
            <div className="mt-6 grid gap-8 md:grid-cols-3">
              {property.moodTiles.map((tile) => (
                <article key={tile.key}>
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg">
                    <Image
                      src={tile.image}
                      alt={tile.title}
                      fill
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="mt-4 flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs uppercase tracking-label text-brown-500">{tile.label}</p>
                      <h3 className="mt-1 font-heading text-xl text-ink">{tile.title}</h3>
                      <p className="mt-1 text-sm text-brown-600">{tile.description}</p>
                    </div>
                    <span className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-brown-300 text-brown-700">
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                        <path
                          d="M3 8h10M9 4l4 4-4 4"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </Container>
        </section>
      )}

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
              {property.amenitiesSection.heading.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h2>
          </div>
          <div className={isDarkAmenities ? "mt-8" : "mt-8 md:mt-0"}>
            <AmenityIconList items={property.amenities} dark={isDarkAmenities} divided={!isDarkAmenities} />
          </div>
        </Container>
      </section>

      {property.roomsSection && (
        <section className="py-20 md:py-28">
          <Container
            className={`grid gap-8 md:items-center ${
              previewRooms.length >= 4 ? "md:grid-cols-5" : "md:grid-cols-4"
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
            {previewRooms.map((room) => (
              <RoomCard key={room.slug} room={room} variant="compact" />
            ))}
          </Container>
        </section>
      )}

      {property.moreThanStay && (
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
                {property.moreThanStay.heading.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
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
      )}

      {property.dining && (
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
                    alt={`${property.dining.title} — cận cảnh`}
                    fill
                    sizes="(min-width: 768px) 20vw, 45vw"
                    className="object-cover"
                  />
                  {property.dining.secondaryCaption && property.dining.secondaryCaption.length > 0 && (
                    <p className="absolute bottom-4 right-4 z-10 text-right font-heading text-lg italic leading-tight text-cream-50">
                      {property.dining.secondaryCaption.map((line) => (
                        <span key={line} className="block">
                          {line}
                        </span>
                      ))}
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
      )}

      {property.closingBanner && (
        <section className="relative flex min-h-[30vh] items-center overflow-hidden bg-brown-900 px-6 py-14 text-center md:text-left">
          <Container className="relative z-10 flex flex-col items-center gap-5 md:flex-row md:items-center md:justify-between md:gap-6">
            <div>
              <p className="font-heading text-2xl leading-snug text-cream-50 md:text-3xl">
                {property.closingBanner.tag.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
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
      )}
    </>
  );
}
