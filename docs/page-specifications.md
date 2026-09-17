# Page Specifications — Túi Ba Gang Website

**CẬP NHẬT (lần 2) — VIẾT LẠI HOÀN TOÀN** theo Sitemap mới (`sitemap.md`). Mọi "API dependency" đánh dấu **[CHƯA XÁC NHẬN API]** vì chưa có tài liệu API ezCloud chính thức.

---

## 1. Trang chủ — `/` (CONFIRMED — File B trang 1)

- **Mục đích:** Giới thiệu thương hiệu "3 không gian, 1 tinh thần", điều hướng nhanh tới từng cơ sở, cho phép tìm phòng ngay.
- **Sections:**
  1. Hero: tag "Đà Lạt, Việt Nam", headline "Ba không gian, một tinh thần.", CTA "KHÁM PHÁ NGAY" → `/phong-nghi`
  2. Bộ chọn nhanh 3 cơ sở (01 Central, 02 Ember Style, 03 Little Bay) → `/thu-vien/:hotel`
  3. **Thanh tìm phòng** (Địa điểm/Nhận phòng/Trả phòng/Số khách) → CTA "TÌM PHÒNG" — liên kết ezCloud
  4. Giới thiệu ngắn thương hiệu + CTA "Câu chuyện của chúng tôi" → `/ve-chung-toi`
  5. 3 card cơ sở (Central/Ember Style/Little Bay) → `/phong-nghi/:hotel`
  6. Banner tagline "SAME PLACES, A DIFFERENT YOU"
  7. Footer: logo, Zalo + gọi điện (floating), địa điểm
- **CTA chính:** "TÌM PHÒNG" (thanh tìm phòng) và "ĐẶT PHÒNG" (nút header).
- **Data cần sử dụng:** Nội dung tĩnh + kết quả tìm phòng động từ ezCloud.
- **API dependency:** **[CHƯA XÁC NHẬN API]** — ezCloud search.
- **Navigation:** Là trang gốc, dẫn tới toàn bộ menu chính.

---

## 2. Về chúng tôi — `/ve-chung-toi` (CONFIRMED — File B trang 2)

- **Mục đích:** Kể câu chuyện thương hiệu, giải thích tên gọi "Túi Ba Gang", giới thiệu 3 cơ sở.
- **Sections:** Câu chuyện thương hiệu ("Một chiếc túi, một hành trình..."), "Three places, one spirit" + 3 card cơ sở.
- **Nội dung:** Đã có sẵn đầy đủ text tiếng Việt trong File B (xem trích dẫn trong `requirements-analysis.md`).
- **CTA chính:** Điều hướng tới từng cơ sở qua card.
- **Data cần sử dụng:** Nội dung tĩnh.
- **API dependency:** Không có.
- **Navigation:** Trong menu chính.

---

## 3. Phòng nghỉ — `/phong-nghi` (CONFIRMED — File B trang 3)

- **Mục đích:** Cho khách chọn 1 trong 3 cơ sở để xem hạng phòng.
- **Sections:** 3 card cơ sở, mỗi card có CTA "XEM PHÒNG" → `/phong-nghi/:hotel`.
- **Data cần sử dụng:** Danh sách 3 `Property`.
- **API dependency:** Không có ở trang chọn cơ sở.

### 3a. Danh sách hạng phòng theo cơ sở — `/phong-nghi/:hotel` (CONFIRMED cấu trúc; tên hạng phòng **MÂU THUẪN**, xem `open-questions.md` M1–M3)

- **Sections:** Filter chip theo loại phòng ("Tất cả" + từng hạng), lưới `RoomCard` (ảnh, tên, số khách tối đa, diện tích, CTA "Xem chi tiết").
- **Nội dung:** **[CHƯA XÁC ĐỊNH — do mâu thuẫn]** tên hạng phòng chính thức cho cả 3 cơ sở. Giá **[CHƯA XÁC ĐỊNH]**.
- **CTA chính:** "Xem chi tiết" → `/phong-nghi/:hotel/:room-slug`.
- **Data cần sử dụng:** `RoomType[]` theo `Property`.
- **API dependency:** **[CHƯA XÁC NHẬN API]** — nếu danh sách/giá lấy động từ ezCloud.

