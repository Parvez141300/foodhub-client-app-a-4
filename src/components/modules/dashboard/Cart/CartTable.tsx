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
import React from "react";
import { Badge } from "@/components/ui/badge";

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

// Meal Type (CartItem এর ভিতরের meal object)
export type CartMeal = {
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

// CartItem Type
export type CartItem = {
  id: string;
  cart_id: string;
  meal_id: string;
  quantity: number;
  meal: CartMeal;
};

// Cart Type (Main)
export type CartDataType = {
  id: string;
  user_id: string;
  created_at: string;
  updated_at: string;
  cartItems: CartItem[];
};

interface CartTableProps {
  cartData: CartDataType[];
}

const CartTable = ({ cartData }: CartTableProps) => {

  const cart = cartData[0];
  const cartItems = cart.cartItems;

  // total price calculation
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      return total + item.meal.price * item.quantity;
    }, 0);
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
            <TableHead>Price</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Subtotal</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {cartItems.map((item) => (
            <TableRow key={item.id}>
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
                    href={`/meal/${item.meal.id}`}
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

              {/* Price */}
              <TableCell className="font-medium">৳{item.meal.price}</TableCell>

              {/* Quantity */}
              <TableCell>
                <div className="flex items-center gap-2">
                  <span className="font-medium">{item.quantity}</span>
                  <span className="text-xs text-muted-foreground">
                    {item.meal.is_available ? "✓" : "✗"}
                  </span>
                </div>
              </TableCell>

              {/* Subtotal */}
              <TableCell className="font-bold">
                ৳{item.meal.price * item.quantity}
              </TableCell>

              {/* Status */}
              <TableCell>
                {item.meal.is_available ? (
                  <Badge className="bg-green-500 hover:bg-green-600">
                    Available
                  </Badge>
                ) : (
                  <Badge variant="destructive">Out of Stock</Badge>
                )}
              </TableCell>

              {/* Actions Dropdown */}
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="size-8">
                      <MoreHorizontalIcon />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Link href={`/meal/${item.meal.id}`}>View Details</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem variant="destructive">
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Cart Summary */}
      <div className="flex justify-end pt-4">
        <div className="w-full max-w-sm space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Subtotal:</span>
            <span className="font-medium">৳{calculateTotal()}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Delivery Fee:</span>
            <span className="font-medium">৳0</span>
          </div>
          <div className="border-t pt-2 mt-2">
            <div className="flex justify-between font-bold">
              <span>Total:</span>
              <span className="text-lg text-primary">৳{calculateTotal()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartTable;
