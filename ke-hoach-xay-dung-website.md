# Kế hoạch xây dựng Website Túi Ba Gang

> **CẬP NHẬT (lần 2)** sau khi có thêm file `GIAO DIỆN WEB TÚI BA GANG.pdf` — thay đổi quan trọng: đây không phải 1 khách sạn đơn lẻ mà là **1 thương hiệu "Túi Ba Gang" quản lý 3 cơ sở riêng biệt tại Đà Lạt** (Central, Ember Style, Little Bay), mỗi cơ sở có trang riêng đầy đủ. PMS đã xác nhận là **ezCloud**. Kế hoạch dưới đây đã điều chỉnh lại phạm vi cho đúng thực tế — xem chi tiết đầy đủ trong `docs/requirements-analysis.md`, `docs/sitemap.md`.
>
> Mục tiêu: Website đầy đủ có chức năng đặt phòng (qua ezCloud), song ngữ Việt/Anh, cho 3 cơ sở.
> Đối tượng thực hiện: lần đầu làm web bằng Claude Code, triển khai theo từng phase, ưu tiên phương án dễ nhất ở mỗi bước.

---

## 0. Quyết định nền tảng (không đổi so với bản đầu — vẫn là lựa chọn dễ nhất)

**Ngôn ngữ lập trình / framework: Next.js (React) + Tailwind CSS** — lý do giữ nguyên như bản đầu (Claude Code hỗ trợ tốt, tối ưu ảnh tự động, có sẵn cơ chế đa ngôn ngữ, deploy dễ qua Vercel). Quy mô 3 cơ sở càng làm rõ lý do chọn framework có cấu trúc route/component tốt thay vì HTML tĩnh thuần.

**Nơi deploy: Vercel** — không đổi.

**Tài khoản cần chuẩn bị:**
1. GitHub, 2. Vercel, 3. Domain (nghi ngờ đã có sẵn `tuibagangdalat.vn` dựa theo email liên hệ — cần xác nhận), 4. **Tài khoản/API ezCloud** (mục mới — quan trọng, xem bên dưới).

**Về chức năng "đặt phòng" — CẬP NHẬT quan trọng:**
Khác với bản kế hoạch đầu (lúc đó chưa biết khách sạn dùng hệ thống nào, nên đề xuất bắt đầu bằng form thủ công), nay đã biết **khách sạn dùng ezCloud làm PMS/booking engine thật**. Điều này thay đổi thứ tự ưu tiên: việc liên hệ ezCloud để lấy tài liệu tích hợp (API hoặc widget nhúng sẵn) nên làm **sớm hơn nhiều** so với kế hoạch cũ (trước đây để tận Phase 6), lý tưởng nhất là **song song với Phase 0/1**, vì nó quyết định kiến trúc kỹ thuật của cả trang `/dat-phong` lẫn thanh tìm phòng ở trang chủ.

**Về Zalo — mục mới:** Nút Zalo nổi ở trang chủ (dạng link chat đơn giản, không phải tích hợp API) là hạng mục **rất dễ làm**, có thể làm ngay từ Phase 1 cùng lúc với khung giao diện, không cần chờ đến giai đoạn sau.

---

## Phase 0 — Chuẩn bị nội dung & phạm vi (chưa code) — CẬP NHẬT quy mô

Việc cần làm (đã điều chỉnh theo cấu trúc 3 cơ sở):
- Chốt sitemap đầy đủ theo `docs/sitemap.md`: Trang chủ, Về chúng tôi, Phòng nghỉ (x3 cơ sở), Trải nghiệm, Thư viện (x3 trang riêng từng cơ sở), Ưu đãi, Liên hệ, Đặt phòng.
- **Xử lý mâu thuẫn tên hạng phòng** giữa các phiên bản trong file giao diện web (xem `docs/open-questions.md` mục M1–M3) — cần chốt với chủ đầu tư/đơn vị thiết kế trước khi vào code, tránh phải đổi tên hàng loạt sau này.
- Liên hệ đơn vị vận hành ezCloud để lấy tài liệu tích hợp — xác định sớm mô hình: redirect sang ezCloud, nhúng widget, hay tự dựng UI gọi API.
- Xác định ảnh/nội dung cho từng cơ sở riêng biệt (Central, Ember Style, Little Bay) — lưu ý File A (concept kiến trúc cũ) nhiều khả năng chỉ thuộc về Ember Style, cần xác nhận trước khi gán ảnh.
- Xác nhận domain chính thức (nghi là `tuibagangdalat.vn`).
- Chốt bộ nhận diện: mỗi cơ sở có tông màu/cảm xúc hơi khác nhau theo mô tả trong file giao diện (Central: hiện đại đô thị; Ember Style: ấm/sang trọng, tông đỏ cam; Little Bay: thiên nhiên, tông xanh/nâu gỗ) — cần xác nhận có dùng biến thể màu theo từng cơ sở hay giữ 1 bộ nhận diện chung.

**Kết quả Phase 0:** Nội dung + ảnh cho cả 3 cơ sở, đã xử lý xong mâu thuẫn tên hạng phòng, đã có hướng đi rõ cho tích hợp ezCloud.

---

## Phase 1 — Khung giao diện tĩnh (Trang chủ + Về chúng tôi) — bổ sung Zalo

