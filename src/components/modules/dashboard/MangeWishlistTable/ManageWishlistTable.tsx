"use client";
import { getUserWishlist } from "@/actions/wishlist.action";
import TanStackDataTable from "@/components/global/tables/TanStackDataTable/TanStackDataTable";
import { useTableQueryParams } from "@/hooks/useTableQueryParams";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { wishlistTableColumn } from "./column/WishlistTableColumn";
import { IWishlistItemWithMeal } from "@/types/wishlist.type";
import { useRouter } from "next/navigation";
import { env } from "@/env";

const ManageWishlistTable = ({ queryString }: { queryString: string }) => {
  const {
    page,
    limit,
    handlePageChange,
    handleLimitChange,
    searchValue,
    handleSearchChange,
    clearFilterKeys,
  } = useTableQueryParams();
  const router = useRouter();

  const { data: wishlistResponse, isLoading } = useQuery({
    queryKey: ["user-wishlist", queryString],
    queryFn: () => getUserWishlist(queryString),
  });

  const wishlistData = wishlistResponse;
  const wishlistItems = wishlistData?.data?.wishlistItems;
  const paginationMeta = wishlistData?.pagination;

  // const [viewing, setViewing] = useState<IWishlistItemWithMeal | null>(null);
  const [deleting, setDeleting] = useState<IWishlistItemWithMeal | null>(null);

  const handleView = (data: IWishlistItemWithMeal) => {
    console.log(data);
    router.push(`${env.NEXT_PUBLIC_FRONTEND_URL}/meals/${data.meal_id}`);
  };

  return (
    <>
      <TanStackDataTable
        title="Wish List"
        description="Manage your wish list"
        data={wishlistItems || []}
        columns={wishlistTableColumn}
        isLoading={isLoading}
        emptyMessage="No Wish list found!"
        toolbar={{
          search: {
            value: searchValue,
            onChange: handleSearchChange,
            placeholder: "Search by meal title...",
          },
          onClearFilters: () => clearFilterKeys(["search", "page", "limit"]),
        }}
        actions={{
          onView: handleView,
        }}
        pagination={
          paginationMeta
            ? {
                page,
                limit,
                total: paginationMeta.total,
                totalPages: paginationMeta.totalPage,
                onPageChange: handlePageChange,
                onLimitChange: handleLimitChange,
              }
            : undefined
        }
      />
    </>
  );
};

export default ManageWishlistTable;
