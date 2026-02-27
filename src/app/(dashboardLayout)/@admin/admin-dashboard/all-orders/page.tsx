import { AllOrdersTable } from '@/components/modules/dashboard/AllOrders/AllOrdersTable';
import { orderServices } from '@/services/order.service';
import React from 'react';

const AllOrdersPage = async() => {
    const orders = await orderServices.getAllOrder();
    console.log('orders', orders);
    return (
        <div className='space-y-5'>
            <h3 className='text-xl'>All Orders</h3>
            <AllOrdersTable orders={orders} />
        </div>
    );
};

export default AllOrdersPage;