### 3b. Chi tiết hạng phòng — `/phong-nghi/:hotel/:room-slug` (CONFIRMED cần có trang)

- **Sections:** Gallery ảnh phòng, thông tin số khách/diện tích, tiện nghi **[CHƯA XÁC ĐỊNH]**, giá **[CHƯA XÁC ĐỊNH]**, CTA đặt phòng.
- **Data cần sử dụng:** 1 `RoomType`.
- **API dependency:** **[CHƯA XÁC NHẬN API]**.
- **Navigation:** Breadcrumb quay về `/phong-nghi/:hotel`.

---

## 4. Trải nghiệm — `/trai-nghiem` (CONFIRMED khung; nội dung thật [CHƯA XÁC ĐỊNH] — File B trang 4)

- **Mục đích:** Giới thiệu trải nghiệm Đà Lạt theo phong cách Túi Ba Gang (không phải nội dung riêng của 1 cơ sở).
- **Sections:** Hero + nút xem video "Một ngày ở Túi Ba Gang" **[CHƯA XÁC ĐỊNH — chưa có file video]**; 4 card trải nghiệm (Một buổi sáng chậm / Hương vị Đà Lạt / Những góc Đà Lạt / Ở lại tận hưởng); khối "Khám phá Đà Lạt" dẫn tới nội dung liệt kê địa điểm cụ thể **[CHƯA XÁC ĐỊNH nội dung]**; khối 3 card cơ sở → `/phong-nghi`.
- **CTA chính:** "KHÁM PHÁ" (từng card), "XEM VIDEO".
- **Data cần sử dụng:** **[CHƯA XÁC ĐỊNH]** — danh sách địa điểm ăn uống/tham quan cụ thể chưa có (Open Question F2).
- **API dependency:** Không có (nội dung biên tập tĩnh, trừ khi có yêu cầu khác).
- **Navigation:** Trong menu chính; card cuối dẫn sang `/thu-vien`, card cơ sở dẫn sang `/phong-nghi`.

---

## 5. Thư viện — `/thu-vien` (CONFIRMED — File B trang 5)

- **Mục đích:** Điểm vào để xem "mini-website" đầy đủ của từng cơ sở.
- **Sections:** Headline + 3 card cơ sở, CTA "XEM THƯ VIỆN [Central/Ember Style/Little Bay]".
- **Data cần sử dụng:** Danh sách 3 `Property`.
- **API dependency:** Không có.

### 5a. Trang riêng từng cơ sở — `/thu-vien/central`, `/thu-vien/ember-style`, `/thu-vien/little-bay` (CONFIRMED — File B trang 6, 7, 8)

Đây là trang **phong phú nhất** trong toàn site — gần như 1 landing page hoàn chỉnh cho mỗi cơ sở, có thanh điều hướng phụ riêng (tab chuyển đổi giữa 3 cơ sở + nút Đặt phòng), không dùng menu chính.

- **Sections chung cho cả 3 trang (chi tiết nội dung khác nhau theo từng cơ sở — xem `requirements-analysis.md`):**
  1. Hero: tên cơ sở, tagline, CTA "Khám phá [Tên cơ sở]"
  2. "Our Story" — câu chuyện riêng của cơ sở + ảnh minh hoạ
  3. Khối tiện nghi/đặc quyền (3–5 icon, tuỳ cơ sở)
  4. Khối phòng nghỉ — preview 3–4 phòng tiêu biểu (KHÔNG PHẢI danh sách đầy đủ) + CTA "Xem tất cả phòng" → `/phong-nghi/:hotel`
  5. Khối ẩm thực/trải nghiệm đặc trưng riêng (vd. "Breakfast Time" ở Central) — **[CHƯA XÁC ĐỊNH]** đây có phải là dịch vụ đặt riêng (đặt bàn) hay chỉ giới thiệu
  6. Banner CTA "Đặt phòng ngay"
