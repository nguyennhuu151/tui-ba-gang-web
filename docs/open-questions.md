# Open Questions — Túi Ba Gang Website

**CẬP NHẬT (lần 2)** sau khi có File B (`GIAO DIỆN WEB TÚI BA GANG.pdf`). Các câu hỏi đã được File B trả lời được đánh dấu ✅ **ĐÃ RESOLVED** kèm nguồn; câu hỏi mới phát sinh được đánh số tiếp F1, F2... để không xáo trộn số cũ.

## Nhóm 1 — Tổng quan & mục tiêu

1. ~~Website nhằm mục đích chính là gì~~ → ✅ **RESOLVED**: giới thiệu + đặt phòng cho thương hiệu 3 cơ sở (File B).
2. Đối tượng khách hàng mục tiêu là ai? — **Vẫn mở**, chỉ suy đoán được phân khúc trung-cao cấp qua giọng văn.
3. ~~Địa chỉ chính xác~~ → ✅ **RESOLVED một phần**: Đà Lạt, Việt Nam (File B). Vẫn thiếu địa chỉ số nhà/đường cho từng cơ sở.
4. Thời điểm dự kiến launch website? — **Vẫn mở**.

## Nhóm 2 — Nội dung & cấu trúc trang

5. ~~Sitemap~~ → ✅ **RESOLVED**: xem `sitemap.md` cập nhật, dựa hoàn toàn theo menu File B.
6. ~~Có bao nhiêu hạng phòng~~ → **Có dữ liệu nhưng MÂU THUẪN** (xem `requirements-analysis.md` mục "Mâu thuẫn nội bộ") — cần chốt bộ tên hạng phòng chính thức cho cả 3 cơ sở.
7. Tổng số phòng vật lý mỗi hạng — **Vẫn mở**, File B chỉ có tên/diện tích/số khách tối đa, không có số lượng phòng.
8. ~~Nhà hàng áp mái có phục vụ khách ngoài không~~ → File B không nhắc "nhà hàng áp mái" như 1 mục riêng; thay vào đó mỗi cơ sở có mục "Ẩm thực" riêng trong trang của mình (vd. "Breakfast Time" ở Central). **Cần xác nhận**: nhà hàng áp mái trong File A có phải chính là mục ẩm thực này không, và có phục vụ khách ngoài không.
9. ~~Dalat Galerie có phải trải nghiệm mua/xem tranh~~ → **Vẫn mở** — File B không nhắc "Dalat Galerie" bằng tên riêng; cần xác nhận nó có nằm trong mục "Thư viện" hay là 1 phần riêng của 1 cơ sở cụ thể (có thể là Ember Style, theo Assumption A8).
10. ~~Không gian công cộng tầng trệt (File A) đang cập nhật~~ → **Vẫn mở**, chưa có thông tin bổ sung.

**F1 (MỚI).** File A (concept kiến trúc) thuộc về cơ sở nào trong 3 cơ sở (Central/Ember Style/Little Bay)? (xem Assumption A8)
**F2 (MỚI).** Nội dung "Trải nghiệm" (quán ăn, cà phê, điểm tham quan Đà Lạt) — ai cung cấp danh sách địa điểm cụ thể? Đây là nội dung do Túi Ba Gang tự biên tập (editorial) hay lấy từ nguồn khác?
**F3 (MỚI).** Video "Một ngày ở Túi Ba Gang" (File B trang 4) — đã có file video chưa, ai sản xuất?
**F4 (MỚI).** Nội dung "Chính sách" và "Câu hỏi thường gặp" (footer, File B trang 4) — đã có văn bản chưa?

## Nhóm 3 — Booking (xem chi tiết `functional-requirements.md` mục 5)

11. ~~Đặt phòng tự động hay thủ công~~ → **Có manh mối nhưng chưa đủ**: có nút "Tìm phòng" + "Đặt phòng" riêng biệt, gợi ý có luồng tìm-rồi-đặt, nhưng chưa rõ đặt phòng xử lý ngay trên site hay redirect sang ezCloud.
12. ~~Availability real-time~~ → ✅ **RESOLVED**: có, qua ezCloud (File B trang 1). Chi tiết kỹ thuật vẫn **[CHƯA XÁC NHẬN API]**.
13. Bảng giá phòng theo hạng/mùa — **Vẫn mở**, File B không hiển thị giá.
14. Chính sách hủy/đổi, đặt cọc — **Vẫn mở**.
15. Thanh toán online hay tại khách sạn, cổng nào — **Vẫn mở**, có thể do ezCloud xử lý nhưng chưa xác nhận.
16. Hỗ trợ đa tiền tệ — **Vẫn mở**.

**F5 (MỚI).** Luồng đặt phòng diễn ra hoàn toàn trên `tuibagangdalat.vn` hay redirect sang trang do ezCloud host?
**F6 (MỚI).** ezCloud dùng chung 1 tài khoản cho cả 3 cơ sở hay 3 tài khoản riêng biệt? (ảnh hưởng kiến trúc tích hợp)
**F7 (MỚI).** Ưu đãi (Offers) có được áp dụng tự động khi đặt qua ezCloud không, hay quản lý độc lập trên website?

