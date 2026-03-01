"use server";

import { mealService } from "@/services/meal.service"
import { updateTag } from "next/cache";

export const createMeal = async (payload: Record<string, any>) => {
    const result = await mealService.createMeal(payload);
    return result;
}

export const deleteMealById = async (mealId: string) => {
    const result = await mealService.deleteMealById(mealId);
    return result;
}

export const updateMealById = async (mealId: string, payload: Record<string, any>) => {
    const result = await mealService.updateMealById(mealId, payload);
    updateTag('provider-meals');
    return result;
}
