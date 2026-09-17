import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";

/**
 * not-found.tsx — Next.js App Router tự hiển thị file này khi gọi `notFound()`
 * (vd. slug cơ sở/hạng phòng không hợp lệ) hoặc khi truy cập 1 route không tồn tại.
 */
export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center gap-4 py-20 text-center">
      <p className="section-label">404</p>
      <h1 className="font-heading text-3xl text-ink md:text-4xl">Không tìm thấy trang này</h1>
      <p className="max-w-sm text-sm text-brown-600">
        Trang bạn tìm không tồn tại hoặc đã được di chuyển. Hãy quay lại trang chủ để tiếp tục khám phá
        Túi Ba Gang.
      </p>
      <Button href="/" className="mt-2">
        Về trang chủ
      </Button>
    </Container>
  );
}
