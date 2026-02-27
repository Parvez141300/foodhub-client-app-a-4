"use server";

import { profileServices } from "@/services/profile.service";
import { userServices } from "@/services/user.service";

export const getUserProfile = async () => {
    const userData = await userServices.getSession();
    const userId = await userData.user.id;
    const result = await profileServices.getUserProfile(userId);
    return result;
}