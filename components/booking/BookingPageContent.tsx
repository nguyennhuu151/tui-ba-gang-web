"use client";

import { useState } from "react";
import { BookingSearchBar, type BookingSearchValue } from "@/components/booking/BookingSearchBar";
import { RoomAvailabilityList, type AvailabilityStatus } from "@/components/booking/RoomAvailabilityList";
import { rooms } from "@/lib/content/rooms";
import type { RoomType } from "@/lib/types";

/**
 * BookingPageContent — ghép `BookingSearchBar` (dùng lại từ Trang chủ) + khu vực
 * kết quả `RoomAvailabilityList` cho `/dat-phong`. Toàn bộ là MOCK phía client,
 * không gọi ezCloud thật (đúng yêu cầu Phase 6 "Không implement API thật").
 */
export function BookingPageContent({ initialLocation }: { initialLocation: string }) {
  const [status, setStatus] = useState<AvailabilityStatus>("idle");
  const [results, setResults] = useState<RoomType[]>([]);

  const handleSearch = (value: BookingSearchValue) => {
    setStatus("loading");
    // MOCK: mô phỏng độ trễ gọi API để có trạng thái loading thật (không phải giả lập tĩnh).
    window.setTimeout(() => {
      const pool = value.location === "all" ? rooms : rooms.filter((r) => r.hotel === value.location);
      if (pool.length === 0) {
        setStatus("empty");
        setResults([]);
      } else {
        setStatus("results");
        setResults(pool.slice(0, 3));
      }
    }, 700);
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
