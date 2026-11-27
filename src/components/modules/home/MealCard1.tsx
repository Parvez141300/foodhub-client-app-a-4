"use client";

import { createCartWithCartItem } from "@/actions/cart.action";
import { getCurrentUser } from "@/actions/user.action";
import { createWishList } from "@/actions/wishlist.action";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Roles } from "@/constants/roles";
import { cn } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Eye, Heart, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";

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
  const [cartLoading, setCartLoading] = useState(false);
  const [userData, setUserData] = useState<any>(null);

  const queryClient = useQueryClient();

  // ── User fetch (আগের মতোই) ──
  useEffect(() => {
    const fetchUser = async () => {
      const session = await getCurrentUser();
      setUserData(session?.user ?? null);
    };
    fetchUser();
  }, []);

  // ── Add to Cart (আগের মতোই) ──
  const handleAddToCart = async (mealId: string) => {
    const toastId = toast.loading("Adding to cart");
    setCartLoading(true);
    try {
      if (!userData) {
        return toast.error("User Need to login to add to cart", {
          id: toastId,
        });
      }
      if (userData.role !== Roles.CUSTOMER) {
        return toast.error("Only Customer user can add to cart", {
          id: toastId,
        });
      }

      const result = await createCartWithCartItem({
        userId: userData.id,
        mealId,
        quantity: 1,
      });

      if (result?.id) {
        toast.success(`Added 1 x ${meal?.title} to cart`, { id: toastId });
        // চাইলে cart query-ও invalidate করতে পারো:
        // queryClient.invalidateQueries({ queryKey: ["user-cart"] });
      } else {
        toast.error("Failed to add to cart", { id: toastId });
      }
    } catch (error: any) {
      toast.error(error?.message ?? "Something went wrong", { id: toastId });
    } finally {
      setCartLoading(false);
    }
  };

  // ── Add to Wishlist (useMutation) ──
  const { mutate: addToWishlistMutation, isPending: wishListLoading } =
    useMutation({
      mutationFn: (mealId: string) => createWishList(mealId),

      // loading toast তৈরি করে context হিসেবে toastId ফেরত দাও
      onMutate: () => {
        const toastId = toast.loading("Adding to wish list");
        return { toastId };
      },

      onSuccess: (result, _mealId, context) => {
        if (result?.id) {
          toast.success(`Added ${meal?.title} to wish list`, {
            id: context?.toastId,
          });
          // 👇 prefix-match — ["user-wishlist", queryString] সব invalidate হবে
          queryClient.invalidateQueries({ queryKey: ["user-wishlist"] });
        } else {
          toast.error("This item is already in your Wish List", {
            id: context?.toastId,
          });
        }
      },

      onError: (error: any, _mealId, context) => {
        toast.error(error?.message ?? "Failed to add to wish list", {
          id: context?.toastId,
        });
      },
    });

  const handleAddToWishlist = (mealId: string) => {
    if (!userData) {
      toast.error("User Need to login to add to wish list");
      return;
    }
    if (userData.role !== Roles.CUSTOMER) {
      toast.error("Only Customer user can add to wish list");
      return;
    }
    addToWishlistMutation(mealId);
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
        <div
          className={cn(
            "absolute inset-0 bg-black/40 transition-opacity duration-500",
            isHovered ? "opacity-100" : "opacity-0",
          )}
        />
        <div
          className={cn(
            "absolute z-20 inset-0 flex items-center justify-center gap-4 transition-all duration-300",
            isHovered ? "opacity-100 translate-y-14" : "opacity-0",
          )}
        >
          <Button
            onClick={() => handleAddToCart(meal?.id)}
            className="rounded-full w-10 h-10 hover:bg-primary hover:text-secondary duration-500"
            variant={isHovered ? "secondary" : "default"}
            disabled={!meal.is_available || cartLoading}
          >
            <ShoppingCart className="w-5 h-5" />
          </Button>
          <Button
            onClick={() => handleAddToWishlist(meal?.id)}
            className="rounded-full w-10 h-10 hover:bg-primary hover:text-secondary duration-500"
            variant={isHovered ? "secondary" : "default"}
            disabled={!meal?.is_available || wishListLoading}
          >
            <Heart className="w-5 h-5" />
          </Button>
          <Button
            className="rounded-full w-10 h-10 hover:bg-primary hover:text-secondary duration-500"
            variant={isHovered ? "secondary" : "default"}
          >
            <Link href={`/meals/${meal?.id}`}>
              <Eye className="w-5 h-5" />
            </Link>
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
        <Button>
          <Link href={`/meals/${meal?.id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
