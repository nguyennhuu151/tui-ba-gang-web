# Thêm Breadcrumb cho Toàn Bộ Pages — Implementation Plan

## Repository Research

### Trạng thái hiện tại
- **Đã có component `Breadcrumb`** tại [Breadcrumb.tsx](file:///Users/vodangkhoa/Documents/Projects/tuibagang/tui-ba-gang-web/components/navigation/Breadcrumb.tsx): nhận `items: BreadcrumbItem[]` (`{ label, href? }`).
- **Đang dùng tại trang chi tiết phòng** [phong-nghi/[hotel]/[room]/page.tsx](file:///Users/vodangkhoa/Documents/Projects/tuibagang/tui-ba-gang-web/app/phong-nghi/[hotel]/[room]/page.tsx#L48-L54) (3 mục: Trang chủ → Phòng nghỉ → Cơ sở → Hạng phòng), nhưng hiện tại chỉ mới bắt đầu từ "Phòng nghỉ", chưa có mạch "Trang chủ".
- **Header trong `app/layout.tsx` không có breadcrumb chung — mỗi page tự render phần nội dung (có Hero hoặc section đầu).
- Header `position: fixed` (cao `h-20` / `md:h-24`) → mọi page (đặc biệt không Hero page) cần padding-top `pt-32 md:pt-40` để né.

### Danh sách 11 pages trong app router
| Route | Page file | Có Hero ở đầu? | Có breadcrumb hiện tại? | Breadcrumb item đề xuất |
|---|---|---|---|---|
| `/` (Home) | `app/page.tsx` | ✅ Hero home | ❌ | — (trang gốc, bỏ breadcrumb |
| `/ve-chung-toi` | `app/ve-chung-toi/page.tsx` | ✅ Hero compact | ❌ | Trang chủ / Về chúng tôi |
| `/trai-nghiem` | `app/trai-nghiem/page.tsx` | ✅ Hero compact | ❌ | Trang chủ / Trải nghiệm |
| `/uu-dai` | `app/uu-dai/page.tsx` | ✅ Hero? (để kiểm tra) | ❌ | Trang chủ / Ưu đãi |
| `/lien-he` | `app/lien-he/page.tsx` | ✅ Hero? (để kiểm tra) | ❌ | Trang chủ / Liên hệ |
| `/dat-phong` | `app/dat-phong/page.tsx` | ✅ Hero compact | ❌ | Trang chủ / Đặt phòng |
| `/thu-vien` | `app/thu-vien/page.tsx` | ? | ❌ | Trang chủ / Thư viện |
| `/thu-vien/:hotel` | `app/thu-vien/[hotel]/page.tsx` | ✅ Hero compact | ❌ | Trang chủ / Thư viện / `<shortName>` |
| `/phong-nghi` | `app/phong-nghi/page.tsx` | ❌ (section thuần) | ❌ | Trang chủ / Phòng nghỉ |
| `/phong-nghi/:hotel` | `app/phong-nghi/[hotel]/page.tsx` | ✅ Hero compact | ❌ | Trang chủ / Phòng nghỉ / `<shortName>` |
| `/phong-nghi/:hotel/:room` | `app/phong-nghi/[hotel]/[room]/page.tsx` | ❌ (section thuần) | ✅ (nhưng chưa có item "Trang chủ") | Trang chủ / Phòng nghỉ / `<shortName>` / `<room.name>` |

### Quyết định thiết kế (Research kết quả từ codebase)
1. **Nơi đặt breadcrumb trong layout từng trang:**
   - Page **CÓ Hero**: Đặt breadcrumb **NGAY TRONG HERO (ở bên dưới Hero và bên trên Hero content), giữ background tối → chữ breadcrumb đổi sáng (giữ nguyên style `.text-brown-600` không hợp lý → đổi `.text-cream-50/80` khi ở Hero. Tuy nhiên cách đơn giản nhất theo UI hiện tại của Hero component không có slot breadcrumb → **cách thực tế hơn: đặt breadcrumb **NGAY SAU Hero, TRONG Container, ngay phía trên tiêu đề section đầu tiên (có nghĩa là ở page wrap Hero vào fragment, tiếp theo là Container + Breadcrumb ở section đầu).

2. **Thay đổi vị trí đặt Breadcrumb:
   - **Page CÓ Hero (bao gồm `/thu-vien/:hotel`, `/phong-nghi/:hotel`, `/ve-chung-toi` và các trang khác với Hero ở đầu): Breadcrumb ở **Container đầu tiên, trên tiêu đề/giới thiệu**, tức ngay dưới Hero (Hero chiếm full-bleed nên sau đó là section nội dung đầu tiên).
   - **Page KHÔNG Hero (`/phong-nghi`, `/phong-nghi/:hotel/:room`): Breadcrumb như hiện có/như RoomDetail page (trong Container đầu tiên, phía trên tiêu đề, sát Header padding-top.

3. **Homepage `/`**: KHÔNG thêm breadcrumb (trang gốc).

4. **Cải tiến Breadcrumb Component:**
   - Giữ nguyên API `Breadcrumb.tsx hiện có. **TẤT CẢ các breadcrumb item chain BẮT ĐẦU bằng `{ label: "Trang chủ", href: "/" }` để nhất quán — bao gồm cả page `/phong-nghi/:hotel/:room` đang thiếu (sửa lại cho có).

---

## Files and Modules
- `components/navigation/Breadcrumb.tsx` **(không đổi API, chỉ có thể thêm prop option style hoặc giữ nguyên)
- `app/phong-nghi/page.tsx` — thêm breadcrumb (chưa có) bên trên tiêu đề đầu
- `app/phong-nghi/\[hotel\]/page.tsx` — thêm breadcrumb NGAY section đầu tiên (sau Hero)
- `app/phong-nghi/\[hotel\]/\[room\]/page.tsx` — sửa breadcrumb THÊM item "Trang chủ" vào đầu mảng items hiện tại
- `app/ve-chung-toi/page.tsx` — thêm breadcrumb ở đầu Our Story section (sau Hero)
- `app/thu-vien/page.tsx` — thêm breadcrumb (nếu Hero thì ở section đầu, sau Hero)
- `app/thu-vien/\[hotel\]/page.tsx` — thêm breadcrumb ở section đầu tiên (sau Hero)
- `app/trai-nghiem/page.tsx` — thêm breadcrumb
- `app/uu-dai/page.tsx` — thêm breadcrumb
- `app/lien-he/page.tsx` — thêm breadcrumb
- `app/dat-phong/page.tsx` — thêm breadcrumb
- `app/page.tsx` — **KHÔNG ĐỔI** (trang gốc, không cần breadcrumb)

---

## Implementation Steps (theo thứ tự phụ thuộc)

1. **Bước 1 (0-dep): Đọc 6 trang chưa review (thu-vien/page.tsx, trai-nghiem/page.tsx, uu-dai/page.tsx, lien-he/page.tsx, dat-phong/page.tsx) → xác định cấu trúc Hero vs section đầu (để biết vị trí chèn breadcrumb chuẩn từng trang).
2. **Bước 2: Sửa `app/phong-nghi/[hotel]/[room]/page.tsx` — THÊM `{ label: "Trang chủ", href: "/" }` vào đầu items của `<Breadcrumb>` hiện có.
3. **Bước 3: Sửa `app/phong-nghi/page.tsx` — chèn `<Breadcrumb>` vào trong Container đầu tiên, ngay **phía trên `<SectionLabel>` (dòng 32-37), giữ nguyên `mt-* spacing tiêu đề hoặc giảm nhẹ.
4. **Bước 4: Sửa `app/phong-nghi/[hotel]/page.tsx`** — sau `<Hero>` (dòng 46-54), ở section hiện tại `py-16 md:py-20`, mở `<Container>` đầu tiên, bên trên `<RoomListWithFilter>`, chèn breadcrumb 3 mục.
5. **Bước 5: Sửa `app/ve-chung-toi/page.tsx** — ở section Our Story (sau Hero, dòng 57-114), bên trên `<SectionLabel>OUR STORY</SectionLabel>`, thêm breadcrumb 2 mục (Trang chủ / Về chúng tôi).
6. **Bước 6: Sửa `app/thu-vien/page.tsx`** — breadcrumb (Trang chủ / Thư viện) vào vị trí section đầu.
7. **Bước 7: Sửa `app/thu-vien/[hotel]/page.tsx`** — sau Hero, section đầu tiên (Our Story hoặc tương đương), thêm breadcrumb 3 mục.
8. **Bước 8: Sửa `app/trai-nghiem/page.tsx`** — breadcrumb 2 mục (Trang chủ / Trải nghiệm).
9. **Bước 9: Sửa `app/uu-dai/page.tsx`** — breadcrumb 2 mục.
10. **Bước 10: Sửa `app/lien-he/page.tsx`** — breadcrumb 2 mục.
11. **Bước 11: Sửa `app/dat-phong/page.tsx`** — breadcrumb 2 mục.
12. **Bước 12**: Kiểm tra TypeScript build: `npx tsc --noEmit` (chạy thành công exit code 0).
13. **Bước 13**: Kiểm tra lint: `npm run lint` (hoặc nếu chỉ check 11 files trên).
14. **Bước 14**: `next build kiểm tra production build.

---

## Dependencies and Considerations
- **Next.js 16, Tailwind, `jsx: react-jsx**: Không cần import React; dùng lại `import { Breadcrumb }` cho 10 files.
- **`Breadcrumb.tsx`** interface `BreadcrumbItem` hỗ trợ `href` không bắt buộc (item cuối không link).
- **Spacing (mt-* sau Breadcrumb trong Container: Hiện tại ở RoomDetail là `<Breadcrumb/>` rồi `<div class="mt-6"> tiếp theo → tiếp tục convention này: Breadcrumb không có margin, container tiêu đề thêm mt-4 hoặc mt-6 phía sau.
- **Vị trí chèn ở trang có Hero:** Breadcrumb ở đầu nội dung (Container ngay sau Hero) sẽ được đặt trong Container đầu tiên, trên nội dung.
- **Tiếng Việt label nhất quán**: "Trang chủ" (hoặc) không phải Home); dựa trên convention của các page hiện tại.
- **Home không cần:** Không cần breadcrumb.

---

## Validation
- `npx tsc --noEmit` exit 0
- `npm run lint` (không error cấp cao)
- `npm run build` thành công (32 static pages được render OK)
- Kiểm tra bằng mắt (không bắt buộc nếu CLI pass

---

## Risks
- **Rủi ro 1: Spacing (khoảng trắng) thay đổi (Breadcrumb thêm vào làm section đầu có thể làm nội dung trang bị lệch xuống so với bản gốc (margin-top lúc không có breadcrumb). → Mitigation: thêm `mt-4` trước tiêu đề khi chưa có hoặc giữ convention giống RoomDetail (breadcrumb + mt-6 ở div tiếp theo, tổng space OK).
- **Rủi ro 2:** Vị trí đặt breadcrumb trang Hero bị lệch UI "Header đè breadcrumb vì không Hero page pt-32 đã đủ → Mitigation: breadcrumb đặt BÊN TRONG Container đầu, không ở ngoài cùng section (vì section đã có pt).
- **Rủi ro 3:** Tiếng Anh label (label): Breadcrumb.tsx style `text-xs text-brown-600` OK cho nền sáng, nhưng TRONG HERO (nền tối) nếu đặt vô sẽ không đọc được → Mitigation: tất cả breadcrumb đều ở Container nội dung (nền kem) sau Hero, không ở trên Hero.
- **Rủi ro 4:** `/thu-vien/:hotel` dùng `PropertySubNav` thay Header thường → breadcrumb bị che? Không, PropertySubNav cũng fixed cao như Header và các trang đó có section đầu pt tương đương, breadcrumb ở Container đầu sẽ OK.
