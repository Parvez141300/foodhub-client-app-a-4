'use server';

import { cuisineService } from "@/services/cuisine.service";
import { userServices } from "@/services/user.service";
import { updateTag } from "next/cache";

export const createCuisine = async (cuisineName: string) => {
    const userData = await userServices.getSession();
    const creatorId = userData?.user?.id;
    const res = await cuisineService.createCuisine(cuisineName, creatorId);
    updateTag("cuisines");
    return res;
}

export const deleteCuisine = async (cuisineId: string) => {
    const res = await cuisineService.deleteCuisine(cuisineId);
    updateTag("cuisines");
    return res;
}