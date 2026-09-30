import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Breadcrumb } from "@/components/navigation/Breadcrumb";
import { SectionLabel } from "@/components/layout/SectionLabel";
import { PropertyOverlayCard } from "@/components/hotel/PropertyOverlayCard";
import { getProperties } from "@/lib/content/properties";
import { getLibraryContent } from "@/lib/content/library";
import { getI18n } from "@/lib/i18n/server";
import { pageMetadata } from "@/lib/i18n/metadata";
import { TextLines } from "@/components/ui/TextLines";

export async function generateMetadata(): Promise<Metadata> {
  const { locale, dict } = await getI18n();
  return pageMetadata({
    locale,
    path: "/thu-vien",
    title: dict.meta.library.title,
    description: dict.meta.library.description,
  });
}

export default async function LibraryIndexPage() {
  const { locale, dict } = await getI18n();
  const { hero } = getLibraryContent(locale);
  const properties = getProperties(locale);

  return (
    <div>
      <div className="pt-28 px-6 md:px-10">
        <Breadcrumb
            items={[
              { label: dict.common.home, href: "/" },
              { label: dict.nav.library },
            ]}
          />
      </div>
      <section className="pb-32">
        <Container>
          <div className="mt-6 mb-10 flex flex-wrap items-start justify-between gap-6 md:mb-14">
            <div>
              <SectionLabel>{hero.label}</SectionLabel>
              <h1 className="mt-3 font-heading text-3xl leading-tight text-ink md:text-4xl">
                {hero.headline}
              </h1>
              <p className="mt-3 max-w-lg text-sm leading-relaxed text-brown-600">{hero.description}</p>
            </div>
            <p className="hidden text-right font-heading text-lg italic leading-snug text-ink md:block">
              <TextLines lines={hero.tag} />
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {properties.map((property, index) => (
              <PropertyOverlayCard
                key={property.slug}
                property={property}
                index={index}
                showNumber
                description={property.listingLine}
                tags={property.tags}
                ctaLabel={dict.libraryPage.viewLibrary(property.shortName.toUpperCase())}
              />
            ))}
          </div>
        </Container>
      </section>
    </div>
    
  );
}
