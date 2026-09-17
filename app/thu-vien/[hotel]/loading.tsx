import { Spinner } from "@/components/ui/Spinner";

/**
 * loading.tsx — Next.js App Router tự hiển thị file này qua React Suspense
 * trong lúc `page.tsx` của route segment này đang render ở server.
 */
export default function LoadingPropertyLanding() {
  return <Spinner label="Đang tải trang cơ sở..." />;
}
