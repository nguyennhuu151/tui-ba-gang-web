# Technical Decisions — Túi Ba Gang Website

**Phase 3.** Tổng hợp các quyết định kiến trúc quan trọng, kèm lý do và phương án đã cân nhắc. CHƯA CODE.

Ký hiệu trạng thái: **✅ Đã quyết định** (đủ căn cứ để triển khai) / **🟡 Đề xuất — cần xác nhận** (chọn tạm phương án hợp lý nhất, nhưng phụ thuộc câu trả lời của chủ đầu tư/ezCloud).

| # | Quyết định | Trạng thái | Lý do / Phương án khác đã cân nhắc |
|---|---|---|---|
| 1 | Dùng **Next.js App Router** (không dùng Pages Router cũ) | ✅ | App Router hỗ trợ Server Components tốt hơn cho Performance (mối lo đã ghi ở `non-functional-requirements.md`), tổ chức route theo thư mục khớp tự nhiên với cấu trúc `sitemap.md` (route lồng nhau theo `:hotel`). |
| 2 | Next.js API Routes làm lớp **BFF**, Frontend không gọi thẳng ezCloud | ✅ | Bắt buộc về bảo mật (secret không thể đặt ở Frontend — `CLAUDE.md` mục 4) và để cách ly rủi ro khi ezCloud chưa có tài liệu API chính thức. Phương án khác (Frontend gọi thẳng ezCloud) bị loại vì vi phạm nguyên tắc bảo mật cơ bản. |
| 3 | Thiết kế **PMS Adapter** (lớp trừu tượng) cho ezCloud thay vì gọi trực tiếp rải rác trong code | ✅ | Cho phép chuẩn bị kiến trúc ngay cả khi chưa có tài liệu API — khi có tài liệu thật, chỉ cần lấp đầy phần triển khai bên trong Adapter, không phải sửa Frontend. Đúng nguyên tắc "component tái sử dụng, không over-engineering" (`CLAUDE.md` mục 5) — đây là 1 lớp trừu tượng đơn giản, không phải kiến trúc phức tạp (ví dụ: không dùng microservices). |
| 4 | ~~Không thiết kế Chatbot ở Phase 3~~ → **Đã thêm widget Chatbot (Phase 8, theo yêu cầu trực tiếp của chủ dự án)** | ✅ | Phase 3 chưa có căn cứ trong File A/File B. Phase 8: chủ dự án yêu cầu thêm UI chatbot ở góc dưới màn hình. Frontend gọi thẳng backend `chatbot/backend` (Go, chỉ đọc dữ liệu, không tạo booking) — xem `claude/phase8-chatbot-widget-report.md`. |
| 5 | **Không đưa n8n vào kiến trúc chính thức** | ✅ | Không có nhu cầu automation nào được xác nhận trong requirement hiện tại. Ghi nhận là hướng tham khảo tương lai, không phải quyết định kiến trúc. |
| 6 | **Không thiết kế Authentication/Authorization cho khách hàng cuối** | ✅ | `functional-requirements.md` F14 (tài khoản khách hàng) là [CHƯA XÁC ĐỊNH], không có mockup đăng nhập trong File B. Nếu thiết kế trước sẽ vi phạm nguyên tắc không tự thêm requirement. |
| 7 | Zalo hiện tại xử lý bằng **link đơn giản phía Frontend**, không xây Backend integration | ✅ | File B chỉ cho thấy bằng chứng cho "click-to-chat" (1 đường link), không có bằng chứng cho Zalo OA API tự động. Xây dựng tích hợp phức tạp hơn mức cần thiết sẽ vi phạm nguyên tắc "không over-engineering". |
| 8 | i18n theo route `[locale]` (`/vi`, `/en`), chưa dùng CMS — **đã triển khai ở Phase 9** | ✅ | Route `app/[locale]`, `proxy.ts` chuyển hướng URL chưa có locale (cookie → Accept-Language → `vi`). Toàn bộ text theo ngôn ngữ gom vào 2 file `lib/i18n/dictionaries/vi.ts` và `en.ts` (TypeScript thay vì JSON để có kiểm tra thiếu key và hàm cho text có giá trị động); `lib/content` chỉ giữ dữ liệu không phụ thuộc ngôn ngữ và được ghép text khi gọi `getXxx(locale)`. Text vốn là tiếng Anh giữ là chuỗi thường, dùng chung cho 2 locale. Slug URL giữ tiếng Việt cho cả bản EN. Nếu sau này có CMS chỉ cần thay nguồn trong `lib/content`. Xem `claude/phase9-i18n-report.md`. |
| 9 | Rendering: Static + ISR cho trang nội dung, Client-side cho tìm/đặt phòng | 🟡 | Hợp lý theo bản chất dữ liệu (nội dung tĩnh vs dữ liệu real-time từ ezCloud), nhưng có thể điều chỉnh khi biết rõ hơn về cách ezCloud cung cấp dữ liệu (ví dụ nếu ezCloud có webhook, có thể cân nhắc chiến lược khác). |
| 10 | Chưa thiết kế API cho Cancel/Change booking, Payment | 🟡 (thực chất là **chưa thiết kế**, không phải đã quyết định) | Flow E (hủy/đổi booking) và bước thanh toán ở Flow D đều [CHƯA XÁC ĐỊNH] hoàn toàn trong `user-flows.md` — không có mockup, không có mô tả nghiệp vụ để thiết kế dựa trên. Sẽ bổ sung khi có câu trả lời. |
| 11 | Hosting: **Vercel** (kế thừa quyết định Phase 0) | ✅ | Không đổi — phù hợp Next.js, CI/CD tự động, chi phí thấp cho quy mô hiện tại. |
| 12 | Logging/Monitoring: dùng log mặc định của Vercel trước, chưa thêm công cụ trả phí | 🟡 | Tránh chi phí/độ phức tạp không cần thiết ở giai đoạn đầu; đủ dùng cho quy mô 1 website 3 cơ sở hiện tại. Có thể nâng cấp sau nếu vận hành thực tế cho thấy cần. |

## Các quyết định còn treo, phụ thuộc trực tiếp vào Open Questions

Những quyết định dưới đây **không thể chốt ở Phase 3** vì phụ thuộc hoàn toàn vào câu trả lời từ chủ đầu tư/ezCloud (xem `open-questions.md`):

- Mô hình tích hợp đặt phòng: redirect sang ezCloud / nhúng widget / gọi API dựng UI riêng (Open Question F5) → ảnh hưởng trực tiếp thiết kế trang `/dat-phong` và có cần trang xác nhận/thanh toán riêng hay không.
- 1 tài khoản ezCloud chung hay 3 tài khoản riêng cho 3 cơ sở (F6) → ảnh hưởng cấu trúc biến môi trường (`environment-variables.md`) và logic PMS Adapter (có cần chọn tài khoản theo cơ sở hay không).
- Ưu đãi có đồng bộ ezCloud hay quản lý riêng (F7) → ảnh hưởng module `/api/offers` là độc lập hay cũng đi qua Adapter.

**Khuyến nghị:** nên có câu trả lời cho ít nhất F5 và F6 trước khi bắt đầu code phần `/dat-phong`, vì đây là 2 quyết định ảnh hưởng kiến trúc sâu nhất, khó thay đổi giữa chừng.

---

*Tài liệu liên quan: `architecture.md`, `api-integration-design.md`, `security.md`, `environment-variables.md`.*
