"use client";

import { useState } from "react";
import Image from "next/image";

/**
 * RoomGallery — gallery ảnh 1 phòng, dùng ở `/phong-nghi/:hotel/:roomSlug`.
 * Ảnh chính + dải thumbnail — xem docs/ui-component-spec.md mục 2.6.
 */
export function RoomGallery({ images, alt }: { images: string[]; alt: string }) {
  const [active, setActive] = useState(0);

  return (
    <div>
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg bg-cream-100">
        <Image src={images[active]} alt={alt} fill sizes="100vw" className="object-cover" priority />
      </div>
      {images.length > 1 && (
        <div className="mt-3 flex gap-3">
          {images.map((src, index) => (
            <button
              key={src}
              type="button"
              onClick={() => setActive(index)}
              aria-label={`Xem ảnh ${index + 1}`}
              aria-current={index === active}
              className={`relative h-16 w-24 shrink-0 overflow-hidden rounded-md ring-2 transition-colors ${
                index === active ? "ring-brown-800" : "ring-transparent"
              }`}
            >
              <Image src={src} alt="" fill sizes="96px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
