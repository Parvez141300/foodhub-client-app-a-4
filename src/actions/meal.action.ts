"use server";

import { mealService } from "@/services/meal.service"

export const createMeal = async (payload: Record<string, any>) => {
    const result = await mealService.createMeal(payload);
    return result;
}

export const deleteMealById = async (mealId: string) => {
    const result = await mealService.deleteMealById(mealId);
    return result;
}
