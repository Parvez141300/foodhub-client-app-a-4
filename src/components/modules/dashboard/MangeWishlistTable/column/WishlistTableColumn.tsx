// src/components/modules/dashboard/MangeWishlistTable/wishlistTableColumn.tsx
"use client";

import { DataTableFeatures } from "@/components/global/tables/TanStackDataTable/data-table-features";
import { IWishlistItemWithMeal } from "@/types/wishlist.type";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import Image from "next/image";
import { Trash2, ShoppingCart, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";

const columnHelper = createColumnHelper<
  DataTableFeatures,
  IWishlistItemWithMeal
>();

export const wishlistTableColumn: ColumnDef<
  DataTableFeatures,
  IWishlistItemWithMeal,
  any
>[] = [
  // ১. Serial
  columnHelper.display({
    id: "serial",
    header: "SL",
    cell: (info) => info.row.index + 1,
  }),

  // ২. Meal Image
  columnHelper.display({
    id: "image",
    header: "Image",
    cell: ({ row }) => {
      const { image_url, title } = row.original.meal;
      return (
        <div className="relative h-12 w-12 overflow-hidden rounded-md border">
          <Image
            src={image_url}
            alt={title}
            fill
            sizes="48px"
            className="object-cover"
          />
        </div>
      );
    },
  }),

  // ৩. Meal Title
  columnHelper.accessor((row) => row.meal.title, {
    id: "title",
    header: "Meal",
    cell: ({ row }) => (
      <span className="font-medium">{row.original.meal.title}</span>
    ),
  }),

  // ৪. Price
  columnHelper.accessor((row) => row.meal.price, {
    id: "price",
    header: "Price",
    cell: ({ row }) => `৳${row.original.meal.price}`,
  }),

  // ৫. Category
  columnHelper.accessor((row) => row.meal.category?.name, {
    id: "category",
    header: "Category",
    cell: ({ row }) => row.original.meal.category?.name ?? "-",
  }),

  // ৬. Cuisine
  columnHelper.accessor((row) => row.meal.cuisine?.name, {
    id: "cuisine",
    header: "Cuisine",
    cell: ({ row }) => row.original.meal.cuisine?.name ?? "-",
  }),

  // ৭. Dietery
  columnHelper.accessor((row) => row.meal.dietery?.name, {
    id: "dietery",
    header: "Dietery",
    cell: ({ row }) => row.original.meal.dietery?.name ?? "-",
  }),

  // ৮. Stock
  columnHelper.accessor((row) => row.meal.stock, {
    id: "stock",
    header: "Stock",
    cell: ({ row }) => row.original.meal.stock,
  }),

  // ৯. Availability Status
  columnHelper.accessor((row) => row.meal.is_available, {
    id: "status",
    header: "Status",
    cell: ({ row }) => {
      const available = row.original.meal.is_available;
      return (
        <span
          className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
            available
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {available ? "Available" : "Out of Stock"}
        </span>
      );
    },
  }),
];
