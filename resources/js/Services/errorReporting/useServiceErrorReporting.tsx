import { useGET } from '@/hooks/useApi';
import { IPaginate } from '@/interfaces/IPaginate';
import { IPaginateServiceProps } from '@/interfaces/IPaginateServiceProps';
import { IErrorReporting } from '@/models/errorReporting';
import { ApiRoutes } from '@/router/modules/admin.routes';

const url = ApiRoutes.ErrorReporting;
export const useServiceIndexErrorReporting = ({ filters = [], search = null, page = 1, limit = 10, order = 'desc' }: IPaginateServiceProps) => {
  return useGET<IPaginate<IErrorReporting>>({
    url,
    filters: {
      filters,
      search,
      page,
      order,
      limit,
    },
  });
};

export const useServiceShowErrorReporting = (id?: number) => useGET<IErrorReporting>({ url: `${url}/${id}`, enable: !!id });
export const useServiceCreateDump = () => useGET<Blob>({ url: `${url}/create-dump`, responseType: 'blob', enable: false });
