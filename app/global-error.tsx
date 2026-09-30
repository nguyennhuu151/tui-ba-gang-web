"use client";

import { useEffect } from "react";
import "./globals.css";
import { useI18n } from "@/lib/i18n/client";

/**
 * global-error.tsx — chỉ hiển thị khi lỗi xảy ra ngay trong root layout `app/[locale]/layout.tsx`
 * (Header/Footer...), trường hợp `app/[locale]/error.tsx` không bắt được. Thay thế toàn bộ layout nên phải tự render
 * `<html>`/`<body>` và không dùng component nào phụ thuộc layout.
 */
export default function GlobalError({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  const { locale, dict } = useI18n();

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang={locale}>
      <body className="flex min-h-screen flex-col items-center justify-center gap-4 bg-cream-50 px-6 text-center text-ink">
        <h1 className="font-heading text-3xl">{dict.error.title}</h1>
        <p className="max-w-sm text-sm text-brown-600">
          {dict.error.globalDescription}
        </p>
        <button type="button" onClick={() => retry()} className="rounded-full bg-brown-800 px-6 py-2 text-sm text-cream-50">
          {dict.common.tryAgain}
        </button>
      </body>
    </html>
  );
}
