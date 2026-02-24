import CreateDietaryInputField from '@/components/modules/dashboard/MangeDietary/CreateDietaryInputField';
import { DietaryTable } from '@/components/modules/dashboard/MangeDietary/DietaryTable';
import { dietaryService } from '@/services/dietary.service';

import React from 'react';

const ManageDieteries = async() => {
    const dietaries = await dietaryService.getAllDietary();
    return (
        <div className='space-y-5'>
            <h3 className='text-xl'>Create Dietery</h3>
            <CreateDietaryInputField />
            <h3 className='text-xl'>Manage Dietery</h3>
            <DietaryTable dietaries={dietaries} />
        </div>
    );
};

export default ManageDieteries;