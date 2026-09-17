# Data Model — Túi Ba Gang Website

**CẬP NHẬT (lần 2) — thay đổi cấu trúc quan trọng nhất:** `Hotel` không còn là 1 entity đơn (1 khách sạn) mà tách thành `Brand` (thương hiệu chung) + `Property` (từng cơ sở: Central/Ember Style/Little Bay). Vẫn ở mức **khái niệm**, KHÔNG PHẢI schema chính thức (CLAUDE.md mục 3).

## Entity: Brand

- Tên: "Túi Ba Gang" — CONFIRMED (File B)
- Câu chuyện thương hiệu — CONFIRMED, có nội dung đầy đủ (File B trang 2)
- Domain — **[CHƯA XÁC ĐỊNH chính thức]**, suy đoán `tuibagangdalat.vn` (Assumption A9)

## Entity: Property (từng cơ sở — MỚI, thay cho `Hotel` đơn lẻ trước đây)

| Field | Central | Ember Style | Little Bay |
|---|---|---|---|
| Tên | Túi Ba Gang Central | Túi Ba Gang Ember Style | Túi Ba Gang Little Bay |
| Tagline | "Sôi động giữa lòng phố" | "Ấm áp. Tinh tế. Năng lượng." | "A little bay by Túi Ba Gang" |
| Hotline | 0263 383 7837 | 0263 383 7837 *(nghi trùng lỗi — xem M4)* | 0263 361 9977 |
| Email | central@tuibagangdalat.vn | emberstyle@tuibagangdalat.vn | littlebay@tuibagangdalat.vn |
| Địa chỉ cụ thể | **[CHƯA XÁC ĐỊNH]** | **[CHƯA XÁC ĐỊNH]** | **[CHƯA XÁC ĐỊNH]** |
| Liên kết tới File A | — | **Nghi ngờ (Assumption A8)** — cần xác nhận | — |

Nguồn: File B trang 6, 7, 8, 10.

## Entity: RoomType (Hạng phòng — theo từng Property)

**⚠️ QUAN TRỌNG:** Tên hạng phòng hiện có **nhiều phiên bản mâu thuẫn** trong chính File B (xem `open-questions.md` M1–M3). Bảng dưới đây liệt kê tất cả các phiên bản đã thấy — **KHÔNG chọn 1 bộ làm chính thức cho đến khi có xác nhận:**

| Property | Phiên bản A (bảng danh sách chữ) | Phiên bản B (mockup rút gọn) | Phiên bản C (trang chi tiết) |
|---|---|---|---|
| Central | Superior, Deluxe, Premier, Premier Plus, Deluxe Trip, Deluxe Family, Premier Family | Superior Room, Deluxe Window, Deluxe Plus, Premier Plus, Premier Family | Superior, Deluxe, Executive |
| Ember Style | Ember Cozy, Ember Premier, Ember Signature, Ember Trio | Deluxe Room, Premier Room, Family Room, Suite Room | Ember Cozy, Ember Premier, Ember Signature, Ember Trio *(khớp phiên bản A)* |
| Little Bay | Sunrise Garden/Retreat/Nest, Sunset Signature Garden/Garden/Retreat/Penthouse, Midnight Friend/Retreat (9 tên) | Bay View Room, Lake View Room, Suite Room | Sunrise Bay, Sunset Bay, Midnight Bay |

Thuộc tính khác (áp dụng khi đã chốt tên): diện tích, số khách tối đa (đã có mẫu số liệu trong mockup, vd. "2 khách, 18m²"), ảnh, giá **[CHƯA XÁC ĐỊNH]**.

## Entity: Room (phòng vật lý cụ thể)

- **[CHƯA XÁC ĐỊNH]** — như bản trước, phụ thuộc ezCloud có quản lý theo phòng vật lý hay theo hạng phòng.

## Entity: Booking

- **[CHƯA XÁC ĐỊNH phần lớn]** — phụ thuộc Flow D (3 khả năng: redirect ezCloud / nhúng widget ezCloud / form thủ công). Nếu dùng ezCloud, `Booking` gần như là dữ liệu phía ezCloud, website chỉ cần lưu/hiển thị tham chiếu (booking reference) — **[CHƯA XÁC NHẬN API]**.

## Entity: Guest

- Không đổi so với bản trước — mức tối thiểu, chưa xác định có cần tài khoản hay guest checkout.

## Entity: Offer (MỚI — nay CONFIRMED có dữ liệu thật)

| Field | Ví dụ dữ liệu |
|---|---|
| Property | Central / Ember Style / Little Bay |
| Tên ưu đãi | "Stay a Little Longer" |
| Mô tả | "Thêm một đêm để Đà Lạt chậm lại một chút." |
| Ngày bắt đầu/kết thúc | 01.09.2026 – 30.11.2026 |
| Danh sách quyền lợi | Giảm 15% khi đặt từ 2 đêm; tặng bữa sáng cho 2 khách; miễn phí nâng hạng phòng |

Nguồn: File B trang 9. **[CHƯA XÁC ĐỊNH]**: cơ chế áp dụng khi đặt phòng (mã khuyến mãi tự động hay thủ công).

## Entity: ExperienceItem (MỚI)

- Tiêu đề, mô tả ngắn, ảnh — có 4 mẫu trong File B (Một buổi sáng chậm / Hương vị Đà Lạt / Những góc Đà Lạt / Ở lại tận hưởng), nhưng nội dung chi tiết bên trong (danh sách quán/địa điểm cụ thể) **[CHƯA XÁC ĐỊNH]**.

## Entity: ContactInfo (theo Property — thay cho `ContactMessage` đề xuất trước đây)

- Vì File B không có form liên hệ, entity thực tế cần là **thông tin liên hệ tĩnh** (hotline, email) theo từng `Property`, không phải bảng lưu tin nhắn khách gửi — trừ khi sau này xác nhận có thêm form.

## Entity: Amenity, Policy — vẫn KHÔNG TẠO entity riêng

**Lý do:** Tiện nghi hiện thể hiện dưới dạng icon + text ngắn ngay trong trang `Property` (không phải danh mục có thể quản lý độc lập); Chính sách chỉ là 1 link footer chưa có nội dung — chưa đủ cấu trúc để tách entity riêng.

---

*Không triển khai code/database dựa trên tài liệu này cho đến khi Mâu thuẫn (M1–M4) và các Open Question liên quan Booking (F5–F7) được trả lời.*
