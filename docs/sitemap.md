# Sitemap — Túi Ba Gang Website

**CẬP NHẬT (lần 2) — VIẾT LẠI HOÀN TOÀN** sau khi có File B (`GIAO DIỆN WEB TÚI BA GANG.pdf`). Sitemap cũ (dựa trên giả định "1 khách sạn") không còn chính xác — thay bằng cấu trúc "1 thương hiệu, 3 cơ sở" theo đúng menu CONFIRMED trong File B, trang 1.

## Sitemap CONFIRMED (menu chính File B: Về chúng tôi – Phòng nghỉ – Trải nghiệm – Thư viện – Ưu đãi – Liên hệ + Đặt phòng)

```
/
├── /ve-chung-toi                      (Về chúng tôi)
├── /phong-nghi                        (Phòng nghỉ — chọn cơ sở)
│   ├── /phong-nghi/central            (Danh sách hạng phòng — Central)
│   ├── /phong-nghi/ember-style        (Danh sách hạng phòng — Ember Style)
│   ├── /phong-nghi/little-bay         (Danh sách hạng phòng — Little Bay)
│   └── /phong-nghi/:hotel/:room-slug  (Chi tiết 1 hạng phòng)
├── /trai-nghiem                       (Trải nghiệm Đà Lạt)
├── /thu-vien                          (Thư viện — chọn cơ sở)
│   ├── /thu-vien/central              (Trang riêng — Central, dạng landing page đầy đủ)
│   ├── /thu-vien/ember-style          (Trang riêng — Ember Style)
│   └── /thu-vien/little-bay           (Trang riêng — Little Bay)
├── /uu-dai                            (Ưu đãi — lọc theo cơ sở)
├── /lien-he                           (Liên hệ — thông tin riêng từng cơ sở)
└── /dat-phong                         (Đặt phòng — tích hợp ezCloud)
```

| URL | Căn cứ |
|---|---|
| `/` | File B trang 1 |
| `/ve-chung-toi` | File B trang 2 |
| `/phong-nghi` + con | File B trang 3 |
| `/trai-nghiem` | File B trang 4 |
| `/thu-vien` + con | File B trang 5–8 |
| `/uu-dai` | File B trang 9 |
| `/lien-he` | File B trang 10 |
| `/dat-phong` | File B trang 1 (nút CTA "ĐẶT PHÒNG" xuất hiện mọi trang) |

### Lưu ý kiến trúc quan trọng: "Phòng nghỉ" khác "Thư viện" — không trùng lặp

File B thể hiện 2 điểm vào khác nhau cho cùng 1 cơ sở, với mục đích khác nhau:
- **`/phong-nghi/:hotel`**: trang **giao dịch** — danh sách hạng phòng có thể lọc, mỗi thẻ có CTA đặt phòng. Tối giản, tập trung vào chuyển đổi (conversion).
- **`/thu-vien/:hotel`**: trang **landing đầy đủ của từng cơ sở** — hero riêng, câu chuyện (Our Story), tiện nghi, giới thiệu phòng (preview, không phải danh sách đầy đủ), ẩm thực. Có thanh điều hướng phụ riêng ("Central | Ember Style | Little Bay") thay cho menu chính. Đây gần như là 3 "mini-website" lồng trong website chính.

**Footer-only links (không phải mục menu chính nhưng CONFIRMED xuất hiện ở footer, File B trang 4):**
```
/chinh-sach       (Chính sách)
/cau-hoi-thuong-gap  (Câu hỏi thường gặp — FAQ)
```

## Nhóm ĐỀ XUẤT / CẦN LÀM RÕ THÊM (không đủ căn cứ để coi là trang riêng)

| Nội dung | Vì sao chưa chắc là 1 trang riêng |
|---|---|
| "Nhà hàng áp mái" (từ File A) | File B không có mục riêng "nhà hàng"; ẩm thực được thể hiện như 1 **section trong trang `/thu-vien/:hotel`** của từng cơ sở (vd. "Breakfast Time" ở Central), không phải trang độc lập — xem Open Question #8 |
| "Dalat Galerie" (từ File A) | Không xuất hiện bằng tên riêng trong File B — có thể là 1 phần nội dung của `/thu-vien/ember-style` (theo Assumption A8) hoặc 1 khái niệm đã bị thay thế — **cần xác nhận**, xem Open Question #9 |
| Danh sách quán ăn/cà phê/điểm tham quan cụ thể (trong `/trai-nghiem`) | File B chỉ có khung giao diện (card 01–04), chưa rõ đây là section cuộn trong 1 trang hay có trang con riêng cho từng địa điểm — xem Open Question F2 |

## Đã loại bỏ khỏi "Nhóm KHÔNG đưa vào" của bản Phase 2 lần đầu

Ở bản Phase 2 lần đầu, `/trai-nghiem`, `/thu-vien`, `/uu-dai` bị xếp vào "không có căn cứ" — **nay đã được File B xác nhận đầy đủ, chính thức đưa vào Sitemap CONFIRMED ở trên.** `/lien-he` trước đây là ĐỀ XUẤT — **nay CONFIRMED** với dữ liệu liên hệ thật.

`/offers` và `/experience` trong ví dụ minh hoạ gốc của bạn ở Phase 2 hoá ra chính là `/uu-dai` và `/trai-nghiem` — chỉ khác cách đặt tên URL (tiếng Anh vs tiếng Việt). Đã dùng tên tiếng Việt để nhất quán với ngôn ngữ mặc định VI của site.

## Ghi chú kỹ thuật (chưa xác nhận)

- Locale prefix (VI/EN) vẫn cần quyết định cách bọc route — xem `sitemap.md` bản cũ, chưa có gì thay đổi thêm.
- `:hotel` slug đề xuất: `central`, `ember-style`, `little-bay` — suy từ cách viết trong File B, cần xác nhận chính thức khi code.

---

*Chi tiết đặc tả từng trang: xem `page-specifications.md`.*
