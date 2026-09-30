import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, hasLocale, LOCALE_COOKIE, locales, type Locale } from "@/lib/i18n/config";

/**
 * Proxy (tên mới của middleware từ Next.js 16) — đảm bảo mọi URL trang đều có tiền tố locale.
 * Đường dẫn chưa có locale (vd. `/`, link cũ `/phong-nghi`) được chuyển hướng sang:
 * cookie ngôn ngữ khách đã chọn → ngôn ngữ trình duyệt (Accept-Language) → tiếng Việt.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (hasLocale(pathname.split("/")[1])) return;

  const url = request.nextUrl.clone();
  url.pathname = `/${detectLocale(request)}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

function detectLocale(request: NextRequest): Locale {
  const cookie = request.cookies.get(LOCALE_COOKIE)?.value;
  if (hasLocale(cookie)) return cookie;

  // "en-US,en;q=0.9,vi;q=0.8" → chọn ngôn ngữ hỗ trợ có độ ưu tiên (q) cao nhất.
  const preferred = (request.headers.get("accept-language") ?? "")
    .split(",")
    .map((part) => {
      const [tag, q] = part.trim().split(";q=");
      return { lang: tag.split("-")[0].toLowerCase(), q: q ? Number(q) : 1 };
    })
    .sort((a, b) => b.q - a.q)
    .find(({ lang }) => locales.includes(lang as Locale));
  return (preferred?.lang as Locale | undefined) ?? defaultLocale;
}

export const config = {
  // Bỏ qua file tĩnh/nội bộ: _next, api, và mọi đường dẫn có đuôi file (ảnh, robots.txt, sitemap.xml, icon.png...).
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
