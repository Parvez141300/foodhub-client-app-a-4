"use server";

import { mealService } from "@/services/meal.service"
import { updateTag } from "next/cache";

export const createMeal = async (payload: Record<string, any>) => {
    const result = await mealService.createMeal(payload);
    return result;
}

export const deleteMealById = async (mealId: string) => {
    const result = await mealService.deleteMealById(mealId);
    updateTag('provider-meals');
    return result;
}

export const updateMealById = async (mealId: string, payload: Record<string, any>) => {
    const result = await mealService.updateMealById(mealId, payload);
    updateTag('provider-meals');
    return result;
}

export const getAllOrQueryMeal = async (params?: Record<string, any>) => {
    try {
        console.log("Server action called with params:", params);
        const result = await mealService.getAllOrQueryMeal(params);
        return result;
    } catch (error) {
        console.error("Error in getAllOrQueryMeal:", error);
        return { data: null, error: "Failed to fetch meals" };
    }
}

export const getMealById = async (mealId: string) => {
    const result = await mealService.getMealById(mealId);
    return result;
}
