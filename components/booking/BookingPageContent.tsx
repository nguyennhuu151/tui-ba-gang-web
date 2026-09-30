"use client";

import { useState } from "react";
import { BookingSearchBar, type BookingSearchValue } from "@/components/booking/BookingSearchBar";
import { RoomAvailabilityList, type AvailabilityStatus } from "@/components/booking/RoomAvailabilityList";
import { searchAvailability } from "@/lib/booking/availability";
import { useLocale } from "@/lib/i18n/client";
import type { RoomType } from "@/lib/types";

/**
 * BookingPageContent — ghép `BookingSearchBar` (dùng lại từ Trang chủ) + khu vực
 * kết quả `RoomAvailabilityList` cho `/dat-phong`. Dữ liệu lấy qua `searchAvailability`
 * (lib/booking/availability.ts — hiện là MOCK, chưa gọi ezCloud).
 */
export function BookingPageContent({ initialLocation }: { initialLocation: string }) {
  const locale = useLocale();
  const [status, setStatus] = useState<AvailabilityStatus>("idle");
  const [results, setResults] = useState<RoomType[]>([]);

  const handleSearch = async (value: BookingSearchValue) => {
    setStatus("loading");
    try {
      const rooms = await searchAvailability(value, locale);
      setResults(rooms);
      setStatus(rooms.length > 0 ? "results" : "empty");
    } catch {
      setResults([]);
      setStatus("empty");
    }
  };

  return (
    <div className="flex flex-col gap-10">
      <div className="relative">
        <BookingSearchBar initialLocation={initialLocation} onSearch={handleSearch} />
      </div>
      <div className="mt-6">
        <RoomAvailabilityList status={status} results={results} />
      </div>
    </div>
  );
}
