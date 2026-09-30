import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { SectionLabel } from "@/components/layout/SectionLabel";
import { Button } from "@/components/ui/Button";
import { TextLines } from "@/components/ui/TextLines";
import type { Property } from "@/lib/types";

/** Our Story — ảnh đơn (Central) hoặc collage 3 ảnh (Ember Style), rẽ nhánh theo số ảnh trong dữ liệu. */
export function PropertyStorySection({ property, anchorId }: { property: Property; anchorId: string }) {
  if (!property.story) return null;

  return (
    <section id={anchorId} className="pb-28">
      <Container>
        <div className="mt-6 grid gap-10 md:grid-cols-[1fr_1.2fr] md:items-center">
          <div>
            <SectionLabel>{property.story.label}</SectionLabel>
            <h2 className="mt-4 font-heading text-2xl leading-tight text-ink md:text-3xl">
              <TextLines lines={property.story.heading} />
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
  );
}
