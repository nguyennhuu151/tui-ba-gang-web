# Túi Ba Gang — Website

Next.js 16 (App Router) + Tailwind CSS. Tài liệu thiết kế nằm trong `docs/`, quy tắc làm việc trong `CLAUDE.md`.

## Chạy local

Yêu cầu Node.js >= 20.9 (khuyến nghị dùng bản trong `.nvmrc`).

```bash
cp .env.example .env.local   # điền giá trị thật, KHÔNG commit file này
npm install
npm run dev                  # http://localhost:3000
```

Chatbot: khi chạy dev, widget chat gọi backend ở `http://localhost:8080` — chạy backend theo `../chatbot/README.md`. Không chạy backend thì widget vẫn hiện nhưng báo "Không kết nối được trợ lý ảo".

## Kiểm tra trước khi merge

```bash
npm run check   # lint + typecheck + build — CI (.github/workflows/ci.yml) chạy đúng các bước này
```

## Deploy (Vercel — xem docs/technical-decisions.md #11)

1. Import repo vào Vercel, framework preset: Next.js (không cần cấu hình build riêng).
2. Khai báo biến môi trường trong Vercel Dashboard (xem `.env.example` và `docs/environment-variables.md`):
   - `NEXT_PUBLIC_SITE_URL` — domain thật (vd. `https://...`), dùng cho Open Graph, `sitemap.xml`, `robots.txt`. Nếu chưa đặt, tự dùng domain production của project Vercel (`*.vercel.app`) — nên đặt ngay khi gắn domain riêng.
   - `NEXT_PUBLIC_ZALO_LINK_CENTRAL` — link Zalo chính thức (chưa đặt thì dùng link tạm theo hotline).
   - `NEXT_PUBLIC_CHATBOT_API_URL` — URL backend chatbot (`../chatbot/backend`). Để trống thì nút chat bị ẩn. Nhớ thêm domain website vào `ALLOWED_ORIGINS` của backend. Domain này tự được thêm vào CSP `connect-src` lúc build.
3. Chỉ bản Production (`VERCEL_ENV=production`) được công cụ tìm kiếm index. Bản Preview tự trả về `robots.txt` chặn toàn bộ và thẻ `noindex`.
   Nếu tự host ngoài Vercel: đặt `SITE_INDEXABLE=true` trên môi trường production.
4. Production branch trên Vercel mặc định là `main` — code phải được merge vào `main` mới lên bản Production; các branch khác tạo bản Preview.

## Bảo mật đã cấu hình (next.config.mjs)

- Security headers: Content-Security-Policy, HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy.
- Bản Preview mở thêm CSP cho `vercel.live` (Vercel Toolbar/Comments); Production không mở.
- CSP chỉ cho phép tài nguyên từ chính domain. **Khi thêm dịch vụ ngoài** (Google Analytics, ảnh từ CDN/ezCloud, video nhúng, chatbot...) phải bổ sung domain vào CSP trong `next.config.mjs`, nếu không trình duyệt sẽ chặn.
