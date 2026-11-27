
import { getUserWishlist } from "@/actions/wishlist.action";
import ManageWishlistTable from "@/components/modules/dashboard/MangeWishlistTable/ManageWishlistTable";
import { userServices } from "@/services/user.service";
import { wishListService } from "@/services/wishlist.service";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

const WishListPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const queryParamsObject = await searchParams;

  const queryString = Object.keys(queryParamsObject)
    .map((key) => `${key}=${queryParamsObject[key]}`)
    .join("&");

  const queryClient = new QueryClient();

  await queryClient.query({
    queryKey: ["user-wishlist", queryString],
    queryFn: () => getUserWishlist(queryString),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ManageWishlistTable queryString={queryString} />
    </HydrationBoundary>
  )
};

export default WishListPage;