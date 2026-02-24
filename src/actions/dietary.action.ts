'use server';

import { dietaryService } from "@/services/dietary.service";
import { userServices } from "@/services/user.service";
import { updateTag } from "next/cache";

export const createDietary = async (dieteryName: string) => {
    const userData = await userServices.getSession();
    const creatorId = userData?.user?.id;
    const res = await dietaryService.createDietary(dieteryName, creatorId);
    updateTag("dietaries");
    return res;
}

export const deleteDietary = async (dietaryId: string) => {
    const res = await dietaryService.deleteDietary(dietaryId);
    updateTag("dietaries");
    return res;
}