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

## Đa ngôn ngữ (VI/EN)

- URL luôn có tiền tố locale: `/vi/...`, `/en/...` (slug giữ tiếng Việt cho cả 2 bản). Link cũ không có locale (vd. `/phong-nghi`) được `proxy.ts` chuyển hướng: cookie ngôn ngữ đã chọn → ngôn ngữ trình duyệt → `vi`.
- **Toàn bộ text theo ngôn ngữ nằm trong 2 file:** `lib/i18n/dictionaries/vi.ts` (file gốc) và `lib/i18n/dictionaries/en.ts` (cùng cấu trúc — TypeScript báo lỗi nếu thiếu key).
- Thêm text mới: thêm key vào cả `vi.ts` và `en.ts`, rồi dùng `const { dict } = await getI18n()` (Server Component) hoặc `const { dict } = useI18n()` (Client Component) → `dict.home.hero.ctaLabel`. Text có giá trị động viết dạng hàm, vd. `dict.common.guests(2)`.
- `lib/content/*.ts` chỉ giữ phần không phụ thuộc ngôn ngữ (ảnh, icon, slug, liên hệ) và text tiếng Anh dùng chung (tagline thương hiệu, tên hạng phòng, tên ưu đãi...) — hiển thị giống nhau ở cả 2 locale.
- Link nội bộ: dùng `LocaleLink` / `Button href="/..."` với đường dẫn KHÔNG có locale — locale được tự thêm.
- Chi tiết: `lib/i18n/`, `claude/phase9-i18n-report.md`.

## Cấu trúc thư mục

| Thư mục | Vai trò |
|---|---|
| `app/[locale]/` | Các trang (route). Trang chỉ lấy dữ liệu + ghép section, không chứa dữ liệu cứng. |
| `components/` | UI dùng lại, chia theo nhóm (`hotel`, `room`, `booking`, `property` — các section của trang cơ sở, `ui`…). |
| `lib/content/` | Dữ liệu không phụ thuộc ngôn ngữ (cơ sở, phòng, ưu đãi…), ghép text qua `getXxx(locale)`. |
| `lib/i18n/` | Locale, dictionary `vi.ts`/`en.ts`, helper server/client. |
| `lib/booking/` | Điểm nối với PMS/ezCloud (`searchAvailability`) — hiện là MOCK. |
| `tests/` | Test (Vitest): i18n, proxy, tính toàn vẹn nội dung. |

## Thêm / mở một cơ sở mới

1. `lib/types.ts`: thêm slug vào `PropertySlug`.
2. `lib/content/properties.ts`: thêm dữ liệu gốc (ảnh, icon, liên hệ, `status`, `accent`…).
3. `lib/i18n/dictionaries/vi.ts` + `en.ts`: thêm `properties.<slug>` (text theo ngôn ngữ).
4. (Nếu có phòng/ưu đãi) `lib/content/rooms.ts`, `offers.ts` + text tương ứng trong 2 dictionary.
5. Chạy `npm test` — test báo ngay nếu thiếu text hoặc lệch số phần tử giữa dữ liệu và dictionary.

Mở cửa cơ sở đang "coming soon": chỉ đổi `status: "open"` trong `lib/content/properties.ts`.
Các trang, menu, sitemap, Header tự cập nhật theo dữ liệu — không cần sửa component.

## Kiểm tra trước khi merge

```bash
npm run check   # lint + typecheck + test + build — CI (.github/workflows/ci.yml) chạy đúng các bước này
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
