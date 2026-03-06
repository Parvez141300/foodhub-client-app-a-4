"use server";

import { reviewServices } from "@/services/review.service";

export const getMealReview = async (mealId: string) => {
    const result = await reviewServices.getMealReview(mealId);
    return result;
}