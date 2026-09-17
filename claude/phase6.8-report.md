# Phase 6.8 — Báo cáo UI FIX: Final Visual Alignment & Responsive

Phạm vi: sửa lỗi hiển thị/responsive/nội dung theo danh sách bug cụ thể anh gửi — KHÔNG dựng lại, KHÔNG đổi hướng thiết kế, KHÔNG viết lại component đang chạy đúng. Với mỗi mục đã tìm nguyên nhân gốc trước khi sửa (đọc code thật, đối chiếu File B/PDF concept, dựng lại tĩnh bằng Playwright + Chromium thật để kiểm chứng khi có thể) theo đúng phương pháp anh yêu cầu.

## Đã sửa

### 1. Global — Nav & Typography

**1.1 Nav khó đọc lúc đầu trang / sau khi cuộn**
Nguyên nhân: Phase 6.7 đổi Header sang trong suốt hoàn toàn và chọn màu chữ (`inverse`) theo 1 giá trị TĨNH theo route (có Hero → chữ sáng, không Hero → chữ tối). Với các trang có Hero, giá trị này không đổi khi cuộn — nên sau khi cuộn qua khỏi ảnh Hero, Header vẫn hiện chữ sáng trong khi đang đè lên nền cream sáng phía dưới → không đọc được. Đây là lỗi thật (client phản hồi trên bản chạy thật), không phải suy đoán.

Cách sửa (KHÔNG quay lại scroll-toggle NỀN của Phase 6.5 — nền Header vẫn luôn trong suốt tuyệt đối, chỉ đổi MÀU CHỮ, và đổi theo vị trí THẬT của Hero, không đoán ngưỡng px):
- `components/hero/Hero.tsx`: thêm 1 phần tử "cột mốc" vô hình `<div id="hero-sentinel">` đặt đúng mép dưới ảnh Hero (cao 1px, không chiếm chỗ, không hiển thị).
- `components/layout/Header.tsx`: dùng `IntersectionObserver` theo dõi đúng phần tử này (qua `id`, vì Header và Hero là 2 component độc lập, không có quan hệ cha-con trong `app/layout.tsx`) — còn thấy sentinel (chưa cuộn hết Hero) → `inverse=true` (chữ sáng); hết thấy (đã cuộn qua Hero) → `inverse=false` (chữ tối). `rootMargin: "-96px 0px 0px 0px"` trừ hao đúng chiều cao Header để đổi màu ngay khi mép dưới Hero chạm mép dưới Header, tránh 1 khoảng ngắn chữ sáng đè lên nền sáng.
- Trang KHÔNG có Hero giữ nguyên `inverse=false` cố định như Phase 6.7 (không có ảnh nào để cuộn qua nên không cần theo dõi).

Đã kiểm chứng bằng dựng lại tĩnh HTML/CSS + `IntersectionObserver` thật (không phải mô phỏng), chụp bằng Chromium thật ở nhiều vị trí cuộn: chữ Header chuyển sáng→tối đúng thời điểm cuộn qua mép dưới Hero, không có khoảng chờ/nhấp nháy sai màu.

**1.2 Chuẩn hoá typography tagline "People Places Moments A warmer you."**
Nguyên nhân: kiểu chữ này (chữ hoa, nhiều dòng, cỡ nhỏ) trước đó được viết lặp lại độc lập ở 4-5 nơi (`Hero`, `PropertyOverlayCard`, `OfferCard`, `ContactCard`, banner `/lien-he`) với font-size/italic/opacity không đồng nhất — đúng dạng lỗi "duplicate code" mà CLAUDE.md mục 5 yêu cầu tránh.

Đã tạo `components/ui/CornerTagList.tsx` — component dùng chung duy nhất cho kiểu tag này, nhận `lines: readonly string[]`, `inverse?: boolean` (sáng/tối tuỳ nền), `className?`. Đã thay thế toàn bộ 5 chỗ nói trên bằng `CornerTagList`, xoá code trùng lặp cũ. Kết quả: typography nhất quán 100% giữa các trang.

### 2. Tab Phòng nghỉ — Footer "nhảy lên" (bug fix, tìm nguyên nhân gốc)

