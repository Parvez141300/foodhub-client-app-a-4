"use server";

import { categoryService } from "@/services/category.service";
import { userServices } from "@/services/user.service";
import { updateTag } from "next/cache";

export const createCategory = async (categoryName: string) => {
    const userData = await userServices.getSession();
    const creatorId = userData?.user?.id;
    const res = await categoryService.createCategory(categoryName, creatorId);
    updateTag("categories");
    return res;
}

export const deleteCategory = async (categoryId: string) => {
    const res = await categoryService.deleteCategory(categoryId);
    updateTag("categories");
    return res;
}