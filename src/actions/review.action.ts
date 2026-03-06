"use server";

import { reviewServices } from "@/services/review.service";
import { updateTag } from "next/cache";

export const getMealReview = async (mealId: string) => {
    const result = await reviewServices.getMealReview(mealId);
    return result;
}

export const createMealReview = async (authorId: string, mealId: string, rating: number, comment: string) => {
    const result = await reviewServices.createMealReview(authorId, mealId, rating, comment);
    updateTag("meal-reviews");
    return result;
}