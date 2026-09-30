import { describe, expect, it } from "vitest";
import { locales } from "@/lib/i18n/config";
import { vi } from "@/lib/i18n/dictionaries/vi";
import { en } from "@/lib/i18n/dictionaries/en";
import { getProperties } from "@/lib/content/properties";
import { getRooms } from "@/lib/content/rooms";
import { getOffers } from "@/lib/content/offers";
import { getExperiences } from "@/lib/content/experiences";

/** Liệt kê mọi đường dẫn lá trong dictionary: "a.b[2]" → kiểu giá trị ("string", "function"...). */
function shape(value: unknown, path = "", out: Record<string, string> = {}): Record<string, string> {
  if (Array.isArray(value)) value.forEach((item, i) => shape(item, `${path}[${i}]`, out));
  else if (typeof value === "object" && value !== null)
    Object.entries(value).forEach(([key, item]) => shape(item, path ? `${path}.${key}` : key, out));
  else out[path] = typeof value;
  return out;
}

const isFilled = (value: unknown) => typeof value === "string" && value.trim().length > 0;

describe("dictionary", () => {
  it("en.ts có đúng cấu trúc với vi.ts — cùng key, cùng số phần tử mảng", () => {
    // TypeScript đã bắt thiếu key; test này bắt thêm lệch số phần tử mảng và key của Record.
    expect(shape(en)).toEqual(shape(vi));
  });
});

describe.each(locales)("nội dung đầy đủ text — locale %s", (locale) => {
  it("mỗi cơ sở có đủ text bắt buộc, mảng ghép theo thứ tự không bị lệch", () => {
    for (const p of getProperties(locale)) {
      for (const field of [p.tagline, p.cardDescription, p.listingLine, p.fullName, p.shortName]) {
        expect(isFilled(field), `${p.slug}: thiếu text`).toBe(true);
      }
      for (const item of p.amenities) {
        expect(isFilled(item.title ?? item.label), `${p.slug}: tiện nghi "${item.icon}" thiếu nhãn`).toBe(true);
        if (item.title) expect(isFilled(item.description), `${p.slug}: tiện nghi "${item.icon}" thiếu mô tả`).toBe(true);
      }
      for (const tile of p.moodTiles ?? []) {
        expect(isFilled(tile.title) && isFilled(tile.description), `${p.slug}: mood tile "${tile.key}"`).toBe(true);
      }
      expect(p.amenitiesSection.heading?.length, `${p.slug}: thiếu tiêu đề tiện nghi`).toBeGreaterThan(0);
    }
  });

  it("mỗi hạng phòng có mô tả và tiện nghi", () => {
    for (const room of getRooms(locale)) {
      expect(isFilled(room.description), `${room.hotel}/${room.slug}: thiếu mô tả`).toBe(true);
      expect(room.amenities.every(isFilled)).toBe(true);
    }
  });

  it("mỗi ưu đãi có mô tả và đủ nội dung quyền lợi", () => {
    for (const offer of getOffers(locale)) {
      expect(isFilled(offer.description), `${offer.slug}: thiếu mô tả`).toBe(true);
      expect(offer.benefits.every((b) => isFilled(b.text)), `${offer.slug}: thiếu quyền lợi`).toBe(true);
    }
  });

  it("mỗi trải nghiệm có tiêu đề và mô tả", () => {
    for (const item of getExperiences(locale)) {
      expect(isFilled(item.title) && isFilled(item.description), item.slug).toBe(true);
    }
  });
});
