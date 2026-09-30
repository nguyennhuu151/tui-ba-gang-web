# Phase 9 — Báo cáo đa ngôn ngữ VI/EN

Yêu cầu: toàn bộ text trong source dùng được ở 2 locale tiếng Việt và tiếng Anh. Text vốn là tiếng Anh giữ nguyên, dùng chung cho cả 2 locale.

## Đã hoàn thành

### Routing (điều hướng URL)
- Toàn bộ trang chuyển vào `app/[locale]/` (dùng `git mv`, giữ lịch sử file). URL mới có dạng `/vi/...` và `/en/...`, slug giữ tiếng Việt cho cả 2 bản.
- `proxy.ts` (tên mới của middleware ở Next.js 16): URL chưa có locale, gồm cả link cũ như `/phong-nghi` hay `/lien-he?offer=...`, được chuyển hướng theo thứ tự cookie ngôn ngữ đã chọn → ngôn ngữ trình duyệt (Accept-Language) → `vi`. Query string được giữ nguyên.
- Cả 2 locale được build tĩnh (`generateStaticParams`). Locale không hỗ trợ trả về 404.
- `app/[locale]/[...rest]` bắt URL không tồn tại để hiện trang 404 của site, có Header/Footer và đúng ngôn ngữ.

### Hạ tầng i18n (`lib/i18n/`)
- `config.ts`: danh sách locale, thêm/bỏ tiền tố locale cho đường dẫn.
- `text.ts`: kiểu dữ liệu `{ vi, en }`, hàm `localize` đổi cả cây dữ liệu content sang 1 locale, `createTranslator` cho `t(vi, en)` và `pick(...)`.
- `server.ts`: `getI18n()` đọc locale qua `next/root-params`, dùng trong Server Component và `generateMetadata`, không phải truyền prop qua nhiều tầng.
- `client.ts`: `useI18n()`, `usePathnameWithoutLocale()`, `persistLocale()` cho Client Component.
- `metadata.ts`: `pageMetadata()` sinh title, description, canonical, hreflang (vi/en/x-default) và Open Graph theo locale cho từng trang.
- `components/navigation/LocaleLink.tsx`: thay `next/link` ở mọi nơi, tự thêm tiền tố locale cho link nội bộ.

### Nội dung
- `lib/content/*.ts` (3 cơ sở, hạng phòng, ưu đãi, trải nghiệm, trang chủ, thư viện, liên hệ, menu): text tiếng Việt chuyển sang dạng `{ vi, en }` kèm bản dịch tiếng Anh. Dùng qua `getProperties(locale)`, `getRooms(locale)`, `getOffers(locale)`…
- Tất cả trang và component: text hiển thị, `alt` ảnh, `aria-label`, metadata và thông báo lỗi đều có bản tiếng Anh. Phần này bao gồm cả 404, error, global-error, khung chat (chatbot), thanh tìm phòng và bộ chọn số khách (có số ít/số nhiều cho tiếng Anh: "1 Adult", "2 Adults").
- **Text vốn là tiếng Anh giữ nguyên cho cả 2 locale**, ví dụ: "SAME PLACES, A DIFFERENT YOU.", "OUR STORY", "MORE THAN A STAY", "Cozy Rooms", "Breakfast Time", tên ưu đãi ("Stay a Little Longer"…), tên hạng phòng ("Superior Room"…), các tag ("CITY / PEOPLE / CONNECTIONS").
- Tên riêng "Túi Ba Gang" giữ nguyên. Địa danh "ĐÀ LẠT" hiển thị "DA LAT" ở bản EN.

### LanguageSwitcher (bộ chuyển ngôn ngữ)
- Từ placeholder thành chạy thật: chuyển VI/EN mà vẫn giữ trang đang xem, query và hash; lưu lựa chọn vào cookie 1 năm.
- Thêm vào menu mobile. Trước đây nút này chỉ hiện trên desktop (`lg`).

### SEO
- `<html lang>` đổi theo locale. Mỗi trang có title/description riêng từng ngôn ngữ, canonical và hreflang.
- `sitemap.xml` liệt kê URL của cả 2 locale kèm hreflang.

### Tài liệu
- `README.md` (mục "Đa ngôn ngữ"), `docs/technical-decisions.md` #8, `docs/architecture.md` mục 8.
- Script `typecheck` thêm `next typegen` để sinh type cho `next/root-params` trước khi chạy `tsc`.

### Đã kiểm chứng
- `npm run typecheck`, `lint` và `build` đều pass. Lint còn 1 cảnh báo có từ trước: import `CornerTagList` không dùng trong `PropertyOverlayCard.tsx`.
- **Quét AST (cây cú pháp) toàn bộ source:** không còn chuỗi/JSX text tiếng Việt nào thiếu bản EN, ngoại trừ tên thương hiệu.
- **Quét HTML 16 trang bản `/en`:** không còn text tiếng Việt trong nội dung, `alt`, `aria-label` và metadata.
- **So sánh bản `/vi` với bản gốc** (build commit HEAD trong worktree tạm): nội dung tiếng Việt giống 100%. Khác biệt chỉ ở cách tách thẻ HTML và `aria-label` mới cho bộ chọn ngôn ngữ.
- **Kiểm tra trên trình duyệt thật (desktop + mobile):**
  - Chuyển hướng `/` → `/vi`, Accept-Language `en` → `/en`, cookie được ưu tiên hơn ngôn ngữ trình duyệt.
  - Mọi link trên trang `/en` đều giữ tiền tố `/en`.
  - Chuyển ngôn ngữ giữ `?offer=`; 404 trả đúng mã; khung chat hiển thị tiếng Anh; không có lỗi console.

