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
import { MoreHorizontalIcon } from "lucide-react";
import { orderStatus } from "@/constants/orderStatus";
import { toast } from "sonner";
import { getCurrentUser } from "@/actions/user.action";
import NoOrderFound from "./NoOrderFound";
import { updateOderStatus } from "@/actions/order.action";

type OrdersType = {
  id: string;
  user_id: string;
  cart_id: string;
  name: string;
  phone: string;
  division: string;
  district: string;
  thana: string;
  area: string;
  street?: string;
  postal_code?: string;
  order_status: string;
  total_price: number;
  created_at: string;
};

export function ManageOrdersTable({ orders }: { orders: OrdersType[] }) {
  if (!orders.length) {
    return <NoOrderFound />;
  }

  const handleUpdateOrderStatus = async (
    orderId: string,
    orderStatus: string,
  ) => {
    console.log("order status", orderId, orderStatus);
    const toastId = toast.loading("Updating order status");
    try {
      const currentUser = await getCurrentUser();
      const providerId = currentUser?.user?.id;
      console.log("provider id", providerId);
      console.log(orderId, orderStatus);
      const result = await updateOderStatus(orderId, providerId, orderStatus);
      if (result?.id) {
        toast.success("Successfully updated order status", { id: toastId });
      }
    } catch (error: any) {
      toast.error(error.message, { id: toastId });
    }
  };
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Order Id</TableHead>
          <TableHead>User Id</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Phone</TableHead>
          <TableHead>Division</TableHead>
          <TableHead>District</TableHead>
          <TableHead>Thana</TableHead>
          <TableHead>Area</TableHead>
          <TableHead>Order Status</TableHead>
          <TableHead>Total Price</TableHead>
          <TableHead>Created At</TableHead>
          <TableHead>Actions</TableHead>
          {/* <TableHead className="text-right">Actions</TableHead> */}
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map((order) => (
          <TableRow key={order?.id}>
            <TableCell className="font-medium">{order?.id}</TableCell>
            <TableCell className="font-medium">{order?.user_id}</TableCell>
            <TableCell>{order?.name}</TableCell>
            <TableCell>{order?.phone}</TableCell>
            <TableCell>{order?.division}</TableCell>
            <TableCell>{order?.district}</TableCell>
            <TableCell>{order?.thana}</TableCell>
            <TableCell>{order?.area}</TableCell>
            <TableCell>{order?.order_status}</TableCell>
            <TableCell>{order?.total_price}</TableCell>
            <TableCell>{order?.created_at}</TableCell>
            <TableCell className="text-right">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="size-8">
                    <MoreHorizontalIcon />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    onClick={() =>
                      handleUpdateOrderStatus(order?.id, orderStatus.PENDING)
                    }
                  >
                    Pending
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() =>
                      handleUpdateOrderStatus(order?.id, orderStatus.PROCESSING)
                    }
                  >
                    Processing
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() =>
                      handleUpdateOrderStatus(order?.id, orderStatus.DELIVERED)
                    }
                  >
                    Delivered
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() =>
                      handleUpdateOrderStatus(order?.id, orderStatus.CANCELLED)
                    }
                  >
                    Cancelled
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
