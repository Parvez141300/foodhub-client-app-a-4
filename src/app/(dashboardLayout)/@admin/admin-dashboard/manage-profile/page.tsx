
import { getUserProfile } from '@/actions/profile.action';
import UserProfile from '@/components/modules/dashboard/UserProfile/UserProfile';
import React from 'react';

const ManageProfilePage = async() => {
    const user = await getUserProfile();
    return (
        <div>
            <UserProfile user={user}  />
        </div>
    );
};

export default ManageProfilePage;