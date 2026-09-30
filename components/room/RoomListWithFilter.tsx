"use client";

import { useMemo, useState } from "react";
import { ALL_ROOMS, RoomFilterChips } from "@/components/room/RoomFilterChips";
import { RoomCard } from "@/components/room/RoomCard";
import { EmptyState } from "@/components/ui/EmptyState";
import type { RoomType } from "@/lib/types";
import { useI18n } from "@/lib/i18n/client";

/**
 * RoomListWithFilter — tách riêng phần có state (filter chip) khỏi `page.tsx`
 * (server component) để `page.tsx` vẫn giữ được `generateMetadata`/`notFound()`.
 */
export function RoomListWithFilter({ rooms }: { rooms: RoomType[] }) {
  const { dict } = useI18n();
  const [active, setActive] = useState(ALL_ROOMS);
  const roomNames = useMemo(() => Array.from(new Set(rooms.map((r) => r.name))), [rooms]);
  const filtered = active === ALL_ROOMS ? rooms : rooms.filter((r) => r.name === active);

  return (
    <div>
      <RoomFilterChips options={roomNames} active={active} onChange={setActive} />
      <div className="mt-8">
        {filtered.length === 0 ? (
          <EmptyState
            title={dict.roomsPage.emptyTitle}
            description={dict.roomsPage.emptyDescription}
          />
        ) : (
          <div className="grid gap-8 md:grid-cols-3">
            {filtered.map((room) => (
              <RoomCard key={room.slug} room={room} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