- Khởi tạo dự án Next.js + Tailwind.
- Layout chung: Header (menu đầy đủ 6 mục + nút Đặt phòng + chuyển ngôn ngữ), Footer (Chính sách/FAQ/Liên hệ + social icon).
- **Thêm mới so với bản đầu:** `StickyContactWidget` (nút Zalo + gọi điện nổi) — dễ làm, nên có ngay từ phase này.
- Trang chủ: hero, bộ chọn nhanh 3 cơ sở, thanh tìm phòng (giao diện trước, chưa cần nối ezCloud thật ở bước này), khối giới thiệu 3 cơ sở.
- Trang Về chúng tôi.
- Deploy bản nháp lên Vercel.

---

## Phase 2 — Trang Phòng nghỉ & Thư viện (3 cơ sở) — mở rộng nhiều so với bản đầu

Vì mỗi cơ sở có cấu trúc trang riêng, phase này nặng hơn đáng kể so với kế hoạch ban đầu (trước đây tưởng chỉ có 1 khách sạn 1 bộ trang phòng):
- `/phong-nghi`: trang chọn cơ sở + danh sách hạng phòng từng cơ sở (x3) + trang chi tiết phòng.
- `/thu-vien`: trang chọn cơ sở + trang riêng đầy đủ từng cơ sở (x3 "mini-landing page": hero, story, tiện nghi, preview phòng, ẩm thực).
- `/trai-nghiem`: nội dung trải nghiệm Đà Lạt (cần nội dung thật từ chủ đầu tư — xem Open Question F2).

**Kết quả Phase 2:** Đầy đủ nội dung tham quan/tìm hiểu cho cả 3 cơ sở, chưa có đặt phòng thật.

---

## Phase 3 — Ưu đãi, Liên hệ & Đặt phòng (tích hợp ezCloud) — thay đổi lớn nhất so với bản đầu

Khác hẳn kế hoạch cũ (form thủ công trước, tích hợp thật để sau):
- `/uu-dai`: hiển thị 3 chương trình khuyến mãi đã có sẵn nội dung thật.
- `/lien-he`: card liên hệ từng cơ sở (hotline/email — đã có dữ liệu thật, chỉ cần xác nhận số Ember Style có đúng không).
- `/dat-phong`: triển khai theo mô hình đã chốt ở Phase 0 (redirect ezCloud / nhúng widget / form thủ công tạm thời nếu ezCloud chưa sẵn sàng tích hợp kịp).

**Kết quả Phase 3:** Khách xem được ưu đãi thật, liên hệ được từng cơ sở, và có thể tìm/đặt phòng qua ezCloud (hoặc form tạm nếu chưa kịp tích hợp).

---

## Phase 4 — Đa ngôn ngữ hoàn chỉnh & SEO (không đổi nhiều, nhưng khối lượng dịch tăng gấp 3)

- Dịch nội dung VI → EN cho cả 3 cơ sở (khối lượng nội dung tăng đáng kể so với ước tính "1 khách sạn" ban đầu).
- SEO riêng cho từng cơ sở (từ khoá khác nhau: "khách sạn trung tâm Đà Lạt" vs "villa Đà Lạt gần rừng thông"...).
- Sitemap.xml, robots.txt, favicon, Open Graph.

---

## Phase 5 — Kiểm thử toàn diện & Go-live (không đổi nhiều)

- Test case functional cho cả 3 luồng phòng nghỉ, luồng đặt phòng qua ezCloud (ưu tiên test kỹ vì đây là điểm rủi ro kỹ thuật cao nhất), chuyển ngôn ngữ, liên hệ.
- Test responsive, trình duyệt, tốc độ tải — lưu ý khối lượng ảnh lớn hơn 3 lần do có 3 trang "Thư viện" riêng.
- Domain thật, HTTPS, Analytics.

---

## Phase 6 — Mở rộng (làm sau khi vận hành ổn định)

- Nếu Phase 3 phải tạm dùng form thủ công, đây là lúc hoàn tất tích hợp ezCloud đầy đủ.
- Nâng cấp Zalo từ link chat đơn giản lên Zalo OA API (thông báo tự động) nếu cần.
- CMS để tự cập nhật ưu đãi/giá mà không cần sửa code — hợp lý hơn bao giờ hết vì có 3 cơ sở cần cập nhật riêng.
- Thêm ngôn ngữ khác (Nhật/Hàn) nếu cần.

---

## Tóm tắt lựa chọn công nghệ (cập nhật)

| Hạng mục | Lựa chọn khuyến nghị | Ghi chú cập nhật |
|---|---|---|
| Framework | Next.js + Tailwind CSS | Không đổi |
| Deploy | Vercel | Không đổi |
| Domain | `tuibagangdalat.vn` (nghi vấn, cần xác nhận) | Suy từ email liên hệ trong file giao diện web |
| PMS/Booking Engine | **ezCloud (đã xác nhận)** | Trước đây chỉ là ví dụ tham khảo, nay là hệ thống thật — ưu tiên liên hệ sớm |
| Chat tư vấn | Zalo (link chat đơn giản) | Dễ làm, nên làm ngay Phase 1 |
| Đặt phòng | Redirect/nhúng widget ezCloud (ưu tiên) hoặc form thủ công tạm thời | Quyết định cụ thể cần chốt ở Phase 0 |

---

*Ghi chú nguồn: "TUI BA GANG CONCEPT. CẬP NHẬT.pdf" (File A — kiến trúc, 54 trang) và "GIAO DIỆN WEB TÚI BA GANG.pdf" (File B — giao diện web, 10 trang, có chú thích nghiệp vụ). Toàn bộ phân tích chi tiết nằm trong thư mục `docs/` (Phase 1 & 2).*
