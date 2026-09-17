# Security, Authentication & Authorization — Túi Ba Gang Website

**Phase 3.** CHƯA CODE. Tuân thủ nghiêm `CLAUDE.md` mục 3 (không đoán API/authentication method) và mục 4 (Security).

## 1. Authentication (Xác thực)

Cần phân biệt rõ **2 loại authentication khác nhau** trong hệ thống này — dễ nhầm lẫn nếu gộp chung:

### 1.1 Authentication của khách hàng cuối (end-user) trên website

- **Hiện trạng: KHÔNG CẦN**, vì:
  - `functional-requirements.md` mục F14 ("Tài khoản khách hàng — đăng ký/đăng nhập") ghi rõ **[CHƯA XÁC ĐỊNH]** — không xuất hiện trong bất kỳ mockup nào của File B.
  - Các luồng chính (xem phòng, tìm phòng, xem ưu đãi, liên hệ) đều **không yêu cầu đăng nhập** theo `user-flows.md`.
  - Đặt phòng (Flow D) nhiều khả năng theo hướng "guest checkout" (khách nhập thông tin khi đặt, không cần tài khoản) — nhưng đây cũng vẫn **[CHƯA XÁC ĐỊNH]** hoàn toàn.
- **Kết luận:** Không thiết kế cơ chế đăng ký/đăng nhập khách hàng ở Phase 3. Nếu về sau xác nhận cần (ví dụ: để khách xem lại lịch sử đặt phòng), sẽ bổ sung Open Question và quay lại phân tích requirement trước khi thiết kế.

### 1.2 Authentication giữa Backend và ezCloud (server-to-server)

- **Chắc chắn cần có** (không thể gọi ezCloud mà không xác thực), nhưng **phương thức cụ thể là [CHƯA XÁC NHẬN API]** — có thể là API Key, OAuth2 Client Credentials, Basic Auth, hoặc cơ chế whitelist theo IP server. Không được tự chọn 1 phương án và code cứng cho đến khi có tài liệu ezCloud chính thức, theo `CLAUDE.md` mục 3.
- **Nguyên tắc bắt buộc dù dùng cơ chế nào:** thông tin xác thực (API Key/secret/token) chỉ được lưu và sử dụng ở **Backend (server-side)**, không bao giờ xuất hiện ở Frontend/trình duyệt của khách — xem `environment-variables.md`.

### 1.3 Authentication cho khu vực quản trị (nếu có CMS trong tương lai)

- `functional-requirements.md` mục F13 (CMS) ghi **[CHƯA XÁC ĐỊNH]** — hiện chưa có yêu cầu. Nếu về sau có CMS/trang quản trị nội dung, sẽ cần thêm cơ chế đăng nhập riêng cho nhân viên (khác hoàn toàn với authentication khách hàng ở mục 1.1) — **chưa thiết kế ở Phase 3 này** vì chưa có requirement.

## 2. Authorization (Phân quyền)

- **Hiện trạng: KHÔNG CẦN**, vì hệ thống hiện tại không có khái niệm "vai trò" (role) nào — không có tài khoản khách hàng (mục 1.1), không có CMS/admin (mục 1.3).
- Nếu tương lai có CMS, đề xuất tối thiểu 2 vai trò tham khảo (Admin toàn quyền, Editor chỉ sửa nội dung) — nhưng đây là **ĐỀ XUẤT mang tính tham khảo cho tương lai**, không phải quyết định kiến trúc hiện tại.

## 3. Nguyên tắc bảo mật ứng dụng (áp dụng ngay từ Phase đầu code)

Theo đúng `CLAUDE.md` mục 4 — nhắc lại rõ ràng để không ai vô tình vi phạm khi bắt đầu code:

| Nguyên tắc | Áp dụng cụ thể cho dự án này |
|---|---|
| Không hard-code API key/password/secret | Toàn bộ secret (ezCloud API key nếu có, email service key nếu có...) đặt trong biến môi trường — xem `environment-variables.md` |
| Không commit secret vào Git | Thêm `.env*.local` vào `.gitignore` ngay từ khi khởi tạo repo; chỉ commit `.env.example` (không chứa giá trị thật) |
| Không expose credential phía server ra Frontend | Chỉ biến môi trường có tiền tố `NEXT_PUBLIC_` mới được phép xuất hiện ở Frontend; secret của ezCloud/email service **tuyệt đối không** đặt tiền tố này |
| Validate dữ liệu đầu vào | Mọi Internal API Route (`/api/availability`...) phải validate tham số đầu vào (ngày nhận/trả hợp lệ, số khách hợp lý...) trước khi gọi ezCloud, tránh lỗi hoặc bị lợi dụng |
| HTTPS bắt buộc | Vercel tự động cấp HTTPS cho domain — không cần cấu hình thêm, nhưng cần đảm bảo domain thật (`tuibagangdalat.vn`, [CHƯA XÁC ĐỊNH chính thức]) trỏ đúng và luôn dùng HTTPS |
| Security headers | Cấu hình các header bảo mật cơ bản (chống nhúng iframe trái phép, chống đoán loại nội dung sai...) ở tầng Next.js config — chi tiết kỹ thuật sẽ chốt khi vào code |
| Giới hạn tần suất gọi API (rate limiting) | **ĐỀ XUẤT** — giới hạn số lần gọi `/api/availability` từ 1 nguồn trong thời gian ngắn, tránh bị lạm dụng gây tốn phí gọi ezCloud (nếu ezCloud tính phí theo lượt gọi — [CHƯA XÁC ĐỊNH]) |
| Cập nhật thư viện định kỳ | Theo dõi cảnh báo lỗ hổng bảo mật của các thư viện dùng trong dự án (Next.js, thư viện phụ trợ...) — việc thường quy, không cần công cụ đặc biệt ở quy mô hiện tại |
| Domain ảnh hợp lệ cho `next/image` | Nếu ảnh phòng/ảnh cơ sở lấy động từ ezCloud hoặc nguồn ngoài, phải khai báo rõ domain được phép trong cấu hình Next.js, tránh tải ảnh từ nguồn không kiểm soát |

## 4. Những điều KHÔNG được làm (nhắc lại từ CLAUDE.md, áp dụng cho toàn bộ Phase code sau này)

- Không hard-code API key, password, secret dưới bất kỳ hình thức nào (kể cả trong comment code hay file cấu hình mẫu có giá trị thật).
- Không tự đoán và code cứng cơ chế xác thực với ezCloud khi chưa có tài liệu chính thức.
- Không thu thập/lưu trữ thông tin cá nhân khách hàng (nếu có form đặt phòng sau này) mà không có cơ chế bảo vệ phù hợp — vấn đề này cần làm rõ thêm khi Flow D được xác nhận.

---

*Xem thêm: `environment-variables.md` (cách quản lý secret cụ thể), `api-integration-design.md` (bối cảnh kỹ thuật cần bảo mật).*
