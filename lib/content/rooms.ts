import type { PropertySlug, RoomType } from "@/lib/types";
import type { Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";

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
): Omit<RoomType, "description" | "amenities"> {
  const slug = slugify(name);
  return {
    hotel,
    slug,
    name,
    maxGuests,
    sizeSqm,
    priceFrom: null,
    images: [`/images/room-${hotel}-${slug}-1.jpg`, `/images/room-${hotel}-${slug}-2.jpg`],
  };
}

/**
 * Tên hạng phòng vốn là tiếng Anh nên dùng chung cho cả 2 locale. Mô tả và tiện nghi theo
 * ngôn ngữ nằm ở `roomDescriptions["hotel/slug"]` / `roomAmenities` trong lib/i18n/dictionaries.
 */
const roomBase = [
  // Central — CONFIRMED theo ảnh mockup (5 hạng phòng)
  room("central", "Superior Room", 2, 18),
  room("central", "Deluxe Window", 2, 22),
  room("central", "Deluxe Plus", 2, 28),
  room("central", "Premier Plus", 2, 32),
  room("central", "Premier Family", 4, 40),

  // Ember Style — CONFIRMED theo ảnh mockup (4 hạng phòng)
  room("ember-style", "Deluxe Room", 2, 22),
  room("ember-style", "Premier Room", 2, 28),
  room("ember-style", "Family Room", 4, 40),
  room("ember-style", "Suite Room", 2, 45),

  // Little Bay — CONFIRMED theo ảnh mockup (3 hạng phòng)
  room("little-bay", "Bay View Room", 2, 28),
  room("little-bay", "Lake View Room", 2, 32),
  room("little-bay", "Suite Room", 2, 48),
];

const cache = new Map<Locale, RoomType[]>();

export function getRooms(locale: Locale): RoomType[] {
  let list = cache.get(locale);
  if (!list) {
    const dict = getDictionary(locale);
    list = roomBase.map((room) => ({
      ...room,
      description: dict.roomDescriptions[`${room.hotel}/${room.slug}`] ?? "",
      amenities: dict.roomAmenities,
    }));
    cache.set(locale, list);
  }
  return list;
}

export function getRoomsByHotel(hotel: PropertySlug, locale: Locale) {
  return getRooms(locale).filter((r) => r.hotel === hotel);
}

export function getRoom(hotel: string, slug: string, locale: Locale) {
  return getRooms(locale).find((r) => r.hotel === hotel && r.slug === slug);
}
