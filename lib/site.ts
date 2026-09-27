/**
 * Cấu hình chung của site, đọc từ biến môi trường — xem docs/environment-variables.md.
 * Không chứa secret, an toàn khi import ở cả Server lẫn Client Component.
 */

const FALLBACK_SITE_URL = "http://localhost:3000";

/**
 * Thứ tự ưu tiên: NEXT_PUBLIC_SITE_URL → biến hệ thống của Vercel (domain production của
 * project, hoặc URL riêng của bản Preview) → localhost. Nhờ vậy lỡ quên đặt biến trên
 * Vercel thì sitemap/Open Graph vẫn trỏ về domain thật thay vì localhost.
 * Biến VERCEL_* chỉ đọc được ở server — `siteUrl` chỉ dùng ở metadata/sitemap/robots.
 */
function resolveSiteUrl(): string {
  const vercelHost =
    process.env.VERCEL_ENV === "production" ? process.env.VERCEL_PROJECT_PRODUCTION_URL : process.env.VERCEL_URL;
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim() || (vercelHost ? `https://${vercelHost}` : "");
  if (!raw) return FALLBACK_SITE_URL;
  try {
    return new URL(raw).origin;
  } catch {
    throw new Error(`NEXT_PUBLIC_SITE_URL không phải URL hợp lệ: "${raw}"`);
  }
}

export const siteUrl = resolveSiteUrl();

export const siteName = "Túi Ba Gang";

/**
 * Chỉ cho phép công cụ tìm kiếm index khi là bản Production thật. Trên Vercel dùng
 * VERCEL_ENV (Preview deployment cũng build với NODE_ENV=production nên không dùng được
 * NODE_ENV). Ngoài Vercel: đặt SITE_INDEXABLE=true trên môi trường production.
 */
export const isIndexable = process.env.VERCEL_ENV
  ? process.env.VERCEL_ENV === "production"
  : process.env.SITE_INDEXABLE === "true";

/**
 * Địa chỉ backend chatbot (thư mục `chatbot/backend` — Go, xem chatbot/README.md).
 * Dev: mặc định http://localhost:8080. Production: phải đặt NEXT_PUBLIC_CHATBOT_API_URL,
 * nếu để trống thì widget chat bị ẩn (tránh hiện 1 nút chat không hoạt động cho khách).
 */
export const chatbotApiUrl =
  process.env.NEXT_PUBLIC_CHATBOT_API_URL?.trim().replace(/\/+$/, "") ||
  (process.env.NODE_ENV === "development" ? "http://localhost:8080" : "");
