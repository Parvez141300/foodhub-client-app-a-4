"use client";
import { getUserWishlist } from "@/actions/wishlist.action";
import TanStackDataTable from "@/components/global/tables/TanStackDataTable/TanStackDataTable";
import { useTableQueryParams } from "@/hooks/useTableQueryParams";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { wishlistTableColumn } from "./column/WishlistTableColumn";

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

  const { data: wishlistResponse, isLoading } = useQuery({
    queryKey: ["user-wishlist", queryString],
    queryFn: () => getUserWishlist(queryString),
  });

  const wishlistData = wishlistResponse;
  const wishlistItems = wishlistData?.data?.wishlistItems;
  const paginationMeta = wishlistData?.pagination;

  return (
    <>
      <TanStackDataTable
        title="Wish List"
        description="Manage your wish list"
        data={wishlistItems || []}
        columns={wishlistTableColumn}
        isLoading={isLoading}
        emptyMessage="No Attendances found!"
        toolbar={{
          search: {
            value: searchValue,
            onChange: handleSearchChange,
            placeholder: "Search by employee data...",
          },
          onClearFilters: () =>
            clearFilterKeys(["status", "departmentId", "startDate", "endDate"]),
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
