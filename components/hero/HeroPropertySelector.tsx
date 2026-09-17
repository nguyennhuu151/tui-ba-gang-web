import Link from "next/link";
import { properties } from "@/lib/content/properties";

/**
 * HeroPropertySelector — 3 số thứ tự (01/02/03) dẫn nhanh tới trang Thư viện
 * của từng cơ sở, đặt trong Hero trang chủ, BÊN DƯỚI nút CTA "KHÁM PHÁ NGAY".
 * CONFIRMED: File B trang 1 — "Điều hướng sang Thư viện > Khách sạn tương ứng".
 *
 * Khung viền nền tối riêng biệt — CONFIRMED File B trang 1 (nhóm 01/02/03 nằm
 * trong 1 khung viền tách biệt với nút CTA, không phải text trần) — xem
 * Phase 6.5 mục 4.1.
 */
export function HeroPropertySelector() {
  return (
    <div className="flex flex-wrap gap-8 rounded-md border border-cream-50/30 bg-brown-900/30 px-6 py-4 backdrop-blur-sm">
      {properties.map((property) => (
        <Link
          key={property.slug}
          href={`/thu-vien/${property.slug}`}
          className="group flex flex-col gap-1 text-cream-50"
        >
          <span className="font-heading text-sm text-cream-50/70 group-hover:text-cream-50">
            {property.order}
          </span>
          <span className="text-sm underline-offset-4 group-hover:underline">
            {property.shortName}
          </span>
        </Link>
      ))}
    </div>
  );
}