## Nhóm 4 — Hệ thống tích hợp (xem chi tiết `integrations.md`)

17. ~~PMS/Booking Engine nào~~ → ✅ **RESOLVED**: ezCloud. Vẫn **[CHƯA XÁC NHẬN API]** chi tiết.
18. Kênh OTA song song — **Vẫn mở**, không đề cập trong File B.
19. ~~Zalo OA~~ → **Có manh mối nhưng KHÔNG đủ để resolve hoàn toàn**: có nút Zalo nổi trên trang chủ, nhưng chưa rõ đây là link chat đơn giản hay tích hợp Zalo OA API đầy đủ (xem Assumption A10).
20. Mạng xã hội chính thức — **Có icon nhưng chưa có link cụ thể** (Instagram/Facebook/YouTube).

**F8 (MỚI).** Google Maps — File B không có mockup bản đồ nào ở trang Liên hệ. Có thực sự cần Google Maps không, hay chủ đầu tư quyết định không cần?

## Nhóm 5 — Nội dung/tài sản cần cung cấp (xem chi tiết `requirements-analysis.md` mục 7)

21. ~~Logo, bộ nhận diện~~ → **Có logo dạng hình trong mockup**, nhưng chưa có file gốc (vector/PNG chất lượng cao).
22. Ảnh render vs ảnh thật — **Vẫn mở**, cả File A và File B đều dùng ảnh minh hoạ/render.
23. ~~Ai cung cấp nội dung text~~ → **Một phần đã có sẵn trong File B** (câu chuyện thương hiệu, mô tả từng cơ sở bằng cả VI và 1 phần EN) — vẫn cần xác nhận đây là nội dung final hay chỉ minh hoạ.
24. ~~Chính sách chung~~ → **Vẫn mở** (xem F4).

**F9 (MỚI).** Địa chỉ cụ thể (số nhà, tên đường) từng cơ sở?
**F10 (MỚI).** Xác nhận domain chính thức có phải `tuibagangdalat.vn` không (Assumption A9)?

## Nhóm 6 — Non-functional (xem chi tiết `non-functional-requirements.md`)

25–27. Không có thay đổi — vẫn **[CHƯA XÁC ĐỊNH]** toàn bộ (performance, security, accessibility, browser support, CMS).

---

## Nhóm 7 — Phát hiện trong Phase 6.5 (Reference-driven UI bug fix & QA)

**F11 (MỚI).** Trang `/thu-vien/central` (File B trang 6) không có banner CTA cuối trang (khác Ember Style/Little Bay) — trang kết thúc ngay sau mục Ẩm thực. Đây có phải chủ ý của thiết kế hay bị thiếu sót khi làm mockup? Hiện đang triển khai đúng như PDF (không có banner).
**F12 (MỚI).** Little Bay — đích của link "TÌM HIỂU THÊM" ở mục "More than a stay" (`/thu-vien/little-bay`, File B trang 8) chưa được xác định trong mockup. Đang tạm trỏ về `/phong-nghi/little-bay`.
**F13 (MỚI).** Trang `/uu-dai` — đích của nút "KHÁM PHÁ ƯU ĐÃI" trên từng thẻ ưu đãi (File B trang 9) chưa xác định (trang chi tiết riêng, modal, hay liên hệ trực tiếp). Đang tạm dẫn sang `/lien-he?offer=...`.
**F14 (MỚI).** Mục Ẩm thực Central (File B trang 6) có thêm 1 ảnh phụ với caption "Good Food Good Mood" và dòng chữ nhỏ "ĐÀ LẠT, LUÔN CÓ NHỮNG ĐIỀU DỊU DÀNG ĐỂ TA MUỐN QUAY LẠI." — hiện CHƯA triển khai (chỉ dùng 1 ảnh chính). Có cần bổ sung không?
**F15 (MỚI).** Trang Trải nghiệm (`/trai-nghiem`, File B trang 4) — Footer có cần thêm link "Chính sách"/"Câu hỏi thường gặp" riêng cho trang này không? Đã xác nhận có trong mockup nhưng cần logic Footer theo route (chưa triển khai, ngoài phạm vi Phase 6.5).

## Danh sách MÂU THUẪN cần xác nhận riêng (ưu tiên cao nhất — xem chi tiết `requirements-analysis.md`)

- **M1.** Tên hạng phòng Central: 3 phiên bản khác nhau giữa bảng danh sách / mockup rút gọn / trang chi tiết.
- **M2.** Tên hạng phòng Ember Style: 2 phiên bản khác nhau.
- **M3.** Tên hạng phòng Little Bay: 3 phiên bản khác nhau.
- **M4.** Số hotline Ember Style trùng với Central — nghi ngờ lỗi copy-paste.

---

**Đề xuất của BA:** Ưu tiên xác nhận nhóm Mâu thuẫn (M1–M4) và nhóm Booking (F5–F7) trước, vì đây là 2 nhóm ảnh hưởng trực tiếp đến việc code Data Model và tích hợp kỹ thuật ở các phase sau.
