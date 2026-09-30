"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { CornerTagList } from "@/components/ui/CornerTagList";
import { HeroPropertySelector } from "@/components/hero/HeroPropertySelector";
import { TextLines } from "@/components/ui/TextLines";

/**
 * Hero — dùng chung cho mọi trang chính (Phase 6 refactor từ bản Phase 5 chỉ dùng
 * riêng cho Trang chủ). Xem docs/ui-component-spec.md mục 2.3.
 *
 * `size`:
 * - "full": cao gần hết màn hình — chỉ dùng ở Trang chủ.
 * - "compact": thấp hơn — dùng cho mọi trang nội dung (Về chúng tôi, Ưu đãi, Liên hệ,
 *   Trải nghiệm, Đặt phòng, và từng trang cơ sở ở Thư viện).
 *
 * Animation: fade-in nhẹ khi vào trang — đúng phạm vi cho phép ở
 * docs/architecture.md mục 2.4 ("nên dùng: hiệu ứng fade-in nhẹ cho Hero").
 */
export interface HeroProps {
  /**
   * Nhãn nhỏ phía trên headline. Tuỳ chọn — Little Bay ở trang `/thu-vien/little-bay`
   * KHÔNG có dòng này (CONFIRMED File B trang 8, headline bắt đầu ngay không có nhãn
   * phía trên — Phase 6.5 mục 15), nên để trống thì không render dòng này thay vì hiện
   * chuỗi rỗng.
   */
  locationTag?: string;
  headline: string[];
  /**
   * Dòng tiêu đề cỡ vừa, hiển thị NGAY DƯỚI headline (không phải mô tả) — CONFIRMED
   * riêng cho trang `/thu-vien/:hotel` (vd. Central: "Sôi động giữa" / "lòng phố." —
   * File B trang 6). Khác `description` (cỡ chữ nhỏ hơn, nằm dưới subheadline).
   */
  subheadline?: string[];
  /**
   * Mô tả dưới headline. Nhận `string` (bản cũ) hoặc `string[]` khi cần giữ đúng
   * ngắt dòng có ý nghĩa của tham chiếu (vd. trang Về chúng tôi — Phase 6.5 mục 5.1,
   * File B trang 2: "Mang theo những điều thân quen." / "Lưu lại những điều đáng nhớ."
   * là 2 dòng riêng, không phải 1 câu dài).
   */
  description?: string | string[];
  ctaLabel?: string;
  ctaHref?: string;
  image: string;
  imageAlt: string;
  size?: "full" | "compact";
  /** Chỉ Trang chủ dùng — bộ chọn nhanh 3 cơ sở (CONFIRMED File B trang 1) */
  showPropertySelector?: boolean;
  /** Nội dung phụ đặt cùng hàng CTA — vd. `VideoButton` ở trang Trải nghiệm */
  children?: ReactNode;
  /** Logo nhỏ ở góc dưới-phải ảnh Hero — khớp mockup `/phong-nghi/:hotel` do user cung cấp */
  cornerBadge?: ReactNode;
  /**
   * Tag chữ hoa nhỏ, tối đa vài dòng, đặt góc TRÊN-phải ảnh Hero — CONFIRMED riêng cho
   * trang `/thu-vien/:hotel` (vd. Central: "PEOPLE/PLACES/MOMENTS/A SLOWER WAY", File B
   * trang 6). Khác `cornerBadge` (đặt góc dưới-phải, dùng cho Logo).
   */
  topRightTag?: string[];
  /**
   * Tag nhỏ có gạch ngang phía trước, đặt Ở RIÊNG 1 HÀNG, PHÍA TRÊN nút CTA (Phase 6.8
   * mục 5.1/6.1/7.1: bug fix — trước đó dùng chung `children` nên bị đặt CÙNG HÀNG,
   * BÊN CẠNH nút CTA, sai vị trí so với File B trang 6/7/8 — tham chiếu luôn đặt khối
   * này ngay TRÊN nút). Tách riêng khỏi `children` (KHÔNG dùng lại `children` cho việc
   * này) vì `children` vẫn cần giữ nguyên hành vi "cùng hàng CTA" cho nơi khác đang dùng
   * đúng vậy (vd. `VideoButton` ở trang Trải nghiệm, CONFIRMED File B trang 4) — tránh
   * sửa 1 chỗ làm hỏng chỗ khác đang đúng.
   */
  dashTag?: ReactNode;
}