Nguyên nhân thật: `app/layout.tsx` trước đó KHÔNG có `min-height`/`flex` ở cấp `<body>` — với các trang có ít nội dung (danh sách Phòng nghỉ khi ít item, hoặc màn hình cao), tổng chiều cao nội dung < chiều cao viewport, nên Footer (nằm cuối flow tài liệu bình thường) bị đẩy lên nằm giữa màn hình thay vì dính đáy. Đây KHÔNG phải lỗi riêng của trang Phòng nghỉ mà là lỗi cấu trúc layout gốc, chỉ lộ rõ ở trang có ít nội dung nhất — nên sửa tại `layout.tsx` (áp dụng chung), không phải thêm margin riêng cho từng trang (cách đó chỉ che triệu chứng, không sửa nguyên nhân, và CLAUDE.md mục 5 yêu cầu không vá tạm).

Đã sửa: `<body className="flex min-h-screen flex-col">`, bọc `{children}` trong `<main className="flex-1">`. Đây là mẫu "sticky footer" chuẩn bằng flexbox — Footer luôn dính đáy khi nội dung ngắn, và vẫn nằm đúng cuối trang khi nội dung dài (không đè/không cắt).

Khác với Phase 6.6 (phase đó sửa padding-top để nội dung không bị Header fixed che mất — lỗi ở ĐẦU trang) — đây là lỗi ở CUỐI trang, nguyên nhân và vị trí sửa hoàn toàn khác, không phải lặp lại.

Đã kiểm chứng bằng dựng lại tĩnh 1 trang nội dung ngắn (mô phỏng danh sách Phòng nghỉ khi ít phòng) — Footer dính đáy đúng như kỳ vọng.

### 3. Tab Thư viện — Tag "A DIFFERENT YOU" xuống 2 dòng

Nguyên nhân: tag 3 dòng (PEOPLE/PLACES/MOMENTS.../A DIFFERENT YOU) đặt trong `PropertyOverlayCard` — ở độ rộng card tại breakpoint `md` (2 cột), dòng cuối "A DIFFERENT YOU" (dài nhất) không đủ chỗ ngang, bị wrap xuống 2 dòng. Đã tái hiện bằng Playwright ở đúng độ rộng card tại `md` và xác nhận đây là lỗi thật (không đủ khoảng trống ngang), không phải lỗi CSS `white-space`.

Đã sửa: cùng nguyên nhân/cách sửa với mục 1.2 — dùng chung `CornerTagList`, đồng thời đổi điều kiện hiện tag từ `md:block` sang `xl:block` (chỉ hiện từ độ rộng đủ chỗ ngang thật sự, đã đo trực tiếp bằng Playwright), và thu hẹp khối tên cơ sở bên cạnh (`max-w-[55%] md:max-w-[58%]`) để 2 khối không tranh chỗ nhau. Đã kiểm chứng lại bằng Playwright ở đúng độ rộng `xl` — tag hiện đủ 1 hàng/dòng theo đúng số dòng dữ liệu, không tràn, không đè.

### 4. Tab Ưu đãi — Tag che nút "KHÁM PHÁ ƯU ĐÃI"

Nguyên nhân: cùng root cause với mục 3 — `OfferCard` dùng nút cỡ mặc định (`md`, to) + tag 3 dòng trong cùng 1 hàng ở card hẹp, không đủ chỗ ngang nên tag bị đẩy xuống đè lên nút.

Đã sửa: đổi nút sang `Button size="sm"` (prop đã có sẵn từ Phase 6.6, không phải thêm mới — chỉ áp dụng cho đúng chỗ này) để đủ chỗ hơn, và áp dụng cùng cách sửa `xl:block` như mục 3. Đã kiểm chứng bằng Playwright ở độ rộng card tại tablet (768–1024px) và `xl` — không còn chồng nhau.

### 5. `/thu-vien/central`

