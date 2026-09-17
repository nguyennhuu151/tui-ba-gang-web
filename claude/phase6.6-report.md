# Phase 6.6 — Báo cáo sửa lỗi UI bổ sung

## Đã sửa

### 1. Phòng nghỉ

**1.1 — Nav đổi màu sai khi cuộn (chữ đen → trắng, chìm vào nền).**
Nguyên nhân gốc: `Header.tsx` (từ Phase 6.5) có logic đổi trạng thái theo `scrollY` — trong suốt/chữ trắng lúc đầu trang, chuyển nền đục/chữ tối sau khi cuộn qua 40px. Quyết định này dựa trên suy đoán, KHÔNG có căn cứ trực tiếp từ File B. Đã đối chiếu lại ảnh nhúng gốc PDF ở 8 trang (Trang chủ, Về chúng tôi, Phòng nghỉ, Trải nghiệm, Thư viện, Central, Little Bay, Ưu đãi) và xác nhận header tham chiếu LUÔN LUÔN là nền sáng đục (cream) + chữ tối, không có trạng thái trong suốt nào. Đã bỏ hoàn toàn logic đổi màu theo scroll — Header giờ luôn đục/chữ tối, đọc được trên mọi nền.

**1.2 — Footer bị nhảy lên trên.**
Đã điều tra: loại trừ các nguyên nhân phổ biến (không có pattern sticky-footer flex sai, không có margin âm, không có ảnh gây layout-shift ở Footer/RoomGallery). Phát hiện cụ thể xác minh được: trang `/phong-nghi` (danh sách) không có Hero, section đầu chỉ dùng `py-16 md:py-24` (64px/96px) — KHÔNG đủ để né Header `position: fixed` (cao 80px/96px), khiến nội dung đầu trang bị Header đè lên. Đã sửa thành `pt-32 md:pt-40`, khớp đúng khoảng đệm đã dùng ở trang chi tiết phòng. Việc bỏ logic scroll-toggle ở Header cũng loại bỏ 1 nhóm lỗi timing/stale-state tiềm ẩn có thể góp phần gây triệu chứng này.
*Lưu ý trung thực: không có browser thật để cuộn trang và xác nhận 100% đây là nguyên nhân duy nhất — xem "Vấn đề còn tồn đọng".*

### 2. Trải nghiệm

**2.1 — Section "OUR STAYS" sai bố cục, dính vào section phía trên.**
Đối chiếu trực tiếp File B trang 4 (ảnh nhúng gốc): khối chữ (label "OUR STAYS" + heading + mô tả + chữ ký "Same place / A different you") và 3 ảnh cơ sở nằm CHUNG 1 hàng — chữ là 1 cột bên TRÁI, 3 ảnh xếp bên PHẢI. Bản cũ tách thành 2 hàng riêng (chữ ở trên, 3 ảnh ở dưới) và section không có `padding-top` nên bị dính vào section tối phía trên. Đã đổi sang lưới 4 cột đều (`md:grid-cols-4`, 1 cột chữ + 3 cột ảnh, căn giữa dọc) và thêm `pt-16 md:pt-20`. Mobile tự xếp dọc từng khối, không tràn ngang.

### 3. Thư viện

**3.1 — Nav biến mất khi cuộn.**
Cùng nguyên nhân gốc với mục 1.1 (Header scroll-toggle) — đã sửa tại nguồn (`Header.tsx`). Đồng thời trang `/thu-vien` (danh sách) có cùng vấn đề thiếu padding-top như `/phong-nghi` — đã sửa `pt-32 md:pt-40` tương tự.

