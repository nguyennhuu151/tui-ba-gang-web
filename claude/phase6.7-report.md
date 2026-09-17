# Phase 6.7 — Báo cáo sửa Trải nghiệm & Global Navigation

## Trải nghiệm

**Nguyên nhân**: `Header` dùng `position: fixed`, không chiếm chỗ trong luồng tài liệu. `Hero` (size "compact", dùng ở Trải nghiệm và 5 trang khác) có `pt-24` (96px) — đúng bằng chiều cao Header desktop (`md:h-24` = 96px), nên khoảng hở THẬT giữa mép dưới Header và "ĐÀ LẠT, VIỆT NAM" gần như bằng 0. Đã đo tỉ lệ trực tiếp trên File B trang 4 (khoảng cách mép dưới nav → đỉnh chữ locationTag ≈ 0.32 lần chiều cao nav) để tính khoảng hở cần thêm, không dùng số tuỳ ý.

**Thay đổi**: `components/hero/Hero.tsx` — đổi padding-top của size "compact" từ `pt-24` (cố định) thành `pt-28 md:pt-32` (112px mobile / 128px desktop = chiều cao Header + ~32px khoảng hở thật ở cả 2 breakpoint). Áp dụng cho Hero dùng chung (không tạo hack riêng cho 1 trang) vì cùng root cause ảnh hưởng mọi trang có Hero "compact" (Về chúng tôi, Ưu đãi, Phòng nghỉ/:hotel, Đặt phòng) — đúng theo yêu cầu "kiểm tra Navigation có dùng chung không và sửa theo cách tái sử dụng được".

**Kết quả**: đã dựng lại tĩnh (ảnh Hero thật của Trải nghiệm + cấu trúc/khoảng cách y hệt code) và chụp bằng Playwright ở 1280px — khoảng cách nav → "ĐÀ LẠT, VIỆT NAM" → headline đúng tỷ lệ tham chiếu, không đè/dính. Không overlap, không tràn ngang ở mobile.

## Navigation (Global)

**Nguyên nhân nền trắng/đục trước đó**: Ở Phase 6.6, sau khi đối chiếu ảnh nhúng gốc File B (8 trang) và thấy PDF luôn dùng nav đục/chữ tối (không có trạng thái trong suốt), Header đã được cố định thành `bg-cream-50/95 backdrop-blur` + `border-b`. Lần này anh yêu cầu trực tiếp đổi sang trong suốt hoàn toàn — đây là quyết định thiết kế mới, khác chủ đích với mockup PDF gốc (đã xác nhận lại rõ với anh trước khi sửa, tránh lặp lại việc tự suy đoán).

**Cách xử lý transparent**: `components/layout/Header.tsx` — bỏ hẳn `bg-cream-50/95`, `backdrop-blur`, `border-b`, đổi thành `bg-transparent`. Vì trang suốt sẽ để lộ trực tiếp nền phía dưới (ảnh Hero ở 1 số trang, nền cream trơn ở trang khác), không thể dùng 1 màu chữ duy nhất cho mọi trang — đã thêm logic xác định `hasHero` theo route (dựa trên chính xác danh sách trang có import `<Hero>` trong code, không suy đoán): `/`, `/ve-chung-toi`, `/trai-nghiem`, `/uu-dai`, `/dat-phong`, và `/phong-nghi/:hotel` (loại trừ `/phong-nghi/:hotel/:room` không có Hero). Trang có Hero → `inverse=true` (chữ sáng, đè lên ảnh); trang không có Hero → `inverse=false` (chữ tối, đè lên nền cream). Đây KHÔNG phải scroll-toggle (không đổi theo scroll) — chỉ là 1 giá trị tĩnh theo route, tránh lặp lại lỗi timing/suy đoán của Phase 6.5.

**Nguyên nhân tiềm ẩn khiến chữ khó đọc khi trong suốt**: lớp phủ tối (gradient) của `Hero` trước đó chỉ đậm ở ĐÁY ảnh (nơi headline chính nằm, `from-brown-900/90`) và RẤT NHẠT ở ĐỈNH ảnh (`to-brown-900/10`) — vì trước đây đỉnh ảnh không cần tối (Header có nền đục riêng che sẵn). Khi Header hết nền đục, chữ Header đè trực tiếp lên đúng vùng đỉnh ảnh nhạt nhất này, dễ chìm vào ảnh sáng màu (đã tái hiện và xác nhận bằng ảnh Central — vùng trời/tường sáng).

**Cách xử lý**: tăng điểm dừng trên cùng của gradient từ `/10` lên `/35` (`components/hero/Hero.tsx`) — đủ tối để chữ Header luôn đọc được trên MỌI ảnh Hero đã kiểm tra (kể cả ảnh sáng nhất — Central), đồng thời ảnh vẫn hiện rõ qua lớp phủ (không phải nền đục đặc), đúng yêu cầu "ảnh hero nhìn thấy được qua Header". Không đổi 2 điểm dừng còn lại (đáy/giữa) vì không liên quan tới lỗi này.

**Trang Liên hệ (trường hợp riêng)**: banner trang này không dùng `<Hero>` chung mà là bố cục tự viết (nửa cream trái + nửa ảnh phải). Ảnh trước đó bleed sát đỉnh (`inset-y-0`) — nếu giữ nguyên, Header (chữ tối vì trang này không có Hero) sẽ đè 1 phần lên ẢNH ở nửa phải, không phải nền cream, có nguy cơ khó đọc tại đúng chỗ đó. Đã đẩy ảnh xuống dưới đúng chiều cao Header (`top-20 md:top-24` thay vì `inset-y-0`, ảnh mobile thêm `mt-20`) để cả hàng Header luôn nằm trên nền cream — chữ tối đọc ổn định suốt chiều ngang, không cần tách nửa trái/phải.

