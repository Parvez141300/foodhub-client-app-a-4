"use server";

import { profileServices } from "@/services/profile.service";
import { userServices } from "@/services/user.service";
import { updateTag } from "next/cache";

export const getUserProfile = async () => {
    const userData = await userServices.getSession();
    const userId = await userData.user.id;
    const result = await profileServices.getUserProfile(userId);
    return result;
}

export const updateUserProfile = async (payload: Record<string, string>) => {
    const result = await profileServices.updateUserProfile(payload);
    updateTag('profiles');
    return result;
}