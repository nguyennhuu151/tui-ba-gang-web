import Image from "next/image";
import { Breadcrumb } from "@/components/navigation/Breadcrumb";
import { Button } from "@/components/ui/Button";
import { SectionLabel } from "@/components/layout/SectionLabel";
import { getPropertyBySlug } from "@/lib/content/properties";

const CONTACT_IMAGES: Record<string, string> = {
  "ember-style": "/images/contact-ember-style.jpg",
  "little-bay": "/images/contact-little-bay.jpg",
  central: "/images/contact-central.jpg",
};

export function ComingSoonScreen({ hotel }: { hotel: string }) {
  const property = getPropertyBySlug(hotel);
  const name = property?.shortName ?? hotel;
  const fullName = property?.fullName ?? hotel;
  const image = CONTACT_IMAGES[hotel] ?? CONTACT_IMAGES.central;

  return (
    <>
      <Breadcrumb
          items={[
            { label: "Trang chủ", href: "/" },
            { label: name, href: `/thu-vien/${hotel}` },
            { label: "Comming Soon" },
          ]}
        />

      <div className="grid gap-10 md:grid-cols-2 md:items-start md:gap-16">
        <div className="">
          <div className="mt-4">
            <SectionLabel className="text-sm md:text-base tracking-[0.22em] text-brown-700 md:tracking-[0.25em]">
              COMMING SOON
            </SectionLabel>
          </div>

          <h1 className="mt-4 font-heading text-3xl leading-tight text-ink md:text-5xl">
            <span className="block">Một góc Đà Lạt khác,</span>
            <span className="block">đang được chăm chút</span>
            <span className="block italic text-brown-700">từng chi tiết.</span>
          </h1>

          <p className="mt-6 max-w-md text-sm leading-relaxed text-brown-600 md:text-base">
            <strong className="text-ink">{fullName}</strong> dự kiến mở cửa quý IV năm 2026.
            Hãy theo dõi <strong>Túi Ba Gang</strong> để cập nhật những tin tức đầu tiên về không
            gian mới, các chương trình ưu đãi đặc biệt và cơ hội trải nghiệm đầu tay.
          </p>

          <p className="mt-6 font-heading text-lg italic leading-snug text-ink">
            Same places
            <br />
            A different you.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Button href="/" variant="primary" withArrow>
              QUAY VỀ TRANG CHỦ
            </Button>
            <Button href="/thu-vien/central" variant="outline" withArrow>
              XEM NGAY CƠ SỞ CENTRAL
            </Button>
          </div>
        </div>

        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-lg shadow-xl md:aspect-[3/4]">
          <Image
            src={image}
            alt={`${fullName} — sẵn sàng chào đón quý IV 2026`}
            fill
            sizes="(min-width: 768px) 45vw, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brown-900/35 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 z-10 flex items-end justify-between">
            <div>
              <p className="text-xs uppercase tracking-label text-cream-50/85">TÚI BA GANG</p>
              <p className="mt-1 font-heading text-2xl italic leading-tight text-cream-50">
                {name}
              </p>
            </div>
            <div className="h-px w-14 shrink-0 bg-cream-50/50" />
          </div>
        </div>
      </div>
    </>

  );
}
