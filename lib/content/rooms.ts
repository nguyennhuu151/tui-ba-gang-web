import type { PropertySlug, RoomType } from "@/lib/types";

/**
 * Danh sách hạng phòng theo từng cơ sở.
 *
 * CẬP NHẬT: dùng đúng theo ảnh chụp màn hình mockup thật tab "Phòng nghỉ" do user
 * cung cấp trực tiếp trong phiên làm việc (tên hạng phòng, số khách, diện tích) —
 * đây là "Phiên bản B" trong docs/data-model.md ("mockup rút gọn"). Thay cho bộ tên
 * tạm trước đó ("Phiên bản C") vì bằng chứng hình ảnh trực tiếp đáng tin hơn.
 *
 * ⚠️ Vẫn lưu ý: docs/open-questions.md M1-M3 cho thấy File B tự mâu thuẫn giữa các
 * màn hình khác nhau (mockup rút gọn vs trang chi tiết từng cơ sở) — bộ tên dưới đây
 * CHỈ CONFIRMED cho đúng màn hình "Phòng nghỉ" (ảnh user cung cấp), dùng thống nhất
 * luôn cho phần preview phòng ở `/thu-vien/:hotel` để tránh 2 bộ tên khác nhau cho
 * cùng 1 phòng trên cùng 1 site — nếu sau này có xác nhận riêng cho trang Thư viện,
 * cần tách lại.
 *
 * Giá (`priceFrom`) để `null` vì File B không hiển thị giá — xem
 * docs/functional-requirements.md mục 5.3.
 */

function slugify(name: string) {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function room(
  hotel: PropertySlug,
  name: string,
  maxGuests: number,
  sizeSqm: number,
  description: string,
): RoomType {
  const slug = slugify(name);
  return {
    hotel,
    slug,
    name,
    maxGuests,
    sizeSqm,
    priceFrom: null,
    description,
    amenities: ["Wifi tốc độ cao", "Điều hoà", "Nước uống miễn phí"],
    images: [`/images/room-${hotel}-${slug}-1.jpg`, `/images/room-${hotel}-${slug}-2.jpg`],
  };
}

export const rooms: RoomType[] = [
  // Central — CONFIRMED theo ảnh mockup (5 hạng phòng)
  room("central", "Superior Room", 2, 18, "Phòng gọn gàng, ấm cúng, phù hợp cho chuyến đi ngắn ngày."),
  room("central", "Deluxe Window", 2, 22, "Có cửa sổ lớn đón sáng, không gian thoáng đãng hơn."),
  room("central", "Deluxe Plus", 2, 28, "Không gian rộng rãi hơn, tiện nghi đầy đủ."),
  room("central", "Premier Plus", 2, 32, "Hạng phòng cao cấp, view thành phố."),
  room("central", "Premier Family", 4, 40, "Phù hợp gia đình, không gian rộng nhất tại Central."),

  // Ember Style — CONFIRMED theo ảnh mockup (4 hạng phòng)
  room("ember-style", "Deluxe Room", 2, 22, "Ấm áp, đúng tinh thần Ember Style."),
  room("ember-style", "Premier Room", 2, 28, "Không gian tinh tế hơn với góc thư giãn riêng."),
  room("ember-style", "Family Room", 4, 40, "Phù hợp gia đình hoặc nhóm bạn."),
  room("ember-style", "Suite Room", 2, 45, "Hạng phòng cao cấp nhất tại Ember Style."),

  // Little Bay — CONFIRMED theo ảnh mockup (3 hạng phòng)
  room("little-bay", "Bay View Room", 2, 28, "Nhìn ra hồ nước, gần gũi thiên nhiên."),
  room("little-bay", "Lake View Room", 2, 32, "View hồ trọn vẹn, không gian yên tĩnh."),
  room("little-bay", "Suite Room", 2, 48, "Hạng phòng rộng nhất tại Little Bay."),
];

export function getRoomsByHotel(hotel: PropertySlug) {
  return rooms.filter((r) => r.hotel === hotel);
}

export function getRoom(hotel: string, slug: string) {
  return rooms.find((r) => r.hotel === hotel && r.slug === slug);
}
