# User Flows — Túi Ba Gang Website

**CẬP NHẬT (lần 2)** sau khi có File B. Format chuẩn không đổi: **Người dùng → Website/Zalo → Frontend → Backend → External API → Response → Người dùng**

---

## Flow A: Xem thông tin khách sạn (CONFIRMED — cập nhật theo cấu trúc 3 cơ sở)

1. **Người dùng:** Muốn tìm hiểu về thương hiệu và 3 cơ sở.
2. **Website:** `/`, `/ve-chung-toi`, hoặc `/thu-vien/:hotel` (trang riêng từng cơ sở).
3. **Frontend:** Render nội dung tĩnh — không gọi API.
4. **Backend / External API:** Không áp dụng.
5. **Response:** Hiển thị đầy đủ câu chuyện thương hiệu + từng cơ sở.
6. **Người dùng:** Điều hướng tiếp sang `/phong-nghi` hoặc `/dat-phong`.

---

## Flow B: Xem phòng (CONFIRMED cấu trúc — nội dung tên phòng còn mâu thuẫn)

1. **Người dùng:** Muốn xem hạng phòng của 1 cơ sở cụ thể.
2. **Website:** `/phong-nghi` → chọn cơ sở → `/phong-nghi/:hotel` → `/phong-nghi/:hotel/:room-slug`.
3. **Frontend:** Render danh sách `RoomType` theo `Property`. **Lưu ý:** tên hạng phòng hiển thị phụ thuộc việc chốt mâu thuẫn M1–M3 (`open-questions.md`).
4. **Backend:** **[CHƯA XÁC ĐỊNH]** — cần nếu danh sách/giá lấy động từ ezCloud thay vì nội dung tĩnh.
5. **External API:** **[CHƯA XÁC NHẬN API]** — ezCloud (nếu có).
6. **Response:** Danh sách/chi tiết phòng.
7. **Người dùng:** Bấm CTA "Đặt phòng" → Flow D.

---

## Flow C: Tìm phòng (CONFIRMED có ezCloud — chi tiết kỹ thuật vẫn mở)

1. **Người dùng:** Chọn cơ sở (hoặc "Tất cả khách sạn"), ngày nhận/trả, số khách trên thanh tìm phòng ở Trang chủ hoặc `/dat-phong`.
2. **Website:** `/` hoặc `/dat-phong`.
3. **Frontend:** Gửi tiêu chí tìm kiếm.
4. **Backend:** **[CHƯA XÁC ĐỊNH]** — có cần backend trung gian giữa frontend và ezCloud không, hay gọi thẳng.
5. **External API:** **ezCloud — CONFIRMED là nguồn availability** (File B trang 1). **[CHƯA XÁC NHẬN API]** chi tiết endpoint/tham số/auth.
6. **Response:** Danh sách phòng còn trống kèm giá (giá vẫn [CHƯA XÁC ĐỊNH] có hiển thị được từ ezCloud hay không).
7. **Người dùng:** Chọn phòng để sang Flow D.

---

## Flow D: Đặt phòng (CONFIRMED cần có, nhưng bước cuối [CHƯA XÁC ĐỊNH])

> File B không có mockup cho bước sau khi bấm "Đặt phòng" (không có form thông tin khách, không có màn thanh toán) → vẫn giữ 2 kịch bản, nhưng nay có thêm 1 khả năng thứ 3 do đã xác nhận ezCloud.

**Khả năng 1 — Redirect sang ezCloud (phổ biến với các khách sạn dùng PMS có booking engine riêng):**
1. **Người dùng:** Chọn phòng, bấm "Đặt phòng".
2. **Website:** `/dat-phong`.
3. **Frontend:** Chuyển hướng (redirect) sang trang đặt phòng do ezCloud host.
4. **Backend:** Không cần backend riêng cho bước này.
5. **External API:** ezCloud xử lý toàn bộ (giữ phòng, thông tin khách, thanh toán).
6. **Response:** Khách hoàn tất đặt phòng trên giao diện của ezCloud, có thể quay lại `tuibagangdalat.vn` sau khi xong.
7. **Người dùng:** Nhận email xác nhận (từ ezCloud).