**3.2 — Nút "Xem thư viện..." đè lên tag chữ bên phải.**
Nguyên nhân: `PropertyOverlayCard.tsx` dùng nút cỡ mặc định (`px-6 py-3 text-sm`) cho nhãn động dài (vd. "XEM THƯ VIỆN EMBER STYLE"), khiến nút tràn sang vùng tag góc dưới-phải. Đối chiếu File B trang 5 xác nhận tham chiếu dùng nút nhỏ/gọn hơn nhiều. Đã thêm prop `size` ("sm" | "md") cho component `Button` dùng chung (mặc định "md" — không đổi bất kỳ nơi nào khác đang dùng Button), áp dụng `size="sm"` cho `PropertyOverlayCard`, đồng thời giới hạn `max-width` khối chữ/nút (68%/65%) và giảm cỡ chữ tag (`text-xs` → `text-[10px]`) làm lớp an toàn bổ sung.

### 4. Liên hệ (sửa mở rộng nhất — đối chiếu trực tiếp ảnh nhúng gốc File B trang 10)

**4.1 + 4.2 — Thiếu banner đúng ảnh, sai text.**
Bản cũ dùng lại component `<Hero>` dùng chung với ảnh SAI (`hero-home.jpg` của Trang chủ) và text SAI ("Chúng tôi luôn sẵn sàng hỗ trợ." — không có trong PDF). Tham chiếu thật là bố cục CHIA ĐÔI (khác hẳn kiểu Hero ảnh-full-bleed-overlay-tối dùng ở mọi trang khác): khối chữ trên nền cream bên TRÁI ("LIÊN HỆ" / "Mỗi hành trình, một điểm chạm." / mô tả / "SAME PLACES, A DIFFERENT YOU.") + ảnh nội thất (cửa sổ, bàn, đèn, bình hoa, sách "The Art of Staying") bleed sát mép phải màn hình, có tag nhỏ "People / Places / Moments / A warmer you." góc trên-phải ảnh. Đã viết section riêng cho đúng trang này (không ép vào `<Hero>` chung). Ảnh banner được cắt SẠCH từ ảnh nhúng gốc PDF (loại bỏ vùng có chữ nhúng sẵn), chữ tag hiển thị bằng text thật (nhất quán với cách các trang khác dùng `topRightTag`).

**4.3, 4.5, 4.6 — Thiếu mô tả, icon, label từng mục.**
`ContactCard.tsx` viết lại: bổ sung tagline CONFIRMED riêng cho từng cơ sở (gạch chân nhỏ + chữ nghiêng), label "Hotline"/"Email" kèm icon (icon điện thoại dùng lại đúng path đã có ở `StickyContactWidget.tsx` — không vẽ icon mới), và tag nhỏ góc dưới-phải (CITY/PEOPLE/CONNECTIONS...).

**4.4 — Yêu cầu chữ đè lên ảnh (theo mô tả lỗi).**
ĐÃ KIỂM TRA TRỰC TIẾP ảnh nhúng gốc File B trang 10 (phóng to từng card) và xác nhận tham chiếu thật **KHÔNG** đè chữ lên ảnh — chữ nằm ở khối riêng bên dưới ảnh, nền cream giống nền trang. Theo đúng CLAUDE.md mục 2 ("File PDF là nguồn sự thật"), đã làm theo ảnh gốc thay vì mô tả lỗi, giữ nguyên cấu trúc ảnh-trên/chữ-dưới đã có (đúng), chỉ bổ sung nội dung còn thiếu. **Cần xác nhận lại** nếu ý muốn thực sự là overlay khác với PDF.

**4.7 — Ảnh 3 cơ sở bị cắt sai.**
Phát hiện: ảnh cũ (`contact-*.jpg`) thực chất là ảnh chụp NGUYÊN 1 trang mockup khác (`/phong-nghi/:hotel` hoặc `/thu-vien/:hotel`) — còn nguyên nav bar, nút "ĐẶT PHÒNG", heading, mô tả, nút CTA của trang đó đè lên ảnh toà nhà. Đã thay bằng ảnh cắt SẠCH (chỉ còn kiến trúc, giữ nguyên kiến trúc gốc, không dùng AI vẽ lại) từ đúng ảnh nhúng gốc File B trang 6/7/8 (ảnh hero riêng từng cơ sở, độ phân giải gốc 1024×1536 — cao hơn nhiều so với bản cũ).

