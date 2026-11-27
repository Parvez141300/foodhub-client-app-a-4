import { IMeal } from "./meal.type";
import { IOrder } from "./order.type";

export interface ICart {
  id: string;
  user_id: string;
  created_at: Date;
  updated_at: Date;

  cartItems?: ICartItem[];
  orders?: IOrder[];
}

export interface ICartItem {
  id: string;
  cart_id: string;
  meal_id: string;
  quantity: number;
  created_at: Date;

  cart?: ICart;
  meal?: IMeal;
}