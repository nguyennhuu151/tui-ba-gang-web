# Design System — Túi Ba Gang Website

**Phase 4 — UI/UX Design System.** CHƯA CODE. Toàn bộ phân tích dưới đây dựa trên việc xem trực tiếp 10/10 trang mockup của File B (`GIAO DIỆN WEB TÚI BA GANG.pdf`) — đây là **nguồn duy nhất có visual reference thật** (File A là concept kiến trúc/nội thất 54 trang, không phải mockup web). `requirements/hotel-requirement.pdf` vẫn không tồn tại (đã kiểm tra lại). Trong Project không có file ảnh reference nào khác ngoài 2 PDF đã dùng xuyên suốt.

**Lưu ý quan trọng về màu sắc:** Các mã màu (hex) trong tài liệu này được **lấy mẫu (sample) trực tiếp từ ảnh mockup**, mang tính ước lượng để làm điểm khởi đầu — **KHÔNG PHẢI bảng màu thương hiệu chính thức** (chưa có brand guideline/logo vector chính thức, xem `open-questions.md`). Cần đơn vị thiết kế xác nhận trước khi đưa vào code cứng.

---

## 1. Brand style (phong cách thương hiệu tổng thể)

Quan sát xuyên suốt cả 10 trang File B: đây là phong cách **"quiet luxury" / "slow living"** — sang trọng nhưng tối giản, ấm áp, nhiều khoảng trắng, ảnh lớn chiếm vai trò chủ đạo (ảnh nhiều hơn chữ), rất ít chi tiết trang trí thừa. Tinh thần này khớp với các tagline đã CONFIRMED: "MORE THAN A STAY", "SAME PLACES, A DIFFERENT YOU".

**Cấu trúc "1 khung chung, 3 sắc thái riêng":** Header/Footer/bố cục section giữ nguyên xuyên suốt 3 cơ sở, nhưng mỗi cơ sở có tông màu và không khí riêng biệt rõ rệt:

| Cơ sở | Không khí thị giác | Bằng chứng |
|---|---|---|
| **Central** | Đô thị, sáng, trung tính — be/kem + nâu đất | File B trang 6 |
| **Ember Style** | Ấm, sang trọng, có phần huyền bí — nâu đỏ rượu vang (burgundy/terracotta) trên nền tối | File B trang 7 |
| **Little Bay** | Thiên nhiên, tĩnh lặng — xanh rêu + nâu gỗ + be tự nhiên | File B trang 8 |

## 2. Color (màu sắc)

### 2.1 Màu nền tảng dùng chung toàn site (Neutral)

| Token | Giá trị lấy mẫu | Dùng cho |
|---|---|---|
| `color-cream-50` | `#FBF8F6` | Nền sáng nhất (nền trang mặc định) |
| `color-cream-100` | `#F5F3EE` | Nền section/card nhạt, nền thanh tìm phòng |
| `color-cream-200` | `#E7E3D8` | Nền phụ, viền nhẹ, nền section "feature row" |
| `color-brown-900` | `#2B1C12` | Footer, nền tối, chữ đậm nhất |
| `color-brown-800` | `#3D2B1F` | Nút CTA mặc định ("ĐẶT PHÒNG", "TÌM PHÒNG") |
| `color-brown-600` | `#6B5B4D` | Text phụ, icon, viền input |
| `color-text-primary` | `#241A12` | Heading/body trên nền sáng |
| `color-text-inverse` | `#FBF8F6` | Chữ trên nền tối (footer, band CTA) |

### 2.2 Màu theo từng cơ sở (Property accent — override khi vào trang riêng của cơ sở)

| Cơ sở | Token | Giá trị lấy mẫu | Ghi chú |
|---|---|---|---|
| Central | `color-central-accent` | `#6B5B4D` | Giữ tông trung tính của bảng màu chung — Central không có accent riêng biệt rõ, thiên về "phiên bản gốc" của brand |
| Ember Style | `color-ember-accent` | `#7A3B22` (đỏ terracotta/rượu vang, lấy mẫu từ cầu thang xoắn) | Dùng cho nút CTA, viền nhấn, background band tối trên trang Ember |
| Ember Style | `color-ember-bg-dark` | `#160D08` | Nền tối đặc trưng của các section "A Higher Standard" |
| Little Bay | `color-littlebay-accent` | `#4B5D45` (xanh rêu, suy từ icon lá cây) | Dùng cho icon/nhấn nhẹ trên trang Little Bay |
| Little Bay | `color-littlebay-bg` | `#DCDAD4` | Nền be-xám tự nhiên đặc trưng |