**Khả năng 2 — Nhúng widget ezCloud ngay trên website (giữ khách ở lại site):**
Tương tự Khả năng 1 nhưng giao diện đặt phòng/thanh toán hiển thị nhúng (iframe/widget) ngay trên `tuibagangdalat.vn`, không rời trang.

**Khả năng 3 — Form yêu cầu thủ công (đơn giản nhất, phù hợp nếu ezCloud chưa sẵn sàng tích hợp ngay từ đầu):**
Giữ nguyên như bản Phase 2 lần đầu — form thu thập thông tin, gửi email cho lễ tân xử lý tay.

**Quyết định giữa 3 khả năng phụ thuộc hoàn toàn vào việc làm rõ với ezCloud (Open Question F5, F6) — đây vẫn là quyết định kỹ thuật quan trọng nhất cần chốt trước khi code `/dat-phong`.**

---

## Flow E: Hủy/thay đổi booking ([CHƯA XÁC ĐỊNH] — không có thay đổi so với Phase 2 lần đầu)

File B không có mockup nào cho luồng này. Giữ nguyên toàn bộ nội dung khuyến nghị từ bản trước — nếu dùng ezCloud, nhiều khả năng ezCloud có sẵn cơ chế hủy/đổi riêng (qua email xác nhận có link quản lý booking), nhưng **[CHƯA XÁC NHẬN API]**.

---

## Flow F: Liên hệ khách sạn (NAY CONFIRMED — cập nhật quan trọng)

> Khác với Phase 2 lần đầu (lúc đó `/lien-he` còn là ĐỀ XUẤT): trang này nay CONFIRMED, nhưng mockup **không có form liên hệ** — chỉ có card thông tin liên hệ (hotline/email) từng cơ sở.

1. **Người dùng:** Muốn liên hệ 1 cơ sở cụ thể.
2. **Website:** `/lien-he`.
3. **Frontend:** Hiển thị card liên hệ; bấm CTA có thể mở `tel:` hoặc `mailto:` trực tiếp — **[CHƯA XÁC ĐỊNH]** có cần thêm form gửi tin nhắn hay không (File B không thể hiện).
4. **Backend / External API:** Không cần nếu chỉ là `tel:`/`mailto:`. **[CHƯA XÁC NHẬN API]** nếu sau này có form.
5. **Response:** Mở ứng dụng gọi điện/email của khách.
6. **Người dùng:** Liên hệ trực tiếp cơ sở đã chọn.

---

## Flow G: Zalo (NAY ĐƯỢC TẠO — trước đây "không tạo", nay có căn cứ tối thiểu)

> Trước đây (Phase 2 lần đầu) không tạo flow này vì chưa có căn cứ. File B (trang 1) xác nhận có nút Zalo nổi ở trang chủ — nên tạo flow, nhưng ở mức đơn giản nhất có căn cứ (click-to-chat), không giả định thêm Zalo OA API tự động.

1. **Người dùng:** Bấm icon Zalo nổi ở góc trang chủ.
2. **Website:** Widget nổi (floating), xuất hiện trên `/` (và có thể toàn site — **[CHƯA XÁC ĐỊNH]** phạm vi xuất hiện).
3. **Frontend:** Mở liên kết Zalo (`https://zalo.me/...`) trong tab mới — **không cần gọi API**, đây là hành vi client-side đơn thuần.
4. **Backend:** Không áp dụng.
5. **External API:** Không áp dụng (chỉ là deep-link, không phải API tích hợp).
6. **Response:** Mở ứng dụng/web Zalo, khách chat trực tiếp với nhân viên tư vấn.
7. **Người dùng:** Nhận tư vấn qua Zalo.

**Lưu ý quan trọng:** Nếu sau này chủ đầu tư muốn nâng cấp lên Zalo OA API (tự động gửi thông báo booking qua Zalo), đó là 1 flow khác phức tạp hơn nhiều, cần bổ sung riêng và xác nhận rõ (xem Assumption A10).

---

## Flow H: Chatbot — VẪN KHÔNG TẠO FLOW

**Lý do:** File B (10 trang, đọc toàn bộ) không có bất kỳ mockup hay chú thích nào về chatbot. Không có căn cứ để tạo flow này.
