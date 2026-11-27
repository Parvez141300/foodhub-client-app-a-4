import { IUser } from "./auth";
import { IMeal } from "./meal.type";

export interface IReview {
  id: string;
  author_id: string;
  meal_id: string;
  rating: number;
  comment: string;
  created_at: Date;
  updated_at: Date;

  user?: IUser;
  meal?: IMeal;
}