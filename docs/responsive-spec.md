# Responsive Specification — Túi Ba Gang Website

**Phase 4.** CHƯA CODE. `non-functional-requirements.md` đã ghi rõ: File B **chỉ có mockup desktop**, Responsive là **[CHƯA XÁC ĐỊNH]** chính thức. Tài liệu này là **ĐỀ XUẤT kỹ thuật** dựa trên (a) bố cục desktop đã có, (b) 1 bằng chứng gián tiếp tìm thấy trong mockup (mục 1 dưới đây) — cần đơn vị thiết kế xác nhận lại trước khi hoàn thiện chi tiết.

## 1. Bằng chứng cho thấy mobile đã được tính đến (dù chưa có mockup)

Khi xem trực tiếp File B, phát hiện: ở **trang 6 (Central detail)** và **trang 8 (Little Bay detail)**, thanh `PropertySubNav` có icon hamburger (`☰`) đặt cạnh nút "ĐẶT PHÒNG →". Đây là dấu hiệu tác giả wireframe **đã dự tính có menu dạng thu gọn (mobile/tablet)** cho các trang này, dù không có mockup riêng cho màn hình nhỏ. Đây là căn cứ hợp lý để đề xuất chi tiết responsive bên dưới, thay vì đoán hoàn toàn từ đầu.

## 2. Breakpoints đề xuất

| Tên | Độ rộng | Ghi chú |
|---|---|---|
| `base` (mobile) | < 768px | Ưu tiên thiết kế trước (mobile-first) |
| `md` (tablet) | ≥ 768px | |
| `lg` (desktop nhỏ) | ≥ 1024px | |
| `xl` (desktop — khớp mockup gốc) | ≥ 1280px | Mockup File B được thiết kế ở khoảng độ rộng này |
| `2xl` (desktop lớn) | ≥ 1536px | Giới hạn max-width nội dung, tránh dòng chữ quá dài trên màn hình rất rộng |

## 3. Hành vi responsive theo từng nhóm component

### 3.1 Header / Navigation

| Màn hình | Hành vi |
|---|---|
| Desktop (`lg` trở lên) | Menu ngang đầy đủ 6 mục + nút Đặt phòng + Language Switcher, đúng như mockup |
| Tablet/Mobile (`< lg`) | Thu gọn thành `MobileMenu` (hamburger) — **có căn cứ** từ mục 1. Nút "ĐẶT PHÒNG" **vẫn giữ hiển thị** (không ẩn vào menu) vì đây là CTA quan trọng nhất toàn site, chỉ ẩn menu điều hướng phụ |
| `PropertySubNav` (mobile) | 3 tab tên cơ sở có thể chuyển thành dropdown hoặc scroll ngang (horizontal scroll) thay vì hàng ngang cố định — **ĐỀ XUẤT, cần xác nhận** |

### 3.2 Hero

| Màn hình | Hành vi |
|---|---|
| Desktop | Chiều cao lớn (gần full viewport ở trang chủ), chữ H1 kích thước lớn (44–56px) |
| Mobile | Giảm chiều cao (tránh phải cuộn quá nhiều để thấy nội dung), H1 giảm còn ~28–32px, `BookingSearchBar` (nếu nằm trong Hero) chuyển từ hàng ngang sang xếp dọc từng field |

### 3.3 `BookingSearchBar` (quan trọng nhất về mặt tương tác)

| Màn hình | Hành vi |
|---|---|
| Desktop | 4 field + CTA nằm ngang trên 1 thanh, như mockup |
| Tablet | Có thể chia 2 hàng (2 field/hàng) |
| Mobile | Xếp dọc hoàn toàn từng field, CTA "Tìm phòng" full-width ở cuối — đảm bảo dễ bấm bằng ngón tay (kích thước chạm tối thiểu theo thông lệ accessibility, dù chưa có yêu cầu Accessibility chính thức) |

### 3.4 Grid card (`PropertyCard`, `RoomCard`, `OfferCard`, `ExperienceCard`)

| Màn hình | Số cột |
|---|---|
| Desktop (`xl`) | 3 cột (đúng số lượng 3 cơ sở/ưu đãi, hoặc theo số phòng) |
| Tablet (`md`) | 2 cột |
| Mobile (`base`) | 1 cột, các card xếp dọc |

`ExperienceCard` số 04 ("Ở lại tận hưởng") có kích thước dọc khác biệt trên desktop (mục 7, `design-system.md`) — trên mobile đề xuất quy về cùng kích thước với 3 card còn lại để đơn giản hoá bố cục xếp dọc.

### 3.5 `AmenityIconList` / feature row (icon + text ngang)

| Màn hình | Hành vi |
|---|---|
| Desktop | Hàng ngang 3–5 icon cạnh nhau |
| Mobile | Chuyển thành lưới 2 cột hoặc xếp dọc, tuỳ số lượng icon — **ĐỀ XUẤT** |

### 3.6 Ảnh (Image)

- Dùng `next/image` với kích thước responsive khác nhau theo breakpoint (ảnh nhỏ hơn cho mobile để tối ưu Performance — đúng mối lo đã ghi trong `non-functional-requirements.md` do khối lượng ảnh lớn của 3 "website con").
- Ảnh hero giữ tỷ lệ full-bleed (100% chiều rộng màn hình) ở mọi breakpoint, chỉ thay đổi chiều cao.

### 3.7 Footer

| Màn hình | Hành vi |
|---|---|
| Desktop | Các nhóm liên kết/social nằm ngang 1 hàng, như mockup |
| Mobile | Xếp dọc thành từng khối (logo → liên kết → social → địa điểm) |

### 3.8 `StickyContactWidget` (Zalo + gọi điện)

- Giữ nguyên vị trí nổi (floating) góc màn hình ở **mọi breakpoint** — đây là CTA liên hệ nhanh, đặc biệt quan trọng trên mobile (khách dễ bấm gọi trực tiếp hơn là tìm trang Liên hệ).

## 4. Typography responsive

Áp dụng thang đo đã đề xuất ở `design-system.md` mục 4 (Heading) — thu nhỏ dần theo breakpoint, không dùng 1 kích thước cố định cho mọi màn hình. Riêng font Accent/Script (tagline viết tay) nên **giảm tần suất xuất hiện trên mobile** nếu ảnh hưởng đến độ rõ ràng ở màn hình nhỏ — ĐỀ XUẤT, cần xác nhận qua thực tế thiết kế chi tiết.

## 5. Những điều CHƯA THỂ chốt ở tài liệu này

- Không có mockup mobile/tablet thật — mọi hành vi ở mục 3 là **suy luận kỹ thuật hợp lý dựa trên bố cục desktop**, không phải yêu cầu đã CONFIRMED.
- Accessibility (kích thước chạm, độ tương phản màu) vẫn [CHƯA XÁC ĐỊNH] theo `non-functional-requirements.md` — cần xác nhận riêng trước khi hoàn thiện chi tiết responsive cuối cùng.

---

*Xem thêm: `design-system.md` (breakpoints, spacing), `ui-component-spec.md` (danh sách component áp dụng).*