**5.1 Banner subheadline dính chữ + sai vị trí**
Nguyên nhân: dòng tag phụ (subheadline dạng "PEOPLE/PLACES/A SLOWER WAY"-style, có gạch ngang) trước đó dùng chung `children` với nút CTA trong `Hero` — `children` được render CÙNG HÀNG với nút CTA (đúng thiết kế cho chỗ khác, vd. `VideoButton` ở Trải nghiệm), nên ở đây bị đẩy lên NGANG HÀNG, BÊN CẠNH nút thay vì nằm Ở RIÊNG 1 HÀNG PHÍA TRÊN nút như File B trang 6.

Đã sửa: thêm prop mới `dashTag?: ReactNode` trong `Hero.tsx`, TÁCH RIÊNG khỏi `children` (không sửa `children` để tránh hỏng chỗ khác đang dùng đúng — vd. Trải nghiệm), render `dashTag` ở khối riêng ngay trên hàng CTA. `app/thu-vien/[hotel]/page.tsx` cập nhật dùng `dashTag` cho đúng 3 trang cơ sở.

**5.2 OUR STORY: ảnh nên ngang + thiếu nút "Tìm hiểu câu chuyện" + nền be**
- Vấn đề "ảnh không ngang": đã đối chiếu — ảnh nguồn (`story-central.jpg`) BẢN THÂN đã là ảnh ngang, nhưng wrapper CSS dùng `aspect-[4/5]` (tỷ lệ dọc) ép ảnh hiển thị theo khung dọc → cắt/méo cảm giác "ảnh dọc" dù ảnh gốc ngang. Đây là lỗi CSS thuần, không cần ảnh mới (tránh tốn công tạo ảnh không cần thiết). Đã sửa wrapper sang `aspect-[16/10]` (ngang) và đổi lại thứ tự cột: chữ trái/ảnh phải (bản trước bị đảo ngược so với File B trang 6).
- Nút "Tìm hiểu câu chuyện": đã thêm lại — `lib/types.ts` bổ sung `story.ctaLabel: string`, `lib/content/properties.ts` gán `"TÌM HIỂU CÂU CHUYỆN"` cho Central, render dạng link gạch ngang dưới đoạn mô tả (khớp kiểu CTA phụ dùng ở nơi khác trong site, không tự sáng tác kiểu mới).
- Nền be: section đổi sang `bg-cream-200` (be nhạt) khớp tham chiếu File B thay vì nền trắng/cream-50 mặc định trước đó.

**5.3 TIỆN NGHI: layout/icon-size/spacing/nền be**
Đã đối chiếu File B trang 6 — bố cục tham chiếu là 1 hàng ngang: khối tiêu đề bên trái + các icon tiện nghi xếp ngang bên phải, có gạch dọc phân cách giữa các mục, nền be, icon dạng line-art nhỏ (không có khung tròn bao quanh). Bản trước đó dùng grid dọc, icon có nền tròn to, không có nền be.

Đã sửa `components/hotel/AmenityIconList.tsx`: thêm prop `divided?: boolean` — nhánh mới render icon TRẦN (không khung tròn) + gạch dọc phân cách (`md:border-l md:pl-6`) giữa các mục; giữ nguyên nhánh cũ (không đổi) cho nơi khác nếu có dùng khác kiểu. `app/thu-vien/[hotel]/page.tsx`: section bọc `bg-cream-200`, bố cục `md:grid md:grid-cols-[0.8fr_2.2fr]` (khối tiêu đề hẹp trái, hàng icon rộng phải) — dùng chung cho Central/Little Bay; nhánh nền tối riêng của Ember Style giữ nguyên không đụng tới (đúng yêu cầu "không tự ý đổi kiến trúc đã thống nhất" — Ember vốn có bảng màu tối riêng, khác 2 cơ sở kia). KHÔNG thu nhỏ chiều cao section một cách tuỳ tiện — chiều cao hiện tại là hệ quả tự nhiên của bố cục hàng ngang mới (thấp hơn bản grid dọc cũ vì không còn xếp icon thành nhiều hàng), không phải ép cứng 1 số px.

