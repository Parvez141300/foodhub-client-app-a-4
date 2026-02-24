"use client";
import { deleteCuisine } from "@/actions/cuisine.action";
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
import { toast } from "sonner";

// {
//     "id": "ab17d61a-b859-422e-bf28-f74c23983b80",
//     "name": "pizza",
//     "creator_id": "5JQsuHRa3rwbeWHaannN8EJmSUd01uMH",
//     "created_at": "2026-02-22T13:08:51.457Z",
//     "updated_at": "2026-02-22T13:08:51.457Z"
// }

type CuisinesType = {
  id: string;
  name: string;
  creator: {
    id: string;
    name: string;
    role: string;
  };
  creator_id: string;
  created_at: string;
  updated_at: string;
};

export function CuisineTable({
  cuisines,
}: {
  cuisines: CuisinesType[];
}) {
  const handleDeleteCuisine = async (cuisineId: string) => {
    const toastId = toast.loading("Deleting cuisine");
    try {
      const res = await deleteCuisine(cuisineId);
      if (!res?.id) {
        return toast.error("This cuisine does not exists to delete", {
          id: toastId,
        });
      }
      toast.success("Successfully deleted cuisine", { id: toastId });
    } catch (error: any) {
      toast.error(error.message, { id: toastId });
    }
  };
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Creator ID</TableHead>
          <TableHead>Created By</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Created At</TableHead>
          <TableHead>Updated At</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {cuisines?.map((cuisine) => (
          <TableRow key={cuisine?.id}>
            <TableCell className="font-medium">{cuisine?.id}</TableCell>
            <TableCell className="font-medium">
              {cuisine?.creator?.id}
            </TableCell>
            <TableCell className="font-medium">
              {cuisine?.creator?.name}
            </TableCell>
            <TableCell>{cuisine?.name}</TableCell>
            <TableCell className="font-medium">
              {cuisine?.creator?.role}
            </TableCell>
            <TableCell>
              {new Date(cuisine?.created_at).toLocaleDateString()}
            </TableCell>
            <TableCell>
              {new Date(cuisine?.updated_at).toLocaleDateString()}
            </TableCell>
            <TableCell className="text-right">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="size-8">
                    <MoreHorizontalIcon />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {/* <DropdownMenuItem>Edit</DropdownMenuItem>
                  <DropdownMenuItem>Duplicate</DropdownMenuItem> */}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    variant="destructive"
                    onClick={() => handleDeleteCuisine(cuisine?.id)}
                  >
                    Delete
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
