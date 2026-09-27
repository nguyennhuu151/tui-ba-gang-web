import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Breadcrumb } from "@/components/navigation/Breadcrumb";
import { SectionLabel } from "@/components/layout/SectionLabel";
import { PropertyOverlayCard } from "@/components/hotel/PropertyOverlayCard";
import { properties } from "@/lib/content/properties";

export const metadata: Metadata = {
  title: "Phòng nghỉ | Túi Ba Gang",
  description: "Chọn 1 trong 3 cơ sở Túi Ba Gang để xem danh sách hạng phòng: Central, Ember Style, Little Bay.",
};
export default function RoomsIndexPage() {
  return (
    <>
      <section className="pt-32 md:pt-40">
        <Container>
          <Breadcrumb
            items={[
              { label: "Trang chủ", href: "/" },
              { label: "Phòng nghỉ" },
            ]}
          />
        </Container>
      </section>
      <section className="flex items-center md:pt-4">
        <Container className="grid w-full gap-10 lg:grid-cols-[0.85fr_2.3fr] lg:items-center">
          <div>
            <div className="mt-4">
              <SectionLabel>PHÒNG NGHỈ</SectionLabel>
            </div>
            <h1 className="mt-3 font-heading text-3xl leading-tight text-ink md:text-4xl">
              <span className="block">Ba nơi dừng chân,</span>
              <span className="block">ba sắc thái Đà Lạt.</span>
            </h1>
            <p className="mt-5 text-sm leading-relaxed text-brown-600">
              Dù là một kỳ nghỉ giữa lòng thành phố, một góc yên bình bên hồ, hay một không gian ấm
              áp mang dấu ấn riêng, Túi Ba Gang luôn có một nơi phù hợp dành cho bạn.
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
                ctaLabel="XEM PHÒNG"
              />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
