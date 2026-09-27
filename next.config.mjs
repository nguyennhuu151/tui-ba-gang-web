import { fileURLToPath } from "node:url";

const isDev = process.env.NODE_ENV !== "production";

// Backend chatbot (chatbot/backend) — trình duyệt gọi thẳng nên phải có trong connect-src.
// Cùng quy tắc mặc định với `chatbotApiUrl` trong lib/site.ts.
const chatbotApiUrl =
  process.env.NEXT_PUBLIC_CHATBOT_API_URL?.trim() || (isDev ? "http://localhost:8080" : "");
const chatbotOrigin = chatbotApiUrl ? new URL(chatbotApiUrl).origin : "";

// Bản Preview trên Vercel tự chèn Vercel Toolbar/Comments (tải từ vercel.live) — chỉ mở CSP
// cho các domain này ở Preview, Production giữ nguyên chặt.
const isVercelPreview = process.env.VERCEL_ENV === "preview";
const vercelLive = isVercelPreview ? " https://vercel.live" : "";

/**
 * Content-Security-Policy (chính sách nguồn nội dung) — xem docs/security.md mục 3.
 * Site hiện chỉ tải tài nguyên từ chính domain (ảnh /public, font tự host qua next/font),
 * nên mọi nguồn đều là 'self'. 'unsafe-inline' cho script là bắt buộc khi trang được render
 * tĩnh (Next.js chèn inline script để hydrate); muốn bỏ phải dùng nonce, khiến toàn bộ trang
 * chuyển sang render động — không đáng ở quy mô hiện tại.
 * Khi thêm dịch vụ ngoài (Google Analytics, ảnh từ CDN/ezCloud, video nhúng...) phải bổ sung
 * domain tương ứng vào đây, nếu không trình duyệt sẽ chặn.
 */
const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}${vercelLive}`,
  `style-src 'self' 'unsafe-inline'${vercelLive}`,
  `img-src 'self' data: blob:${isVercelPreview ? " https://vercel.live https://vercel.com" : ""}`,
  `font-src 'self'${isVercelPreview ? " https://vercel.live https://assets.vercel.com" : ""}`,
  `connect-src 'self'${chatbotOrigin ? ` ${chatbotOrigin}` : ""}${isDev ? " ws:" : ""}${
    isVercelPreview ? " https://vercel.live wss://ws-us3.pusher.com" : ""
  }`,
  isVercelPreview ? "frame-src https://vercel.live" : "frame-src 'none'",
  "frame-ancestors 'none'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  ...(isDev ? [] : ["upgrade-insecure-requests"]),
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: contentSecurityPolicy },
  { key: "Strict-Transport-Security", value: "max-age=63072000" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=()" },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Ghim thư mục gốc của project — tránh Next.js nhận nhầm package-lock.json nằm ở thư mục cha.
  turbopack: {
    root: fileURLToPath(new URL(".", import.meta.url)),
  },
  images: {
    formats: ["image/avif", "image/webp"],
    // Ảnh hiện tại là ảnh minh hoạ tạm thời trong /public/images.
    // Khi có ảnh thật từ nguồn ngoài (ví dụ ezCloud hoặc CDN của client),
    // domain phải được khai báo rõ ở đây trước khi dùng next/image — xem docs/security.md.
    remotePatterns: [],
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
