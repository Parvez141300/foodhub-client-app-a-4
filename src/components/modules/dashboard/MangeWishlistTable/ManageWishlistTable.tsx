"use client";
import { getUserWishlist } from "@/actions/wishlist.action";
import { useTableQueryParams } from "@/hooks/useTableQueryParams";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const ManageWishlistTable = ({ queryString }: { queryString: string }) => {
  // const {
  //   page,
  //   limit,
  //   handlePageChange,
  //   handleLimitChange,
  //   searchValue,
  //   handleSearchChange,
  //   clearFilterKeys,
  // } = useTableQueryParams();

  const { data: wishlistResponse, isLoading } = useQuery({
    queryKey: ["user-wishlist", queryString],
    queryFn: () => getUserWishlist(queryString),
  });

  console.log('wish list response', wishlistResponse);
  return (
    <>
      <h1>wish list</h1>
    </>
  );
};

export default ManageWishlistTable;
