import { describe, expect, it } from "vitest";
import { localeFromPathname, localizeHref, stripLocale } from "@/lib/i18n/config";

describe("localizeHref", () => {
  it("thêm tiền tố locale cho link nội bộ", () => {
    expect(localizeHref("/", "en")).toBe("/en");
    expect(localizeHref("/uu-dai", "en")).toBe("/en/uu-dai");
    expect(localizeHref("/lien-he?offer=a-warmer-you", "vi")).toBe("/vi/lien-he?offer=a-warmer-you");
  });

  it("giữ nguyên link đã có locale, link ngoài, tel:, neo #", () => {
    expect(localizeHref("/vi/uu-dai", "en")).toBe("/vi/uu-dai");
    expect(localizeHref("https://zalo.me/123", "en")).toBe("https://zalo.me/123");
    expect(localizeHref("//cdn.example.com/a.png", "en")).toBe("//cdn.example.com/a.png");
    expect(localizeHref("tel:+842633837837", "en")).toBe("tel:+842633837837");
    expect(localizeHref("#kham-pha-da-lat", "en")).toBe("#kham-pha-da-lat");
  });
});

describe("stripLocale / localeFromPathname", () => {
  it("bỏ tiền tố locale", () => {
    expect(stripLocale("/en/uu-dai")).toBe("/uu-dai");
    expect(stripLocale("/en")).toBe("/");
    expect(stripLocale("/phong-nghi")).toBe("/phong-nghi");
  });

  it("đọc locale từ pathname, mặc định vi", () => {
    expect(localeFromPathname("/en/uu-dai")).toBe("en");
    expect(localeFromPathname("/vi")).toBe("vi");
    expect(localeFromPathname("/fr/uu-dai")).toBe("vi");
    expect(localeFromPathname(null)).toBe("vi");
  });
});
