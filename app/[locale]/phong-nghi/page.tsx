import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Breadcrumb } from "@/components/navigation/Breadcrumb";
import { SectionLabel } from "@/components/layout/SectionLabel";
import { PropertyOverlayCard } from "@/components/hotel/PropertyOverlayCard";
import { getProperties } from "@/lib/content/properties";
import { getI18n } from "@/lib/i18n/server";
import { pageMetadata } from "@/lib/i18n/metadata";
import { TextLines } from "@/components/ui/TextLines";

export async function generateMetadata(): Promise<Metadata> {
  const { locale, dict } = await getI18n();
  return pageMetadata({
    locale,
    path: "/phong-nghi",
    title: dict.meta.rooms.title,
    description: dict.meta.rooms.description,
  });
}

export default async function RoomsIndexPage() {
  const { locale, dict } = await getI18n();
  const properties = getProperties(locale);

  return (
    <>
      <section className="pt-32 md:pt-40">
        <Container>
          <Breadcrumb
            items={[
              { label: dict.common.home, href: "/" },
              { label: dict.nav.rooms },
            ]}
          />
        </Container>
      </section>
      <section className="flex items-center md:pt-4">
        <Container className="grid w-full gap-10 lg:grid-cols-[0.85fr_2.3fr] lg:items-center">
          <div>
            <div className="mt-4">
              <SectionLabel>{dict.roomsPage.label}</SectionLabel>
            </div>
            <h1 className="mt-3 font-heading text-3xl leading-tight text-ink md:text-4xl">
              <TextLines lines={dict.roomsPage.headline} />
            </h1>
            <p className="mt-5 text-sm leading-relaxed text-brown-600">
              {dict.roomsPage.description}
            </p>
            <p className="mt-6 font-heading text-lg italic leading-snug text-ink">
              A little stay
              <br />
              A deeper connection.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {properties.map((property, index) => (
              <PropertyOverlayCard
                key={property.slug}
                property={property}
                index={index}
                ctaHref={`/phong-nghi/${property.slug}`}
                ctaLabel={dict.common.viewRooms}
              />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
