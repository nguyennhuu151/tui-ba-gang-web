import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Breadcrumb } from "@/components/navigation/Breadcrumb";
import { ContactCard } from "@/components/hotel/ContactCard";
import { CornerTagList } from "@/components/ui/CornerTagList";
import { getProperties } from "@/lib/content/properties";
import { getOffers } from "@/lib/content/offers";
import { getContactContent } from "@/lib/content/contact";
import { getI18n } from "@/lib/i18n/server";
import { pageMetadata } from "@/lib/i18n/metadata";
import { TextLines } from "@/components/ui/TextLines";

export async function generateMetadata(): Promise<Metadata> {
  const { locale, dict } = await getI18n();
  return pageMetadata({
    locale,
    path: "/lien-he",
    title: dict.meta.contact.title,
    description: dict.meta.contact.description,
  });
}

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ offer?: string }>;
}) {
  const { locale, dict } = await getI18n();
  const properties = getProperties(locale);
  const offers = getOffers(locale);
  const resolvedSearchParams = await searchParams;
  const offerFromQuery = resolvedSearchParams.offer
    ? offers.find((o) => o.slug === resolvedSearchParams.offer)
    : undefined;
  const { banner, finalSection } = getContactContent(locale);
  const bannerAlt = dict.contactPage.bannerImageAlt;

  return (
    <>
      <section className="relative overflow-hidden bg-cream-50">
        <div className="absolute right-0 top-20 bottom-0 hidden w-1/2 md:top-24 md:block">
          <Image
            src={banner.image}
            alt={bannerAlt}
            fill
            priority
            sizes="50vw"
            className="object-cover"
          />
          <CornerTagList
            lines={banner.topRightTag}
            className="absolute right-6 top-8 z-10 text-right md:right-10"
          />
        </div>

        <div className="relative mt-20 h-56 w-full md:hidden">
          <Image
            src={banner.image}
            alt={bannerAlt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>

        <Container className="relative flex min-h-[280px] items-center py-12 md:min-h-[460px] md:py-0">
          <div className="max-w-sm md:max-w-md md:pr-10">
            <p className="text-xs font-medium uppercase tracking-label text-brown-600">{banner.label}</p>
            <h1 className="mt-4 font-heading text-4xl leading-tight text-ink md:text-5xl">
              <TextLines lines={banner.headline} />
            </h1>
            <p className="mt-5 text-sm leading-relaxed text-brown-600">{banner.description}</p>
            <div className="mt-6 flex items-center gap-3">
              <span className="h-px w-8 shrink-0 bg-brown-800/40" />
              <span className="text-xs uppercase tracking-label text-brown-700">{banner.tagline}</span>
            </div>
          </div>
        </Container>
      </section>
      
      <div className="pt-4 px-6 md:px-10">
        <Breadcrumb
            items={[
              { label: dict.common.home, href: "/" },
              { label: dict.nav.contact },
            ]}
          />
      </div>
      <section className="pb-20">
        <Container>
          {offerFromQuery && (
            <p className="mt-8 mb-8 rounded-md bg-cream-100 px-4 py-3 text-sm text-brown-600">
              {dict.contactPage.offerNotice.before}{" "}
              <strong className="text-ink">{offerFromQuery.name}</strong>{" "}
              {dict.contactPage.offerNotice.middle}{" "}
              {properties.find((p) => p.slug === offerFromQuery.property)?.shortName}{" "}
              {dict.contactPage.offerNotice.after}
            </p>
          )}
          <div className="grid gap-8 md:grid-cols-3">
            {properties.map((property) => (
              <ContactCard key={property.slug} property={property} />
            ))}
          </div>
        </Container>
      </section>

      <section className="relative flex min-h-[30vh] items-center justify-center overflow-hidden px-6 py-14 text-center">
        <Image
          src={finalSection.image}
          alt={dict.contactPage.finalImageAlt}
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-cream-50/75" />
        <div className="relative z-10 flex flex-col items-center gap-3">
          <h2 className="font-heading text-2xl leading-tight text-ink md:text-3xl">
            {finalSection.headline.join(" — ")}
          </h2>
          <div className="flex items-center gap-3">
            <span className="h-px w-8 shrink-0 bg-brown-800/40" />
            <span className="text-xs uppercase tracking-label text-brown-700">{finalSection.tagline}</span>
          </div>
        </div>
      </section>
    </>
  );
}
