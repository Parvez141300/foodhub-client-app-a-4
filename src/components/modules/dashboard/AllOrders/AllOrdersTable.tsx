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
import NoOrderFound from "./NoOrderFound";

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

export function AllOrdersTable({ orders }: { orders: OrdersType[] }) {
  if (!orders.length) {
    return <NoOrderFound />;
  }
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
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
          {/* <TableHead className="text-right">Actions</TableHead> */}
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map((order) => (
          <TableRow>
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
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
