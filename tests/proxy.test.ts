import { describe, expect, it } from "vitest";
import { NextRequest } from "next/server";
import { proxy } from "@/proxy";

function run(path: string, headers: Record<string, string> = {}) {
  return proxy(new NextRequest(`http://localhost${path}`, { headers }));
}

describe("proxy — chuyển hướng URL chưa có locale", () => {
  it("không đụng tới URL đã có locale", () => {
    expect(run("/en/uu-dai")).toBeUndefined();
    expect(run("/vi")).toBeUndefined();
  });

  it("mặc định tiếng Việt, giữ nguyên query", () => {
    expect(run("/")?.headers.get("location")).toBe("http://localhost/vi");
    expect(run("/lien-he?offer=a-warmer-you")?.headers.get("location")).toBe(
      "http://localhost/vi/lien-he?offer=a-warmer-you",
    );
  });

  it("theo ngôn ngữ trình duyệt có độ ưu tiên cao nhất", () => {
    expect(run("/uu-dai", { "accept-language": "en-US,en;q=0.9,vi;q=0.8" })?.headers.get("location")).toBe(
      "http://localhost/en/uu-dai",
    );
    expect(run("/", { "accept-language": "fr-FR,vi;q=0.7,en;q=0.5" })?.headers.get("location")).toBe(
      "http://localhost/vi",
    );
  });

  it("cookie ngôn ngữ khách đã chọn được ưu tiên hơn trình duyệt", () => {
    expect(run("/", { "accept-language": "vi", cookie: "NEXT_LOCALE=en" })?.headers.get("location")).toBe(
      "http://localhost/en",
    );
  });
});
