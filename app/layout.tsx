import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/footer/Footer";
import { StickyContactWidget } from "@/components/layout/StickyContactWidget";
import { isIndexable, siteName, siteUrl } from "@/lib/site";

/**
 * Font setup — xem docs/design-system.md mục 3.
 *
 * QUYẾT ĐỊNH (theo phản hồi thực tế khi xem bản chạy thử): CHỈ dùng 2 nhóm font trên
 * Homepage để tránh 1 trang có quá nhiều kiểu chữ khác nhau, nhìn rối:
 * - Heading (Playfair Display, serif) — dùng cho MỌI tiêu đề, tagline lớn, số thứ tự,
 *   kể cả chỗ cần cảm giác "bay bổng" thì dùng bản in nghiêng (italic) của chính font này,
 *   KHÔNG dùng thêm 1 font viết tay riêng — vừa đủ chất, vừa đồng bộ.
 * - Body (Inter, sans-serif) — dùng cho toàn bộ phần còn lại (đoạn mô tả, menu, nút, label).
 *
 * Font viết tay (Parisienne, "Accent" trong docs/design-system.md) TẠM THỜI KHÔNG nạp ở đây
 * vì Homepage hiện không còn chỗ nào thực sự cần đến nó sau khi rà soát lại (mục "SAME PLACES,
 * A DIFFERENT YOU" ở Footer trước đây dùng font này đã đổi sang Heading cho gọn — xem
 * components/footer/Footer.tsx). Nếu phase sau có trang cần 1 câu tagline tiếng Anh ngắn mang
 * đúng tinh thần "bay bổng" của thương hiệu (vd. ghi chú kiểu chữ ký trên ảnh ở trang Ember Style/
 * Little Bay), có thể nạp lại font này CHỈ cho đúng chỗ đó — token `font-accent` vẫn còn giữ
 * trong tailwind.config.ts, chỉ cần import lại `Parisienne` và gán vào biến CSS tương ứng.
 * LƯU Ý nếu dùng lại: font này KHÔNG hỗ trợ dấu tiếng Việt, tuyệt đối không dùng cho chữ có dấu.
 */
const heading = Playfair_Display({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "600", "700"],
  style: "normal",
  variable: "--font-heading",
  display: "swap",
});

const body = Inter({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

const siteDescription =
  "Túi Ba Gang – thương hiệu lưu trú tại Đà Lạt với 3 không gian riêng biệt: Central, Ember Style và Little Bay.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Túi Ba Gang | Ba không gian, một tinh thần",
  description: siteDescription,
  applicationName: siteName,
  openGraph: {
    type: "website",
    locale: "vi_VN",
    siteName,
    description: siteDescription,
    images: [{ url: "/images/hero-home.jpg", alt: siteName }],
  },
  twitter: { card: "summary_large_image" },
  robots: isIndexable ? undefined : { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#FBF8F6",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="vi" className={`${heading.variable} ${body.variable}`}>
      {/*
        Phase 6.8 mục 2 (bug fix — "Footer nhảy lên trên"): Header là `position: fixed`
        (không chiếm chỗ trong luồng), nên nội dung THẬT của `<body>` chỉ có `<main>` +
        `<Footer>`. Trước đây `<body>` không có `min-height`/flex nào — ở trang có ít nội
        dung (vd. `/phong-nghi` chỉ có đoạn giới thiệu + 3 ảnh, không đủ dài để lấp đầy
        màn hình cao), `<Footer>` render ngay sau khi `<main>` kết thúc, tức là nằm ở GIỮA
        màn hình thay vì dính đáy — đây là nguyên nhân THẬT của cảm giác "Footer nhảy lên
        trên" (khác với lỗi 1.2 ở Phase 6.6 — lỗi đó là nội dung ĐẦU trang bị Header đè
        lên, đã sửa bằng padding-top riêng từng trang; lỗi NÀY là do thiếu cơ chế ghim
        Footer xuống đáy viewport, cần sửa ở layout dùng chung, không phải padding từng
        trang). Áp dụng đúng mẫu CSS "sticky footer" kinh điển: `<body>` là flex-column
        cao tối thiểu bằng viewport, `<main>` được `flex-1` để tự giãn lấp phần còn
        trống — trang ngắn thì Footer bị đẩy xuống đúng đáy màn hình, trang dài thì không
        đổi gì (main đã cao hơn viewport sẵn). Không cần sửa gì thêm ở từng trang.
      */}
      <body className="flex min-h-screen flex-col bg-cream-50 font-body text-ink antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <StickyContactWidget />
      </body>
    </html>
  );
}