**5.4 PHÒNG NGHỈ preview: layout + ảnh phòng chất lượng thấp**
- Layout: đổi từ dạng cũ sang bố cục 1 hàng ngang (text giới thiệu + N card phòng cùng hàng) — tái sử dụng đúng pattern "OUR STAYS" đã dùng ở Trải nghiệm (Phase 6.6/6.7), tránh viết lại logic tương tự lần nữa (đúng CLAUDE.md mục 5 "component tái sử dụng").
- Ảnh chất lượng thấp: đã xác nhận bằng cách xem trực tiếp — ảnh phòng "Deluxe Plus" và "Premier Family" của Central trước đó là ảnh watermark/độ phân giải thấp không đạt chuẩn hiển thị web. Đã tìm thấy PDF thứ 2 (`TUI_BA_GANG_CONCEPT._CA__P_NHA__T.pdf`, 54 trang, "Túi Ba Gang Hotel — Concept Round 2") — xác nhận đây là bộ concept kiến trúc CHÍNH THỨC của Central (đối chiếu mặt tiền trong PDF khớp chính xác ảnh hero thật của Central đang dùng trên site) — dùng làm nguồn ảnh sạch, đúng theo yêu cầu "ưu tiên trích ảnh gốc thay vì tự tạo ảnh AI cho kiến trúc/nội thất". Đã trích xuất 4 ảnh 990×680 từ các trang 45/35/31/50 của PDF này, đặt tên `room-central-deluxe-plus-1/2.jpg`, `room-central-premier-family-1/2.jpg`, thay cho ảnh cũ.

**5.5 BREAKFAST TIME: thiếu ảnh, layout, mô tả, nút**
Đã đối chiếu File B trang 6 — bố cục tham chiếu: ảnh lớn trái + khối chữ (nhãn/tiêu đề/mô tả/nút) giữa + ảnh vuông nhỏ có caption in nghiêng "Good Food / Good Mood" bên phải + 1 dòng ghi chú nhỏ dưới ảnh vuông. Bản trước đó thiếu hẳn ảnh vuông + caption + ghi chú + nút.

Đã sửa: `lib/types.ts` bổ sung `dining.secondaryImage`, `secondaryCaption`, `note`, `ctaLabel`; `lib/content/properties.ts` gán dữ liệu Central tương ứng. `app/thu-vien/[hotel]/page.tsx` viết lại section theo bố cục 3 cột `md:grid-cols-[1.2fr_1fr_0.8fr]`. Ảnh vuông phụ (`dining-central-square.jpg`, 595×595) được crop từ chính ảnh ẩm thực Central đang có sẵn (`dining-central.jpg`) — đây là **giải pháp tạm** (placeholder), vì chưa có ảnh food photography vuông riêng cho vị trí này trong bất kỳ nguồn PDF nào — nêu rõ ở mục "Vấn đề phát hiện" bên dưới.

### 6. `/thu-vien/ember-style`

**6.1 Banner subheadline dính chữ/sai vị trí** — cùng nguyên nhân và cách sửa mục 5.1 (`dashTag`).

**6.2 OUR STORY cần 3 ảnh ngang (chỉ có 1 ảnh)**
Đã đối chiếu File B trang 7 — tham chiếu dùng collage 3 ảnh (1 ảnh dọc lớn bên trái/phải + 2 ảnh ngang nhỏ xếp chồng), không phải 1 ảnh đơn như Central. Đã đổi `Property.story.image` (string đơn) thành `story.images: string[]` trong `lib/types.ts` để hỗ trợ cả 2 dạng dữ liệu (Central 1 ảnh ngang, Ember 3 ảnh) mà không phải tách file riêng cho từng cơ sở. Đã trích 3 ảnh mới từ mockup PDF trang 7 (300dpi): `story-ember-style-1.jpg` (540×800, ảnh dọc lớn), `story-ember-style-2.jpg` (515×360), `story-ember-style-3.jpg` (515×420). `app/thu-vien/[hotel]/page.tsx` render nhánh collage khi `story.images.length >= 3`, nhánh ảnh đơn khi ít hơn — logic rẽ nhánh theo DỮ LIỆU thật, không hard-code riêng "nếu là Ember thì...".