export function Hero({
  locationTag,
  headline,
  subheadline,
  description,
  ctaLabel,
  ctaHref,
  image,
  imageAlt,
  size = "compact",
  showPropertySelector = false,
  children,
  cornerBadge,
  topRightTag,
  dashTag,
}: HeroProps) {
  const heightClass = size === "full" ? "min-h-[85vh]" : "min-h-[45vh] md:min-h-[50vh]";

  return (
    <section className={`relative flex ${heightClass} items-end overflow-hidden bg-brown-900`}>
      <Image
        src={image}
        alt={imageAlt}
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      {/*
        Phase 6.7: Header giờ LUÔN trong suốt (bg-transparent, không có nền đục/viền
        riêng) và đè trực tiếp lên phần TRÊN CÙNG của ảnh Hero này — trước đó lớp phủ chỉ
        `to-brown-900/10` (rất nhạt) ở điểm trên cùng vì phần đó trước nay chỉ cần đủ tối
        cho chữ Hero (locationTag/headline) vốn nằm gần ĐÁY Hero (`items-end`), không phải
        cho vùng Header. Khi Header hết nền đục, chữ trắng của Header (Logo/NavMenu...)
        đè lên vùng ảnh gần như không được tối hoá này sẽ có nguy cơ chìm vào ảnh sáng màu
        (trời/tường trắng...). Tăng điểm dừng trên cùng lên `/35` để Header luôn đọc được
        trên MỌI ảnh Hero, đồng thời ảnh vẫn hiện rõ qua lớp phủ (không phải nền đục đặc) —
        đúng yêu cầu "ảnh hero nhìn thấy được qua Header trong suốt". Không đổi 2 điểm dừng
        còn lại (`from-.../90`, `via-.../30`) vì đó là vùng chữ Hero chính, không liên quan
        tới lỗi này.
      */}
      <div className="absolute inset-0 bg-gradient-to-t from-brown-900/90 via-brown-900/30 to-brown-900/35" />

      {cornerBadge && <div className="absolute bottom-6 right-6 z-10 md:bottom-8 md:right-10">{cornerBadge}</div>}

      <CornerTagList
        lines={topRightTag}
        className="absolute right-6 top-24 z-10 hidden text-right md:block md:right-10"
      />

      {/*
        Phase 6.7 mục 1 (bug fix Trải nghiệm — nhưng áp dụng chung cho mọi Hero "compact"
        vì cùng root cause, tránh hack riêng 1 trang): Header là `position: fixed`, không
        chiếm chỗ trong luồng tài liệu, nên `pt-24` (96px) ở đây thực chất là khoảng cách
        từ ĐỈNH VIEWPORT (không phải từ mép dưới Header) tới `locationTag`. Vì Header cao
        đúng 96px ở desktop (`md:h-24`), `pt-24` chỉ vừa đủ CHẠM mép dưới Header — gần như
        0px khoảng hở thật sự, nên `locationTag` ("ĐÀ LẠT, VIỆT NAM"...) dính sát Header.
        Đã đo tỉ lệ trực tiếp trên File B trang 4 (khoảng cách mép dưới nav → đỉnh chữ
        locationTag ≈ 0.32 lần chiều cao nav) và quy đổi: cần thêm ~32px khoảng hở THẬT
        (ngoài chiều cao Header) ở cả 2 breakpoint — desktop 96px (Header) + 32px = 128px
        (`pt-32`), mobile 80px (Header) + 32px ≈ 112px (`pt-28`, làm tròn theo thang
        Tailwind). Size "full" (chỉ Trang chủ) đã dùng `pt-32` sẵn, không đổi.
      */}
      <Container className={`relative z-10 pb-14 ${size === "full" ? "pt-32 md:pb-20" : "pt-28 md:pt-32"}`}>
        {locationTag && (
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-4 text-xs font-medium uppercase tracking-label text-cream-50/80"
          >
            {locationTag}
          </motion.p>
        )}

        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className={`max-w-xl font-heading leading-tight text-cream-50 ${
            size === "full" ? "text-4xl md:text-6xl" : "text-3xl md:text-5xl"
          }`}
        >
          <TextLines lines={headline} />
        </motion.h1>

        {subheadline && subheadline.length > 0 && (
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-2 max-w-md font-heading text-xl leading-snug text-cream-50/95 md:text-2xl"
          >
            <TextLines lines={subheadline} />
          </motion.p>
        )}

        {description && (
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-5 max-w-md text-base text-cream-50/85"
          >
            {Array.isArray(description)
              ? <TextLines lines={description} />
              : description}
          </motion.p>
        )}

        {dashTag && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-5"
          >
            {dashTag}
          </motion.div>
        )}

        {(ctaLabel || children) && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-8 flex flex-wrap items-center gap-10"
          >
            {ctaLabel && ctaHref && (
              <Button href={ctaHref} inverse>
                {ctaLabel}
              </Button>
            )}
            {children}
          </motion.div>
        )}

        {/* Bộ chọn 3 cơ sở — đặt RIÊNG, BÊN DƯỚI nút CTA (CONFIRMED File B trang 1,
            không dùng chung hàng với nút CTA như bản cũ) — xem Phase 6.5 mục 4.1. */}
        {showPropertySelector && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-6"
          >
            <HeroPropertySelector />
          </motion.div>
        )}
      </Container>

      {/*
        Phase 6.8 mục 1.1: "cột mốc" vô hình đặt đúng MÉP DƯỚI Hero — `Header.tsx` dùng
        `IntersectionObserver` theo dõi phần tử này (qua `id`, không qua React ref, vì
        Header và Hero là 2 component độc lập nằm ở 2 chỗ khác nhau trong `app/layout.tsx`,
        không có quan hệ cha-con) để biết người dùng đã cuộn qua khỏi ảnh Hero hay chưa,
        từ đó đổi màu CHỮ Header (không đổi nền) cho luôn đọc được. Đặt tuyệt đối trùng
        mép dưới `section` (phần tử cha có `position: relative`), cao 1px, không chiếm
        chỗ, không hiển thị — không ảnh hưởng layout/thị giác.
      */}
      <div id="hero-sentinel" aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-px" />
    </section>
  );
}
