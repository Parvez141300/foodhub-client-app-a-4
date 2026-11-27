"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

import { Button } from "@/components/ui/button";

export type HeroSlide = {
  id: number;
  image: string;
  title: string;
  description: string;
};

export const heroSlides: HeroSlide[] = [
  {
    id: 1,
    image: "/slider-images/slide-1.jpg",
    title: "Delicious Burger",
    description: "Juicy grilled burger with fresh ingredients.",
  },
  {
    id: 2,
    image: "/slider-images/slide-2.jpg",
    title: "Hot Stake",
    description: "Fresh stake with extra lemon.",
  },
  {
    id: 3,
    image: "/slider-images/slide-3.jpg",
    title: "Crispy Fried Chicken",
    description: "Crunchy outside, juicy inside – pure delight.",
  },
  {
    id: 4,
    image: "/slider-images/slide-4.png",
    title: "Healthy Beef Kebab",
    description:
      "Fresh veggies & premium fillings for healthy bite with Kebab.",
  },
  {
    id: 5,
    image: "/slider-images/slide-5.jpg",
    title: "Creamy Pasta",
    description: "Rich creamy sauce with Italian herbs.",
  },
  {
    id: 6,
    image: "/slider-images/slide-6.jpg",
    title: "Beef Kebab",
    description: "Juicy Beef Kebab to boost your energy.",
  },
];

export function HeroCarousel() {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <div className="relative h-full w-full">
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        className="h-full w-full rounded-xl overflow-hidden"
        slidesPerView={1}
        effect="fade"
        loop
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        pagination={{ clickable: true }}
      >
        {heroSlides.map((slide, index) => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full h-full">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                className="object-cover"
                priority={index === 0}
              />
              <div className="absolute inset-0 bg-black/50 flex items-center">
                <div className="px-6 md:px-14 text-white">
                  <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4">
                    {slide.title}
                  </h1>
                  <p className="text-base md:text-lg mb-6 max-w-xl">
                    {slide.description}
                  </p>
                  <Button asChild variant="default" size="lg">
                    <Link href="/meals">Shop Now</Link>
                  </Button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Prev Button */}
      <Button
        type="button"
        variant="secondary"
        size="icon"
        aria-label="Previous slide"
        onClick={() => swiperRef.current?.slidePrev()}
        className="absolute left-3 md:left-5 top-1/2 -translate-y-1/2 z-20 h-10 w-10 md:h-12 md:w-12 rounded-full bg-white/20 hover:bg-white/40 text-white backdrop-blur-sm shadow-lg border border-white/30 transition-colors"
      >
        <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
      </Button>

      {/* Custom Next Button */}
      <Button
        type="button"
        variant="secondary"
        size="icon"
        aria-label="Next slide"
        onClick={() => swiperRef.current?.slideNext()}
        className="absolute right-3 md:right-5 top-1/2 -translate-y-1/2 z-20 h-10 w-10 md:h-12 md:w-12 rounded-full bg-white/20 hover:bg-white/40 text-white backdrop-blur-sm shadow-lg border border-white/30 transition-colors"
      >
        <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
      </Button>
    </div>
  );
}
