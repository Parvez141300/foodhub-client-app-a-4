"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Eye, Heart, ShoppingCart } from "lucide-react";
import { useState } from "react";

export function MealCard1() {
  const [isHovered, setIsHovered] = useState(false);

  // add to cart
  const handleAddToCart = async () => {
    console.log("added to cart");
  };
  // add to wishlist
  const handleAddToWishList = async () => {
    console.log("added to wish list");
  };
  return (
    <Card
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative mx-auto w-full max-w-sm pt-0 hover:shadow-xl"
    >
      <div className="absolute inset-0 z-30 aspect-video bg-black/35" />
      <div className="relative w-full overflow-hidden">
        <img
          src="https://avatar.vercel.sh/shadcn1"
          alt="Event cover"
          className={cn(
            "aspect-video w-full object-cover transition-transform duration-500",
            isHovered && "scale-110",
          )}
        />
        {/* dark overlay on hover */}
        <div
          className={cn(
            "absolute inset-0 bg-black/40 transition-opacity duration-500",
            isHovered ? "opacity-100" : "opacity-0",
          )}
        />
        {/* show cart, wish list and eye */}
        <div
          className={cn(
            "absolute z-50 inset-0 flex items-center justify-center gap-4 transition-all duration-300",
            isHovered ? "opacity-100 translate-y-16" : "opacity-0",
          )}
        >
          {/* cart button */}
          <Button
            onClick={handleAddToCart}
            className="rounded-full w-10 h-10 hover:bg-primary hover:text-secondary duration-500"
            variant={isHovered ? "secondary" : "default"}
          >
            <ShoppingCart className="w-5 h-5" />
          </Button>
          <Button
            onClick={handleAddToWishList}
            className="rounded-full w-10 h-10 hover:bg-primary hover:text-secondary duration-500"
            variant={isHovered ? "secondary" : "default"}
          >
            <Heart className="w-5 h-5" />
          </Button>
          <Button
            className="rounded-full w-10 h-10 hover:bg-primary hover:text-secondary duration-500"
            variant={isHovered ? "secondary" : "default"}
          >
            <Eye className="w-5 h-5" />
          </Button>
        </div>
      </div>
      <CardHeader className="flex items-center justify-between">
        <CardTitle>Design systems meetup</CardTitle>
        <Badge variant="secondary">In Stock</Badge>
      </CardHeader>
      <CardFooter className="flex justify-between items-center">
        <h3 className="text-lg font-bold">Price: 999tk</h3>
        <Button>View Details</Button>
      </CardFooter>
    </Card>
  );
}
