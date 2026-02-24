import { CategoryTable } from '@/components/modules/dashboard/MangeCategory/CategoryTable';
import CreateCategoryInputField from '@/components/modules/dashboard/MangeCategory/CreateCategoryInputField';
import { categoryService } from '@/services/category.service';
import React from 'react';

const MangeCategoriesPage = async() => {
    const categories = await categoryService.getAllCategory();
    return (
        <div className='space-y-5'>
            <h3 className='text-xl'>Create Category</h3>
            <CreateCategoryInputField />
            <h3 className='text-xl'>Manage Categories</h3>
            <CategoryTable categories={categories} />
        </div>
    );
};

export default MangeCategoriesPage;