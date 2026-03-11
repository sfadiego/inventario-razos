import { RolesEnum } from '@/enums/RolesEnum';

export interface INavItem {
  path?: string;
  name: string;
  icon: React.ReactNode;
  roles?: RolesEnum[];
  subItems?: {
    roles: RolesEnum[];
    name: string;
    path: string;
    icon?: React.ReactNode;
    pro?: boolean;
    new?: boolean;
  }[];
}