**Nguyên nhân "nav biến mất khi cuộn"**: KHÔNG CÓ trong code hiện tại. Đã rà soát: Header dùng `position: fixed; top: 0; z-index: 30`, không có `overflow`/`transform` nào trên `html`/`body`/`main` (kiểm tra `app/layout.tsx`, `app/globals.css`) có thể phá stacking context của `fixed`; không có logic ẩn/conditional-render theo scroll (đã bỏ hoàn toàn từ Phase 6.6); không có component nào khác dùng z-index cao hơn 30 ở vùng đầu trang (`StickyContactWidget`/`MobileMenu` drawer dùng z-40 nhưng nằm ở vị trí khác, không che Header). Vì vậy về mặt cấu trúc, Header không thể biến mất/bị che khi cuộn — không cần sửa gì thêm cho mục này, chỉ xác nhận lại bằng cách đọc code (không có browser thật để cuộn kiểm chứng trực tiếp).

**Các trang đã regression-test** (đọc code + dựng lại tĩnh bằng Playwright cho 1 hero sáng nhất và 1 trang không-hero):
- Trang chủ, Về chúng tôi, Trải nghiệm, Ưu đãi, Đặt phòng, Phòng nghỉ/:hotel → `inverse=true`, đọc code xác nhận đúng danh sách `HERO_EXACT_PATHS`/`HOTEL_HERO_PATTERN`.
- Phòng nghỉ (danh sách), Phòng nghỉ/:hotel/:room, Thư viện (danh sách) → `inverse=false`, nền cream trơn, chữ tối luôn đọc được.
- Liên hệ → `inverse=false` + đã đẩy ảnh xuống dưới Header (xem trên) — đã chụp ảnh xác nhận.
- Thư viện/:hotel → dùng `PropertySubNav` riêng (đã có nền đục `bg-cream-50/95` sẵn từ trước, KHÔNG đụng tới trong lần sửa này) — không bị ảnh hưởng.

## Test

- **Lint** (`next lint`): **BLOCKED** — sandbox không có quyền truy cập npm registry (`npm ping` → 403 Forbidden), không cài được `node_modules`.
- **TypeScript** (`tsc --noEmit` qua bộ smoke-test thay thế, vì không có `node_modules` thật): **PASS** — không phát sinh lỗi mới ở `Header.tsx`, `Hero.tsx`, `app/lien-he/page.tsx` so với trước khi sửa.
- **Build** (`next build`): **BLOCKED** — cùng lý do không có npm registry.
- **Responsive**: **PASS (bằng chứng thực nghiệm gián tiếp)** — dựng lại tĩnh HTML/CSS đúng cấu trúc code thật + ảnh thật của dự án, chụp bằng Chromium/Playwright ở 1280px và ~390px cho: Trải nghiệm (nav trong suốt + khoảng cách locationTag), Liên hệ (nav trên nền cream), và trường hợp khó nhất — ảnh Central sáng màu (kiểm tra độ tương phản chữ trắng). Cả 3 đều đọc được, không đè, không tràn ngang. Đây KHÔNG phải Next.js dev server thật (sandbox không cài được), nên không khẳng định tuyệt đối 100% giống hệt.
- **Navigation scroll behavior**: **PASS (theo phân tích code, không phải test trình duyệt thật đang cuộn)** — xác nhận `position: fixed` + không có logic ẩn/đổi theo scroll + không có `overflow`/`transform`/z-index nào cản trở, nên về cấu trúc Header không thể biến mất khi cuộn. KHÔNG có browser thật (không dev-server) để tự tay cuộn xác nhận trực quan — đây là giới hạn của sandbox, không phải bỏ sót.

## Vấn đề phát hiện / Cần tôi xác nhận
1. Quyết định "nav trong suốt hoàn toàn" khác với mockup File B gốc (PDF cho thấy nav luôn đục) — đã xác nhận với anh trước khi làm (anh chọn "Làm trong suốt theo yêu cầu mới"), ghi lại rõ trong comment code để phase sau không hiểu nhầm là lỗi.
2. Chưa có browser thật (dev server) để tự tay cuộn kiểm tra trực quan trên cả 8 trang — đã bù bằng đọc code (chắc chắn về mặt cấu trúc CSS) + dựng lại tĩnh cho các trường hợp khó nhất. Nhờ anh xác nhận lại bằng mắt khi có môi trường chạy `npm run dev` thật.
3. Với nav trong suốt hoàn toàn (không nền, không blur), khi cuộn trang ở các trang KHÔNG có Hero (nền cream trơn), nội dung trang (chữ/ảnh) sẽ cuộn ngay bên dưới/xuyên qua vùng Header — đây là đặc điểm cố hữu của "nav trong suốt hoàn toàn" (đúng yêu cầu, không phải lỗi), nhưng nếu sau này thấy chữ trang chồng lên chữ Header khi cuộn tới đúng vị trí đó, có thể cần thêm giải pháp (vd. đệm nhẹ) — nêu ra để anh biết trước, không tự ý thêm khi chưa có phản hồi.

## Phase tiếp theo
Chờ anh xác nhận bằng mắt trên môi trường chạy được `npm run dev` thật (sandbox hiện không có quyền truy cập npm registry để tự kiểm tra Lint/Build/scroll thật).
