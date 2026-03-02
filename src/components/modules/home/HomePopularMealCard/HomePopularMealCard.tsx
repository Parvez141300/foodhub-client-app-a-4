"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type MealCardType = {
  id: string;
  title: string;
  stock: number;
  price: number;
  image_url: string;
  is_available: boolean;
};

const HomePopularMealCard = ({ meal }: { meal: MealCardType }) => {
  console.log("meal", meal);
  return (
    <Card className="relative overflow-hidden border-0 shadow-lg max-w-sm group">
      {/* Image with overlay */}
      <div className="relative h-64 w-full">
        <Image
          src={meal?.image_url}
          alt={meal?.title}
          fill
          loading="lazy"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover w-full"
        />
        <div className="absolute inset-0 bg-black/50" />{" "}
        <div className="absolute inset-0 flex flex-col justify-between p-6 text-white">
          <div>
            {meal?.is_available ? (
              <Badge className="bg-white/20 text-white border-0 backdrop-blur-sm mb-2">
                In Stock: {meal?.stock}
              </Badge>
            ) : (
              <Badge variant="destructive" className="mb-2">
                Out of Stock
              </Badge>
            )}

            <h3 className="text-2xl font-bold leading-tight text-white">
              {meal?.title}
            </h3>

            <p className="text-sm text-white/80 mt-1">Price: ৳{meal?.price}</p>
          </div>

          <Button
            variant="secondary"
            className="w-fit bg-white text-black hover:bg-white/90"
            disabled={!meal?.is_available}
          >
            <Link href={`/meal/${meal?.id}`}>
              {meal?.is_available ? "Shop Now" : "Out of Stock"}
            </Link>
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default HomePopularMealCard;