**6.3 ROOMS & SUITES phải nằm ngang trên desktop**
Nhân tiện phát hiện: preview phòng của Ember trước đó hard-code hiển thị 3 phòng, nhưng dữ liệu `rooms.ts` có 4 loại phòng và File B trang 7 cho thấy 4 card cùng hàng. Đã thêm `roomsSection.previewCount?: number` vào `lib/types.ts`, gán `4` cho Ember trong `properties.ts`; component preview dùng `md:grid-cols-4`/`5` tuỳ `previewCount` (đúng pattern tái sử dụng ở mục 5.4).

**6.4 Final CTA: chữ trái/nút phải cùng hàng**
Đã đối chiếu File B trang 7 — băng CTA cuối trang là 1 hàng ngang: khối tagline + tên cơ sở bên trái, nút "ĐẶT PHÒNG NGAY" bên phải, cùng 1 hàng ở desktop (xếp chồng dọc ở mobile). Bản trước đó xếp dọc kể cả desktop. Đã sửa `closingBanner` trong `app/thu-vien/[hotel]/page.tsx` sang `md:flex md:flex-row md:justify-between`.

### 7. `/thu-vien/little-bay`

**7.1 Banner subheadline dính chữ/sai vị trí** — cùng nguyên nhân/cách sửa mục 5.1.

**7.2 "THIÊN NHIÊN..." layout/spacing/nền be** — dùng chung code path đã sửa ở mục 5.3 (Tiện nghi bố cục hàng ngang + nền `bg-cream-200`) vì Little Bay và Central dùng chung 1 nhánh code (không có bảng màu tối riêng như Ember).

**7.3 Lỗi ngắt dòng "Một không gian / dành cho..."**
Đã kiểm tra kỹ: code hiện tại DÙNG ĐÚNG pattern ngắt dòng bằng `<span className="block">` cho từng dòng riêng — pattern y hệt đang dùng thành công ở mọi heading khác trong site (kể cả Central/Ember không bị lỗi này). Không tìm thấy nguyên nhân code nào gây ra hiện tượng dính chữ/ngắt sai như mô tả. **Không sửa** vì không có lỗi tái hiện được trong code — nếu tự đổi mà không rõ nguyên nhân sẽ vi phạm CLAUDE.md mục 5 ("không sửa code không liên quan"/không suy đoán). Đã ghi vào mục "Cần tôi xác nhận" bên dưới — có thể đây là hiện tượng chỉ thấy được khi chạy `npm run dev` thật (font-loading/kerning thật khác với bản dựng tĩnh), cần anh xác nhận lại bằng mắt trên môi trường chạy thật.

**7.4 Final CTA: chữ trái/nút phải cùng hàng**
Dùng chung code path đã sửa ở mục 6.4. **Phát hiện xung đột PDF vs. yêu cầu**: File B trang 8 cho thấy băng CTA cuối trang của Little Bay KHÔNG có nút "ĐẶT PHÒNG NGAY" nào cả (chỉ có tagline + tên cơ sở). Yêu cầu Phase 6.8 lại yêu cầu "text trái / CTA phải cùng hàng" cho mục này. Đã xử lý: GIỮ nút "ĐẶT PHÒNG NGAY" hiện có (chức năng đặt phòng quan trọng, bỏ đi có thể ảnh hưởng nghiệp vụ) đồng thời áp dụng đúng bố cục hàng ngang được yêu cầu — không tự ý bỏ nút theo PDF cũng không tự ý phớt lờ yêu cầu mới, mà nêu rõ xung đột này ở đây để anh xác nhận hướng đúng (xem "Cần tôi xác nhận").

### 8. Tab Liên hệ

**8.1 Vị trí tag so với nút "Liên hệ..."** — cùng nguyên nhân/cách sửa mục 3/4: `ContactCard.tsx` đổi nút sang `size="sm"` + tag chỉ hiện từ `xl:block`.

**8.2 Chuẩn hoá typography "Three places..."** — banner và block cuối trang (`finalSection`) của `/lien-he` trước đó dùng kiểu chữ nghiêng serif riêng, khác các tagline khác trong site. Đã đổi sang dùng chung `CornerTagList` (banner) và style gạch-ngang + chữ hoa nhất quán (khối cuối trang) — khớp mục 1.2.

