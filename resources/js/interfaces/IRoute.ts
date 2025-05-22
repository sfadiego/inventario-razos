import { IUser } from '@/models/User/user.interface';
import React, { ReactElement } from 'react';

interface IRoute {
    name: string;
    path: string;
    element: ReactElement;
    icon?: React.ReactNode;
    layout?: string;
    private?: boolean;
    hasPermission?: (props: IUser) => boolean;
}

export default IRoute;
