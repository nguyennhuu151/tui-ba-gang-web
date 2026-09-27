# Phase 7 — Báo cáo chuẩn bị Production (Production readiness)

Phạm vi: chỉ làm cứng phần kỹ thuật (build, lint, bảo mật, SEO, CI, xử lý lỗi). KHÔNG thay đổi business requirement, KHÔNG tự tạo API ezCloud, KHÔNG đổi giao diện/thiết kế.

## Đã hoàn thành

1. **Nâng Next.js 15 → 16.3.6** (thay đổi này đã có sẵn chưa commit trên branch `feature/production-ready-config`, đã giữ lại và kiểm chứng): build, typecheck đều pass.
2. **Lint chạy lại được**: Next.js 16 đã bỏ lệnh `next lint` nên script `npm run lint` cũ bị hỏng. Đã chuyển sang ESLint 9 + flat config (`eslint.config.mjs`, dùng `eslint-config-next` 16), xoá `.eslintrc.json`.
3. **Sửa lỗi lint thật** trong `components/layout/Header.tsx`: gọi `setState` đồng bộ trong `useEffect` (rule `react-hooks/set-state-in-effect`). Hành vi đổi màu chữ Header không đổi.
4. **Sửa lỗi hydration (React #418)** ở tất cả trang `/thu-vien/[hotel]`: `PropertySubNav` bọc `<Link>` quanh `<Logo>`, mà `Logo` cũng là `<Link>` nên sinh ra thẻ `<a>` lồng trong `<a>` (HTML không hợp lệ). Đã thêm prop `href`/`label` cho `Logo`; hành vi bấm logo về `/thu-vien` giữ nguyên.
5. **Security headers** (`next.config.mjs`): Content-Security-Policy (chỉ cho phép tài nguyên cùng domain), HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy; tắt header `X-Powered-By`. Thực hiện đúng mục "Security headers" trong `docs/security.md`.
6. **SEO**:
   - `lib/site.ts` đọc `NEXT_PUBLIC_SITE_URL` (có validate URL).
   - `app/layout.tsx`: `metadataBase`, Open Graph, Twitter card, `themeColor`.
   - `app/sitemap.ts` (sinh từ menu + dữ liệu cơ sở/hạng phòng, không liệt kê tay), `app/robots.ts`.
   - Bản Preview/staging tự gắn `noindex` và `robots.txt` chặn toàn bộ, chỉ Production mới được index.
   - Favicon (`app/icon.png`) và `app/apple-icon.png` tạo từ logo có sẵn.
7. **`app/global-error.tsx`**: bắt lỗi xảy ra ngay trong root layout, trường hợp `app/error.tsx` không bắt được.
8. **Zalo link đọc từ env** `NEXT_PUBLIC_ZALO_LINK_CENTRAL` (biến đã khai báo trong `.env.example` nhưng trước đây chưa được dùng), chưa cấu hình thì dùng link tạm như cũ.
9. **Hạ tầng**: `engines.node >= 20.9`, `.nvmrc`, script `npm run check`, CI GitHub Actions (`.github/workflows/ci.yml`: lint + typecheck + build), `turbopack.root` (sửa cảnh báo nhận nhầm `package-lock.json` ở thư mục cha).
10. **Tài liệu**: `README.md` (chạy local, deploy Vercel), cập nhật `docs/environment-variables.md` mục 5, bổ sung `.env.example`.

Đã kiểm chứng: `npm run check` pass; chạy bản production (`next start`) và kiểm tra headers, `robots.txt`, `sitemap.xml`, trang 404; duyệt thử các trang chính trên trình duyệt thật: không còn lỗi console, CSP không chặn tài nguyên nào; 13 trang đều có đủ `title`, `description`, `og:image` và 1 thẻ `h1`, không còn link lồng nhau.

## Chưa hoàn thành

Các mục dưới đây là **chặn production nhưng không thể tự làm** theo `CLAUDE.md` mục 2–3:

- **Đặt phòng `/dat-phong` vẫn là MOCK**: kết quả tìm phòng tạo giả ở client, hiện nguyên chữ "KẾT QUẢ TÌM KIẾM (MOCK)" và ghi chú "[CHƯA XÁC NHẬN API]" cho khách thấy. [CHƯA XÁC NHẬN API] ezCloud — xem Open Question F5, F6.
- **Chuyển ngôn ngữ VI/EN** (`LanguageSwitcher`) mới là giao diện placeholder, chưa có chức năng.
- **Link mạng xã hội** trong Footer (`SocialIcons`) đang là `href="#"`.
- **Giá, tiện nghi hạng phòng** vẫn là dữ liệu mock (`lib/content/rooms.ts`).
- Chưa có dịch vụ theo dõi lỗi (error tracking) và analytics, đúng theo quyết định #12 trong `docs/technical-decisions.md`.

## Vấn đề phát hiện

- Link Zalo tạm `https://zalo.me/+842633837837` có dấu `+`, nhiều khả năng Zalo không nhận định dạng này. Cần link Zalo chính thức.
- `apple-icon.png` giữ nền trong suốt của logo; trên iOS phần trong suốt có thể hiện nền đen. Nên có file icon vuông chính thức từ bên thiết kế.
- Ảnh trong `public/` tổng khoảng 16MB (một số ảnh 0.7–1.4MB). Ảnh đều được tối ưu qua `next/image` (đã bật AVIF/WebP) nên người dùng không tải ảnh gốc, nhưng nên nén bản gốc để repo nhẹ hơn.
- `next dev` tự chèn một khối "nextjs-agent-rules" vào cuối `CLAUDE.md`. Khối này sẽ được tạo lại mỗi lần chạy dev nên nên commit cùng.

## Cần tôi xác nhận

1. Domain chính thức để đặt `NEXT_PUBLIC_SITE_URL` (Assumption A9).
2. Trước khi có API ezCloud, có go-live không? Nếu có, trang `/dat-phong` nên: (a) ẩn khỏi menu, (b) thay bằng nút gọi hotline/Zalo, hay (c) giữ bản mock nhưng bỏ chữ "MOCK" và ghi chú kỹ thuật?
3. Có ẩn nút VI/EN và icon mạng xã hội cho đến khi có chức năng/link thật không?
4. Link Zalo chính thức cho từng cơ sở.

## Phase tiếp theo

- Xử lý các mục "Cần tôi xác nhận" ở trên.
- Tích hợp ezCloud qua PMS Adapter khi có tài liệu API (theo `docs/api-integration-design.md`), bổ sung rate limit cho Internal API Route đúng như đề xuất ở `docs/security.md`.
- Nếu thêm Google Analytics hoặc dịch vụ ngoài: nhớ bổ sung domain vào CSP trong `next.config.mjs`.
