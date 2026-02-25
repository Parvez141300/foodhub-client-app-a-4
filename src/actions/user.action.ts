'use server';
import { userServices } from "@/services/user.service"
import { updateTag } from "next/cache";

export const getAllUser = async (search: string) => {
    const result = await userServices.getAllUser(search);
    updateTag('users');
    return result;
}