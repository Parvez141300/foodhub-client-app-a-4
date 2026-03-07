"use client";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";

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
import { MealCard1 } from "../MealCard1";

type FeaturedMealsType = {
  id: string;
  title: string;
  stock: number;
  price: number;
  image_url: string;
  is_available: boolean;
};

export function HomeFeaturedCarousel({
  featuredMeals,
}: {
  featuredMeals: FeaturedMealsType[];
}) {
  const plugin = useRef(
    Autoplay({
      delay: 2000,
      stopOnInteraction: false,
    }),
  );

  const handleMouseEnter = () => {
    plugin.current.stop();
  };

  const handleMouseLeave = () => {
    plugin.current.play();
  };
  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      opts={{
        align: "center",
        loop: true,
      }}
    >
      <CarouselContent className="-ml-4">
        {featuredMeals.map((meal, index) => (
          <CarouselItem key={meal?.id} className="basis-full md:basis-1/2 pl-4 lg:basis-1/3">
            <MealCard1 meal={meal} />
          </CarouselItem>
        ))}
      </CarouselContent>
      {/* <CarouselPrevious />
      <CarouselNext /> */}
    </Carousel>
  );
}
