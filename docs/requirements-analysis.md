# Requirements Analysis — Túi Ba Gang Website

**CẬP NHẬT (lần 2):** Bổ sung nguồn mới `GIAO DIỆN WEB TÚI BA GANG.pdf` (10 trang — wireframe/UI có chú thích nghiệp vụ). Thay đổi **mang tính cấu trúc** so với bản Phase 1 đầu tiên.

**Quy ước gọi tên nguồn trong toàn bộ tài liệu Phase 1–2 (đã cập nhật ở mọi file khác):**
- **File A** = `TUI BA GANG CONCEPT. CẬP NHẬT.pdf` (54 trang — concept kiến trúc/nội thất, không dấu vì là tên file)
- **File B** = `GIAO DIỆN WEB TÚI BA GANG.pdf` (10 trang — wireframe giao diện web, có chú thích nghiệp vụ) — **đây chính là loại tài liệu "business requirement cho website" mà Phase 1 lần đầu còn thiếu.**

> ⚠️ Vẫn giữ nguyên tắc: nội dung nào không có trong File A hoặc File B đều đánh dấu **[CHƯA XÁC ĐỊNH]**. Đồng thời tài liệu này bổ sung mục mới: **Mâu thuẫn nội bộ (Inconsistency)** — những chỗ File A/File B tự mâu thuẫn với nhau hoặc mâu thuẫn ngay trong chính nó.

---

## 1. Tổng quan dự án (CẬP NHẬT)

| Câu hỏi | Trả lời | Nguồn |
|---|---|---|
| Website dùng để làm gì? | Website thương hiệu **"Túi Ba Gang"** — không phải 1 khách sạn đơn lẻ, mà là **1 thương hiệu quản lý 3 cơ sở lưu trú riêng biệt tại Đà Lạt**: Central, Ember Style, Little Bay. Website giới thiệu thương hiệu, giới thiệu từng cơ sở, và cho đặt phòng. | File B, trang 1–2 |
| Mục tiêu business | Định vị thương hiệu "nghỉ dưỡng tinh tế, chậm rãi" (tagline "MORE THAN A STAY", "SAME PLACES, A DIFFERENT YOU") — vẫn **[CHƯA XÁC ĐỊNH]** về KPI/doanh thu cụ thể. | File B, trang 1–2 (định vị thương hiệu); KPI vẫn chưa có |
| Đối tượng sử dụng | **[CHƯA XÁC ĐỊNH]** — không có mô tả phân khúc khách hàng rõ ràng, dù định vị "trải nghiệm tinh tế, riêng tư" gợi ý phân khúc trung-cao cấp | Suy luận từ giọng văn File B |
| Tên thương hiệu chính thức | **Túi Ba Gang** (có dấu — đây là chính tả thương hiệu, khác với tên file "TUI BA GANG" không dấu chỉ do quy ước đặt tên file) | File B, mọi trang |
| Địa điểm | **Đà Lạt, Việt Nam — nay là CONFIRMED**, không còn là suy đoán | File B, trang 1 (tag "ĐÀ LẠT, VIỆT NAM"), trang 4, 7, 10 |
| Domain gợi ý | `tuibagangdalat.vn` (suy từ email liên hệ, xem mục Content/Assets) | File B, trang 10 (suy luận từ email) |

### Cấu trúc thương hiệu (thay đổi lớn nhất so với Phase 1 lần đầu)

| Cơ sở | Định vị / Tagline | Đặc điểm | Nguồn |
|---|---|---|---|
| **Túi Ba Gang Central** | "Sôi động giữa lòng phố" / "A city stay with a softer rhythm" | Trong trung tâm thành phố, tiện di chuyển | File B, trang 1, 6 |
| **Túi Ba Gang Ember Style** | "Ấm áp. Tinh tế. Năng lượng." / "A warmer stay, a deeper you" | Cảm hứng "dải lụa đỏ" — **kiến trúc vòm cong + cầu thang xoắn màu cam/đỏ trùng khớp với File A** (xem Mâu thuẫn/Liên kết bên dưới) | File B, trang 1, 7 |
| **Túi Ba Gang Little Bay** | "A little bay by Túi Ba Gang" / "Nature · People · A slower way" | Villa giữa rừng, gần hồ, thiên nhiên biệt lập | File B, trang 1, 8 |

### Liên kết File A ↔ File B — cần xác nhận, KHÔNG tự kết luận

File A (concept kiến trúc, Room 202/405, cầu thang xoắn cam) có phong cách kiến trúc **rất giống mô tả "Ember Style"** trong File B (trang 7: "hình ảnh dải cầu thang đỏ là biểu tượng..."). Tuy nhiên:
- File A dùng mã phòng vận hành (202, 405 — theo tầng)
- File B dùng tên hạng phòng thương mại cho Ember (Ember Cozy/Premier/Signature/Trio)
- **Chưa có tài liệu nào nối 2 hệ thống này lại với nhau** → xem Open Question mới.

---

## 2. Danh sách page/screen (CẬP NHẬT — nay có căn cứ rõ ràng từ File B)

Xem chi tiết đầy đủ trong `sitemap.md` (đã viết lại hoàn toàn) và `page-specifications.md`. Tóm tắt: menu chính thức gồm **Về chúng tôi, Phòng nghỉ, Trải nghiệm, Thư viện, Ưu đãi, Liên hệ**, cộng CTA "Đặt phòng" tách riêng — toàn bộ đều CONFIRMED từ File B trang 1.

---

## 7. Content / Assets (CẬP NHẬT)

### Đã CONFIRMED từ File B (khác hẳn Phase 1 lần đầu — trước đây toàn bộ mục này là [CHƯA XÁC ĐỊNH]):

