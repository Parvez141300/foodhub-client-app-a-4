"use client";

import { HeroCarousel } from "./HomeCarousel/HeroCarousel";
import { PromoFirstCarousel } from "./HomeCarousel/PromoFirstCarousel";
import { PromoSecondCarousel } from "./HomeCarousel/PromoSecondCarousel";

export function HeroSection() {
  return (
    <section className="w-full mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Hero — 3/4 width */}
        <div className="lg:col-span-3">
          <div className="aspect-video lg:aspect-3/2">
            <HeroCarousel />
          </div>
        </div>

        {/* Promo — 1/4 width, square on desktop */}
        <div className="lg:col-span-1 space-y-5">
          <div className="aspect-2/1 lg:aspect-square">
            <PromoFirstCarousel />
          </div>
          <div className="aspect-2/1 lg:aspect-square">
            <PromoSecondCarousel />
          </div>
        </div>
      </div>
    </section>
  );
}
