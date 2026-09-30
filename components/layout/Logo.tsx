"use client";

import Image from "next/image";
import { LocaleLink } from "@/components/navigation/LocaleLink";
import { useI18n } from "@/lib/i18n/client";

/**
 * Logo — trích xuất từ file `LOGO.pdf` do user cung cấp (thay cho placeholder SVG cũ).
 *
 * Ghi chú xử lý (để phase sau còn biết nguồn gốc file):
 * - File PDF gốc có 3 trang. Trang 1 và trang 2 đều là logo "TÚI BA GANG" (icon quả thông +
 *   wordmark) nhưng có dòng subtitle nhỏ KHÁC NHAU ("CENTRAL HOTEL" ở trang 1, "DALAT BOUTIQUE"
 *   ở trang 2) — 2 dòng subtitle này mâu thuẫn nhau nên KHÔNG dùng cho logo dùng chung toàn site;
 *   chỉ cắt lấy phần icon + wordmark "TÚI BA GANG" giống nhau ở cả 2 trang.
 * - Trang 3 là một logo KHÁC hẳn, không liên quan ("RIVER PARK Central Hotel") — đã loại bỏ,
 *   không sử dụng. Nghi ngờ đây là file đính kèm nhầm — xem docs/open-questions.md để xác nhận
 *   lại với chủ đầu tư nếu cần dùng logo đó ở đâu đó.
 * - Đã tách nền trong suốt (transparent) và tạo sẵn 2 bản màu: bản màu nâu mực thương hiệu
 *   (dùng trên nền sáng) và bản màu kem (dùng trên nền tối, vd. Footer) — xem public/logo/.
 *
 * Tỉ lệ ảnh gốc (logo-lockup*.png): 1195 × 766px.
 */
const LOCKUP_ASPECT = { width: 1195, height: 766 };

export function Logo({
  inverse = false,
  className = "h-12 w-auto md:h-16",
  href = "/",
  label,
}: {
  inverse?: boolean;
  /** Đích khi bấm logo — mặc định về trang chủ (vd. PropertySubNav trỏ về /thu-vien) */
  href?: string;
  label?: string;
  /** Ghi đè kích thước mặc định — vd. dùng bản nhỏ hơn làm badge góc ảnh Hero */
  className?: string;
}) {
  const { dict } = useI18n();

  return (
    <LocaleLink
      href={href}
      className="flex items-center"
      aria-label={label ?? dict.common.logoLabel}
    >
      <Image
        src={inverse ? "/logo/logo-lockup-inverse.png" : "/logo/logo-lockup.png"}
        alt="Túi Ba Gang"
        width={LOCKUP_ASPECT.width}
        height={LOCKUP_ASPECT.height}
        priority
        className={className}
      />
    </LocaleLink>
  );
}
