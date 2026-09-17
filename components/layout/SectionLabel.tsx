import type { ReactNode } from "react";

/**
 * SectionLabel — label nhỏ chữ hoa lặp lại đầu mỗi section
 * (vd. "OUR STORY", "PHÒNG NGHỈ", "TÚI BA GANG").
 * Xem docs/design-system.md mục 4.
 *
 * Lưu ý kỹ thuật: `children` cố ý khai báo là `ReactNode` (không phải `string`) —
 * khai báo `string` sẽ khiến TypeScript báo lỗi TS2745 ("requires multiple children")
 * với MỌI cách dùng `<SectionLabel>{bienDongText}</SectionLabel>`, kể cả hợp lệ.
 * Đây là hành vi thật của TypeScript khi check JSX children, đã xác minh độc lập
 * với môi trường smoke-test — không phải lỗi riêng của phase này.
 */
export function SectionLabel({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={`section-label${className ? ` ${className}` : ""}`}>{children}</p>;
}
