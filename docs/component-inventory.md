# Component Inventory — Túi Ba Gang Website

**CẬP NHẬT (lần 2)** theo cấu trúc 3 cơ sở từ File B. Danh sách vẫn ở mức khái niệm, chưa phải chi tiết kỹ thuật (props/API).

## Layout / Chung

| Component | Mô tả | Cập nhật |
|---|---|---|
| `Header` | Logo, menu chính, `LanguageSwitcher`, CTA "Đặt phòng" | Không đổi |
| `PropertySubNav` **(MỚI)** | Thanh điều hướng phụ dùng riêng trong `/thu-vien/:hotel` — tab chuyển nhanh Central \| Ember Style \| Little Bay + nút Đặt phòng, thay thế menu chính | File B trang 6–8 |
| `Footer` | Liên kết Chính sách/FAQ/Liên hệ, social icons | Đã CONFIRMED có 3 link + icon (Instagram/Facebook/YouTube) |
| `LanguageSwitcher` | Chuyển VI/EN | CONFIRMED |
| `StickyContactWidget` **(MỚI)** | Nút nổi (floating) Zalo + gọi điện, góc màn hình | File B trang 1 |

## Nội dung / Hiển thị

| Component | Mô tả | Dùng ở trang |
|---|---|---|
| `Hero` | Banner ảnh lớn + tiêu đề + CTA | `/`, `/ve-chung-toi`, `/trai-nghiem`, `/thu-vien/:hotel`, `/uu-dai`, `/lien-he` |
| `PropertySelector` **(MỚI)** | Bộ chọn nhanh dạng số thứ tự (01/02/03) hoặc card, dẫn tới cơ sở tương ứng | `/`, `/phong-nghi`, `/thu-vien` |
| `PropertyCard` **(MỚI, thay cho `HotelCard` ví dụ cũ)** | Card giới thiệu 1 cơ sở (ảnh, tên, tagline, CTA) | `/`, `/ve-chung-toi`, `/phong-nghi`, `/thu-vien`, `/trai-nghiem` |
| `RoomCard` | Card 1 hạng phòng (ảnh, tên, số khách, diện tích, CTA) | `/phong-nghi/:hotel` |
| `RoomFilterChips` **(MỚI)** | Chip lọc theo loại phòng ("Tất cả" + từng hạng) | `/phong-nghi/:hotel` |
| `RoomGallery` | Gallery ảnh 1 phòng | `/phong-nghi/:hotel/:room-slug` |
| `ExperienceCard` **(MỚI)** | Card đánh số (01–04) giới thiệu 1 trải nghiệm | `/trai-nghiem` |
| `OfferCard` **(MỚI)** | Card ưu đãi: tên, mô tả, ngày áp dụng, danh sách quyền lợi (icon + text), CTA | `/uu-dai` |
| `OfferBadge` **(MỚI)** | Chấm đỏ thông báo trên tab menu "Ưu đãi" khi có khuyến mãi | Header (điều kiện) |
| `ContactCard` **(MỚI)** | Card liên hệ 1 cơ sở: ảnh, tên, tagline, hotline (`tel:`), email (`mailto:`), CTA | `/lien-he` |
| `AmenityIconList` **(MỚI)** | Danh sách tiện nghi/đặc quyền dạng icon + text ngắn | `/thu-vien/:hotel` |
| `VideoButton` **(MỚI)** | Nút "Xem video" mở video giới thiệu | `/trai-nghiem` |
| `SectionTitle` | Tiêu đề section | Nhiều trang |
| `CTAButton` (`Button`) | Nút hành động dùng chung | Tất cả |

## Booking (khái niệm — vẫn phụ thuộc quyết định kỹ thuật ở Flow D)

| Component | Mô tả | Ghi chú |
|---|---|---|
| `BookingSearchBar` | Địa điểm/Nhận phòng/Trả phòng/Số khách + CTA "Tìm phòng" | CONFIRMED có ở Trang chủ (File B trang 1) |
| `RoomAvailabilityList` | Kết quả phòng trống kèm giá | Nguồn dữ liệu: ezCloud — **[CHƯA XÁC NHẬN API]** |
| `BookingWidgetEmbed` **(MỚI)** | Khung nhúng (iframe) nếu chọn "Khả năng 2" ở Flow D | Chỉ cần nếu xác nhận nhúng ezCloud trực tiếp |
| `BookingRequestForm` | Form yêu cầu đặt phòng thủ công | Chỉ cần nếu chọn "Khả năng 3" ở Flow D |

## Form / Tương tác chung

| Component | Mô tả |
|---|---|
| `Modal` | Popup xác nhận/lỗi/thành công |
| `Toast` / `Alert` | Thông báo ngắn |
| `DatePicker` | Chọn ngày nhận/trả phòng |
| `GuestCountSelector` | Chọn số người lớn/trẻ em |

## Không đưa vào / đã loại bỏ so với bản Phase 2 lần đầu

- `HotelCard` (ví dụ minh hoạ gốc) → thay bằng `PropertyCard`, chính xác hơn vì đây là 3 cơ sở của cùng 1 thương hiệu.
- `ContactForm` → **loại bỏ khỏi danh sách chắc chắn cần**, vì File B trang Liên hệ không có mockup form, chỉ có card thông tin — giữ ở diện "chưa chắc cần", chờ xác nhận.
- `Map` (Google Maps) → **loại bỏ khỏi danh sách chắc chắn cần** cùng lý do (không có bản đồ trong mockup `/lien-he`).
- `RestaurantInfo`/`MenuList` riêng → gộp vào `AmenityIconList`/section ẩm thực trong `/thu-vien/:hotel`, không cần trang/component riêng theo cấu trúc File B.
