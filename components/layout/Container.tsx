import type { ReactNode, JSX } from "react";

/**
 * Container — giới hạn max-width nội dung chính (~1280px), căn giữa.
 * Ảnh hero dùng full-bleed nên KHÔNG bọc trong Container này.
 * Xem docs/design-system.md — bảng Design Tokens, "Container width".
 */
export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}): JSX.Element {
  return (
    <div className={`mx-auto w-full max-w-container px-6 md:px-10 ${className}`}>{children}</div>
  );
}
