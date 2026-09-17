# UI Component Specification — Túi Ba Gang Website

**Phase 4.** Kiến trúc component ở mức khái niệm (props/variant mô tả bằng lời, KHÔNG PHẢI code). Dựa trên `component-inventory.md` (Phase 2) + quan sát trực tiếp mockup File B (Phase 4). CHƯA CODE.

## 1. Component architecture (cấu trúc thư mục đề xuất)

```
components/
├── layout/            # Khung trang dùng chung mọi nơi
│   ├── Header
│   ├── PropertySubNav
│   ├── StickyContactWidget
│   ├── LanguageSwitcher
│   ├── Container
│   └── SectionLabel        # label nhỏ chữ hoa lặp lại trên mọi section (mục 3, design-system.md)
├── navigation/
│   ├── NavMenu
│   ├── MobileMenu           # hamburger — xem responsive-spec.md
│   ├── Breadcrumb            # dùng ở trang chi tiết phòng
│   └── TabFilter              # dùng chung: PropertySubNav VÀ filter tab trang Ưu đãi
├── hero/
│   ├── Hero                   # hero dùng chung mọi trang chính
│   ├── HeroPropertySelector    # bộ chọn 01/02/03 trên Hero trang chủ
│   └── VideoButton
├── booking/
│   ├── BookingSearchBar
│   ├── DateField
│   ├── GuestCountSelector
│   ├── RoomAvailabilityList
│   ├── BookingWidgetEmbed      # dự phòng — chỉ cần nếu chọn Khả năng 2 (Flow D)
│   └── BookingRequestForm       # dự phòng — chỉ cần nếu chọn Khả năng 3 (Flow D)
├── hotel/
│   ├── PropertyCard
│   ├── PropertySelector
│   ├── AmenityIconList
│   ├── ContactCard
│   ├── OfferCard
│   └── OfferBadge
├── room/
│   ├── RoomCard
│   ├── RoomFilterChips
│   └── RoomGallery
├── content/            # MỚI so với ví dụ đề xuất ban đầu — xem giải thích bên dưới
│   └── ExperienceCard
├── forms/               # Hiện chủ yếu là dự phòng — xem mục 2.7
├── ui/
│   ├── Button
│   ├── Modal
│   ├── Toast
│   ├── Select
│   └── Badge
└── footer/
    ├── Footer
    ├── FooterLinkGroup
    └── SocialIcons
```

**Giải thích khác biệt so với cấu trúc ví dụ bạn đưa ra:** đã thêm thư mục `content/` chứa `ExperienceCard` — vì đây là card giới thiệu trải nghiệm Đà Lạt (ăn uống/tham quan), không thuộc về 1 cơ sở cụ thể nào (khác `hotel/`) và cũng không phải phòng (khác `room/`). Đây là điều chỉnh nhỏ giữ tinh thần "không gộp sai ngữ nghĩa" chứ không thêm tính năng nào ngoài requirement.

## 2. Chi tiết từng nhóm component

### 2.1 `layout/`

| Component | Mô tả | Variant/Prop khái niệm |
|---|---|---|
| `Header` | Logo + `NavMenu` + nút Đặt phòng + `LanguageSwitcher` | `variant`: `default` (menu đầy đủ 6 mục) / `transparent` (đè lên ảnh hero, nền trong suốt đến khi cuộn) |
| `PropertySubNav` | Thay thế `Header` ở `/thu-vien/:hotel` — 3 tab cơ sở + nút Đặt phòng + hamburger | `activeProperty`: `central` \| `ember-style` \| `little-bay` |
| `StickyContactWidget` | 2 icon nổi (Zalo, gọi điện) | `phoneNumber`, `zaloLink` theo `property` (nếu mỗi cơ sở có số riêng — xem Open Question M4) |
| `LanguageSwitcher` | Dropdown VI/EN | `currentLocale` |
| `Container` | Bọc nội dung, giới hạn max-width ~1280px | `fullBleed` (true cho ảnh hero) |
| `SectionLabel` | Label nhỏ chữ hoa lặp lại (vd. "OUR STORY", "PHÒNG NGHỈ") | `text` |

