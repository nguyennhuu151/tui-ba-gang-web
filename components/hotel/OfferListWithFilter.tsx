"use client";

import { useState } from "react";
import { TabFilter } from "@/components/navigation/TabFilter";
import { OfferCard } from "@/components/hotel/OfferCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { getProperties } from "@/lib/content/properties";
import { useI18n } from "@/lib/i18n/client";
import type { Offer } from "@/lib/types";

export function OfferListWithFilter({ offers }: { offers: Offer[] }) {
  const { locale, dict } = useI18n();
  const tabs = [
    { key: "all", label: dict.offersPage.allOffers },
    ...getProperties(locale).map((p) => ({ key: p.slug, label: p.shortName })),
  ];
  const [active, setActive] = useState("all");
  const filtered = active === "all" ? offers : offers.filter((o) => o.property === active);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <TabFilter items={tabs} activeKey={active} onSelect={setActive} />
        <p className="text-sm text-brown-600">
          {dict.offersPage.count(filtered.length)}
        </p>
      </div>

      <div className="mt-8">
        {filtered.length === 0 ? (
          <EmptyState
            title={dict.offersPage.emptyTitle}
            description={dict.offersPage.emptyDescription}
          />
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
