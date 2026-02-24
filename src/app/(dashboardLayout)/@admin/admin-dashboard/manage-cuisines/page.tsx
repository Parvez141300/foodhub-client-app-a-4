import CreateCuisineInputField from '@/components/modules/dashboard/ManageCuisine/CreateCuisineInputField';
import { CuisineTable } from '@/components/modules/dashboard/ManageCuisine/CuisineTable';
import { cuisineService } from '@/services/cuisine.service';
import React from 'react';

const ManageCuisinesPage = async() => {
    const cuisines = await cuisineService.getAllCuisine();
    return (
        <div className='space-y-5'>
            <h3 className='text-xl'>Create Cuisine</h3>
            <CreateCuisineInputField />
            <h3 className='text-xl'>Manage Cuisine</h3>
            <CuisineTable cuisines={cuisines} />
        </div>
    );
};

export default ManageCuisinesPage;