## Chưa hoàn thành

- Bản dịch tiếng Anh do mình soạn, **chưa được chủ đầu tư/bên nội dung duyệt**. Đặc biệt là các câu mang giọng thương hiệu: trang Về chúng tôi, mô tả 3 cơ sở, tagline tiếng Việt.
- Backend chatbot chưa nhận tham số ngôn ngữ; bot trả lời theo ngôn ngữ khách gõ (theo prompt hiện có). Lịch sử chat cũ lưu trong trình duyệt giữ nguyên ngôn ngữ lúc chat.

## Vấn đề phát hiện

- `ComingSoonScreen` có lỗi chính tả tiếng Anh "Comming Soon" → "Coming Soon". Theo yêu cầu "giữ nguyên text tiếng Anh" nên mình chưa sửa.
- URL cũ không có locale giờ phải qua 1 lần chuyển hướng 307 (tạm thời). Nếu đã có link cũ được Google index, việc này không ảnh hưởng, nhưng nên cập nhật link ở kênh marketing sang `/vi/...`.
- Bản `/vi` dùng URL `/vi/...` thay vì URL gốc không tiền tố. Nếu muốn tiếng Việt ở URL gốc (`/phong-nghi`) và chỉ tiếng Anh có `/en`, có thể đổi proxy sang rewrite (viết lại URL nội bộ). Mình đang theo đúng `docs/architecture.md` mục 8.

## Cần tôi xác nhận

1. Duyệt bản dịch tiếng Anh. Toàn bộ nằm cạnh bản Việt, tìm theo `en:` trong `lib/content/` và `t("…", "…")` trong `app/`, `components/`.
2. Sửa "Comming Soon" → "Coming Soon" không?
3. Giữ URL `/vi/...` hay chuyển tiếng Việt về URL gốc không tiền tố?
4. Có dịch slug URL cho bản EN không (vd. `/en/rooms` thay cho `/en/phong-nghi`)? Hiện đang giữ slug tiếng Việt cho đơn giản.

## Phase tiếp theo

- Cập nhật bản dịch theo góp ý, sau đó merge.
- Khi tích hợp ezCloud/chatbot: truyền locale để dữ liệu và câu trả lời trả về đúng ngôn ngữ.

---

## Cập nhật: gom text vào 2 file `vi.ts` / `en.ts`

Theo yêu cầu "không để locale rải rác", cách khai báo `{ vi, en }` / `t(vi, en)` ở từng file đã được thay thế:

### Đã hoàn thành
- **`lib/i18n/dictionaries/vi.ts`** chứa toàn bộ text tiếng Việt; **`en.ts`** chứa toàn bộ text tiếng Anh, cùng cấu trúc với `vi.ts` (kiểu `Dictionary = typeof vi`, TypeScript báo lỗi nếu thiếu hoặc thừa key). Text có giá trị động viết dạng hàm, ví dụ `guests(2)` → "2 khách" / "2 guests".
- Chia theo nhóm: `meta`, `common`, `nav`, `language`, `footer`, `contactWidget`, từng trang (`home`, `about`, `experiencesPage`, `offersPage`, `contactPage`, `bookingPage`, `roomsPage`, `libraryPage`, `comingSoon`, `notFound`, `error`), `chat`, và nội dung dữ liệu (`properties`, `roomDescriptions`, `roomAmenities`, `offers`, `experiences`, `propertyCardLines`).
- `lib/content/*.ts` chỉ còn dữ liệu không phụ thuộc ngôn ngữ (ảnh, icon, slug, liên hệ) và text tiếng Anh dùng chung. Text theo ngôn ngữ được ghép vào khi gọi `getProperties(locale)`, `getRooms(locale)`… (`lib/content/merge-text.ts`).
- Trang và component dùng `const { dict } = await getI18n()` (server) hoặc `useI18n()` (client). Đã xoá `lib/i18n/text.ts` (`t`, `pick`, `localize`).
- Kiểm chứng:
  - typecheck, lint và build đều pass.
  - So text hiển thị của 32 trang (VI + EN) trước và sau refactor: nội dung không đổi. Khác biệt duy nhất là vài chỗ React gộp 2 text node thành 1, ví dụ "2" + "khách" → "2 khách"; chữ hiển thị giống hệt.
  - Ngoài 2 file dictionary, source không còn chuỗi tiếng Việt nào hiển thị cho khách (chỉ còn 1 thông báo lỗi cấu hình cho dev ở `lib/site.ts`).
  - Kiểm tra text phía client (tìm phòng, bộ lọc, chatbot) trên trình duyệt.

### Lưu ý khi sửa
- `amenities` / `moodTiles` của 3 cơ sở và `benefits` của ưu đãi ghép với dữ liệu gốc **theo thứ tự phần tử**. Thêm/bớt phần tử ở `lib/content` thì phải sửa đúng vị trí trong cả `vi.ts` và `en.ts`.
- Text tiếng Anh dùng chung (không dịch) vẫn nằm ở `lib/content` / component. Nếu muốn cả những text này cũng vào dictionary (lặp lại giống nhau trong `vi.ts` và `en.ts`), cần xác nhận.
