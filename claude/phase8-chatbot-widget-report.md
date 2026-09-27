# Phase 8 — Báo cáo thêm UI Chatbot ở góc dưới màn hình

Phạm vi: đưa widget chatbot (đã có ở `../chatbot/frontend`) vào website chính, dùng backend có sẵn `../chatbot/backend`. Không sửa backend, không thay đổi business requirement.

## Đã hoàn thành

- `components/chat/ChatWidget.tsx`: nút mở chat và khung chat, logic port từ `chatbot/frontend`, giao diện viết lại bằng Tailwind theo design token của site (nền cream, header nâu `brown-800`, font heading Playfair).
  - Câu trả lời stream (SSE — Server-Sent Events, dữ liệu trả về dần theo thời gian thực), hiển thị markdown, trạng thái "Đang kiểm tra phòng trống…" khi bot tra cứu, 4 câu hỏi gợi ý, nút "Cuộc trò chuyện mới".
  - Lịch sử hội thoại lưu ở localStorage, giữ nguyên khi chuyển trang.
  - Desktop: khung 380px nổi bên trái cụm nút. Mobile: dạng bottom sheet (khung trượt từ đáy màn hình), cao 85% màn hình.
  - Đóng bằng phím Esc, tự focus ô nhập khi mở, có `aria-*` cho trình đọc màn hình.
  - Mất kết nối backend thì hiện thông báo thân thiện, hướng khách liên hệ hotline/Zalo.
- **Vị trí:** nút Chat nằm trên cùng cụm nút nổi của `StickyContactWidget` (Chat → Zalo → Gọi), để các nút ở góc màn hình không đè nhau.
- `lib/chat.ts`: client gọi backend (giữ nguyên giao thức SSE), thêm xử lý an toàn khi nhận dữ liệu lỗi định dạng.
- **Cấu hình:** biến `NEXT_PUBLIC_CHATBOT_API_URL` (`lib/site.ts`, `.env.example`). Production chưa đặt biến thì **ẩn nút chat**. Domain backend tự được thêm vào CSP `connect-src` trong `next.config.mjs`.
- Thêm dependency `react-markdown` (mặc định không render HTML thô, an toàn XSS).
- Tài liệu: `README.md`, `docs/environment-variables.md`, `docs/technical-decisions.md` #4.

Đã kiểm chứng:
- `npm run lint`, `typecheck` và `build` đều pass.
- Chạy thử trên trình duyệt thật với server giả lập đúng giao thức SSE của backend: stream, markdown, trạng thái tra cứu, lịch sử qua các trang, bottom sheet trên mobile và lỗi mất kết nối đều hiển thị đúng; không có lỗi console.
- Build production không có biến thì không render nút chat. Có biến thì nút hiện và CSP chứa đúng domain.

## Chưa hoàn thành

- Chưa chạy thử với Claude API thật, do máy chưa có `ANTHROPIC_API_KEY`.

## Vấn đề phát hiện

- **Backend chatbot đang dùng dữ liệu mẫu, không khớp website** (nằm trong `chatbot/backend`, ngoài phạm vi phase này):
  - Hotline trong prompt là `0900 000 000`, website dùng `0263 383 7837`.
  - Loại phòng mẫu là Standard Double / Deluxe Twin / Family Suite, trong khi website có Superior Room, Deluxe Window… theo từng cơ sở.
  - Prompt mô tả "Khách sạn Túi Ba Gang" như 1 khách sạn, chưa biết có 3 cơ sở Central / Ember Style / Little Bay.
  - Giá, giờ nhận/trả phòng, chính sách huỷ trong prompt chưa được xác nhận: [CHƯA XÁC ĐỊNH].
  - Nếu go-live như hiện tại, bot sẽ trả lời khách thông tin sai.
- Cụm nút nổi (giờ gồm 3 nút) đè lên góc phải thanh tìm phòng ở Hero trang chủ khi màn hình thấp. Vấn đề này đã có từ trước với 2 nút Zalo/Gọi, nay rõ hơn.

## Cần tôi xác nhận

1. Thông tin thật cho chatbot (hotline, 3 cơ sở, hạng phòng, chính sách) — cập nhật trong `chatbot/backend/internal/chat/prompt.go` và `internal/hotel`.
2. Domain deploy backend chatbot, để đặt `NEXT_PUBLIC_CHATBOT_API_URL` và `ALLOWED_ORIGINS`.
3. Có muốn khung chat tự mở/hiện lời chào sau vài giây không? Hiện tại chỉ mở khi khách bấm.

## Phase tiếp theo

- Cập nhật dữ liệu thật cho backend chatbot, thêm rate limit theo IP (đã nêu trong `chatbot/README.md`) trước khi go-live.
