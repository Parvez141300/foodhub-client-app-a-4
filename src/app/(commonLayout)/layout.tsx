import { EcommerceFooter1 } from '@/components/layouts/common/ecommerce-footer1';
import { Navbar1 } from '@/components/layouts/common/navbar1';
import React from 'react';

const CommonLayout = ({children} : {children: React.ReactNode}) => {
    return (
        <div>
            <Navbar1 />
            <div className="max-w-7xl mx-auto my-6 px-4 min-h-screen">{children}</div>
            <EcommerceFooter1 />
        </div>
    );
};

export default CommonLayout;