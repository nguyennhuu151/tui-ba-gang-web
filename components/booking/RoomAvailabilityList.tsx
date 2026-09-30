"use client";

import { Spinner } from "@/components/ui/Spinner";
import { EmptyState } from "@/components/ui/EmptyState";
import { RoomCard } from "@/components/room/RoomCard";
import type { RoomType } from "@/lib/types";
import { useI18n } from "@/lib/i18n/client";

/**
 * RoomAvailabilityList — danh sách phòng trống sau khi tìm kiếm ở `/dat-phong`.
 * [CHƯA XÁC ĐỊNH] giao diện chi tiết vì File B không có mockup cho phần này
 * (xem docs/ui-component-spec.md mục 2.4). Bố cục dưới đây là MOCK tối giản,
 * tái sử dụng `RoomCard` sẵn có thay vì tạo UI mới không có căn cứ.
 *
 * KHÔNG gọi ezCloud thật — `results` là dữ liệu mock được tạo ở phía client.
 */
export type AvailabilityStatus = "idle" | "loading" | "results" | "empty";

export function RoomAvailabilityList({
  status,
  results,
}: {
  status: AvailabilityStatus;
  results: RoomType[];
}) {
  const { dict } = useI18n();

  if (status === "idle") {
    return null;
  }

  if (status === "loading") {
    return <Spinner label={dict.bookingPage.results.checking} />;
  }

  if (status === "empty" || results.length === 0) {
    return (
      <EmptyState
        title={dict.bookingPage.results.emptyTitle}
        description={dict.bookingPage.results.emptyDescription}
      />
    );
  }

  return (
    <div>
      <p className="section-label mb-6">{dict.bookingPage.results.label}</p>
      <div className="grid gap-8 md:grid-cols-3">
        {results.map((room) => (
          <RoomCard key={`${room.hotel}-${room.slug}`} room={room} />
        ))}
      </div>
      <p className="mt-6 text-xs text-brown-600">
        {dict.bookingPage.results.apiNote}
      </p>
    </div>
  );
}
