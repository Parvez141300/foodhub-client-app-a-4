import { ManageOrdersTable } from '@/components/modules/dashboard/ManageOrders/ManageOrders';
import { orderServices } from '@/services/order.service';
import React from 'react';

const AllOrdersPage = async() => {
    const orders = await orderServices.getProviderOrders();
    return (
        <div className='space-y-5'>
            <h3 className='text-xl'>All Orders</h3>
            <ManageOrdersTable orders={orders} />
        </div>
    );
};

export default AllOrdersPage;