import type { Locale } from "@/lib/i18n/config";
import { vi } from "@/lib/i18n/dictionaries/vi";
import { en } from "@/lib/i18n/dictionaries/en";

/** Cấu trúc dictionary lấy theo `vi.ts` — `en.ts` phải khớp đúng cấu trúc này. */
export type Dictionary = typeof vi;

const dictionaries: Record<Locale, Dictionary> = { vi, en };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
