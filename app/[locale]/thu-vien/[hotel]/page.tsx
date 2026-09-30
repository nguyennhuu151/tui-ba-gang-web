import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Hero } from "@/components/hero/Hero";
import { Container } from "@/components/layout/Container";
import { Breadcrumb } from "@/components/navigation/Breadcrumb";
import { ComingSoonScreen } from "@/components/ui/ComingSoonScreen";
import { PropertyStorySection } from "@/components/property/PropertyStorySection";
import { PropertyMoodTiles } from "@/components/property/PropertyMoodTiles";
import { PropertyAmenitiesSection } from "@/components/property/PropertyAmenitiesSection";
import { PropertyRoomsPreview } from "@/components/property/PropertyRoomsPreview";
import { PropertyMoreThanStay } from "@/components/property/PropertyMoreThanStay";
import { PropertyDiningSection } from "@/components/property/PropertyDiningSection";
import { PropertyClosingBanner } from "@/components/property/PropertyClosingBanner";
import { propertySlugs, getPropertyBySlug } from "@/lib/content/properties";
import { getRoomsByHotel } from "@/lib/content/rooms";
import { getI18n } from "@/lib/i18n/server";
import { pageMetadata } from "@/lib/i18n/metadata";
import { TextLines } from "@/components/ui/TextLines";

interface Props {
  params: Promise<{ hotel: string }>;
}

export function generateStaticParams() {
  return propertySlugs.map((hotel) => ({ hotel }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { hotel } = await params;
  const { locale } = await getI18n();
  const property = getPropertyBySlug(hotel, locale);
  if (!property) return {};
  return pageMetadata({
    locale,
    path: `/thu-vien/${hotel}`,
    title: `${property.fullName} | Túi Ba Gang`,
    description: `${property.tagline} — ${property.cardDescription}`,
    image: property.heroImage,
  });
}


export default async function PropertyLandingPage({ params }: Props) {
  const { hotel } = await params;
  const { locale, dict } = await getI18n();
  const property = getPropertyBySlug(hotel, locale);
  if (!property) {
    notFound();
  }

  if (property.status === "coming-soon") {
    return (
      <section className="flex min-h-screen items-center bg-cream-50">
        <Container className="w-full">
          <ComingSoonScreen property={property} />
        </Container>
      </section>
    );
  }

  const previewImages = property.roomsSection?.previewImages;
  const previewRooms = getRoomsByHotel(property.slug, locale)
    .slice(0, property.roomsSection?.previewCount ?? 3)
    .map((room, index) => (previewImages ? { ...room, images: [previewImages[index % previewImages.length]] } : room));
  const introAnchor = `story-${property.slug}`;

  return (
    <>
      <Hero
        size="compact"
        locationTag={property.heroLocationTag}
        headline={property.heroHeadline ?? [property.shortName]}
        subheadline={property.heroSubheadline}
        ctaLabel={dict.libraryPage.exploreProperty(property.shortName.toUpperCase())}
        ctaHref={`#${introAnchor}`}
        image={property.heroImage}
        imageAlt={property.fullName}
        topRightTag={property.heroTopRightTag}
        dashTag={
          <div className="flex items-center gap-3">
            <span className="h-px w-8 shrink-0 bg-cream-50/50" />
            <span className="text-xs uppercase leading-relaxed tracking-label text-cream-50/85">
              <TextLines lines={property.heroDashTag} />
            </span>
          </div>
        }
      />

      <div className="pt-4 px-6 md:px-10">
        <Breadcrumb
          items={[
            { label: dict.common.home, href: "/" },
            { label: dict.nav.library, href: "/thu-vien" },
            { label: property.shortName },
          ]}
        />
      </div>
      <PropertyStorySection property={property} anchorId={introAnchor} />
      <PropertyMoodTiles property={property} anchorId={introAnchor} />
      <PropertyAmenitiesSection property={property} />
      <PropertyRoomsPreview property={property} rooms={previewRooms} />
      <PropertyMoreThanStay property={property} />
      <PropertyDiningSection property={property} />
      <PropertyClosingBanner property={property} />
    </>
  );
}
