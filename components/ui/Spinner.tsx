"use client";

import { useI18n } from "@/lib/i18n/client";

/**
 * Spinner — trạng thái loading dùng chung, dùng ở các `loading.tsx` (Suspense
 * boundary tự động của Next.js App Router theo route segment).
 */
export function Spinner({ label }: { label?: string }) {
  const { dict } = useI18n();

  return (
    <div role="status" className="flex flex-col items-center justify-center gap-3 py-24 text-brown-600">
      <span
        aria-hidden="true"
        className="h-8 w-8 animate-spin rounded-full border-2 border-cream-200 border-t-brown-800"
      />
      <span className="text-sm">{label ?? dict.common.loading}</span>
    </div>
  );
}
