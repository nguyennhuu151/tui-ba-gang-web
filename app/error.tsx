"use client";

import { useEffect } from "react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";

export default function ErrorPage({
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
    <Container className="flex min-h-[60vh] flex-col items-center justify-center gap-4 py-20 text-center">
      <p className="section-label">ĐÃ CÓ LỖI XẢY RA</p>
      <h1 className="font-heading text-3xl text-ink md:text-4xl">Rất tiếc, có lỗi ngoài ý muốn</h1>
      <p className="max-w-sm text-sm text-brown-600">
        Vui lòng thử lại. Nếu lỗi vẫn tiếp diễn, hãy liên hệ với chúng tôi qua trang Liên hệ.
      </p>
      <div className="mt-2 flex gap-4">
        <Button onClick={() => retry()}>Thử lại</Button>
        <Button href="/" variant="outline">
          Về trang chủ
        </Button>
      </div>
    </Container>
  );
}