- **CTA chính:** "Đặt phòng ngay" → `/dat-phong` (kèm cơ sở đã chọn).
- **Data cần sử dụng:** 1 `Property` đầy đủ thông tin (story, tiện nghi, preview phòng, ẩm thực).
- **API dependency:** Không có cho nội dung tĩnh; **[CHƯA XÁC NHẬN API]** nếu phần "preview phòng" lấy động.
- **Navigation:** Thanh tab riêng (Central | Ember Style | Little Bay) để chuyển nhanh giữa 3 trang này.

---

## 6. Ưu đãi — `/uu-dai` (CONFIRMED — File B trang 9, có dữ liệu thật)

- **Mục đích:** Hiển thị chương trình khuyến mãi hiện có.
- **Sections:** Filter tab ("Tất cả ưu đãi" + từng cơ sở), số lượng ưu đãi hiện có, lưới `OfferCard` (tên ưu đãi, mô tả, ngày áp dụng, danh sách quyền lợi, CTA "Khám phá ưu đãi").
- **Nội dung:** 3 ưu đãi có dữ liệu thật (xem `functional-requirements.md`).
- **CTA chính:** "Khám phá ưu đãi" → chi tiết ưu đãi **[CHƯA XÁC ĐỊNH]** (trang riêng hay modal).
- **Data cần sử dụng:** `Offer[]`.
- **API dependency:** **[CHƯA XÁC ĐỊNH]** — có đồng bộ với ezCloud không hay quản lý riêng trên website (Open Question F7).
- **Navigation:** Trong menu chính; menu có badge chấm đỏ khi có ưu đãi (theo File B).

---

## 7. Liên hệ — `/lien-he` (CONFIRMED — File B trang 10, có dữ liệu thật)

- **Mục đích:** Cung cấp thông tin liên hệ riêng từng cơ sở.
- **Sections:** Headline, 3 `ContactCard` (ảnh cơ sở, tên, tagline, hotline, email, CTA "Liên hệ [Tên cơ sở]").
- **Nội dung:** Hotline + email thật cho cả 3 cơ sở (lưu ý M4 — số Ember Style trùng Central, cần xác nhận).
- **CTA chính:** "Liên hệ [Tên cơ sở]" — **[CHƯA XÁC ĐỊNH]** hành vi cụ thể (mở form, hay bấm gọi/mail trực tiếp qua `tel:`/`mailto:`).
- **Data cần sử dụng:** `ContactInfo[]` theo `Property`.
- **API dependency:** Không có nếu chỉ là `tel:`/`mailto:` link; **[CHƯA XÁC NHẬN API]** nếu có form gửi liên hệ (không thấy form trong mockup — chỉ thấy card thông tin).
- **Navigation:** Trong menu chính.

> **Lưu ý:** Không có bản đồ (Google Maps) trong mockup trang này — khác với đề xuất Phase 2 lần đầu.

---

## 8. Đặt phòng — `/dat-phong` (CONFIRMED cần có trang; NỘI DUNG CHI TIẾT vẫn phần lớn [CHƯA XÁC ĐỊNH])

- **Mục đích:** Cho khách tìm và đặt phòng, tích hợp ezCloud.
- **Sections:** Thanh tìm phòng (giống trang chủ) → kết quả phòng trống (nguồn ezCloud) → **[CHƯA XÁC ĐỊNH]** các bước tiếp theo (thông tin khách, thanh toán) vì không có mockup cho phần này trong File B.
- **CTA chính:** "Tìm phòng" → "Đặt phòng"/"Xác nhận".
- **Data cần sử dụng:** `RoomType`, kết quả availability từ ezCloud, `Booking`, `Guest` (khái niệm).
- **API dependency:** **[CHƯA XÁC NHẬN API]** — toàn bộ luồng ezCloud.
- **Navigation:** CTA nổi bật mọi trang.

---

## Footer pages (CONFIRMED xuất hiện, nội dung [CHƯA XÁC ĐỊNH])

- `/chinh-sach` — Chính sách chung. Nội dung **[CHƯA XÁC ĐỊNH]**.
- `/cau-hoi-thuong-gap` — FAQ. Nội dung **[CHƯA XÁC ĐỊNH]**.
