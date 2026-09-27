import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Breadcrumb } from "@/components/navigation/Breadcrumb";
import { ContactCard } from "@/components/hotel/ContactCard";
import { CornerTagList } from "@/components/ui/CornerTagList";
import { properties } from "@/lib/content/properties";
import { offers } from "@/lib/content/offers";
import { contactContent } from "@/lib/content/contact";

export const metadata: Metadata = {
  title: "Liên hệ | Túi Ba Gang",
  description: "Thông tin liên hệ (hotline, email) của Central, Ember Style và Little Bay.",
};

const CONTACT_IMAGES: Record<string, string> = {
  central: "/images/contact-central.jpg",
  "ember-style": "/images/contact-ember-style.jpg",
  "little-bay": "/images/contact-little-bay.jpg",
};

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ offer?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const offerFromQuery = resolvedSearchParams.offer
    ? offers.find((o) => o.slug === resolvedSearchParams.offer)
    : undefined;
  const { banner, cards, finalSection } = contactContent;

  return (
    <>
      <section className="relative overflow-hidden bg-cream-50">
        <div className="absolute right-0 top-20 bottom-0 hidden w-1/2 md:top-24 md:block">
          <Image
            src={banner.image}
            alt="Góc nghỉ ngơi tại Túi Ba Gang, cửa sổ nhìn ra núi đồi Đà Lạt trong sương"
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
            alt="Góc nghỉ ngơi tại Túi Ba Gang, cửa sổ nhìn ra núi đồi Đà Lạt trong sương"
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
              {banner.headline.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
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
              { label: "Trang chủ", href: "/" },
              { label: "Liên hệ" },
            ]}
          />
      </div>
      <section className="pb-20">
        <Container>
          {offerFromQuery && (
            <p className="mt-8 mb-8 rounded-md bg-cream-100 px-4 py-3 text-sm text-brown-600">
              Bạn quan tâm ưu đãi <strong className="text-ink">{offerFromQuery.name}</strong> — vui lòng liên hệ
              trực tiếp cơ sở {properties.find((p) => p.slug === offerFromQuery.property)?.shortName} bên dưới.
            </p>
          )}
          <div className="grid gap-8 md:grid-cols-3">
            {properties.map((property) => {
              const card = cards[property.slug];
              return (
                <ContactCard
                  key={property.slug}
                  property={property}
                  image={CONTACT_IMAGES[property.slug]}
                  description={card.description}
                  tags={card.tags}
                />
              );
            })}
          </div>
        </Container>
      </section>

      <section className="relative flex min-h-[30vh] items-center justify-center overflow-hidden px-6 py-14 text-center">
        <Image
          src={finalSection.image}
          alt="Núi đồi Đà Lạt trong sương, nhìn từ Túi Ba Gang"
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
