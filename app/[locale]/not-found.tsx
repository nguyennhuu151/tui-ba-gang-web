"use client";

import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { useI18n } from "@/lib/i18n/client";

/**
 * not-found.tsx — Next.js App Router tự hiển thị file này khi gọi `notFound()`
 * (vd. slug cơ sở/hạng phòng không hợp lệ) hoặc khi truy cập 1 route không tồn tại.
 * Là Client Component để lấy ngôn ngữ từ URL (`useI18n`).
 */
export default function NotFound() {
  const { dict } = useI18n();

  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center gap-4 py-20 text-center">
      <p className="section-label">404</p>
      <h1 className="font-heading text-3xl text-ink md:text-4xl">{dict.notFound.title}</h1>
      <p className="max-w-sm text-sm text-brown-600">
        {dict.notFound.description}
      </p>
      <Button href="/" className="mt-2">
        {dict.common.backToHome}
      </Button>
    </Container>
  );
}
