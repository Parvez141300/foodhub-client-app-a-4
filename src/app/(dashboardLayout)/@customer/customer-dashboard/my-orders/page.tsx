import { orderServices } from "@/services/order.service";
import { userServices } from "@/services/user.service";
import React, { Suspense } from "react";
import LoadingSpinner from "@/components/global/LoadingSpinner";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import OrdersTable from "@/components/modules/dashboard/orders/OrdersTable";

const MyOrdersPage = async () => {
  const session = await userServices.getSession();
  
  if (!session?.user?.id) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        Please login to view your orders
      </div>
    );
  }
  
  const userOrders = await orderServices.getUserOrders(session?.user?.id);
  console.log('user orders', userOrders);

  return (
    <div className="space-y-5">
      <h3 className="text-2xl font-bold">My Orders</h3>
      <Suspense fallback={<LoadingSpinner />}>
        {!userOrders || userOrders.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <p>You haven't placed any orders yet.</p>
            <Button className="mt-4" asChild>
              <Link href="/meals">Browse Meals</Link>
            </Button>
          </div>
        ) : (
          <OrdersTable orders={userOrders} />
        )}
      </Suspense>
    </div>
  );
};

export default MyOrdersPage;