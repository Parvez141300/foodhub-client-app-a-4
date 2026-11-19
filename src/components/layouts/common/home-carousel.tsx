"use client";

import Image from "next/image";
import Link from "next/link";

import { Swiper, SwiperSlide } from "swiper/react";
import {
  Autoplay,
  Pagination,
  Navigation,
  EffectCreative,
  EffectFade,
} from "swiper/modules";

// Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-creative";
import "swiper/css/effect-fade";

import { Button } from "@/components/ui/button";

/* -------------------------------------------------------------------------- */
/*                                   DATA                                     */
/* -------------------------------------------------------------------------- */

const heroSlides = [
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

const promoSlides = [
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

/* -------------------------------------------------------------------------- */
/*                              MAIN COMPONENT                                */
/* -------------------------------------------------------------------------- */

export function HeroSection() {
  return (
    <section className="w-full max-w-7xl mx-auto">
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

/* -------------------------------------------------------------------------- */
/*                              HERO CAROUSEL                                 */
/* -------------------------------------------------------------------------- */

function HeroCarousel() {
  return (
    <Swiper
      modules={[Autoplay, Pagination, Navigation, EffectFade]}
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
      navigation
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
  );
}

/* -------------------------------------------------------------------------- */
/*                              PROMO CAROUSEL                                */
/* -------------------------------------------------------------------------- */

function PromoFirstCarousel() {
  return (
    <Swiper
      direction="vertical"
      modules={[Autoplay, Pagination]}
      className="h-full w-full rounded-xl overflow-hidden"
      effect="creative"
      grabCursor
      loop
      slidesPerView={1}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      }}
      pagination={{ clickable: true }}
      // creativeEffect={{
      //   prev: {
      //     shadow: true,
      //     translate: ["-125%", 0, -800],
      //     rotate: [0, 0, -90],
      //   },
      //   next: {
      //     shadow: true,
      //     translate: ["125%", 0, -800],
      //     rotate: [0, 0, 90],
      //   },
      // }}
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
function PromoSecondCarousel() {
  return (
    <Swiper
      modules={[Autoplay, EffectCreative, Pagination]}
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
