# Environment Variables — Túi Ba Gang Website

**Phase 3.** CHƯA CODE — đây là tài liệu thiết kế/liệt kê, chưa tạo file `.env` thật trong repo.

## 1. Nguyên tắc (CLAUDE.md mục 4)

> Secret phải được quản lý bằng environment variables. Không hard-code API key/password/secret, không commit secret vào Git, không expose server-side credentials ra frontend.

Next.js phân biệt rõ 2 loại biến môi trường:

- **Biến private (server-only):** không có tiền tố `NEXT_PUBLIC_` — chỉ đọc được ở Backend (API Routes), **không bao giờ** lộ ra trình duyệt của khách. Dùng cho mọi secret (API key, token...).
- **Biến public:** có tiền tố `NEXT_PUBLIC_` — sẽ được nhúng vào mã Frontend, ai xem mã nguồn trình duyệt cũng thấy được. **Chỉ dùng cho giá trị không nhạy cảm** (ví dụ: link Zalo công khai, ID Google Analytics công khai).

## 2. Danh sách biến môi trường dự kiến

| Biến | Loại | Mục đích | Trạng thái |
|---|---|---|---|
| `EZCLOUD_API_BASE_URL` | Private | Địa chỉ gốc API/hệ thống ezCloud | **[CHƯA XÁC NHẬN API]** — tên biến và giá trị thật phụ thuộc tài liệu ezCloud |
| `EZCLOUD_API_KEY` (hoặc `EZCLOUD_CLIENT_ID` / `EZCLOUD_CLIENT_SECRET` tuỳ cơ chế xác thực thật) | Private | Xác thực khi Backend gọi ezCloud | **[CHƯA XÁC NHẬN API]** — tên biến thật sẽ đặt lại khi có tài liệu chính thức (xem `security.md` mục 1.2) |
| `EZCLOUD_HOTEL_ID_CENTRAL`, `EZCLOUD_HOTEL_ID_EMBER`, `EZCLOUD_HOTEL_ID_LITTLEBAY` | Private | Mã định danh từng cơ sở trong hệ thống ezCloud (nếu 1 tài khoản quản lý cả 3 cơ sở) | **[CHƯA XÁC ĐỊNH]** — phụ thuộc câu trả lời Open Question F6 (1 tài khoản chung hay 3 tài khoản riêng) |
| `NEXT_PUBLIC_SITE_URL` | Public | URL gốc của website, dùng để sinh sitemap/metadata/Open Graph | Đề xuất kỹ thuật, giá trị thật chờ xác nhận domain chính thức (Assumption A9) |
| `NEXT_PUBLIC_ZALO_LINK_CENTRAL`, `NEXT_PUBLIC_ZALO_LINK_EMBER`, `NEXT_PUBLIC_ZALO_LINK_LITTLEBAY` | Public | Link `zalo.me/...` cho từng cơ sở (nếu mỗi cơ sở có Zalo riêng) hoặc 1 link chung | **[CHƯA XÁC ĐỊNH]** — File B chỉ xác nhận có nút Zalo, chưa xác nhận có bao nhiêu link/số Zalo khác nhau |
| `EMAIL_SERVICE_API_KEY` | Private | Gửi email tự động (nếu xác nhận cần, ví dụ email xác nhận liên hệ/booking) | **[CHƯA XÁC ĐỊNH]** có cần dịch vụ email hay không (xem `integrations.md`) |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Public | Google Analytics (nếu xác nhận dùng) | **[CHƯA XÁC ĐỊNH]** — không có trong File A/File B, chỉ là đề xuất thông lệ chung |

**Lưu ý quan trọng:** Tên biến trong bảng trên mang tính **đề xuất/dự kiến** để chuẩn bị kiến trúc — khi có tài liệu ezCloud chính thức, tên biến liên quan ezCloud (3 dòng đầu) có thể cần điều chỉnh lại cho khớp thuật ngữ thật của ezCloud. Đây không phải là quyết định cuối cùng, không được dùng để code cứng.

## 3. Ví dụ cấu trúc `.env.example` (chỉ minh hoạ tài liệu — chưa tạo file thật trong repo)

```
# --- ezCloud (server-only — KHÔNG có tiền tố NEXT_PUBLIC_) ---
# Giá trị thật: [CHƯA XÁC NHẬN API]
EZCLOUD_API_BASE_URL=
EZCLOUD_API_KEY=
EZCLOUD_HOTEL_ID_CENTRAL=
EZCLOUD_HOTEL_ID_EMBER=
EZCLOUD_HOTEL_ID_LITTLEBAY=

# --- Website chung (public, an toàn khi lộ ra Frontend) ---
NEXT_PUBLIC_SITE_URL=
NEXT_PUBLIC_ZALO_LINK_CENTRAL=
NEXT_PUBLIC_ZALO_LINK_EMBER=
NEXT_PUBLIC_ZALO_LINK_LITTLEBAY=

# --- Tuỳ chọn, chờ xác nhận có cần không ---
EMAIL_SERVICE_API_KEY=
NEXT_PUBLIC_GA_MEASUREMENT_ID=
```

File `.env.example` này (không chứa giá trị thật) là file **duy nhất** được phép commit vào Git khi bắt đầu code. File chứa giá trị thật (`.env.local`) phải nằm trong `.gitignore` ngay từ commit đầu tiên.

## 4. Quản lý theo môi trường

| Môi trường | Nơi lưu biến môi trường |
|---|---|
| Local (máy cá nhân khi code) | File `.env.local` — không commit |
| Vercel Preview (mỗi Pull Request) | Khai báo trong Vercel Dashboard, scope "Preview" — có thể dùng giá trị test/sandbox của ezCloud nếu ezCloud có môi trường thử nghiệm riêng ([CHƯA XÁC ĐỊNH] ezCloud có cung cấp sandbox hay không) |
| Vercel Production | Khai báo trong Vercel Dashboard, scope "Production" — giá trị thật, chỉ người có quyền quản trị dự án được xem/sửa |

---

*Xem thêm: `security.md` (nguyên tắc bảo mật cho các biến này), `api-integration-design.md` (bối cảnh dùng các biến ezCloud).*

## 5. Cập nhật khi chuẩn bị production

| Biến | Loại | Mục đích |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Public | Đã dùng trong code (`lib/site.ts`): `metadataBase`, Open Graph, `sitemap.xml`, `robots.txt`. Không đặt thì mặc định `http://localhost:3000` — **bắt buộc đặt trên Production**. |
| `NEXT_PUBLIC_ZALO_LINK_CENTRAL` | Public | Đã dùng trong `StickyContactWidget`; chưa đặt thì dùng link tạm theo hotline Central. |
| `SITE_INDEXABLE` | Private | Chỉ dùng khi tự host ngoài Vercel: `true` = cho phép index. Trên Vercel tự xác định theo `VERCEL_ENV`. |
| `NEXT_PUBLIC_CHATBOT_API_URL` | Public | URL backend chatbot (`chatbot/backend`), dùng trong `components/chat/ChatWidget.tsx` và CSP `connect-src`. Dev để trống = `http://localhost:8080`; Production để trống = ẩn nút chat. |
