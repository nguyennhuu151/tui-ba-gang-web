"use client";

import { useState } from "react";

export interface GuestCount {
  adults: number;
  children: number;
}

/**
 * GuestCountSelector — dropdown chọn số người lớn/trẻ em.
 * Giá trị mặc định "2 Người lớn, 0 Trẻ em" — CONFIRMED từ File B trang 1.
 */
export function GuestCountSelector({
  value,
  onChange,
}: {
  value: GuestCount;
  onChange: (value: GuestCount) => void;
}) {
  const [open, setOpen] = useState(false);

  const update = (key: keyof GuestCount, delta: number) => {
    const next = Math.max(key === "adults" ? 1 : 0, value[key] + delta);
    onChange({ ...value, [key]: next });
  };

  return (
    <div className="relative w-full">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center gap-2 text-left text-sm text-ink"
        aria-haspopup="dialog"
        aria-expanded={open}
      >
        <GuestIcon />
        <span>
          {value.adults} Người lớn, {value.children} Trẻ em
        </span>
      </button>

      {open && (
        <div className="absolute left-0 top-full z-20 mt-2 w-64 rounded-md border border-cream-200 bg-cream-50 p-4 shadow-lg">
          <GuestRow label="Người lớn" count={value.adults} onDecrease={() => update("adults", -1)} onIncrease={() => update("adults", 1)} />
          <GuestRow label="Trẻ em" count={value.children} onDecrease={() => update("children", -1)} onIncrease={() => update("children", 1)} />
        </div>
      )}
    </div>
  );
}

function GuestRow({
  label,
  count,
  onDecrease,
  onIncrease,
}: {
  label: string;
  count: number;
  onDecrease: () => void;
  onIncrease: () => void;
}) {
  return (
    <div className="flex items-center justify-between py-1.5">
      <span className="text-sm text-ink">{label}</span>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onDecrease}
          aria-label={`Giảm ${label}`}
          className="flex h-7 w-7 items-center justify-center rounded-full border border-brown-600 text-brown-800"
        >
          −
        </button>
        <span className="w-4 text-center text-sm">{count}</span>
        <button
          type="button"
          onClick={onIncrease}
          aria-label={`Tăng ${label}`}
          className="flex h-7 w-7 items-center justify-center rounded-full border border-brown-600 text-brown-800"
        >
          +
        </button>
      </div>
    </div>
  );
}

function GuestIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="shrink-0 text-brown-600">
      <circle cx="8" cy="5" r="2.4" stroke="currentColor" strokeWidth="1.2" />
      <path d="M3 13c0-2.5 2.2-4 5-4s5 1.5 5 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}