**4.8 — Thiếu nút "Liên hệ...".**
Đã thêm nút "LIÊN HỆ [Tên cơ sở]" (nút đặc, có mũi tên) cho mỗi card, dùng `tel:` trực tiếp tới hotline cơ sở đó (hành vi CTA vẫn [CHƯA XÁC ĐỊNH] trong mockup — giữ nguyên quyết định an toàn từ trước, không tự bịa modal/trang riêng).

**4.9 — Thiếu section cuối "Túi Ba Gang - Đà Lạt...".**
Đã thêm section "TÚI BA GANG — ĐÀ LẠT / Three places. One way of welcoming you." — dùng lại ảnh núi đồi Đà Lạt sương mù có sẵn (`dalat-lake-church-mist.webp`, đã dùng ở trang Trải nghiệm) thay vì trích ảnh có chữ nhúng sẵn từ PDF (không tách được chữ khỏi ảnh nền gốc). **Khác nhẹ so với PDF**: ảnh có thêm nhà thờ nhỏ mà PDF gốc không có — xem "Vấn đề còn tồn đọng".

### Phát hiện thêm (ngoài danh sách gốc, tự sửa vì cùng nguồn xác minh)
- Tagline Central: "Ở giữa Đà Lạt, **gắn** hơn với mọi cuộc hẹn." → sửa thành "**gần** hơn" (lỗi chính tả, xác minh qua ảnh nhúng PDF trang 10, áp dụng cho cả `library.ts` dùng chung ở trang Thư viện).
- Hotline Little Bay: `0263 361 9977` → `0263 361 9777` (đảo số, xác minh qua ảnh nhúng PDF trang 10).

## Chưa hoàn thành
- Không có mục nào trong danh sách 9 lỗi + 4 trang bị bỏ sót — tất cả đã được xử lý.

## Files changed

| File | Lý do |
|---|---|
| `components/layout/Header.tsx` | Bỏ logic đổi màu/ẩn theo scroll — sửa 1.1, hỗ trợ 3.1 |
| `components/ui/Button.tsx` | Thêm prop `size` ("sm"/"md") — hỗ trợ 3.2 |
| `components/hotel/PropertyOverlayCard.tsx` | Dùng `size="sm"`, giới hạn max-width, giảm cỡ tag — sửa 3.2 |
| `app/phong-nghi/page.tsx` | Sửa padding-top né Header fixed — sửa 1.2 |
| `app/thu-vien/page.tsx` | Sửa padding-top né Header fixed — hỗ trợ 3.1 |
| `app/trai-nghiem/page.tsx` | Viết lại section OUR STAYS — sửa 2.1 |
| `app/lien-he/page.tsx` | Viết lại banner + final section — sửa 4.1, 4.2, 4.9 |
| `components/hotel/ContactCard.tsx` | Viết lại: icon, label, tag, nút — sửa 4.3, 4.5, 4.6, 4.8 |
| `lib/content/contact.ts` (mới) | Nội dung CONFIRMED riêng cho trang Liên hệ |
| `lib/content/library.ts` | Sửa lỗi chính tả "gắn hơn" → "gần hơn" |
| `lib/content/properties.ts` | Sửa lỗi hotline Little Bay 9977 → 9777 |

## Images changed

| File | Nguồn | Kích thước | Ghi chú |
|---|---|---|---|
| `public/images/contact-central.jpg` | Cắt sạch từ ảnh nhúng gốc File B trang 6 (`pdfimages`) | 520×496 JPEG | Thay ảnh cũ có nguyên UI trang khác đè lên |
| `public/images/contact-ember-style.jpg` | Cắt sạch từ ảnh nhúng gốc File B trang 7 | 430×448 JPEG | nt |
| `public/images/contact-little-bay.jpg` | Cắt sạch từ ảnh nhúng gốc File B trang 8 | 644×385 JPEG | nt |
| `public/images/contact-banner.jpg` (mới) | Cắt từ ảnh nhúng gốc File B trang 10, loại bỏ vùng chữ | 475×290 JPEG | Dùng cho banner Liên hệ |