**Nguyên tắc áp dụng:** Layout/component giữ nguyên cấu trúc giữa 3 cơ sở; chỉ **accent color** và **ảnh** thay đổi theo cơ sở — tránh phải xây 3 bộ component riêng biệt (đúng nguyên tắc "không duplicate code" trong `CLAUDE.md`).

## 3. Typography

Quan sát: mockup dùng **3 nhóm font rõ rệt**, mỗi nhóm 1 vai trò riêng — đây là điểm đặc trưng quan trọng của thương hiệu, không nên gộp chung:

| Nhóm | Đặc điểm quan sát được | Dùng cho | Đề xuất font thay thế (web-safe, cần xác nhận có được cấp font thương hiệu gốc không) |
|---|---|---|---|
| **Heading (serif)** | Chữ serif cổ điển, có chân, cảm giác sang trọng văn chương (vd. "Ba không gian, một tinh thần.", "Central", "Ember Style") | H1, H2, tên cơ sở, tên hạng phòng | Playfair Display (hoặc font serif tương đương) — **[CHƯA XÁC ĐỊNH]** font thật |
| **Accent/Script (viết tay)** | Chữ nghiêng dạng chữ ký/viết tay, chỉ xuất hiện ở các câu tagline cảm xúc ngắn (vd. "A little stay, a deeper connection", "Same place, a different you", "Good Food Good Mood") | Câu tagline phụ, KHÔNG dùng cho nội dung dài | Font script nhẹ nhàng (vd. dạng "Style Script"/"Parisienne") — **[CHƯA XÁC ĐỊNH]** font thật |
| **Body (sans-serif)** | Chữ không chân, đơn giản, dễ đọc | Đoạn mô tả, label, button, menu, thông tin liên hệ | Inter hoặc Work Sans (phổ biến, hỗ trợ tốt tiếng Việt có dấu) — **[CHƯA XÁC ĐỊNH]** font thật |

### 4. Heading — type scale đề xuất

| Cấp | Kích thước desktop (ước lượng) | Kích thước mobile | Ví dụ trong mockup |
|---|---|---|---|
| H1 | ~44–56px | ~28–32px | "Ba không gian, một tinh thần." (Trang chủ) |
| H2 | ~32–40px | ~24–28px | "Central" / "Ember Style" / "A little bay by Túi Ba Gang" (tên cơ sở) |
| H3 | ~22–26px | ~18–20px | "Cozy Rooms", "Rooms & Suites" (tiêu đề section) |

Heading luôn đi kèm 1 **label nhỏ chữ hoa, letter-spacing rộng** phía trên (vd. "OUR STORY", "PHÒNG NGHỈ", "TÚI BA GANG") — đây là 1 pattern lặp lại xuyên suốt mọi trang, nên tách thành component `SectionLabel` riêng (xem `ui-component-spec.md`).

### 5. Body text

- Kích thước cơ bản ước lượng ~16px, dòng cao (line-height) rộng rãi (~1.6–1.7) tạo cảm giác thoáng, khớp tinh thần "chậm rãi" của thương hiệu.
- Đoạn mô tả thường ngắn (2–4 dòng), không có đoạn văn dài — cần lưu ý khi dịch VI↔EN để không phá vỡ bố cục đã thiết kế cho câu ngắn.

## 6. Button

Quan sát nút "ĐẶT PHÒNG →", "TÌM PHÒNG →", "KHÁM PHÁ [CƠ SỞ] →" xuyên suốt mọi trang:

| Thuộc tính | Giá trị quan sát |
|---|---|
| Hình dạng | Chữ nhật, bo góc nhẹ (không phải pill tròn hoàn toàn, không vuông sắc) |
| Nền mặc định | Nâu đậm (`color-brown-800`), chữ màu trắng/kem |
| Icon | Luôn có mũi tên "→" ở cuối, tạo cảm giác "đi tiếp" — pattern nhất quán cho MỌI CTA chính trên site |
| Biến thể theo cơ sở | Ember Style dùng nút nền đỏ rượu vang (`color-ember-accent`) thay vì nâu mặc định ở trang riêng của mình (trang 7) |

### Button variants đề xuất

