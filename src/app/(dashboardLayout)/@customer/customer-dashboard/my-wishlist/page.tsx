import LoadingSpinner from "@/components/global/LoadingSpinner";
import WishListTable from "@/components/modules/dashboard/WishList/page";
import { userServices } from "@/services/user.service";
import { wishListService } from "@/services/wishlist.service";
import React, { Suspense } from "react";

const WishListPage = async () => {
  const userData = await userServices.getSession();
  const userId = userData?.user?.id;
  
  const wishListData = await wishListService.getUserWishList(userId);
  console.log("wishlist data from API:", wishListData);
  
  return (
    <div className="space-y-5">
      <h3 className="text-xl font-semibold">My Wishlist</h3>
      <Suspense fallback={<LoadingSpinner />}>
        <div>
          {!wishListData ||
          wishListData.length === 0 ||
          !wishListData[0]?.wishlistItems?.length ? (
            <div className="text-center py-8 text-muted-foreground">
              Your wishlist is empty. Start adding items you love!
            </div>
          ) : (
            <WishListTable wishlistData={wishListData} />
          )}
        </div>
      </Suspense>
    </div>
  );
};

export default WishListPage;