"use client";

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
  const all = ["Tất cả", ...options];

  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label="Lọc theo hạng phòng">
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
            {option}
          </button>
        );
      })}
    </div>
  );
}
