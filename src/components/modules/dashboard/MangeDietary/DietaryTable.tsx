"use client";
import { deleteDietary } from "@/actions/dietary.action";
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

type DietariesType = {
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

export function DietaryTable({
  dietaries,
}: {
  dietaries: DietariesType[];
}) {
  const handleDelete = async (dieteryId: string) => {
    const toastId = toast.loading("Deleting dietery");
    try {
      const res = await deleteDietary(dieteryId);
      if (!res?.id) {
        return toast.error("This dietery does not exists to delete", {
          id: toastId,
        });
      }
      toast.success("Successfully deleted dietery", { id: toastId });
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
        {dietaries?.map((dietary) => (
          <TableRow key={dietary?.id}>
            <TableCell className="font-medium">{dietary?.id}</TableCell>
            <TableCell className="font-medium">
              {dietary?.creator?.id}
            </TableCell>
            <TableCell className="font-medium">
              {dietary?.creator?.name}
            </TableCell>
            <TableCell>{dietary?.name}</TableCell>
            <TableCell className="font-medium">
              {dietary?.creator?.role}
            </TableCell>
            <TableCell>
              {new Date(dietary?.created_at).toLocaleDateString()}
            </TableCell>
            <TableCell>
              {new Date(dietary?.updated_at).toLocaleDateString()}
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
                    onClick={() => handleDelete(dietary?.id)}
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