### 2.2 `navigation/`

| Component | Mô tả | Dùng ở |
|---|---|---|
| `NavMenu` | 6 mục menu chính, có gạch chân khi active | `Header` |
| `MobileMenu` | Menu dạng hamburger/drawer cho màn hình nhỏ | Toàn site (xem `responsive-spec.md`) |
| `Breadcrumb` | Đường dẫn quay lại (vd. Phòng nghỉ / Central / Superior) | `/phong-nghi/:hotel/:roomSlug` |
| `TabFilter` | Tab chuyển đổi có gạch chân — **dùng lại** cho cả `PropertySubNav` lẫn filter "Tất cả ưu đãi / Central / Ember / Little Bay" ở trang Ưu đãi | `/thu-vien/:hotel`, `/uu-dai` |

### 2.3 `hero/`

| Component | Mô tả | Variant |
|---|---|---|
| `Hero` | Ảnh nền lớn + label địa điểm + H1 + mô tả ngắn + CTA | `size`: `full` (trang chủ, cao gần hết màn hình) / `compact` (các trang nội dung như Về chúng tôi, Ưu đãi, Liên hệ) |
| `HeroPropertySelector` | 3 số thứ tự 01/02/03 dẫn nhanh tới từng cơ sở, đặt trong Hero trang chủ | — |
| `VideoButton` | Nút tròn "▶ Xem video" | Trang Trải nghiệm |

### 2.4 `booking/`

| Component | Mô tả | Ghi chú |
|---|---|---|
| `BookingSearchBar` | Thanh ngang 4 field + CTA "Tìm phòng" | Dùng ở Trang chủ VÀ `/dat-phong` — đây là component **dùng lại nhiều nơi nhất** liên quan booking |
| `DateField` | Ô chọn ngày nhận/trả | Con của `BookingSearchBar` |
| `GuestCountSelector` | Chọn số người lớn/trẻ em | Con của `BookingSearchBar` |
| `RoomAvailabilityList` | Danh sách phòng trống sau khi tìm kiếm | `/dat-phong` — **[CHƯA XÁC ĐỊNH]** giao diện chi tiết vì không có mockup |
| `BookingWidgetEmbed` | Khung nhúng ezCloud | Dự phòng, chỉ code nếu chốt Khả năng 2 ở Flow D |
| `BookingRequestForm` | Form yêu cầu đặt phòng thủ công | Dự phòng, chỉ code nếu chốt Khả năng 3 ở Flow D |

### 2.5 `hotel/`

| Component | Mô tả | Variant |
|---|---|---|
| `PropertyCard` | Ảnh + label "TÚI BA GANG" + tên cơ sở + tagline + CTA | `accent`: theo `property` (đổi màu CTA/gạch nhấn theo cơ sở — xem `design-system.md` mục 2.2) |
| `PropertySelector` | Bộ chọn nhanh dạng số (01/02/03) — tái sử dụng phần logic của `HeroPropertySelector` nhưng không giới hạn trong Hero | `/phong-nghi`, `/thu-vien` |
| `AmenityIconList` | Danh sách icon + text ngắn (tiện nghi) | `/thu-vien/:hotel` — icon thay đổi theo nội dung từng cơ sở |
| `ContactCard` | Ảnh + tên + tagline + hotline + email + CTA | `/lien-he` |
| `OfferCard` | Ảnh nền + tên ưu đãi + ngày áp dụng + danh sách quyền lợi (icon+text) + CTA | `/uu-dai` |
| `OfferBadge` | Chấm đỏ nhỏ trên tab menu | `Header` (điều kiện: có ưu đãi mới) |

### 2.6 `room/`

| Component | Mô tả | Variant |
|---|---|---|
| `RoomCard` | Ảnh + tên hạng phòng + số khách + diện tích + CTA "Xem chi tiết" | Dùng ở `/phong-nghi/:hotel` (danh sách đầy đủ) VÀ `/thu-vien/:hotel` (preview 3–4 phòng, có thể dùng `variant="compact"`) |
| `RoomFilterChips` | Chip lọc "Tất cả" + từng hạng phòng | `/phong-nghi/:hotel` — **[CHƯA XÁC ĐỊNH]** tên hạng phòng chính thức (M1–M3) nên danh sách chip chưa thể chốt cứng |
| `RoomGallery` | Gallery ảnh 1 phòng | `/phong-nghi/:hotel/:roomSlug` |

