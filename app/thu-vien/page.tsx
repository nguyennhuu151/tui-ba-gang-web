import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Breadcrumb } from "@/components/navigation/Breadcrumb";
import { SectionLabel } from "@/components/layout/SectionLabel";
import { PropertyOverlayCard } from "@/components/hotel/PropertyOverlayCard";
import { properties } from "@/lib/content/properties";
import { libraryContent } from "@/lib/content/library";

export const metadata: Metadata = {
  title: "Thư viện | Túi Ba Gang",
  description: "Khám phá landing page đầy đủ của từng cơ sở Túi Ba Gang: Central, Ember Style, Little Bay.",
};

export default function LibraryIndexPage() {
  const { hero, cards } = libraryContent;

  return (
    <div>
      <div className="pt-28 px-6 md:px-10">
        <Breadcrumb
            items={[
              { label: "Trang chủ", href: "/" },
              { label: "Thư viện" },
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
              {hero.tag.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {properties.map((property, index) => {
              const card = cards[property.slug];
              return (
                <PropertyOverlayCard
                  key={property.slug}
                  property={property}
                  index={index}
                  showNumber
                  description={card.description}
                  tags={[...card.tags]}
                  ctaLabel={`XEM THƯ VIỆN ${property.shortName.toUpperCase()}`}
                />
              );
            })}
          </div>
        </Container>
      </section>
    </div>
    
  );
}
