import { IUser } from '@/models/user.interface';
import { ReactElement } from 'react';

interface IRoute {
    name: string;
    path?: string;
    element: ReactElement;
    layout?: string;
    private?: boolean;
    hasPermission?: (props: IUser) => boolean;
}

export default IRoute;
