"use client";

import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { MealCard1 } from "../MealCard1";
import { ChevronLeft, ChevronRight } from "lucide-react";

type FeaturedMealsType = {
  id: string;
  title: string;
  stock: number;
  price: number;
  image_url: string;
  is_available: boolean;
};

const DESKTOP_SLIDES = 5;
// Swiper needs 2x slidesPerView for a seamless loop
const MIN_LOOP_SLIDES = DESKTOP_SLIDES * 2; // 8

export function HomeFeaturedCarousel({
  featuredMeals,
}: {
  featuredMeals: FeaturedMealsType[];
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef<SwiperType | null>(null);

  const handleMouseEnter = () => swiperRef.current?.autoplay.stop();
  const handleMouseLeave = () => swiperRef.current?.autoplay.start();

  // If there aren't enough meals for a seamless loop, duplicate them.
  // This is what stops the "5th comes in, 1st pops off" glitch.
  const canLoop = featuredMeals.length > DESKTOP_SLIDES;
  const slidesToRender =
    canLoop && featuredMeals.length < MIN_LOOP_SLIDES
      ? Array.from(
          { length: Math.ceil(MIN_LOOP_SLIDES / featuredMeals.length) },
          (_, dup) =>
            featuredMeals.map((meal) => ({
              ...meal,
              _key: `${meal.id}__dup_${dup}`,
            })),
        ).flat()
      : featuredMeals.map((meal) => ({ ...meal, _key: meal.id }));

  return (
    <div
      className="relative w-full"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        spaceBetween={24}
        loop={canLoop}
        speed={600}
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        navigation={{ nextEl: ".custom-next", prevEl: ".custom-prev" }}
        pagination={{ el: ".custom-pagination", clickable: true }}
        breakpoints={{
          0: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          1024: { slidesPerView: DESKTOP_SLIDES },
        }}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        className="pb-12"
      >
        {slidesToRender.map((meal, index) => (
          <SwiperSlide key={meal._key}>
            <div
              className={`transition-opacity duration-300 ${
                index === activeIndex ? "opacity-100" : "opacity-90"
              }`}
            >
              <MealCard1 meal={meal} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Dots (Pagination) */}
      <div
        className="custom-pagination flex justify-center gap-2 mt-4"
        style={
          {
            "--swiper-pagination-color": "hsl(var(--primary))",
            "--swiper-pagination-bullet-inactive-color":
              "hsl(var(--muted-foreground))",
            "--swiper-pagination-bullet-inactive-opacity": "0.35",
            "--swiper-pagination-bullet-size": "8px",
          } as React.CSSProperties
        }
      ></div>

      {/* Custom Navigation Arrows BELOW the dots */}
      <div className="flex justify-center gap-2 mt-3">
        <button
          aria-label="Previous slide"
          className="custom-prev flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-border bg-background text-foreground shadow-sm transition-colors duration-300 hover:bg-primary hover:text-primary-foreground"
        >
          <ChevronLeft />
        </button>
        <button
          aria-label="Next slide"
          className="custom-next flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-border bg-background text-foreground shadow-sm transition-colors duration-300 hover:bg-primary hover:text-primary-foreground"
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );
}
