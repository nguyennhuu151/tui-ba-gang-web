import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Breadcrumb } from "@/components/navigation/Breadcrumb";
import type { Property } from "@/lib/types";
import { getI18n } from "@/lib/i18n/server";

/** 3 "mood tile" — CHỈ Little Bay, thay cho Our Story (CONFIRMED File B trang 8, Phase 6.5 mục 15). */
export async function PropertyMoodTiles({ property, anchorId }: { property: Property; anchorId: string }) {
  if (!property.moodTiles) return null;
  const { dict } = await getI18n();

  return (
    <section id={anchorId} className="py-20 md:py-28">
      <Container>
        <Breadcrumb
          items={[
            { label: dict.common.home, href: "/" },
            { label: dict.nav.library, href: "/thu-vien" },
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
  );
}
