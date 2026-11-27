import { IUser } from "./auth";
import { IMeal } from "./meal.type";

export interface ICuisine {
  id: string;
  name: string;
  creator_id: string;
  created_at: Date;
  updated_at: Date;

  creator?: IUser;
  meals?: IMeal[];
}