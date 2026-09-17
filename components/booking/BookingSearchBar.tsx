"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { properties } from "@/lib/content/properties";
import { GuestCountSelector, type GuestCount } from "@/components/booking/GuestCountSelector";
import { Button } from "@/components/ui/Button";

/**
 * BookingSearchBar — CONFIRMED File B trang 1: Địa điểm / Nhận phòng / Trả phòng / Số khách + CTA "Tìm phòng".
 *
 * QUAN TRỌNG — phạm vi Phase 5:
 * - Đây là UI + state phía client, dùng MOCK DATA (danh sách cơ sở tĩnh).
 * - KHÔNG gọi ezCloud thật (đúng yêu cầu "Không implement EZCloud API thật").
 * - Khi bấm "Tìm phòng", hiện thông báo rõ đây là bản mô phỏng, chưa nối dữ liệu thật —
 *   xem docs/api-integration-design.md mục 2.4 (PMS Adapter) cho hướng tích hợp thật ở phase sau.
 */
export interface BookingSearchValue {
  location: string;
  checkIn: string;
  checkOut: string;
  guests: GuestCount;
}

export function BookingSearchBar({
  initialLocation = "all",
  onSearch,
}: {
  initialLocation?: string;
  /** Dùng ở `/dat-phong` để hiện khu vực kết quả — xem components/booking/RoomAvailabilityList.tsx */
  onSearch?: (value: BookingSearchValue) => void;
}) {
  const [location, setLocation] = useState(initialLocation);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState<GuestCount>({ adults: 2, children: 0 });
  const [notice, setNotice] = useState<string | null>(null);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    // MOCK: chưa tích hợp ezCloud thật (xem docs/api-integration-design.md).
    setNotice(
      "Đây là bản mô phỏng giao diện tìm phòng. Tính năng kiểm tra phòng trống thật sẽ được tích hợp với ezCloud ở phase sau.",
    );
    onSearch?.({ location, checkIn, checkOut, guests });
  };

  return (
    <div className="relative z-10 -mt-10 md:-mt-14">
      <div className="mx-6 rounded-xl bg-cream-100 p-4 shadow-lg md:mx-10 md:p-6">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 md:flex-row md:items-center md:gap-6"
        >
          <Field label="Địa điểm">
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full bg-transparent text-sm text-ink outline-none"
            >
              <option value="all">Tất cả khách sạn</option>
              {properties.map((p) => (
                <option key={p.slug} value={p.slug}>
                  {p.fullName}
                </option>
              ))}
            </select>
          </Field>

          <Divider />

          <Field label="Nhận phòng">
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="w-full bg-transparent text-sm text-ink outline-none"
            />
          </Field>

          <Divider />

          <Field label="Trả phòng">
            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="w-full bg-transparent text-sm text-ink outline-none"
            />
          </Field>

          <Divider />

          <Field label="Số khách">
            <GuestCountSelector value={guests} onChange={setGuests} />
          </Field>

          <Button type="submit" withArrow className="w-full justify-center md:w-auto">
            TÌM PHÒNG
          </Button>
        </form>

        {notice && (
          <p role="status" className="mt-4 text-xs text-brown-600">
            {notice}
          </p>
        )}
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex min-w-0 flex-1 flex-col gap-1">
      <span className="text-[11px] uppercase tracking-label text-brown-600">{label}</span>
      {children}
    </div>
  );
}

function Divider() {
  return <div className="hidden h-8 w-px bg-cream-200 md:block" aria-hidden="true" />;
}
