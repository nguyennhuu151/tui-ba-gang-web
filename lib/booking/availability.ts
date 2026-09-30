import type { Locale } from "@/lib/i18n/config";
import type { RoomType } from "@/lib/types";
import { getRooms } from "@/lib/content/rooms";

export interface AvailabilitySearch {
  /** Slug cơ sở hoặc "all". */
  location: string;
  checkIn: string;
  checkOut: string;
  guests: { adults: number; children: number };
}

/**
 * Tìm phòng trống — điểm nối duy nhất giữa UI đặt phòng và hệ thống PMS (PMS Adapter,
 * docs/technical-decisions.md #3). Component chỉ gọi hàm này; khi tích hợp ezCloud chỉ
 * thay phần thân hàm (gọi Internal API Route `/api/availability` → ezCloud), không sửa UI.
 *
 * [CHƯA XÁC NHẬN API] Hiện là MOCK: trả tối đa 3 hạng phòng của cơ sở đã chọn, bỏ qua
 * ngày và số khách — xem docs/api-integration-design.md.
 */
export async function searchAvailability(search: AvailabilitySearch, locale: Locale): Promise<RoomType[]> {
  await new Promise((resolve) => setTimeout(resolve, 700));
  const rooms = getRooms(locale);
  const pool = search.location === "all" ? rooms : rooms.filter((r) => r.hotel === search.location);
  return pool.slice(0, 3);
}
