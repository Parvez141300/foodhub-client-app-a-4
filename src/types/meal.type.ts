import { IUser } from "./auth";
import { ICartItem } from "./cart.type";
import { ICategory } from "./category.type";
import { ICuisine } from "./cuisine.type";
import { IDietery } from "./dietery.type";
import { IOrderItem } from "./order.type";
import { IReview } from "./review.type";
import { IWishlistItem } from "./wishlist.type";

export interface IMeal {
  id: string;
  provider_id: string;
  category_id: string;
  cuisine_id: string;
  dietery_id: string;

  title: string;
  description: string;
  stock: number;
  price: number;
  image_url: string;
  is_available: boolean;
  is_featured: boolean;
  created_at: Date;
  updated_at: Date;

  // Relations
  provider?: IUser;
  category?: ICategory;
  cuisine?: ICuisine;
  dietery?: IDietery;
  orderItems?: IOrderItem[];
  reviews?: IReview[];
  wishlistItems?: IWishlistItem[];
  cartItems?: ICartItem[];
}