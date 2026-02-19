import { Navbar1 } from '@/components/layouts/common/navbar1';
import React from 'react';

const CommonLayout = ({children} : {children: React.ReactNode}) => {
    return (
        <div>
            <Navbar1 />
            <div className="max-w-7xl mx-auto my-6 px-4">{children}</div>
        </div>
    );
};

export default CommonLayout;