- **Thông tin liên hệ thật** cho từng cơ sở (File B, trang 10):
  - Central: Hotline 0263 383 7837, email `central@tuibagangdalat.vn`
  - Ember Style: Hotline 0263 383 7837 *(giống hệt số của Central — xem mục Mâu thuẫn, cần xác nhận đây có phải lỗi copy-paste trong wireframe không)*, email `emberstyle@tuibagangdalat.vn`
  - Little Bay: Hotline 0263 361 9977, email `littlebay@tuibagangdalat.vn`
- **Nội dung thương hiệu đầy đủ**: câu chuyện tên gọi "Túi Ba Gang" (File B, trang 2), câu chuyện riêng từng cơ sở (trang 6, 7, 8)
- **Chương trình ưu đãi thật**, có ngày áp dụng cụ thể (File B, trang 9) — xem `functional-requirements.md`
- **Danh sách tên hạng phòng** theo từng cơ sở (nhưng có mâu thuẫn nội bộ — xem bên dưới)
- **Tagline/slogan đầy đủ** cho thương hiệu và từng cơ sở

### Vẫn [CHƯA XÁC ĐỊNH]:

- Logo dạng file gốc (chỉ thấy trong mockup, chưa có file vector/PNG chính thức)
- Bảng giá phòng cụ thể (File B chỉ có tên phòng + diện tích + số khách, không có giá)
- Địa chỉ cụ thể (số nhà, đường) của từng cơ sở — chỉ có "ĐÀ LẠT, VIỆT NAM" chung chung
- Nội dung "Trải nghiệm" chi tiết (danh sách quán ăn/cà phê/điểm tham quan cụ thể) — File B chỉ có khung giao diện, chưa có nội dung thật
- Nội dung video "Một ngày ở Túi Ba Gang" (File B trang 4 chỉ có nút Xem video, chưa có file video)
- Chính sách (Chính sách, Câu hỏi thường gặp — có link ở footer nhưng chưa có nội dung)

---

## Mâu thuẫn nội bộ cần xác nhận trước khi code (MỤC MỚI — quan trọng)

**1. Tên hạng phòng của Ember Style xuất hiện 2 phiên bản khác nhau trong cùng 1 file:**
- Trang 3 & 5 (mockup rút gọn "Phòng nghỉ"/"Thư viện"): Deluxe Room, Premier Room, Family Room, Suite Room
- Trang 3 & 5 (bảng danh sách bằng chữ) và Trang 7 (trang chi tiết Ember Style): Ember Cozy, Ember Premier, Ember Signature, Ember Trio

**2. Tên hạng phòng của Little Bay xuất hiện 3 phiên bản khác nhau:**
- Bảng danh sách chữ (trang 3, 5): Sunrise Garden/Retreat/Nest, Sunset Signature Garden/Garden/Retreat/Penthouse, Midnight Friend/Retreat (9 tên)
- Mockup rút gọn (trang 3, 5): Bay View Room, Lake View Room, Suite Room (3 tên)
- Trang chi tiết Little Bay (trang 8): Sunrise Bay ("Bình Minh"), Sunset Bay ("Hoàng Hôn"), Midnight Bay ("Ánh Trăng") (3 tên khác nữa)

**3. Tên hạng phòng của Central cũng có 3 phiên bản:**
- Bảng danh sách chữ (trang 3, 5): Superior, Deluxe, Premier, Premier Plus, Deluxe Trip, Deluxe Family, Premier Family (7 tên)
- Mockup rút gọn (trang 3): Superior Room, Deluxe Window, Deluxe Plus, Premier Plus, Premier Family (5 tên, có tên không khớp)
- Trang chi tiết Central (trang 6): Superior, Deluxe, Executive (3 tên, "Executive" không xuất hiện ở đâu khác)

**4. Số hotline của Ember Style trùng với Central** (0263 383 7837) — nhiều khả năng là lỗi copy-paste khi làm wireframe, cần xác nhận số đúng.

**Khuyến nghị của BA:** Đây là file wireframe/mockup ở giai đoạn thiết kế, nên các mâu thuẫn về tên rất có thể do nội dung minh hoạ (placeholder) chưa được rà soát đồng bộ — **không tự ý chọn 1 phương án nào để code**, cần gửi lại toàn bộ danh sách mâu thuẫn này cho chủ đầu tư/đơn vị thiết kế xác nhận bộ tên hạng phòng chính thức cuối cùng.

---

## 10. Risk (CẬP NHẬT)

1. **Mâu thuẫn tên hạng phòng (mục trên)** — rủi ro cao nếu code cứng (hard-code) một bộ tên rồi phải đổi lại toàn bộ sau này.
2. **Quy mô dự án lớn hơn nhiều so với ước tính ban đầu**: đây là 3 "website con" (mỗi cơ sở có trang riêng đầy đủ: hero, story, tiện nghi, phòng, ẩm thực) trong 1 website lớn, không phải 1 khách sạn đơn giản như Phase 0 đã lên kế hoạch ban đầu — cần cập nhật lại ước lượng effort/timeline (xem `ke-hoach-xay-dung-website.md` đã cập nhật).
3. **Tích hợp ezCloud** (xem `integrations.md`) — chưa có tài liệu API chính thức từ ezCloud, rủi ro về effort tích hợp booking thật.
4. Rủi ro cũ vẫn còn: ảnh dùng hiện tại là render/mockup minh hoạ, giá phòng/chính sách/nội dung Trải nghiệm vẫn thiếu.

---

*Xem thêm: `functional-requirements.md`, `non-functional-requirements.md`, `integrations.md`, `open-questions.md`, `assumptions.md`.*