Không tạo variant desktop/mobile riêng cho các ảnh trên — dùng `object-cover` với `aspect-[4/3]` (card) và full-bleed responsive (banner), đủ đáp ứng mọi kích thước khung hiện có.

## Test results

- **TypeScript** (tsc smoke-test thay thế, vì sandbox không có `node_modules`): **PASS** — không phát sinh lỗi mới ở bất kỳ file nào đã sửa trong phase này. Các lỗi còn lại trong log smoke-test là do hạn chế của bộ stub giả lập (thiếu `@types/react`/`next` thật) và xuất hiện ĐỒNG ĐỀU ở cả những file hoàn toàn không đụng tới trong phase này — xác nhận không phải regression.
- **Lint** (`next lint`): **KHÔNG THỂ CHẠY** — sandbox xác nhận không có quyền truy cập npm registry (`npm ping` → 403 Forbidden), không cài được `node_modules`.
- **Build** (`next build`): **KHÔNG THỂ CHẠY** — cùng lý do.
- **Responsive**: không có Next.js dev server thật để mở trực tiếp. Đã dùng phương án thay thế: dựng lại tĩnh (HTML/CSS thủ công mô phỏng đúng cấu trúc/lớp Tailwind thực tế của code đã sửa) + chụp ảnh bằng Chromium/Playwright ở 1280px và ~390-450px cho: banner + card Liên hệ, section OUR STAYS, PropertyOverlayCard với nhãn dài. Kết quả: đúng bố cục yêu cầu, không đè chữ/ảnh, không tràn ngang. **Đây là bằng chứng thực nghiệm tốt nhất có thể trong điều kiện hiện tại, KHÔNG phải kết quả từ Next.js thật — không khẳng định tuyệt đối giống 100%.**
- **Regression**: đã đọc lại Header/Footer dùng chung và xác nhận `Button` mặc định `size="md"` tạo ra CHÍNH XÁC class cũ (`px-6 py-3 text-sm`) — không đổi bất kỳ nơi nào khác đang dùng `Button` mà không truyền `size`. Chưa chụp ảnh thực nghiệm riêng cho Trang chủ/Về chúng tôi/Ưu đãi (không có thay đổi trực tiếp nào chạm các trang này ngoài Header/Button đã xác nhận an toàn qua đọc code + tsc).

## Vấn đề phát hiện / Cần tôi xác nhận
1. **Bug 1.2 (footer nhảy lên)**: đã sửa nguyên nhân cụ thể xác minh được, nhưng không có browser thật để cuộn và xác nhận tuyệt đối đây là nguyên nhân duy nhất. Nhờ kiểm tra lại bằng mắt sau khi build thật.
2. **Bug 4.4**: mô tả yêu cầu (bản tiếng Anh) nói chữ phải đè lên ảnh, nhưng ảnh gốc File B trang 10 cho thấy chữ nằm RIÊNG dưới ảnh — đã làm theo ảnh gốc. Xin xác nhận nếu ý muốn thực sự khác PDF.
3. **Section cuối Liên hệ (4.9)**: dùng ảnh núi đồi có sẵn thay vì ảnh gốc PDF (có chữ nhúng không tách được) — ảnh thay thế có thêm nhà thờ nhỏ mà PDF không có. Xin xác nhận nếu cần ảnh khác/cần xử lý ảnh gốc kỹ hơn.
4. Ảnh Liên hệ (banner + 3 ảnh cơ sở) đang ở độ phân giải gốc tối đa lấy được từ PDF — có thể hơi mềm nếu phóng to trên màn hình rất lớn (>1440px). Nếu có ảnh gốc chất lượng cao hơn (ngoài PDF), nên thay thế sau.
5. Không build/lint/dev-server thật được do sandbox không có quyền truy cập npm registry.

## Phase tiếp theo
Chờ xác nhận các mục trên (đặc biệt mục 2, 3) và chờ phản hồi sau khi kiểm tra bằng mắt trên môi trường có thể chạy `npm run dev` thật.
