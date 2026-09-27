"use client";

import { useEffect } from "react";
import "./globals.css";

/**
 * global-error.tsx — chỉ hiển thị khi lỗi xảy ra ngay trong `app/layout.tsx` (Header/Footer...),
 * trường hợp `app/error.tsx` không bắt được. Thay thế toàn bộ layout nên phải tự render
 * `<html>`/`<body>` và không dùng component nào phụ thuộc layout.
 */
export default function GlobalError({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="vi">
      <body className="flex min-h-screen flex-col items-center justify-center gap-4 bg-cream-50 px-6 text-center text-ink">
        <h1 className="font-heading text-3xl">Rất tiếc, có lỗi ngoài ý muốn</h1>
        <p className="max-w-sm text-sm text-brown-600">Vui lòng tải lại trang hoặc quay lại sau ít phút.</p>
        <button type="button" onClick={() => retry()} className="rounded-full bg-brown-800 px-6 py-2 text-sm text-cream-50">
          Thử lại
        </button>
      </body>
    </html>
  );
}
