import { Spinner } from "@/components/ui/Spinner";
import { getI18n } from "@/lib/i18n/server";

/**
 * loading.tsx — Next.js App Router tự hiển thị file này qua React Suspense
 * trong lúc `page.tsx` của route segment này đang render ở server.
 */
export default async function LoadingPropertyLanding() {
  const { dict } = await getI18n();
  return <Spinner label={dict.libraryPage.loading} />;
}
