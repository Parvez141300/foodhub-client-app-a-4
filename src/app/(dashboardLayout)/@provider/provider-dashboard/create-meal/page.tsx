import CreateMealForm from '@/components/modules/dashboard/CreateMealForm/CreateMealForm';
import { categoryService } from '@/services/category.service';
import { cuisineService } from '@/services/cuisine.service';
import { dietaryService } from '@/services/dietary.service';
import React from 'react';

const CreateMealPage = async() => {
    const categories = await categoryService.getAllCategory();
    const cuisines = await cuisineService.getAllCuisine();
    const dietaries = await dietaryService.getAllDietary();
    
    return (
        <div>
            <CreateMealForm categories={categories} cuisines={cuisines} dietaries={dietaries} />
        </div>
    );
};

export default CreateMealPage;