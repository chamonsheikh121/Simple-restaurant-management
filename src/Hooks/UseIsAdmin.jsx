import { useQuery } from '@tanstack/react-query';
import React from 'react';
import UseAuthContext from './UseAuthContext';
import UseAxios from './UseAxios';

const UseIsAdmin = () => {
    const { user, loading } = UseAuthContext();
    const axiosHook = UseAxios()

    const { data: isAdmin, isPending: isAdminLoading } = useQuery({
        queryKey: [`admin`, user?.email],
        enabled: !loading,
        queryFn: async () => {
            
            const res = await axiosHook.get(`/api/v1/admin?email=${user?.email}`);
            return res?.data?.isAdmin
        }
    })

    return [isAdmin, isAdminLoading]
};

export default UseIsAdmin;