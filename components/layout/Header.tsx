"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/layout/Logo";
import { NavMenu } from "@/components/navigation/NavMenu";
import { MobileMenu } from "@/components/navigation/MobileMenu";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { PropertySubNav } from "@/components/layout/PropertySubNav";
import { bookingHref } from "@/lib/content/navigation";
import type { PropertySlug } from "@/lib/types";

const PROPERTY_SLUGS: PropertySlug[] = ["central", "ember-style", "little-bay"];

// Các route có ảnh Hero ngay đầu trang (xem `components/hero/Hero.tsx`) — Header cần
// chữ SÁNG (inverse) để đọc được trên ảnh. Xác định bằng cách rà tất cả nơi import
// `Hero` trong `app/` (7 trang), TRỪ `/thu-vien/:hotel` (đã tự có `PropertySubNav`
// riêng, không qua nhánh này) — không suy đoán, dựa trực tiếp trên component thật
// đang được dùng ở từng trang.
const HERO_EXACT_PATHS = new Set(["/", "/ve-chung-toi", "/trai-nghiem", "/uu-dai", "/dat-phong"]);
// `/phong-nghi/:hotel` có Hero, nhưng `/phong-nghi/:hotel/:room` (trang chi tiết
// phòng) thì KHÔNG — phải phân biệt bằng regex, không thể gộp vào set ở trên.
const HOTEL_HERO_PATTERN = /^\/phong-nghi\/[^/]+\/?$/;

/**
 * Header — dùng chung cho mọi trang, NGOẠI TRỪ `/thu-vien/:hotel` (mỗi trang cơ sở
 * dùng `PropertySubNav` riêng thay cho menu chính — CONFIRMED, xem
 * docs/ui-component-spec.md mục 2.1 và docs/page-specifications.md mục 5a).
 *
 * Cách chuyển đổi: Header/PropertySubNav được đặt CHUNG 1 chỗ trong app/layout.tsx
 * (áp dụng cho mọi route), nên Header tự đọc `pathname` để quyết định hiển thị
 * PropertySubNav thay vì tự nó — tránh phải tách route group phức tạp chỉ vì
 * 1 nhóm trang cần header khác.
 *
 * LỊCH SỬ QUYẾT ĐỊNH (đọc để không lặp lại vòng lặp cũ):
 * - Phase 6.5: Header trong suốt lúc đầu trang, chuyển ĐỤC sau khi cuộn (scroll-toggle).
 * - Phase 6.6 mục 1.1: đối chiếu ảnh nhúng gốc File B (8 trang) và thấy nav tham chiếu
 *   LUÔN đục/chữ tối, không có trạng thái trong suốt nào — đã bỏ scroll-toggle, Header
 *   chuyển thành LUÔN ĐỤC (`bg-cream-50/95`).
 * - Phase 6.7: user YÊU CẦU TRỰC TIẾP (không phải suy đoán từ PDF) đổi Header thành
 *   trong suốt HOÀN TOÀN, xuyên suốt — đây là quyết định thiết kế MỚI của chủ đầu tư,
 *   có chủ đích khác với mockup File B gốc (đã xác nhận lại rõ ràng trước khi làm, xem
 *   báo cáo Phase 6.7). Header LUÔN trong suốt (không đổi NỀN theo scroll — tránh lặp
 *   lại lỗi Phase 6.5), chỉ đổi MÀU CHỮ theo từng route (`inverse`) tuỳ trang đó có ảnh
 *   Hero ngay đầu trang hay không.
 * - Phase 6.8 mục 1.1 (bug fix, client phản hồi trực tiếp trên bản chạy thật): với các
 *   trang CÓ Hero, `inverse` ở Phase 6.7 là 1 giá trị TĨNH theo route — chữ Header LUÔN
 *   sáng suốt trang, kể cả sau khi người dùng đã cuộn QUA khỏi ảnh Hero và Header đang
 *   đè lên phần nội dung nền sáng (cream) phía dưới → chữ trắng trên nền sáng, không đọc
 *   được (đúng lỗi client mô tả). Root cause: Header không biết trang đã cuộn qua khỏi
 *   Hero hay chưa.
 *
 *   Cách sửa (KHÔNG phải quay lại scroll-toggle NỀN của Phase 6.5 — ở đây NỀN vẫn luôn
 *   trong suốt tuyệt đối, chỉ MÀU CHỮ đổi, và đổi dựa trên vị trí THẬT của Hero, không
 *   phải một ngưỡng px đoán mò): `Hero.tsx` đặt 1 phần tử "cột mốc" vô hình
 *   (`#hero-sentinel`) ngay mép dưới ảnh Hero. Header dùng `IntersectionObserver` theo
 *   dõi đúng phần tử này — còn thấy (chưa cuộn hết Hero) thì `inverse=true` (chữ sáng
 *   trên ảnh), hết thấy (đã cuộn qua Hero, đang ở nền sáng bên dưới) thì `inverse=false`
 *   (chữ tối). Ưu điểm: tự khớp với chiều cao THẬT của từng Hero (không cần đoán số px
 *   cho từng trang/breakpoint), tự cập nhật khi đổi route (re-query theo `pathname`).
 *   Trang KHÔNG có Hero giữ nguyên `inverse=false` cố định như Phase 6.7 (không cần
 *   theo dõi scroll vì không có ảnh nào để cuộn qua).
 */
export function Header() {
  const pathname = usePathname();
  const hotelMatch = pathname?.match(/^\/thu-vien\/([^/]+)\/?$/);
  const hotelSlug = hotelMatch?.[1] as PropertySlug | undefined;

  const hasHero = pathname ? HERO_EXACT_PATHS.has(pathname) || HOTEL_HERO_PATTERN.test(pathname) : false;

  // Mặc định false = "chưa cuộn qua Hero" — đúng trạng thái thật khi trang vừa tải
  // (người dùng luôn ở đỉnh trang lúc đầu), nên không có nhấp nháy sai màu chữ trước
  // khi JS kịp gắn observer.
  const [scrolledPastHero, setScrolledPastHero] = useState(false);

  useEffect(() => {
    if (!hasHero) {
      setScrolledPastHero(false);
      return;
    }
    const sentinel = document.getElementById("hero-sentinel");
    if (!sentinel) {
      setScrolledPastHero(false);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => setScrolledPastHero(!entry.isIntersecting), {
      // Trừ hao đúng chiều cao Header (dùng số lớn nhất giữa mobile/desktop) — coi như
      // "đã cuộn qua Hero" ngay khi mép dưới Hero chạm mép dưới Header, thay vì phải
      // cuộn thêm mới đổi màu (tránh 1 khoảng ngắn chữ sáng đè lên nền sáng).
      rootMargin: "-96px 0px 0px 0px",
    });
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [hasHero, pathname]);

  if (hotelSlug && PROPERTY_SLUGS.includes(hotelSlug)) {
    return <PropertySubNav activeProperty={hotelSlug} />;
  }

  const inverse = hasHero && !scrolledPastHero;

  return (
    <header className="fixed inset-x-0 top-0 z-30 bg-transparent">
      <Container className="flex h-20 items-center justify-between md:h-24">
        <Logo inverse={inverse} />
        <NavMenu inverse={inverse} />
        <div className="flex items-center gap-5">
          <Button href={bookingHref} className="hidden sm:inline-flex" withArrow>
            ĐẶT PHÒNG
          </Button>
          <div className="hidden lg:block">
            <LanguageSwitcher inverse={inverse} />
          </div>
          <MobileMenu inverse={inverse} />
        </div>
      </Container>
    </header>
  );
}
