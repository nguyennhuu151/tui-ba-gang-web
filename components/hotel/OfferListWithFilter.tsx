"use client";

import { useState } from "react";
import { TabFilter } from "@/components/navigation/TabFilter";
import { OfferCard } from "@/components/hotel/OfferCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { properties } from "@/lib/content/properties";
import type { Offer } from "@/lib/types";

const TABS = [
  { key: "all", label: "Tất cả ưu đãi" },
  ...properties.map((p) => ({ key: p.slug, label: p.shortName })),
];

export function OfferListWithFilter({ offers }: { offers: Offer[] }) {
  const [active, setActive] = useState("all");
  const filtered = active === "all" ? offers : offers.filter((o) => o.property === active);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <TabFilter items={TABS} activeKey={active} onSelect={setActive} />
        <p className="text-sm text-brown-600">{filtered.length} ưu đãi hiện có</p>
      </div>

      <div className="mt-8">
        {filtered.length === 0 ? (
          <EmptyState title="Chưa có ưu đãi phù hợp" description="Vui lòng quay lại sau hoặc chọn cơ sở khác." />
        ) : (
          <div className="grid gap-8 md:grid-cols-3">
            {filtered.map((offer) => (
              <OfferCard key={offer.slug} offer={offer} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
