import { IUser } from "./auth";

export interface IProfile {
  id: string;
  user_id: string;

  phone: string;
  division: string;
  district: string;
  thana: string;
  area: string;
  street?: string | null;
  postal_code?: string | null;

  created_at: Date;
  updated_at: Date;

  user?: IUser;
}