## Responsive (1440 / 1280 / 1024 / 768 / 390 / 375)

Đã kiểm tra bằng dựng lại tĩnh HTML/CSS (Tailwind CDN bị chặn trong sandbox nên dùng CSS thuần viết tay đúng theo class thật trong code) + Chromium thật qua Playwright, dùng ảnh thật của dự án qua `file://`. Đã resize/chụp ở các độ rộng trên cho: Header scroll (mục 1.1), overlap tag/nút (mục 3/4/8.1) — đặc biệt phát hiện 1 lỗi THẬT ở bước này (xem "Vấn đề phát hiện" #1 trong Phase 6.8 làm việc — đã sửa), Our Story 1-ảnh và 3-ảnh (mục 5.2/6.2), Tiện nghi hàng ngang (mục 5.3), Phòng nghỉ preview hàng ngang (mục 5.4), Breakfast 3 cột (mục 5.5), Final CTA hàng ngang (mục 6.4/7.4), Footer sticky (mục 2). Tất cả đều hiển thị đúng, không tràn ngang, không đè chữ ở các độ rộng đã kiểm.

**Giới hạn cần nêu rõ**: đây là bản dựng lại tĩnh phản ánh ĐÚNG cấu trúc CSS/class thật trong code, KHÔNG phải `next dev` server thật đang chạy Next.js/React thật (sandbox không có quyền truy cập npm registry để cài `node_modules`, xem mục Validation). Little Bay's Tiện nghi/closingBanner dùng chung code path đã test ở Central/Ember nhưng KHÔNG được chụp riêng — suy ra đúng bằng code review, chưa có ảnh chụp riêng cho Little Bay.

## Image Quality

| File | Nguồn | Kích thước | Mục đích |
|---|---|---|---|
| `room-central-deluxe-plus-1.jpg` | Trích từ `TUI_BA_GANG_CONCEPT._CA__P_NHA__T.pdf` trang 45 (concept kiến trúc chính thức Central) | 990×680 JPEG | Thay ảnh phòng Deluxe Plus chất lượng thấp/watermark |
| `room-central-deluxe-plus-2.jpg` | PDF concept trang 35 | 990×680 JPEG | nt |
| `room-central-premier-family-1.jpg` | PDF concept trang 31 | 990×680 JPEG | Thay ảnh phòng Premier Family chất lượng thấp |
| `room-central-premier-family-2.jpg` | PDF concept trang 50 | 990×680 JPEG | nt |
| `story-ember-style-1.jpg` | Trích từ File B (mockup PDF) trang 7, 300dpi | 540×800 JPEG | Ảnh dọc lớn trong collage OUR STORY Ember |
| `story-ember-style-2.jpg` | File B trang 7, 300dpi | 515×360 JPEG | Ảnh ngang nhỏ #1 trong collage |
| `story-ember-style-3.jpg` | File B trang 7, 300dpi | 515×420 JPEG | Ảnh ngang nhỏ #2 trong collage |
| `dining-central-square.jpg` | Crop từ `dining-central.jpg` đã có sẵn trong dự án | 595×595 JPEG | **Placeholder tạm** cho ảnh vuông caption "Good Food/Good Mood" — chưa có ảnh food photography vuông riêng trong nguồn nào |

Không có ảnh nào được AI-generate cho kiến trúc/nội thất trong phase này — đúng yêu cầu "ưu tiên trích ảnh gốc". File `dining-central-square.jpg` là crop từ ảnh thật (không phải AI), nhưng là giải pháp tạm về mặt NỘI DUNG (dùng lại đúng 1 tấm ảnh ở 2 chỗ trên cùng trang) — nêu ở "Vấn đề phát hiện".

Ghi chú dọn dẹp: `public/images/story-ember-style.jpg` (file ảnh đơn cũ, số ít) không còn được code nào tham chiếu sau khi đổi sang `story.images[]` — là file rác vô hại (không ảnh hưởng build/hiển thị), có thể xoá ở phase dọn dẹp sau nếu anh muốn.

## Files đã thay đổi

| File | Lý do |
|---|---|
| `components/layout/Header.tsx` | Mục 1.1 — logic đổi màu chữ theo `IntersectionObserver` |
| `components/hero/Hero.tsx` | Mục 1.1 (`#hero-sentinel`), 5.1/6.1/7.1 (`dashTag`), 1.2 (`CornerTagList` cho `topRightTag`) |
| `app/layout.tsx` | Mục 2 — sticky footer (`flex min-h-screen flex-col` + `main flex-1`) |
| `components/ui/CornerTagList.tsx` (MỚI) | Mục 1.2 — component dùng chung, thay 5 chỗ code trùng lặp |
| `components/hotel/PropertyOverlayCard.tsx` | Mục 3 — dùng `CornerTagList`, đổi `xl:block`, thu hẹp khối tên |
| `components/hotel/OfferCard.tsx` | Mục 4 — `Button size="sm"`, `CornerTagList` `xl:block` |
| `components/hotel/ContactCard.tsx` | Mục 8.1 — `Button size="sm"`, `CornerTagList` `xl:block` |
| `app/lien-he/page.tsx` | Mục 8.1/8.2 — banner + `finalSection` dùng `CornerTagList`/style nhất quán |
| `lib/types.ts` | Thêm `story.images[]`, `story.ctaLabel`, `dining.secondaryImage/secondaryCaption/note/ctaLabel`, `roomsSection.previewCount` |
| `lib/content/properties.ts` | Gán dữ liệu mới ở trên cho Central/Ember; sửa comment cũ tham chiếu `story.image` (số ít) đã lỗi thời |
| `components/hotel/AmenityIconList.tsx` | Mục 5.3/7.2 — thêm nhánh `divided` (icon trần + gạch dọc, nền be) |
| `app/thu-vien/[hotel]/page.tsx` | Viết lại: Hero `dashTag`, Our Story (1/3 ảnh), Tiện nghi hàng ngang, Phòng nghỉ preview hàng ngang, Breakfast 3 cột, closingBanner hàng ngang |

## Validation

| Hạng mục | Kết quả | Ghi chú |
|---|---|---|
| Lint (`next lint`) | **BLOCKED** | Sandbox không có quyền truy cập npm registry (không đổi từ các phase trước) |
| TypeScript | **PASS** | Bộ smoke-test thay thế (`tsc -p tsconfig.smoketest.json`, cấu hình `jsx: "preserve"` khớp `tsconfig.json` thật) — 0 lỗi MỚI. Các lỗi còn lại (`TS2322` liên quan tới prop `key` trong `.map()`) xuất hiện GIỐNG HỆT ở cả file có sửa (`app/lien-he/page.tsx`, `app/thu-vien/[hotel]/page.tsx`) VÀ file hoàn toàn không đụng tới (`app/page.tsx`, `app/trai-nghiem/page.tsx`, `components/room/RoomListWithFilter.tsx`...) — xác nhận đây là hạn chế của bộ stub thay thế (không mô phỏng đúng cách `@types/react` xử lý `key`), không phải lỗi thật. Temp files đã xoá sau khi chạy xong. |
| Build (`next build`) | **BLOCKED** | Cùng lý do npm registry |
| Responsive (1440/1280/1024/768/390/375) | **PASS (có giới hạn)** | Playwright + Chromium thật, dựng tĩnh đúng CSS/ảnh thật — xem chi tiết mục "Responsive" ở trên. KHÔNG phải `next dev` thật |
| Nav scroll (mục 1.1) | **PASS** | Test THẬT bằng `IntersectionObserver` + Chromium (không phải mô phỏng/suy đoán) |
| Regression (component dùng chung) | **PASS (code review, không phải chụp ảnh mới toàn bộ)** | Đã rà: `Hero.tsx` (`dashTag` optional, `hero-sentinel` không ảnh hưởng layout) và `Header.tsx` áp dụng cho MỌI trang dùng Hero kể cả trang không nằm trong phạm vi 6.8 (Trang chủ, Về chúng tôi, Đặt phòng, Phòng nghỉ/:hotel) — không có prop bắt buộc mới, hành vi cũ giữ nguyên khi không truyền `dashTag`. `AmenityIconList` prop `divided` chỉ dùng ở `/thu-vien/[hotel]` (không ảnh hưởng nơi khác). `Button size="sm"` là prop có sẵn từ Phase 6.6 (không phải thêm mới). Chưa chụp ảnh Playwright riêng cho Trang chủ/Về chúng tôi/Đặt phòng/Phòng nghỉ chi tiết phòng trong phase này — xác nhận an toàn bằng đọc code, không phải bằng ảnh chụp mới |

## Vấn đề phát hiện

1. **Mục 5.5**: ảnh vuông "Good Food/Good Mood" (`dining-central-square.jpg`) là crop tạm từ ảnh ẩm thực đã có, không phải ảnh food photography riêng — nên tấm ảnh gốc xuất hiện 2 lần trên cùng 1 trang (dạng ngang lớn + dạng vuông nhỏ). Cần ảnh thật riêng khi có nguồn.
2. **Mục 7.3**: không tìm được nguyên nhân code cho lỗi ngắt dòng "Một không gian dành cho..." của Little Bay — code hiện dùng đúng pattern đã chạy tốt ở nơi khác. Có thể chỉ thấy được khi chạy `npm run dev` thật (font/kerning thật khác bản dựng tĩnh dùng font hệ thống thay thế).
3. **Mục 7.4**: File B trang 8 (Little Bay) không có nút "ĐẶT PHÒNG NGAY" ở băng CTA cuối trang, nhưng yêu cầu Phase 6.8 lại yêu cầu bố cục "text trái/CTA phải". Đã giữ nút (chức năng nghiệp vụ quan trọng) + áp dụng bố cục hàng ngang — cần anh xác nhận đây có đúng ý muốn không.
4. Đích đến của nút "TÌM HIỂU CÂU CHUYỆN" (Our Story) và "KHÁM PHÁ ẨM THỰC" (Breakfast) hiện dùng fallback (link `#`/trang hiện tại) — **[CHƯA XÁC ĐỊNH]** vì File B không chỉ rõ 2 nút này dẫn tới đâu (trang riêng? phần cuộn trong trang? mở modal?).
5. Bộ ảnh concept kiến trúc chất lượng cao (PDF thứ 2) CHỈ có cho Central — Ember Style và Little Bay có kiến trúc khác hẳn nên không dùng chung được. Nếu sau này phát hiện ảnh phòng chất lượng thấp ở 2 cơ sở này, sẽ cần nguồn ảnh khác (chưa có sẵn trong 2 PDF hiện có).
6. File ảnh rác `public/images/story-ember-style.jpg` (số ít, không còn tham chiếu) — vô hại, có thể dọn ở phase sau.

## Cần tôi xác nhận

1. Xác nhận hướng xử lý mục 7.4 (giữ nút "ĐẶT PHÒNG NGAY" cho Little Bay dù PDF gốc không có) — giữ như hiện tại hay bỏ nút theo đúng PDF?
2. Xác nhận lại bằng mắt mục 7.3 (ngắt dòng Little Bay) trên môi trường `npm run dev` thật — nếu vẫn thấy lỗi, xin gửi ảnh chụp màn hình thực tế để xác định đúng nguyên nhân (khác với suy đoán từ code).
3. Ảnh vuông "Good Food/Good Mood" (mục 4 "Vấn đề phát hiện") — dùng tạm ảnh crop hiện tại hay chờ ảnh food photography riêng trước khi lên production?
4. Đích đến 2 nút CTA phụ (Our Story/Breakfast) ở mục 4 "Vấn đề phát hiện" — cần anh cung cấp hoặc xác nhận.

## Phase tiếp theo

Chờ anh xác nhận 4 điểm trên, và xác nhận lại bằng mắt trên môi trường chạy `npm run dev`/`npm run build` thật (sandbox hiện vẫn không có quyền truy cập npm registry nên Lint/Build vẫn ở trạng thái BLOCKED xuyên suốt các phase). Sau khi có phản hồi, có thể xử lý dứt điểm ảnh Breakfast thật (nếu anh cung cấp) và chốt lại mục 7.4/7.3.
