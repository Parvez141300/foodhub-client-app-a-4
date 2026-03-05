import LoadingSpinner from "@/components/global/LoadingSpinner";
import CartTable from "@/components/modules/dashboard/Cart/CartTable";
import { cartService } from "@/services/cart.service";
import { userServices } from "@/services/user.service";
import React, { Suspense } from "react";

const CartPage = async () => {
  const userData = await userServices.getSession();
  const cartData = await cartService.getUserCart(userData.user.id);
  console.log("cart data", cartData);
  return (
    <div className="space-y-5">
      <h3 className="text-xl font-semibold">My Cart</h3>
      <Suspense fallback={<LoadingSpinner />}>
        <div>
          {!cartData ||
          cartData.length === 0 ||
          !cartData[0]?.cartItems?.length ? (
            <div className="text-center py-8 text-muted-foreground">
              Your cart is empty
            </div>
          ) : (
            <CartTable cartData={cartData} />
          )}
        </div>
      </Suspense>
    </div>
  );
};

export default CartPage;
