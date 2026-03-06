import LoadingSpinner from "@/components/global/LoadingSpinner";
import { AllOrdersTable } from "@/components/modules/dashboard/AllOrders/AllOrdersTable";
import { orderServices } from "@/services/order.service";
import React, { Suspense } from "react";

const AllOrdersPage = async () => {
  const orders = await orderServices.getAllOrder();
  return (
    <div className="space-y-5">
      <h3 className="text-xl">All Orders</h3>
      <Suspense fallback={<LoadingSpinner />}>
        <AllOrdersTable orders={orders} />
      </Suspense>
    </div>
  );
};

export default AllOrdersPage;