1. **Primary** — nền đậm (brown-800 hoặc accent theo cơ sở), chữ trắng, có icon `→`. Dùng cho CTA chính: "Đặt phòng", "Tìm phòng".
2. **Secondary/Outline** — viền mảnh, nền trong suốt, dùng trên nền ảnh sáng hoặc tối tuỳ ngữ cảnh (chưa thấy rõ trong mockup, đề xuất kỹ thuật để đảm bảo khả năng đọc — accessibility).
3. **Ghost/Text link** — chỉ chữ + icon `→`, gạch chân khi hover. Dùng cho CTA phụ trong card: "Khám phá →", "Xem tất cả phòng →", "Xem chi tiết →".

## 7. Card

Các loại card quan sát được đều theo cùng 1 khuôn mẫu: **ảnh lớn phía trên (tỷ lệ ngang) → label nhỏ chữ hoa → tiêu đề (serif) → mô tả ngắn (sans-serif) → CTA dạng text link**. Không có border rõ ràng, phân tách bằng khoảng trắng (spacing) và nền màu nhạt khác biệt.

| Loại card | Xuất hiện ở | Nội dung |
|---|---|---|
| `PropertyCard` | Trang chủ, Về chúng tôi, Phòng nghỉ, Thư viện, Trải nghiệm, Liên hệ | Ảnh cơ sở, tên, tagline, CTA |
| `RoomCard` | Danh sách phòng, preview phòng trong trang cơ sở | Ảnh phòng, tên hạng phòng, số khách, diện tích, CTA |
| `OfferCard` | Trang Ưu đãi | Ảnh nền cơ sở, tên ưu đãi, ngày áp dụng, danh sách quyền lợi (icon + text), CTA |
| `ExperienceCard` | Trang Trải nghiệm | Ảnh, số thứ tự (01–04), tiêu đề, mô tả ngắn, CTA — card số 04 ("Ở lại tận hưởng") có kích thước khác biệt (dọc, cao hơn) so với 3 card còn lại |
| `ContactCard` | Trang Liên hệ | Ảnh cơ sở, tên, tagline, hotline (`tel:`), email (`mailto:`), CTA |

## 8. Header

- Bố cục: Logo (trái) → Menu chính 6 mục (giữa) → Nút "ĐẶT PHÒNG →" nổi bật (nền đậm, tách biệt hẳn khỏi menu) → Dropdown ngôn ngữ (phải cùng).
- Tab đang active có gạch chân (underline) — xác nhận rõ trong chú thích File B ("Khi nhấn vào tab sẽ có gạch chân hiển thị").
- **Ở các trang riêng từng cơ sở** (`/thu-vien/:hotel`): Header đổi thành `PropertySubNav` — menu chính biến mất, thay bằng 3 tab tên cơ sở (Central | Ember Style | Little Bay) để chuyển nhanh, giữ nguyên nút "ĐẶT PHÒNG". **Quan sát quan trọng:** ở trang 6 và trang 8, có icon hamburger (`☰`) xuất hiện cạnh nút Đặt phòng — cho thấy tác giả mockup đã tính trước đến menu mobile dù chưa có mockup mobile đầy đủ (xem `responsive-spec.md`).

## 9. Footer

- Nền nâu đậm gần đen (`color-brown-900`), chữ trắng/kem.
- Nội dung: logo + tagline ("SAME PLACES, A DIFFERENT YOU" / "MORE THAN A STAY"), liên kết Chính sách/FAQ/Liên hệ (chỉ ở 1 số trang, ví dụ trang Trải nghiệm), social icons (Instagram/Facebook, riêng trang Trải nghiệm có thêm YouTube), địa điểm "ĐÀ LẠT, VIỆT NAM".
- Ở trang chủ, footer còn tích hợp `StickyContactWidget` (Zalo + gọi điện) — 2 icon tròn nổi bật góc phải.

## 10. Form

- **Chưa có mockup form nhập liệu dạng cổ điển** (input text, textarea) ở bất kỳ trang nào trong File B — kể cả trang Liên hệ (chỉ có card thông tin, không có form gửi tin nhắn).
- Thành phần dạng "form" duy nhất quan sát được là **các trường trong `BookingSearchBar`**: dropdown "Địa điểm", 2 ô chọn ngày "Nhận phòng"/"Trả phòng", ô chọn "Số khách" (dạng dropdown, có sẵn giá trị mặc định "2 Người lớn, 0 Trẻ em"). Toàn bộ đặt trên 1 thanh ngang bo góc nhẹ, nền sáng, nổi trên ảnh hero.

