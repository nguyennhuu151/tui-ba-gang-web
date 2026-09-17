# Functional Requirements — Túi Ba Gang Website

**CẬP NHẬT (lần 2)** sau khi có File B (`GIAO DIỆN WEB TÚI BA GANG.pdf`). Quy ước File A/File B: xem `requirements-analysis.md`.

---

## 3. Functional Requirements (chức năng chung) — CẬP NHẬT

| # | Chức năng | Trạng thái | Ghi chú |
|---|---|---|---|
| F1 | Trang chủ giới thiệu thương hiệu + điều hướng nhanh tới 3 cơ sở | **CONFIRMED** | File B trang 1 |
| F2 | Trang "Về chúng tôi" — câu chuyện thương hiệu | **CONFIRMED** | File B trang 2 |
| F3 | Trang "Phòng nghỉ" — chọn cơ sở → xem danh sách hạng phòng → lọc theo loại phòng → chi tiết phòng | **CONFIRMED** cấu trúc; **[CHƯA XÁC ĐỊNH]** tên hạng phòng chính thức (mâu thuẫn nội bộ, xem `requirements-analysis.md`) | File B trang 3 |
| F4 | Trang "Trải nghiệm" — nội dung giới thiệu ăn uống/cà phê/điểm tham quan Đà Lạt + video | **CONFIRMED** khung giao diện; **[CHƯA XÁC ĐỊNH]** nội dung thật (danh sách địa điểm cụ thể, video) | File B trang 4 |
| F5 | Trang "Thư viện" — mỗi cơ sở có 1 trang riêng dạng landing page đầy đủ (hero, story, tiện nghi, phòng, ẩm thực) | **CONFIRMED** | File B trang 5–8 |
| F6 | Trang "Ưu đãi" — danh sách khuyến mãi, lọc theo cơ sở, có badge thông báo (chấm đỏ) khi có ưu đãi mới | **CONFIRMED**, có dữ liệu mẫu thật | File B trang 9 |
| F7 | Trang "Liên hệ" — thông tin liên hệ riêng từng cơ sở | **CONFIRMED** | File B trang 10 |
| F8 | Đa ngôn ngữ VI/EN | **CONFIRMED** (đã thấy nút chuyển ngôn ngữ trên mọi trang mockup) | File B, mọi trang |
| F9 | Nút "Đặt phòng" nổi bật, tách riêng khỏi menu, xuất hiện ở mọi trang | **CONFIRMED** | File B, mọi trang |
| F10 | Widget nổi (floating) Zalo chat + gọi điện ở trang chủ | **CONFIRMED** | File B trang 1 (footer) |
| F11 | Tìm phòng theo địa điểm (cơ sở)/ngày nhận/ngày trả/số khách, liên kết ezCloud để check phòng trống thực tế | **CONFIRMED có yêu cầu**; **[CHƯA XÁC ĐỊNH]** chi tiết kỹ thuật tích hợp (xem `integrations.md`) | File B trang 1 |
| F12 | Footer: Chính sách, Câu hỏi thường gặp, Liên hệ, mạng xã hội (Instagram/Facebook/YouTube) | **CONFIRMED** có mục này; **[CHƯA XÁC ĐỊNH]** nội dung Chính sách/FAQ | File B trang 4 |
| F13 | Quản trị nội dung (CMS) | **[CHƯA XÁC ĐỊNH]** — không có trong File B | — |
| F14 | Tài khoản khách hàng (đăng ký/đăng nhập) | **[CHƯA XÁC ĐỊNH]** — không thấy trong bất kỳ mockup nào của File B | — |
| F15 | Đánh giá/review của khách | **[CHƯA XÁC ĐỊNH]** — không có trong File B | — |

---

## 5. Booking — phân tích chi tiết (CẬP NHẬT — nay đã có nhiều thông tin hơn, nhưng vẫn còn khoảng trống)

### 5.1 Tìm phòng (Search) — **CONFIRMED một phần**
- Tiêu chí xác nhận: Địa điểm (chọn cơ sở hoặc "Tất cả khách sạn"), Nhận phòng, Trả phòng, Số khách (người lớn/trẻ em). (File B, trang 1)
- **[CHƯA XÁC ĐỊNH]**: có bộ lọc theo hạng phòng/tiện nghi/giá không; kết quả tìm kiếm hiển thị ở đâu (trang riêng hay ngay trên trang chủ).

