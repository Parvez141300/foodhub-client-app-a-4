"use client";

import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectCreative } from "swiper/modules";

// Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-creative";

export type PromoSlide = {
  id: number;
  image: string;
  title: string;
  subtitle: string;
  href: string;
};

export const promoSlides: PromoSlide[] = [
  {
    id: 1,
    image: "/promo-slider-image/square-image-1.jpg",
    title: "50% OFF",
    subtitle: "On all burgers",
    href: "/meals",
  },
  {
    id: 2,
    image: "/promo-slider-image/square-image-2.jpg",
    title: "New Arrivals",
    subtitle: "Try our fresh menu",
    href: "/meals",
  },
  {
    id: 3,
    image: "/promo-slider-image/square-image-3.jpeg",
    title: "Free Delivery",
    subtitle: "On orders over $30",
    href: "/meals",
  },
];

export function PromoSecondCarousel() {
  return (
    <Swiper
      modules={[Autoplay, Pagination, EffectCreative]}
      className="h-full w-full rounded-xl overflow-hidden"
      effect="creative"
      grabCursor
      loop
      slidesPerView={1}
      autoplay={{
        delay: 1000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      }}
      pagination={{ clickable: true }}
      creativeEffect={{
        prev: {
          shadow: true,
          translate: ["-125%", 0, -800],
          rotate: [0, 0, -90],
        },
        next: {
          shadow: true,
          translate: ["125%", 0, -800],
          rotate: [0, 0, 90],
        },
      }}
    >
      {promoSlides.map((promo) => (
        <SwiperSlide key={promo.id}>
          <Link href={promo.href} className="relative block w-full h-full">
            <Image
              src={promo.image}
              alt={promo.title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-5 text-white">
              <h3 className="text-2xl md:text-3xl font-bold">{promo.title}</h3>
              <p className="text-sm md:text-base opacity-90">
                {promo.subtitle}
              </p>
            </div>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