### 2.7 `forms/`

Hiện tại **không có form dạng cổ điển nào được CONFIRMED** trong mockup (mục 10, `design-system.md`). Thư mục này giữ chỗ cho:
- Form liên hệ (nếu sau này xác nhận trang `/lien-he` cần thêm form gửi tin nhắn — hiện chỉ có card thông tin).
- `BookingRequestForm` (đã liệt kê ở `booking/` vì gắn chặt với luồng đặt phòng — có thể tham chiếu chéo).

Không tạo component cụ thể nào ở đây cho đến khi có xác nhận.

### 2.8 `ui/` (component nguyên tử, dùng lại nhiều nhất toàn site)

| Component | Variant |
|---|---|
| `Button` | `primary` (nền đậm + icon →), `secondary/outline`, `ghost` (text link + icon →) — xem `design-system.md` mục 6 |
| `Modal` | Dùng cho xác nhận/lỗi/thành công (khái niệm, chưa có mockup cụ thể) |
| `Toast` | Thông báo ngắn (lỗi tìm phòng, v.v. — xem `architecture.md` mục Error handling) |
| `Select` | Dropdown (địa điểm, ngôn ngữ, số khách) |
| `Badge` | Chấm đỏ nhỏ — nền cho `OfferBadge` |

### 2.9 `footer/`

| Component | Mô tả |
|---|---|
| `Footer` | Nền nâu đậm, logo, tagline, `FooterLinkGroup`, `SocialIcons`, địa điểm |
| `FooterLinkGroup` | Chính sách / FAQ / Liên hệ |
| `SocialIcons` | Instagram/Facebook (mọi trang), + YouTube (chỉ trang Trải nghiệm) |

---

## 3. Ma trận tái sử dụng component theo trang (Component Reuse Matrix)

| Component | `/` | `/ve-chung-toi` | `/phong-nghi(/:hotel)` | `/trai-nghiem` | `/thu-vien/:hotel` | `/uu-dai` | `/lien-he` | `/dat-phong` |
|---|---|---|---|---|---|---|---|---|
| `Header` / `PropertySubNav` | Header | Header | Header | Header | **PropertySubNav** | Header | Header | Header |
| `Hero` | ✅ full | ✅ compact | ✅ compact | ✅ compact | ✅ compact (riêng từng cơ sở) | ✅ compact | ✅ compact | ✅ compact |
| `PropertyCard` | ✅ | ✅ | ✅ (trang chọn cơ sở) | ✅ | — | — | — | — |
| `BookingSearchBar` | ✅ | — | — | — | — | — | — | ✅ |
| `RoomCard` | — | — | ✅ | — | ✅ (compact preview) | — | — | — |
| `OfferCard` | — | — | — | — | — | ✅ | — | — |
| `ContactCard` | — | — | — | — | — | — | ✅ | — |
| `AmenityIconList` | — | — | — | — | ✅ | — | — | — |
| `ExperienceCard` | — | — | — | ✅ | — | — | — | — |
| `Footer` | ✅ | ✅ | ✅ | ✅ | ✅ (rút gọn) | ✅ | ✅ | ✅ |
| `StickyContactWidget` | ✅ | [CHƯA XÁC ĐỊNH phạm vi — xem `user-flows.md` Flow G] | | | | | | |

**Component dùng lại ở NHIỀU trang nhất (ưu tiên xây trước, chuẩn hoá kỹ):** `Header`/`PropertySubNav`, `Footer`, `Button`, `PropertyCard`, `Hero`, `SectionLabel` — đây là những "viên gạch nền" ảnh hưởng toàn bộ site nếu thay đổi sau này.

---

*Xem thêm: `design-system.md` (tokens/style), `responsive-spec.md` (hành vi theo màn hình), `component-inventory.md` (danh sách gốc từ Phase 2).*
