import { ReactElement } from 'react';

import { RolesEnum } from '../enums/RolesEnum';

interface IRoute {
  name: string;
  path?: string;
  element: ReactElement;
  layout?: string;
  roles?: RolesEnum[];
  private?: boolean;
}

export default IRoute;
