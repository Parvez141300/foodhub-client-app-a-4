import React from 'react';

const MealLayout = async() => {
    
    return (
        <div className='flex items-center gap-5'>
            <aside className='bg-red-500 hidden basis-1/4 md:flex md:flex-col'>
                this is aside
            </aside>
            <main className='bg-green-500 basis-full md:basis-3/4'>
                this is main
            </main>
        </div>
    );
};

export default MealLayout;