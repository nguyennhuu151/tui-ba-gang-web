"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import { localizeHref } from "@/lib/i18n/config";
import { useLocale } from "@/lib/i18n/client";

/**
 * `next/link` tự thêm tiền tố locale hiện tại cho link nội bộ (`/uu-dai` → `/en/uu-dai`).
 * Dùng thay cho `next/link` ở mọi nơi trong site để không phải tự ghép locale vào href.
 */
export function LocaleLink({ href, ...props }: Omit<ComponentProps<typeof Link>, "href"> & { href: string }) {
  const locale = useLocale();
  return <Link href={localizeHref(href, locale)} {...props} />;
}
