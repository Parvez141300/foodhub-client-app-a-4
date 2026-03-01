"use client";

import { deleteMealById } from "@/actions/meal.action";
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
//     "id": "5df68d0d-200c-45ec-8c63-0e7f3db9e02a",
//     "provider_id": "XGyEl3WBuhGpx4DAT82DQKRvSnKlI3oF",
//     "category_id": "5995352a-4c6d-4104-a24d-e5e0918a739d",
//     "cuisine_id": "15246b8d-5397-4a9c-b533-0c547fa29977",
//     "dietery_id": "1b52c1f5-7423-49f6-8f49-52d74e7cd644",
//     "title": "Beef Burger with Extra Chesse",
//     "description": "A juicy, seared beef patty topped with melted cheese (like Cheddar, American, or Swiss) served on a toasted, soft bun. It is often customized with fresh toppings like lettuce, tomato, onions, and pickles, along with condiments like ketchup, mustard, or mayo. \n\nKey Components & Variations\nThe Patty: Usually 100% ground beef (often chuck or a mix), seasoned with salt and pepper.\nThe Cheese: American cheese is common for its meltability, though cheddar provides a sharper flavor. Other options include Swiss, Pepper Jack, or Blue Cheese.\nThe Bun: Typically a sesame seed bun, brioche, or a soft bread roll.\nCommon Toppings: Lettuce, tomato, onion (raw or caramelized), pickles, and bacon.\nSauces: Ketchup, mustard, mayonnaise, or special sauce. \n\nPopular Styles\nClassic Diner: Simple, often with processed cheese, pickles, and ketchup.\nGourmet: Often features brioche buns, aged cheddar, bacon, and aioli.\nStuffed: The patty is stuffed with cheese before cooking",
//     "stock": 100,
//     "price": 999,
//     "image_url": "https://res.cloudinary.com/dapbx8al2/image/upload/v1772292822/hicp8pdtdgoy24zb9aa4.jpg",
//     "is_available": true,
//     "is_featured": false,
//     "created_at": "2026-02-28T15:34:01.305Z",
//     "updated_at": "2026-02-28T15:34:01.305Z",
//     "category": {
//         "id": "5995352a-4c6d-4104-a24d-e5e0918a739d",
//         "name": "burger"
//     },
//     "cuisine": {
//         "id": "15246b8d-5397-4a9c-b533-0c547fa29977",
//         "name": "Italian"
//     },
//     "dietery": {
//         "id": "1b52c1f5-7423-49f6-8f49-52d74e7cd644",
//         "name": "Halal"
//     }
// }

type ProviderMealsType = {
  id: string;
  title: string;
  description: string;
  stock: number;
  price: number;
  image_url: string;
  is_available: boolean;
  created_at: string;
  updated_at: string;
  category: {
    id: string;
    name: string;
  };
  cuisine: {
    id: string;
    name: string;
  };
  dietery: {
    id: string;
    name: string;
  };
};

export function ManageMealTable({
  providerMeals,
}: {
  providerMeals: ProviderMealsType[];
}) {
  const handleDeleteMeal = async (mealId: string) => {
    const toastId = toast.loading("Deleting a meal");
    try {
      const res = await deleteMealById(mealId);
      if (!res?.id) {
        return toast.error("This meal does not exists to delete", {
          id: toastId,
        });
      }
      toast.success("Successfully deleted meal", { id: toastId });
    } catch (error: any) {
      toast.error(error.message, { id: toastId });
    }
  };
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Image</TableHead>
          <TableHead>title</TableHead>
          <TableHead>Stock</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Cuisine</TableHead>
          <TableHead>Dietary</TableHead>
          <TableHead>Created at</TableHead>
          <TableHead>Updated at</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {providerMeals?.map((meal) => (
          <TableRow key={meal?.id}>
            <TableCell className="font-medium">{meal?.id}</TableCell>
            <TableCell>{meal?.stock}</TableCell>
            <TableCell className="font-medium">{meal?.title}</TableCell>
            <TableCell>{meal?.stock}</TableCell>
            <TableCell>{meal?.price}</TableCell>
            <TableCell>{meal?.category?.name}</TableCell>
            <TableCell>{meal?.cuisine.name}</TableCell>
            <TableCell>{meal?.dietery?.name}</TableCell>
            <TableCell>{meal?.created_at}</TableCell>
            <TableCell>{meal?.updated_at}</TableCell>
            <TableCell className="text-right">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="size-8">
                    <MoreHorizontalIcon />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Edit</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    variant="destructive"
                    onClick={() => handleDeleteMeal(meal?.id)}
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
