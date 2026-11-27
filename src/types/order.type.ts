import { IUser } from "./auth";
import { ICart } from "./cart.type";
import { OrderStatus, PaymentGateway, PaymentStatus } from "./enums";
import { IMeal } from "./meal.type";

export interface IOrder {
  id: string;
  user_id: string;
  cart_id?: string | null;

  // Address
  name: string;
  phone: string;
  division: string;
  district: string;
  thana: string;
  area: string;
  street?: string | null;
  postal_code?: string | null;

  order_status: OrderStatus;
  total_price: number;

  // Payment
  payment_gateway?: PaymentGateway | null;
  payment_status: PaymentStatus;

  transaction_id?: string | null;
  val_id?: string | null;
  bank_tran_id?: string | null;
  amount_paid: number;
  refunded_amount: number;
  paid_at?: Date | null;

  created_at: Date;

  // Relations
  orderItems?: IOrderItem[];
  user?: IUser;
  cart?: ICart | null;
}

export interface IOrderItem {
  id: string;
  order_id: string;
  meal_id: string;
  quantity: number;

  order?: IOrder;
  meal?: IMeal;
}