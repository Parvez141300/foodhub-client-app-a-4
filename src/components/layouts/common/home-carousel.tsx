"use client";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";

import { Card } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// slides
const slides = [
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

export function HomeCarousel() {
  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: false }));
  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
      opts={{
        align: "center",
        loop: true,
      }}
    >
      <CarouselContent>
        {slides.map((slide, index) => (
          <CarouselItem key={slide.id}>
            <div className="relative w-full h-64 md:h-96">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                className="object-cover"
                priority={slide.id === 1}
              />
              <div className="absolute inset-0 bg-black/50 flex justify-start items-center">
                <div className="max-w-6xl px-14 text-white">
                  <h1 className="text-4xl md:text-6xl font-bold mb-4">
                    {slide.title}
                  </h1>
                  <p className="text-lg md:text-xl mb-6 max-w-xl">
                    {slide.description}
                  </p>
                  <Button asChild variant={"default"} size="lg">
                    <Link href={"/meals"}>Shop Now</Link>
                  </Button>
                </div>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