## 11. Booking component

`BookingSearchBar` là component quan trọng nhất về mặt tương tác, xuất hiện nổi bật ngay dưới Hero của trang chủ:

- Bố cục ngang, 4 trường input + 1 nút CTA "TÌM PHÒNG →" (nền đậm, tách biệt) ở cuối.
- Nền thanh: sáng (cream), nổi bật trên ảnh hero tối — tạo điểm nhấn thị giác rõ ràng để khách nhận ra ngay đây là hành động chính của trang.
- Các phần **sau khi bấm "Tìm phòng"** (kết quả availability, bước đặt phòng chi tiết) **không có mockup** — khớp với `user-flows.md` Flow D, vẫn [CHƯA XÁC ĐỊNH].

## 12. Image

- Ảnh chiếm vai trò chủ đạo — tỷ lệ ảnh/chữ trên mỗi trang nghiêng hẳn về ảnh.
- Phong cách ảnh: kiến trúc + nội thất, tông màu ấm, nhiều ảnh có hiệu ứng sương mù (fog) đặc trưng Đà Lạt, ánh sáng vàng ấm buổi tối (đặc biệt Ember Style, Little Bay).
- **Lưu ý (đã ghi từ Phase 1):** đây nhiều khả năng là ảnh minh hoạ/render (không phải ảnh thật của khách sạn) — cần xác nhận trước khi dùng chính thức.
- Tỷ lệ khung ảnh chủ đạo: ngang (landscape) cho hero và card cơ sở; ảnh vuông/gần vuông cho card phòng.

## 13. Spacing

- Khoảng cách giữa các section rất rộng rãi — đúng tinh thần "chậm lại" của thương hiệu, tránh cảm giác chật chội.
- Đề xuất thang đo (spacing scale, đơn vị px, theo bội số 4/8 chuẩn của Tailwind): `4, 8, 12, 16, 24, 32, 48, 64, 96, 128`.
- Section padding dọc đề xuất: **96–128px** (desktop) / **48–64px** (mobile).

## 14. Responsive

Xem chi tiết đầy đủ ở `responsive-spec.md`. Tóm tắt: File B chỉ có mockup desktop, nhưng đã có gợi ý mobile menu (hamburger icon ở trang 6, 8) — responsive là phần **ĐỀ XUẤT kỹ thuật của đội thiết kế/dev**, cần xác nhận lại.

## 15. Animation

- **Không có bằng chứng animation cụ thể** trong mockup (là ảnh tĩnh). Việc dùng Framer Motion đã được đề xuất ở Phase 3 (`architecture.md` mục 2.4) theo nguyên tắc "chỉ dùng khi cần" — giữ tinh thần nhẹ nhàng, chậm rãi, không giật, khớp với brand style đã phân tích ở mục 1.

---

## Bảng tổng hợp Design Tokens

| Nhóm token | Giá trị |
|---|---|
| **Color** | Xem mục 2 |
| **Typography** | Heading: serif — Accent: script — Body: sans-serif (xem mục 3) |
| **Spacing scale** | 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96 / 128 (px) |
| **Breakpoints** | `sm` 375px, `md` 768px, `lg` 1024px, `xl` 1280px, `2xl` 1536px (chuẩn Tailwind — mockup gốc chỉ có desktop ≥1280px, xem `responsive-spec.md`) |
| **Button variants** | Primary (nền đậm), Secondary/Outline, Ghost/Text link (mục 6) |
| **Input variants** | Select (địa điểm/ngôn ngữ/số khách), Date field (nhận/trả phòng) — chưa có input text/textarea trong mockup (mục 10) |
| **Card variants** | PropertyCard, RoomCard, OfferCard, ExperienceCard, ContactCard (mục 7) |
| **Container width** | Nội dung chính max-width ~1280px, căn giữa; ảnh hero full-bleed (100vw) |
| **Section patterns** | Hero full-bleed; Text + Image 50/50; Grid 3 cột (card cơ sở/phòng/ưu đãi); Icon + text feature row (tiện nghi); Band CTA nền đậm full-width; Footer |

---

*Chi tiết từng component (props/variants khái niệm): xem `ui-component-spec.md`. Chi tiết hành vi responsive: xem `responsive-spec.md`.*
