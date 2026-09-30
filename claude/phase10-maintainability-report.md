# Phase 10 — Báo cáo review khả năng scale & maintain

Phạm vi: rà soát `tui-ba-gang-web` theo 2 tiêu chí — **dễ scale** (thêm cơ sở/trang/ngôn ngữ phải sửa bao nhiêu chỗ) và **dễ maintain** (trùng lặp, file quá dài, giá trị viết cứng, thiếu cơ chế bắt lỗi). Không đổi giao diện, không đổi business requirement.

## Kết luận review (trước khi sửa)

| Tiêu chí | Đánh giá | Lý do |
|---|---|---|
| Nền tảng | ✅ Tốt | Next.js App Router, TypeScript strict, dữ liệu tách khỏi UI (`lib/content`), i18n gom vào 2 file dictionary, CI có lint + typecheck + build |
| Scale theo số cơ sở | ❌ | Mở/thêm 1 cơ sở phải sửa ~7 file: danh sách "coming soon" `["ember-style","little-bay"]` viết cứng ở 3 trang + regex trong Header; ảnh liên hệ, màu accent, danh sách slug lặp ở nhiều component |
| Trùng lặp dữ liệu | ❌ | Tag + mô tả card cơ sở lặp 3 nơi (`properties`, `library`, `contact`); hotline viết cứng riêng trong nút liên hệ nổi; 2 cách định dạng link `tel:` khác nhau |
| Kích thước file | ⚠️ | `app/[locale]/thu-vien/[hotel]/page.tsx` ~400 dòng gồm 7 section; mẫu hiển thị chữ nhiều dòng lặp 18 lần |
| Điểm nối ezCloud | ⚠️ | Logic tìm phòng MOCK nằm trong component, trái với quyết định PMS Adapter (`docs/technical-decisions.md` #3) |
| An toàn khi sửa | ❌ | Không có test; text ghép với dữ liệu theo thứ tự phần tử — thiếu 1 dòng dịch là hiển thị sai/thiếu mà không ai báo |

## Đã hoàn thành

### 1. Cấu hình cơ sở theo dữ liệu (scale)
- `Property` thêm field: `status` (`"open"` / `"coming-soon"`), `accent`, `contactImage`, `listingLine`, `heroLocationTag`, `roomsSection.previewImages`; `order` bỏ giới hạn 3 giá trị.
- Bỏ toàn bộ chỗ viết cứng theo slug: điều kiện coming-soon ở 3 trang, regex + danh sách slug trong `Header`, bảng ảnh liên hệ ở `lien-he` và `ComingSoonScreen`, bảng màu ở `PropertyCard`, hack ảnh preview riêng cho Central, `slug === "little-bay"` ở Hero.
- **Mở cửa 1 cơ sở giờ chỉ cần đổi `status: "open"`**; thêm cơ sở mới theo 5 bước trong README (mục "Thêm / mở một cơ sở mới").

### 2. Bỏ dữ liệu trùng lặp (maintain)
- Card cơ sở ở Thư viện/Liên hệ đọc `property.listingLine` + `property.tags` — xoá phần `cards` lặp trong `lib/content/library.ts`, `contact.ts` và `propertyCardLines` trong dictionary.
- `ContactCard` chỉ nhận `property` (trước: 4 props lấy từ 3 nguồn).
- Hotline nút nổi lấy từ `brandContact` (hotline Central trong dữ liệu); link `tel:` thống nhất qua `lib/phone.ts` (dạng quốc tế `+84…`, gọi được cả từ nước ngoài).

### 3. Tách nhỏ component (maintain)
- Trang cơ sở `/thu-vien/:hotel` 398 → 107 dòng; 7 section tách vào `components/property/` (Story, MoodTiles, Amenities, RoomsPreview, MoreThanStay, Dining, ClosingBanner), mỗi section tự ẩn khi cơ sở không có dữ liệu tương ứng.
- `components/ui/TextLines.tsx` thay cho 18 chỗ lặp `lines.map(<span className="block">)`.

### 4. Điểm nối PMS/ezCloud
- `lib/booking/availability.ts` — `searchAvailability(search, locale)`: component đặt phòng chỉ gọi hàm này. Khi có API ezCloud chỉ thay thân hàm. Vẫn là MOCK, **[CHƯA XÁC NHẬN API]**, không đoán endpoint.

### 5. Test tự động
- Vitest (`npm test`, đã thêm vào CI và `npm run check`), 20 test:
  - `localizeHref` / `stripLocale` / `proxy` (chọn ngôn ngữ theo cookie → trình duyệt → mặc định, giữ query).
  - `mergeText`, `telHref`.
  - **Toàn vẹn nội dung**: `en.ts` cùng cấu trúc `vi.ts` tới từng phần tử mảng; mọi cơ sở/phòng/ưu đãi/trải nghiệm có đủ text ở cả 2 locale.
- Đã thử xoá 1 dòng dịch trong `en.ts` → test báo lỗi rõ ràng (`ember-style: tiện nghi "heart" thiếu nhãn`).
- Nâng `@types/node` 20 → 22 (khớp Node 22 trong `.nvmrc`) để dùng Vitest 5 — `npm audit`: 0 lỗ hổng.

### Kiểm chứng
- `npm run check` (lint + typecheck + test + build) pass.
- So sánh text hiển thị 32 trang (VI + EN) trước/sau: **giống hệt**. Thay đổi duy nhất ngoài text: link `tel:` chuyển sang dạng `+84`.
- Trình duyệt: Header đúng màu chữ ở trang có Hero, thanh tab cơ sở ở `/thu-vien/:hotel`, Coming Soon đúng ảnh ở cơ sở chưa mở, preview phòng Central đúng ảnh.

## Chưa hoàn thành (chủ động không làm — tránh over-engineering)

- `Header` vẫn giữ danh sách các route có Hero (`HERO_EXACT_PATHS`) để chọn màu chữ ngay lúc render đầu (tránh nhấp nháy). Thêm trang mới có Hero thì cần thêm route vào danh sách này.
- Ghép text theo thứ tự phần tử (tiện nghi, quyền lợi ưu đãi) vẫn giữ — đơn giản, và đã có test bắt lệch.
- Chưa có test giao diện (E2E); hiện kiểm tra hiển thị bằng so sánh HTML thủ công.

## Vấn đề phát hiện

- Cảnh báo lint có từ trước: import `CornerTagList` không dùng trong `components/hotel/PropertyOverlayCard.tsx`.
- `PropertyMoodTiles` (Little Bay) tự render thêm 1 breadcrumb trong khi trang đã có breadcrumb phía trên — hiện không thấy vì Little Bay đang "coming soon", nhưng khi mở cửa sẽ bị 2 breadcrumb. Giữ nguyên hành vi cũ, cần xác nhận có bỏ không.

## Cần tôi xác nhận

1. Bỏ breadcrumb thừa trong phần mood tile của Little Bay (sẽ lộ ra khi Little Bay mở cửa)?
2. Có cần thêm test E2E (Playwright) cho các luồng chính (chuyển ngôn ngữ, tìm phòng, menu mobile) không?

## Phase tiếp theo

- Tích hợp ezCloud qua `lib/booking/availability.ts` + Internal API Route khi có tài liệu API.
