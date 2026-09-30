"use client";

import { useI18n } from "@/lib/i18n/client";

/** Giá trị đại diện cho lựa chọn "Tất cả" — tách khỏi nhãn hiển thị để không phụ thuộc ngôn ngữ. */
export const ALL_ROOMS = "__all__";

/**
 * RoomFilterChips — chip lọc "Tất cả" + từng hạng phòng, dùng ở `/phong-nghi/:hotel`.
 * ⚠️ Tên hạng phòng hiện là MOCK DATA (xem lib/content/rooms.ts, docs/open-questions.md
 * M1-M3) nên danh sách chip ở đây cũng sẽ thay đổi theo khi có tên chính thức.
 */
export function RoomFilterChips({
  options,
  active,
  onChange,
}: {
  options: string[];
  active: string;
  onChange: (value: string) => void;
}) {
  const { dict } = useI18n();
  const all = [ALL_ROOMS, ...options];

  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label={dict.roomsPage.filterLabel}>
      {all.map((option) => {
        const isActive = option === active;
        return (
          <button
            key={option}
            type="button"
            onClick={() => onChange(option)}
            aria-pressed={isActive}
            className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
              isActive
                ? "border-brown-800 bg-brown-800 text-cream-50"
                : "border-cream-200 text-brown-600 hover:border-brown-600"
            }`}
          >
            {option === ALL_ROOMS ? dict.roomsPage.all : option}
          </button>
        );
      })}
    </div>
  );
}
