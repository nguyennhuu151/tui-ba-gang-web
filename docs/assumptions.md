# Assumptions — Túi Ba Gang Website

**CẬP NHẬT (lần 2)** sau khi có File B (`GIAO DIỆN WEB TÚI BA GANG.pdf`). Một số assumption cũ nay đã được CONFIRMED, một số assumption mới phát sinh.

| # | ASSUMPTION | Trạng thái | Ghi chú |
|---|---|---|---|
| A1 | Tên thương hiệu là "Tui Ba Gang Hotel" | **ĐÃ SỬA** | File B xác nhận chính tả thương hiệu là **"Túi Ba Gang"** (có dấu), và đây là 1 thương hiệu 3 cơ sở chứ không phải 1 khách sạn tên "Tui Ba Gang Hotel" |
| A2 | Địa điểm khách sạn ở Đà Lạt | **ĐÃ CONFIRMED** (không còn là assumption) | File B, trang 1, 4, 7, 10 ghi rõ "ĐÀ LẠT, VIỆT NAM" |
| A3 | Website cần 2 ngôn ngữ VI/EN | **ĐÃ CONFIRMED** | File B mọi trang đều có nút chuyển ngôn ngữ VI/EN |
| A4 | Website cần đặt phòng đầy đủ | **ĐÃ CONFIRMED**, có nguồn availability là ezCloud | File B trang 1 |
| A5 | Ảnh render 3D trong File A có thể tạm dùng cho web | Vẫn là ASSUMPTION | Cần xác nhận, đặc biệt vì giờ chưa rõ File A thuộc cơ sở nào (xem A8) |
| A6 | Mỗi tầng khách (File A) có 4–5 phòng, đánh số [tầng][thứ tự] | Vẫn là ASSUMPTION, độ tin cậy thấp | Đây là mã phòng vận hành, khác với tên hạng phòng thương mại trong File B |
| A7 | "Dalat Galerie" (File A) là điểm nhấn thương hiệu | Vẫn là ASSUMPTION | Chưa rõ "Dalat Galerie" tương ứng mục nào trong File B — có thể là 1 phần nội dung của "Thư viện" hoặc của 1 cơ sở cụ thể — **cần xác nhận** |
| **A8 (MỚI)** | File A (concept kiến trúc) mô tả công trình của **Túi Ba Gang Ember Style** | ASSUMPTION MỚI, độ tin cậy trung bình | Suy từ việc kiến trúc vòm cong + cầu thang xoắn màu cam/đỏ trong File A trùng khớp với mô tả "dải lụa đỏ, cầu thang đỏ" của Ember Style trong File B (trang 7). **Cần xác nhận chính thức trước khi gán ảnh/nội dung File A vào đúng cơ sở.** |
| **A9 (MỚI)** | Domain website là `tuibagangdalat.vn` | ASSUMPTION MỚI | Suy từ 3 địa chỉ email nghiệp vụ (`central@`, `emberstyle@`, `littlebay@tuibagangdalat.vn`) — nhiều khả năng đây là domain chính thức nhưng **chưa được nói rõ là domain của website** |
| **A10 (MỚI)** | Nút Zalo ở trang chủ chỉ là link chat đơn giản (không phải Zalo OA API tự động) | ASSUMPTION MỚI | Xem `integrations.md` — cần xác nhận vì ảnh hưởng lớn đến effort kỹ thuật |

---

## Nguyên tắc xử lý Assumption (không đổi)

- Không code/thiết kế UI final dựa trên assumption chưa xác nhận.
- Khi 1 assumption được xác nhận, cập nhật trạng thái + ngày xác nhận, chuyển nội dung sang tài liệu requirement chính thức.
- Đặc biệt lưu ý A8 và A10 vì ảnh hưởng trực tiếp đến việc gán nội dung/ảnh đúng cơ sở và đến effort tích hợp kỹ thuật.
