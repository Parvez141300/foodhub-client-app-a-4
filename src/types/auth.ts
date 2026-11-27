import { ICategory } from "./category.type";
import { ICuisine } from "./cuisine.type";
import { IDietery } from "./dietery.type";
import { UserRole } from "./enums";
import { IMeal } from "./meal.type";
import { IOrder } from "./order.type";
import { IProfile } from "./profile.type";
import { IReview } from "./review.type";

export interface IUser {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image?: string | null;
  createdAt: Date;
  updatedAt: Date;
  role?: UserRole | null;
  phone?: string | null;
  is_active?: string | null;

  // Relations (optional — query-তে include করলেই আসে)
  sessions?: ISession[];
  accounts?: IAccount[];
  profile?: IProfile | null;
  orders?: IOrder[];
  reviews?: IReview[];
  meals?: IMeal[];
  categories?: ICategory[];
  cuisines?: ICuisine[];
  dieteries?: IDietery[];
}

export interface ISession {
  id: string;
  expiresAt: Date;
  token: string;
  createdAt: Date;
  updatedAt: Date;
  ipAddress?: string | null;
  userAgent?: string | null;
  userId: string;

  user?: IUser;
}

export interface IAccount {
  id: string;
  accountId: string;
  providerId: string;
  userId: string;
  accessToken?: string | null;
  refreshToken?: string | null;
  idToken?: string | null;
  accessTokenExpiresAt?: Date | null;
  refreshTokenExpiresAt?: Date | null;
  scope?: string | null;
  password?: string | null;
  createdAt: Date;
  updatedAt: Date;

  user?: IUser;
}

export interface IVerification {
  id: string;
  identifier: string;
  value: string;
  expiresAt: Date;
  createdAt: Date;
  updatedAt: Date;
}