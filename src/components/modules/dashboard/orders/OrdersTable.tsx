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
import { Badge } from "@/components/ui/badge";
import {
  MoreHorizontalIcon,
  Eye,
  MapPin,
  Calendar,
  Package,
  Phone,
  User,
} from "lucide-react";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { orderStatus } from "@/constants/orderStatus";
import { toast } from "sonner";
import { updateUserPendingOrderStatus } from "@/actions/order.action";

// Order Item Type
export type OrderItem = {
  id: string;
  order_id: string;
  meal_id: string;
  quantity: number;
};

// User Type
export type User = {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image: string | null;
  createdAt: string;
  updatedAt: string;
  role: string;
  phone: string | null;
  is_active: string;
};

// Order Type (Main)
export type OrderDataType = {
  id: string;
  user_id: string;
  cart_id: string | null;
  name: string;
  phone: string;
  division: string;
  district: string;
  thana: string;
  area: string;
  street: string;
  postal_code: string;
  order_status: "PENDING" | "PROCESSING" | "DELIVERED" | "CANCELLED";
  total_price: number;
  created_at: string;
  cart: any | null;
  user: User;
  orderItems: OrderItem[];
};

interface OrdersTableProps {
  orders: OrderDataType[];
}

const OrdersTable = ({ orders }: OrdersTableProps) => {
  const [selectedOrder, setSelectedOrder] = useState<OrderDataType | null>(
    null,
  );
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleViewDetails = (order: OrderDataType) => {
    setSelectedOrder(order);
    setDialogOpen(true);
  };

  const handleCancelOrder = async (orderId: string) => {
    const toastId = toast.loading("Cancelling Order");
    try {
      const result = await updateUserPendingOrderStatus(
        orderId,
        orderStatus.CANCELLED,
      );
      if (result?.id) {
        toast.success("Successfully cancelled order status", { id: toastId });
      }
    } catch (error: any) {
      toast.error(error.message, { id: toastId });
    }
  };

  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Items</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Delivery Address</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              {/* Order ID */}
              <TableCell className="font-medium">
                <span className="text-xs font-mono">
                  {order.id.slice(0, 8)}...
                </span>
              </TableCell>

              {/* Date */}
              <TableCell>
                <div className="flex items-center gap-1 text-sm">
                  <Calendar className="h-3 w-3 text-muted-foreground" />
                  {order.created_at}
                </div>
              </TableCell>

              {/* Customer */}
              <TableCell>
                <div className="space-y-1">
                  <div className="flex items-center gap-1 font-medium">
                    <User className="h-3 w-3 text-muted-foreground" />
                    {order.name}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Phone className="h-3 w-3" />
                    {order.phone}
                  </div>
                </div>
              </TableCell>

              {/* Items */}
              <TableCell>
                <div className="flex items-center gap-1">
                  <Package className="h-3 w-3 text-muted-foreground" />
                  <span>{order.orderItems?.length || 0} items</span>
                </div>
              </TableCell>

              {/* Total */}
              <TableCell className="font-bold">৳{order.total_price}</TableCell>

              {/* Status */}
              <TableCell>
                <Badge variant="outline">{order.order_status}</Badge>
              </TableCell>

              {/* Delivery Address */}
              <TableCell>
                <div className="flex items-start gap-1 max-w-50">
                  <MapPin className="h-3 w-3 text-muted-foreground mt-1 shrink-0" />
                  <span className="text-xs line-clamp-2">
                    {order.area}, {order.thana}, {order.district},{" "}
                    {order.division}
                  </span>
                </div>
              </TableCell>

              {/* Actions */}
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="size-8">
                      <MoreHorizontalIcon />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleViewDetails(order)}>
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </DropdownMenuItem>
                    {order?.order_status === orderStatus.PENDING && (
                      <>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => handleCancelOrder(order?.id)}
                          variant="destructive"
                        >
                          Cancel
                        </DropdownMenuItem>
                      </>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Order Details Dialog with Trigger */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger asChild>
          <Button className="hidden">Open Dialog</Button>
        </DialogTrigger>

        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Order Details</DialogTitle>
            <DialogDescription>
              Complete information about your order
            </DialogDescription>
          </DialogHeader>

          {selectedOrder && (
            <div className="-mx-4 max-h-[60vh] overflow-y-auto px-4 space-y-4">
              {/* Order Status & ID */}
              <div className="flex justify-between items-center pt-2">
                <div>
                  <p className="text-sm text-muted-foreground">Order ID</p>
                  <p className="font-mono text-sm">{selectedOrder?.id}</p>
                </div>
                <Badge variant="outline">{selectedOrder?.order_status}</Badge>
              </div>

              <Separator />

              {/* Customer Information */}
              <div>
                <h4 className="font-semibold mb-2">Customer Information</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="text-muted-foreground">Name</p>
                    <p>{selectedOrder?.name}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Phone</p>
                    <p>{selectedOrder?.phone}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Order Date</p>
                    <p>{selectedOrder?.created_at}</p>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Delivery Address */}
              <div>
                <h4 className="font-semibold mb-2">Delivery Address</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="text-muted-foreground">Division</p>
                    <p>{selectedOrder?.division}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">District</p>
                    <p>{selectedOrder?.district}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Thana</p>
                    <p>{selectedOrder?.thana}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Area</p>
                    <p>{selectedOrder?.area}</p>
                  </div>
                  {selectedOrder?.street && (
                    <div className="col-span-2">
                      <p className="text-muted-foreground">Street</p>
                      <p>{selectedOrder?.street}</p>
                    </div>
                  )}
                  {selectedOrder?.postal_code && (
                    <div>
                      <p className="text-muted-foreground">Postal Code</p>
                      <p>{selectedOrder?.postal_code}</p>
                    </div>
                  )}
                </div>
              </div>

              <Separator />

              {/* Order Items */}
              <div>
                <h4 className="font-semibold mb-2">Order Items</h4>
                {selectedOrder.orderItems &&
                selectedOrder.orderItems.length > 0 ? (
                  <div className="space-y-2">
                    {selectedOrder.orderItems.map((item, index) => (
                      <div
                        key={item.id}
                        className="flex justify-between items-center p-2 bg-muted rounded"
                      >
                        <div>
                          <p className="font-medium">Item {index + 1}</p>
                          <p className="text-sm text-muted-foreground">
                            Meal ID: {item.meal_id.slice(0, 8)}...
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">
                            Quantity: {item.quantity}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    No items found for this order
                  </p>
                )}
              </div>

              <Separator />

              {/* Payment Summary */}
              <div className="pb-4">
                <h4 className="font-semibold mb-2">Payment Summary</h4>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Total Amount</span>
                  <span className="text-xl font-bold text-primary">
                    ৳{selectedOrder.total_price}
                  </span>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default OrdersTable;
