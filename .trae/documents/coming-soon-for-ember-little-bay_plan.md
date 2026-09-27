# Tạo "Coming Soon" Page cho Ember Style & Little Bay — Implementation Plan

## Repository Research

### Mục tiêu người dùng
Khi người dùng click vào bất kỳ link / nút nào dẫn đến "Ember Style" hoặc "Little Bay" (chi tiết thư viện / danh sách phòng / chi tiết phòng của 2 cơ sở này), thay vì render trang content thực → hiển thị màn hình "Coming Soon" thống nhất.

Central (slug `central`) VẪN hoạt động bình thường (đã có nội dung đầy đủ).

---

### Tình hình các link dẫn đến 2 cơ sở (đã grep toàn project):
Các CTA hiện tại được phân phối qua **nhiều file**, nhưng **all đều dùng pattern động** dựa trên `property.slug`:

| File type | Số file | Pattern |
|---|---|---|
| Card components (dùng chung) | 2 | [PropertyCard.tsx](file:///Users/vodangkhoa/Documents/Projects/tuibagang/tui-ba-gang-web/components/hotel/PropertyCard.tsx#L55) → `ctaHref ?? \`/thu-vien/${property.slug}\`` |
| | | [PropertyOverlayCard.tsx](file:///Users/vodangkhoa/Documents/Projects/tuibagang/tui-ba-gang-web/components/hotel/PropertyOverlayCard.tsx#L92) → `ctaHref ?? \`/thu-vien/${property.slug}\`` |
| Home Hero selector | 1 | [HeroPropertySelector.tsx](file:///Users/vodangkhoa/Documents/Projects/tuibagang/tui-ba-gang-web/components/hero/HeroPropertySelector.tsx#L19) → `\`/thu-vien/${property.slug}\`` |
| SubNav trang thư viện | 1 | [PropertySubNav.tsx](file:///Users/vodangkhoa/Documents/Projects/tuibagang/tui-ba-gang-web/components/layout/PropertySubNav.tsx#L26) → `\`/thu-vien/${p.slug}\`` |
| RoomCard (danh sách phòng) | 1 | [RoomCard.tsx](file:///Users/vodangkhoa/Documents/Projects/tuibagang/tui-ba-gang-web/components/room/RoomCard.tsx#L35) → `\`/phong-nghi/${room.hotel}/${room.slug}\`` |
| Page files chủ động gọi (chỉ thị CTA href) | 4 | `app/thu-vien/[hotel]/page.tsx`, `app/phong-nghi/page.tsx`, `app/trai-nghiem/page.tsx`, `app/phong-nghi/[hotel]/[room]/page.tsx` |

**Tổng:** ~10 chỗ, tất cả dùng slug động → nếu sửa từng chỗ sẽ rất tệ (cần if/else ở 10 nơi, dễ sót, khó revert khi Ember/Little sẵn sàng).

---

### CHỌN PHƯƠNG ÁN TỐI ƯU: Conditional Render ở các route page nhận [hotel] param

**KHÔNG sửa 10 chỗ CTA.** Thay vào đó: giữ nguyên CTA site-wide (điểm đến vẫn là `/thu-vien/ember-style`, `/phong-nghi/little-bay/deluxe-window`...), **tại các route page nhận `[hotel]` param / `:hotel` segment, check ngay đầu — nếu slug thuộc black list [ember-style, little-bay], bỏ qua toàn bộ content thật, render `<ComingSoonScreen hotel={slug} />`.

**Ưu điểm phương án này:**
- Central slug hoàn toàn unaffected (0 thay đổi ở trang Central đang chạy OK).
- Mọi đường link đến 2 cơ sở (dù CTA bất kỳ đâu) đều đồng bộ "Coming Soon" — không sợ sót CTA nào.
- Rất dễ revert sau này: chỉ cần xóa `if` guard ở 3 route page, hoặc empty black-list.
- 1 chỗ duy nhất quản lý nội dung "Coming Soon" → thay text/logo, thay link CTA (trở về trang chủ hoặc chọn cơ sở khác) → sửa 1 lần.

**Nhược điểm (ít ảnh hưởng):** URL vẫn hiển thị `/thu-vien/ember-style` hoặc `/phong-nghi/little-bay/superior-room` thay vì `/coming-soon` — nhưng người dùng quan tâm đến nội dung hiển thị "Đang được chuẩn bị" chứ không phải URL. Đây là behavior thông dụng.

**(Backup plan nếu người dùng muốn URL là `/coming-soon` thật)** → dùng Next.js `redirect()` redirect đến `/coming-soon?hotel=xxx` khi hit black-list slug, và tạo route `/coming-soon/page.tsx` đọc query param. Tốt hơn dùng conditional render vì giữ được breadcrumb gốc, referrer URL (dễ debug/user muốn share).

---

## Files and Modules

| File | Hành động |
|---|---|
| **TẠO MỚI**: `components/ui/ComingSoonScreen.tsx` | Component hiển thị màn hình Coming Soon thống nhất (banner + heading + mô tả + CTA trở về). Nhận prop `hotel: "ember-style" \| "little-bay"`. Dùng cùng tint theme per-hotel (Ember → đỏ-đỏ; Little Bay → xanh rêu; theo convention trong tailwind). |
| **Sửa**: `app/thu-vien/[hotel]/page.tsx` | Ngay sau khi `getPropertyBySlug(hotel)` thành công, kiểm tra `if (["ember-style", "little-bay"].includes(hotel))` → return `<ComingSoonScreen hotel={hotel} />` với toàn bộ section Hero + footer layout bọc ngoài (hoặc bọc cả trang return vào <>Header override<ComingSoon/>Footer). |
| **Sửa**: `app/phong-nghi/[hotel]/page.tsx` | Cùng guard tại đầu component, bỏ qua Hero + RoomListWithFilter, render Coming Soon. |
| **Sửa**: `app/phong-nghi/[hotel]/[room]/page.tsx` | Cùng guard. |
| `app/page.tsx` (Home) | KHÔNG sửa — HeroPropertySelector vẫn link đến 2 slug (khi bấm → vào route page guard → Coming Soon). OK |
| `components/hotel/*Card*.tsx` | KHÔNG sửa — OK |
| `components/layout/PropertySubNav.tsx` | KHÔNG sửa — OK |
| `app/trai-nghiem/page.tsx` | KHÔNG sửa — PropertyCard link đến 2 slug OK |
| `app/thu-vien/page.tsx` | KHÔNG sửa — PropertyOverlayCard link OK |
| `app/phong-nghi/page.tsx` | KHÔNG sửa — PropertyOverlayCard link OK |
| `components/room/RoomCard.tsx` | KHÔNG sửa — link đến room slug OK; khi hit page guard sẽ render Coming Soon |

---

## Implementation Steps (thứ tự phụ thuộc)

1. **Bước 1: Tạo `components/ui/ComingSoonScreen.tsx`**
   - Interface: `{ hotel: "ember-style" | "little-bay" | string }`
   - UI (đồng bộ design system hiện tại):
     - Container rộng, nền cream-50 (giống trang liên hệ banner trái nền kem),
     - Bên trái: Breadcrumb (Trang chủ / [tên cơ sở] / Coming Soon hoặc Trang chủ / tên hiện tại),
     - `SectionLabel` "SẮP CÓ MẶT",
     - Heading lớn Playfair Display: "Một góc Đà Lạt khác,", "đang được Túi Ba Gang chăm chút từng chi tiết.",
     - Paragraph mô tả ngắn (văn phong giống Về chúng tôi): "`[Tên cơ sở]` dự kiến mở cửa quý IV năm 2026. Hãy theo dõi trang chủ để cập nhật những tin tức đầu tiên!",
     - 2 nút: "QUAY VỀ TRANG CHỦ" (href `/`) + "XEM NGAY CƠ SỞ CENTRAL" (href `/thu-vien/central`),
     - Bên phải: banner ảnh placeholder tint theo cơ sở — Ember dùng `contact-ember-style.jpg`, Little Bay dùng `contact-little-bay.jpg` (ảnh đã có sẵn, chất lượng OK).
   - Responsive: mobile xếp dọc (ảnh trên, chữ dưới); md trở lên chia đôi 1/1.

2. **Bước 2: Sửa `app/thu-vien/[hotel]/page.tsx`**
   - Import `ComingSoonScreen`.
   - Ngay sau dòng `const property = getPropertyBySlug(hotel)`; `if (!property) notFound()` — thêm guard:
     ```tsx
     if (["ember-style", "little-bay"].includes(hotel)) {
       return (
         <section className="pt-32 pb-16 md:pt-40 md:pb-24 min-h-screen flex items-center bg-cream-50">
           <Container>
             <ComingSoonScreen hotel={hotel} />
           </Container>
         </section>
       );
     }
     ```
   - Quan trọng: return TRƯỚC khi render Hero, PropertySubNav (2 cơ sở này có SubNav custom → bỏ qua để không load nav đến 2 trang đang Coming Soon).

3. **Bước 3: Sửa `app/phong-nghi/[hotel]/page.tsx`**
   - Import `ComingSoonScreen` + `Container`.
   - Guard tương tự ngay sau `const property = getPropertyBySlug(hotel); if (!property) notFound()`.
   - Return guard block: bỏ qua Hero banner compact của trang này, render Coming Soon trực tiếp.

4. **Bước 4: Sửa `app/phong-nghi/[hotel]/[room]/page.tsx`**
   - Import `ComingSoonScreen`.
   - Guard tương tự sau 2 lệnh notFound (check property và room).
   - Bỏ qua Gallery / Giá / Tiện nghi, render Coming Soon.

5. **Bước 5: Verify TypeScript** → `npx tsc --noEmit` exit code 0.

6. **Bước 6: Verify production build** → `npm run build` (32 static pages OK).

---

## Dependencies and Considerations

- **Next.js App Router Server Components**: 3 route page đều là async Server Components (hiện tại) — guard return JSX cũng là JSX server, OK, không cần "use client".
- **`ComingSoonScreen`** cũng là Server Component (chỉ dùng `Button`, `Container`, `SectionLabel`, `Image`, `Breadcrumb` — không có state/hook). Nếu dùng `Image next/image` trong server component → cần `import Image from "next/image"`. Dùng ảnh JPG có sẵn đã public/images/contact-*.jpg (đã được optimize, đã có sẵn).
- **`ComingSoonScreen` sử dụng property name (tên đầy đủ)**: import `getPropertyBySlug` từ `lib/content/properties` để lấy `property.fullName` thay vì hard-code, tránh sai lệch.
- **`Button` component**: đảm bảo dùng đúng prop withArrow/href variant; theo convention các CTA khác.
- **SEO**: 2 cơ sở này đang được indexable? Không cần sửa `metadata` (generateMetadata trong App Router chạy trước khi render; vẫn trả về title như cũ "Ember Style | Túi Ba Gang" — không vấn đề, page thật vẫn có title chuẩn).

---

## Validation

1. `npx tsc --noEmit` — exit code 0
2. `npm run build` — 32 pages generated pass
3. Chạy `npm run dev` và kiểm tra thủ công 6 URL (tùy chọn, không bắt buộc nếu CLI pass):
   - `/thu-vien/ember-style` → Coming Soon (không Hero, không SubNav)
   - `/thu-vien/little-bay` → Coming Soon
   - `/thu-vien/central` → VẪN xem được content thật (OK)
   - `/phong-nghi/ember-style` → Coming Soon
   - `/phong-nghi/little-bay/deluxe-window` → Coming Soon
   - `/phong-nghi/central/superior-room` → Vẫn xem OK
   - Bấm link "Ember Style" từ Home HeroSelector → vào đúng Coming Soon

---

## Risks

| Rủi ro | Xử lý |
|---|---|
| **1. Forgot trả về Container + padding trong guard → Coming Soon bị Header đè** | Guard block luôn bọc `<section className="pt-32 md:pt-40 min-h-screen...">` + `<Container>`, consistent pattern giống phòng nghỉ page. |
| **2. PropertySubNav của 2 cơ sở được mount (do export Header import) → SubNav hiển thị đến các trang Ember/Little** | Vì guard return TRƯỚC Hero của route page (trong thu-vien/[hotel] và phong-nghi/[hotel]), PropertySubNav (nằm trong Hero của các trang này) cũng bị bỏ qua → không vấn đề. |
| **3. Revert khó (sau này muốn mở bán Ember/Little)** | Xóa 3 guard block → xong; không còn liên quan đến CTA đâu cả → 3 dòng delete (hoặc comment out black list array). |
| **4. Không có ảnh Coming Soon đẹp** | Dùng ảnh `contact-ember-style.jpg` / `contact-little-bay.jpg` đã có sẵn trong thư mục public — ảnh đã được cắt sạch, đúng kiến trúc toà nhà từng cơ sở, quality OK (đã fix trong Phase 6.6 mục 4.7). |
