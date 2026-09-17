# External Systems / Integrations — Túi Ba Gang Website

**CẬP NHẬT (lần 2)** sau khi có File B. Đây là file thay đổi nhiều nhất trong Phase 1, vì trước đây toàn bộ mục này là [CHƯA XÁC ĐỊNH].

| Hệ thống | Trạng thái | Chi tiết |
|---|---|---|
| **ezCloud** (PMS/Booking Engine) | **CONFIRMED có dùng** | File B, trang 1: *"Liên kết với ezCloud để kiểm tra phòng thực tế tại thời điểm tìm kiếm"*. **[CHƯA XÁC NHẬN API]** — chưa có tài liệu API/hợp đồng tích hợp chính thức từ ezCloud. Chưa biết: 1 tài khoản ezCloud cho cả 3 cơ sở hay 3 tài khoản riêng; ezCloud có cung cấp widget nhúng sẵn (embed) hay cần tự gọi API dựng giao diện; ezCloud có xử lý thanh toán luôn hay chỉ availability/giá. |
| **Zalo** | **CONFIRMED có dùng, nhưng ở mức tối thiểu** | File B, trang 1: nút Zalo nổi (floating) ở footer trang chủ, dùng để "tư vấn" — nhiều khả năng chỉ là **link chat Zalo thông thường** (click-to-chat), **KHÔNG PHẢI Zalo OA API tự động** (gửi thông báo booking...). Đây là 2 mức tích hợp rất khác nhau về độ phức tạp — **cần xác nhận rõ mức nào được yêu cầu.** |
| **Payment Gateway** | **[CHƯA XÁC ĐỊNH]** | File B không có bất kỳ mockup màn hình thanh toán nào. Có thể được xử lý hoàn toàn bởi ezCloud (nếu ezCloud có module thanh toán riêng) — **[CHƯA XÁC NHẬN API]**. |
| **Google Maps** | **[CHƯA XÁC ĐỊNH — có khả năng KHÔNG dùng]** | Đáng chú ý: trang "Liên hệ" (File B, trang 10) **không có bản đồ nào trong mockup**, chỉ có card từng cơ sở + hotline/email. Trước đây Phase 1 giả định cần Google Maps — nay cần xác nhận lại vì wireframe không thể hiện. |
| **Google Analytics / Search Console** | **[CHƯA XÁC ĐỊNH]** | Không đề cập trong File B — vẫn là đề xuất thông lệ chung, chưa xác nhận. |
| **Email service** | **CONFIRMED cần có** (gián tiếp) | 3 địa chỉ email nghiệp vụ thật đã xuất hiện (`central@`, `emberstyle@`, `littlebay@tuibagangdalat.vn`) — cho thấy khách sạn đã có hệ thống email riêng, nhưng **[CHƯA XÁC ĐỊNH]** website có cần gửi email tự động (xác nhận booking, liên hệ) qua dịch vụ nào. |
| **Mạng xã hội** | **CONFIRMED có, nhưng chưa có link cụ thể** | Icon Instagram, Facebook xuất hiện ở hầu hết footer (File B trang 2, 3, 5); icon YouTube chỉ xuất hiện ở footer trang 4 (Trải nghiệm — hợp lý vì có mục "Xem video"). **[CHƯA XÁC ĐỊNH]** link tài khoản thật. |
| **OTA (Booking.com, Agoda...)** | **[CHƯA XÁC ĐỊNH]** | Không đề cập trong File B. |

## Ghi chú quan trọng (cập nhật)

- **ezCloud** giờ là ưu tiên tích hợp số 1 — cần liên hệ đơn vị vận hành ezCloud của khách sạn để lấy tài liệu API/SDK/widget chính thức trước khi thiết kế kỹ thuật chi tiết cho `/dat-phong`.
- Cần phân biệt rõ 2 loại "Zalo": (1) nút liên kết mở cuộc trò chuyện Zalo cá nhân/OA đơn giản (dễ làm, chỉ là 1 link `https://zalo.me/...`), và (2) tích hợp Zalo OA API để gửi thông báo tự động (phức tạp hơn nhiều, cần đăng ký Zalo OA, xác thực). File B chỉ cho thấy bằng chứng rõ ràng cho (1).
- Vẫn giữ nguyên tắc: mọi endpoint/tham số/authentication liên quan đến ezCloud hoặc bất kỳ hệ thống nào ở trên đều phải đánh dấu **[CHƯA XÁC NHẬN API]** cho đến khi có tài liệu chính thức, theo `CLAUDE.md` mục 3.
