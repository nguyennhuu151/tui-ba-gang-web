import { describe, expect, it } from "vitest";
import { mergeText } from "@/lib/content/merge-text";
import { telHref } from "@/lib/phone";

describe("mergeText", () => {
  it("ghép object lồng nhau và mảng object theo thứ tự", () => {
    const base = { slug: "a", story: { label: "OUR STORY" }, amenities: [{ icon: "pin" }, { icon: "bed" }] };
    const text = { story: { heading: ["Xin", "chào"] }, amenities: [{ title: "A" }, { title: "B" }] };
    expect(mergeText(base, text)).toEqual({
      slug: "a",
      story: { label: "OUR STORY", heading: ["Xin", "chào"] },
      amenities: [
        { icon: "pin", title: "A" },
        { icon: "bed", title: "B" },
      ],
    });
  });

  it("giữ nguyên dữ liệu gốc khi không có text", () => {
    expect(mergeText({ a: 1 }, undefined)).toEqual({ a: 1 });
  });
});

describe("telHref", () => {
  it("đổi số Việt Nam sang dạng quốc tế", () => {
    expect(telHref("0263 383 7837")).toBe("tel:+842633837837");
    expect(telHref("+84 263 383 7837")).toBe("tel:+842633837837");
  });
});