### 5.2 Availability (tình trạng phòng còn trống) — **CONFIRMED nguồn dữ liệu, chưa xác nhận cơ chế**
- File B ghi rõ: **"Liên kết với ezCloud để kiểm tra phòng thực tế tại thời điểm tìm kiếm"** (trang 1) → xác nhận ezCloud là hệ thống PMS/Booking Engine chính thức.
- **[CHƯA XÁC NHẬN API]**: chưa có tài liệu API ezCloud, chưa biết gọi trực tiếp (real-time) hay qua trung gian, chưa biết ezCloud có hỗ trợ đa cơ sở (3 property) trong 1 tài khoản hay 3 tài khoản riêng.

### 5.3 Giá phòng — vẫn **[CHƯA XÁC ĐỊNH]**
- File B không hiển thị giá ở bất kỳ mockup phòng nào (chỉ có tên, diện tích, số khách).
- Giá nhiều khả năng sẽ lấy động từ ezCloud tại thời điểm tìm kiếm, nhưng **chưa xác nhận**.

### 5.4 Đặt phòng (Book) — **[CHƯA XÁC ĐỊNH]** cơ chế chi tiết
- Có nút "TÌM PHÒNG →" và "ĐẶT PHÒNG →" riêng biệt, gợi ý luồng 2 bước (tìm → đặt), nhưng **chưa rõ**:
  - Sau khi tìm phòng, việc đặt/thanh toán diễn ra ngay trên website (`tuibagangdalat.vn`) hay chuyển hướng (redirect) sang trang đặt phòng do ezCloud host.
  - Thông tin cần thu thập khi đặt phòng.

### 5.5 Hủy booking — vẫn **[CHƯA XÁC ĐỊNH]**
- File B không có mockup cho luồng quản lý/hủy booking sau khi đặt.

### 5.6 Thay đổi booking — vẫn **[CHƯA XÁC ĐỊNH]**
- Tương tự mục 5.5.

### 5.7 Thanh toán — vẫn **[CHƯA XÁC ĐỊNH]**
- File B không có mockup màn hình thanh toán. Nếu dùng ezCloud, khả năng ezCloud tự xử lý thanh toán (ezCloud có module riêng), nhưng **[CHƯA XÁC NHẬN API]**.

> **Khuyến nghị của BA (cập nhật):** Việc xác nhận ezCloud là bước tiến lớn, nhưng vẫn cần: (a) tài liệu API/hợp tác chính thức với ezCloud, (b) xác nhận mô hình tích hợp (nhúng widget có sẵn của ezCloud vs gọi API dựng UI riêng), (c) xác nhận có redirect sang trang ezCloud để thanh toán hay giữ khách ở lại website. Đây vẫn là hạng mục rủi ro cao nhất, nhưng nay đã có hướng đi rõ ràng hơn nhiều so với Phase 1 lần đầu.

---

## Ưu đãi (Offers) — MỤC MỚI, đã CONFIRMED có dữ liệu thật

| Cơ sở | Tên ưu đãi | Thời gian | Ưu đãi |
|---|---|---|---|
| Central | "Stay a Little Longer" | 01.09 – 30.11.2026 | Giảm 15% khi đặt từ 2 đêm; tặng bữa sáng cho 2 khách; miễn phí nâng hạng phòng (tùy tình trạng) |
| Ember Style | "A Warmer You" | 15.09 – 31.12.2026 | Tặng 1 set trà chiều cho 2 khách; giảm 10% dịch vụ F&B; nhận phòng sớm/trả phòng muộn (tùy tình trạng) |
| Little Bay | "A Little Getaway" | 01.10 – 31.12.2026 | Giảm 10% khi đặt từ 2 đêm; tặng trải nghiệm trà & thiền sáng; miễn phí hoạt động ngoài trời (tùy lịch chung) |

**[CHƯA XÁC ĐỊNH]**: cơ chế áp dụng ưu đãi khi đặt phòng (tự động áp mã hay khách phải nhập code), ưu đãi có đồng bộ với ezCloud không, hay quản lý riêng trên website.

---

*Tất cả câu hỏi trong tài liệu này được tổng hợp trong `open-questions.md`.*
