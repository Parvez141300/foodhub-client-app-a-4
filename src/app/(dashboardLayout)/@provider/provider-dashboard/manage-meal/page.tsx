import { ManageMealTable } from '@/components/modules/dashboard/ManageMeal/ManageMealTable';
import NoMealsFound from '@/components/modules/dashboard/ManageMeal/NoMealsFound';
import { mealService } from '@/services/meal.service';
import React from 'react';

const ManageMealPage = async() => {
    const providerMeals = await mealService.getMealsByProviderId();
    console.log('providerMeals', providerMeals);
    return (
        <div className='space-y-5'>
            <h3 className='text-xl'>Manage Meal</h3>
            {
                !providerMeals.length && <NoMealsFound />
            }
            <ManageMealTable providerMeals={providerMeals} />
        </div>
    );
};

export default ManageMealPage;