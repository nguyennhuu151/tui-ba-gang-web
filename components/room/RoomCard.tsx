"use client";

import Image from "next/image";
import { Button } from "@/components/ui/Button";
import type { RoomType } from "@/lib/types";
import { useI18n } from "@/lib/i18n/client";

/**
 * RoomCard — dùng ở `/phong-nghi/:hotel` (danh sách đầy đủ, `variant="default"`)
 * VÀ `/thu-vien/:hotel` (preview 3-4 phòng, `variant="compact"`) — xem
 * docs/ui-component-spec.md mục 2.6.
 */
export function RoomCard({
  room,
  variant = "default",
}: {
  room: RoomType;
  variant?: "default" | "compact";
}) {
  const { dict } = useI18n();

  return (
    <article className="flex flex-col overflow-hidden rounded-lg bg-cream-100">
      <div className={`relative w-full ${variant === "compact" ? "aspect-[4/3]" : "aspect-[16/11]"}`}>
        <Image
          src={room.images[0]}
          alt={room.name}
          fill
          sizes="(min-width: 768px) 33vw, 100vw"
          className="object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <h3 className="font-heading text-xl text-ink">{room.name}</h3>
        <p className="text-xs uppercase tracking-label text-brown-600">
          {dict.common.guests(room.maxGuests)} · {room.sizeSqm}m²
        </p>
        {variant === "default" && <p className="text-sm text-brown-600">{room.description}</p>}
        <div className="mt-2">
          <Button href={`/phong-nghi/${room.hotel}/${room.slug}`} variant="ghost">
            {dict.roomsPage.viewDetails}
          </Button>
        </div>
      </div>
    </article>
  );
}
