import { ICategory } from "./category.type";
import { ICuisine } from "./cuisine.type";
import { IDietery } from "./dietery.type";
import { IMeal } from "./meal.type";

export interface IWishlist {
  id: string;
  user_id: string;
  created_at: Date;

  wishlistItems?: IWishlistItemWithMeal[];
}

export interface IWishlistItemWithMeal {
  id: string;
  wishlist_id: string;
  meal_id: string;
  meal: IMeal & {
    category: ICategory;
    cuisine: ICuisine;
    dietery: IDietery;
  };
}