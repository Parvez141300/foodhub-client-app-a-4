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
import Image from "next/image";
import { useState } from "react";

// {
//     "id": "dd1264d4-90c2-4165-bae1-0ab9f583b8e3",
//     "provider_id": "XGyEl3WBuhGpx4DAT82DQKRvSnKlI3oF",
//     "category_id": "2c091153-7591-4a60-8bfd-9e8a76956266",
//     "cuisine_id": "e719dded-6948-4a59-8fe9-0dd902736ccc",
//     "dietery_id": "468338e4-07bd-4885-b837-6129d7b332a7",
//     "title": "Black Coffee",
//     "description": "Chinese coffee is a rapidly growing, high-quality specialty industry, with over 95% of production concentrated in Yunnan province. Known for being gentle, sweet, and nutty with a creamy texture, Yunnan coffee predominantly features Catimor Arabica beans. It is increasingly recognized in the global specialty market, characterized by high altitude (2,000m+), rich soil, and a subtropical climate. \n\nKey Aspects of Chinese Coffee:\nGrowing Region: Almost all Chinese specialty coffee comes from Yunnan, a mountainous province in the southwest.\nFlavor Profile: Generally gentle, sweet, and creamy, making it excellent for espresso or balanced filter brews.\nVarietals: Roughly 70% of production comes from the Catimor hybrid, which is favored for its disease resistance.\nCoffee Culture: While tea has a longer history, coffee consumption is growing rapidly, with a focus on both high-quality, traceable specialty beans and a massive instant coffee market.\nKey Players: While Nestlé historically drove production via training, modern Chinese coffee focuses on organic, traceable, and specialty production. \n\nKey Differences from Other Regions:\nChinese coffee often offers a unique, milder alternative to bolder African or South American coffees, with growing appreciation for its distinct, sometimes nutty or fruit-forward notes",
//     "stock": 250,
//     "price": 150,
//     "image_url": "https://res.cloudinary.com/dapbx8al2/image/upload/v1772447498/k9fjqzq9eqvpmoewnku1.jpg",
//     "is_available": true,
//     "is_featured": false,
//     "created_at": "2026-03-02T10:31:57.110Z",
//     "updated_at": "2026-03-02T10:31:57.110Z",
//     "category": {
//         "id": "2c091153-7591-4a60-8bfd-9e8a76956266",
//         "name": "coffee"
//     },
//     "cuisine": {
//         "id": "e719dded-6948-4a59-8fe9-0dd902736ccc",
//         "name": "Chinese"
//     },
//     "dietery": {
//         "id": "468338e4-07bd-4885-b837-6129d7b332a7",
//         "name": "Healthy"
//     }
// }

type MealCardType = {
  id: string;
  title: string;
  stock: number;
  price: number;
  image_url: string;
  is_available: boolean;
};

export function MealCard1({ meal }: { meal: MealCardType }) {
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
      className="relative w-full pt-0 hover:shadow-xl"
    >
      <div className="relative w-full h-48 overflow-hidden">
        <Image
          src={meal?.image_url || "https://avatar.vercel.sh/shadcn1"}
          alt={meal?.title}
          fill
          loading="lazy"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className={cn(
            "w-full object-cover transition-transform duration-500",
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
            isHovered ? "opacity-100 translate-y-14" : "opacity-0",
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
        <CardTitle>{meal?.title}</CardTitle>
        <Badge variant="secondary">
          {meal?.is_available ? (
            <>In Stock: ({meal?.stock})</>
          ) : (
            <>Out of Stock</>
          )}
        </Badge>
      </CardHeader>
      <CardFooter className="flex justify-between items-center">
        <h3 className="text-lg font-bold">Price: {meal?.price}tk</h3>
        <Button>View Details</Button>
      </CardFooter>
    </Card>
  );
}
