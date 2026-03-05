"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MoreHorizontalIcon, ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { deleteUserWishListItem } from "@/actions/wishlist.action";

// Category Type
export type Category = {
  id: string;
  name: string;
};

// Cuisine Type
export type Cuisine = {
  id: string;
  name: string;
};

// Dietery Type
export type Dietery = {
  id: string;
  name: string;
};

// Meal Type (WishlistItem এর ভিতরের meal object)
export type WishlistMeal = {
  id: string;
  provider_id: string;
  category_id: string;
  cuisine_id: string;
  dietery_id: string;
  title: string;
  description: string;
  stock: number;
  price: number;
  image_url: string;
  is_available: boolean;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
  category: Category;
  cuisine: Cuisine;
  dietery: Dietery;
};

// WishlistItem Type
export type WishlistItem = {
  id: string;
  wishlist_id: string;
  meal_id: string;
  meal: WishlistMeal;
};

// Wishlist Type (Main)
export type WishlistDataType = {
  id: string;
  user_id: string;
  created_at: string;
  wishlistItems: WishlistItem[];
};

interface WishListTableProps {
  wishlistData: WishlistDataType[];
}

const WishListTable = ({ wishlistData }: WishListTableProps) => {
  const wishlist = wishlistData[0];
  const wishlistItems = wishlist?.wishlistItems || [];

  // delete wishlist item
  const handleDelete = async (
    wishlistId: string,
    userId: string,
    mealId: string,
  ) => {
    const toastId = toast.loading("Removing from wishlist...");

    try {
      const result = await deleteUserWishListItem(wishlistId, userId, mealId);

      if (result?.id) {
        toast.success("Successfully removed from wishlist", { id: toastId });
      } else {
        toast.error("Failed to remove item", { id: toastId });
      }
    } catch (error: any) {
      toast.error(error.message || "Something went wrong", { id: toastId });
    }
  };

  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-20">Image</TableHead>
            <TableHead>Product</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Cuisine</TableHead>
            <TableHead>Dietary</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Added Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {wishlistItems.map((item) => (
            <TableRow
              key={item.id}
            >
              {/* Product Image */}
              <TableCell>
                <div className="relative h-12 w-12 rounded-md overflow-hidden">
                  <Image
                    src={item.meal.image_url}
                    alt={item.meal.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                  />
                </div>
              </TableCell>

              {/* Product Name & Details */}
              <TableCell>
                <div className="space-y-1">
                  <Link
                    href={`/meals/${item.meal.id}`}
                    target="_blank"
                    className="font-medium hover:underline flex items-center gap-1"
                  >
                    {item.meal.title}
                    <ExternalLink className="h-3 w-3" />
                  </Link>
                  <div className="text-xs text-muted-foreground">
                    Stock: {item.meal.stock}
                  </div>
                </div>
              </TableCell>

              {/* Category */}
              <TableCell>
                <Badge variant="secondary">{item.meal.category.name}</Badge>
              </TableCell>

              {/* Cuisine */}
              <TableCell>
                <Badge variant="outline">{item.meal.cuisine.name}</Badge>
              </TableCell>

              {/* Dietary */}
              <TableCell>
                <Badge
                  variant="default"
                >
                  {item.meal.dietery.name}
                </Badge>
              </TableCell>

              {/* Price */}
              <TableCell className="font-medium">৳{item.meal.price}</TableCell>

              {/* Status */}
              <TableCell>
                {item.meal.is_available ? (
                  <Badge>
                    Available
                  </Badge>
                ) : (
                  <Badge variant="destructive">Out of Stock</Badge>
                )}
              </TableCell>

              {/* Added Date */}
              <TableCell className="text-sm text-muted-foreground">
                {new Date(wishlist.created_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </TableCell>

              {/* Actions Dropdown */}
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-8"
                    >
                      <MoreHorizontalIcon />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Link href={`/meals/${item.meal.id}`} target="_blank">
                        View Details
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      variant="destructive"
                      onClick={() =>
                        handleDelete(
                          item.wishlist_id,
                          wishlist.user_id,
                          item.meal_id,
                        )
                      }
                    >
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default WishListTable;
