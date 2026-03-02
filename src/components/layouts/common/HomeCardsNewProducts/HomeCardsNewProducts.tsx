import { MealCard1 } from '@/components/modules/home/MealCard1';
import React from 'react';

const HomeCardsNewProducts = () => {
    return (
        <div className='space-y-5'>
            <h3 className='text-2xl font-semibold'>New Products</h3>
            <MealCard1 />
        </div>
    );
};

export default HomeCardsNewProducts;