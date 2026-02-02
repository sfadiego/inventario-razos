import { useGET } from '@/hooks/useApi';
import { ApiRoutes } from '@/router/modules/admin.routes';

const url = ApiRoutes.Printer;
export const useServicePrinter = (ventaId: number) => useGET({ url: `${url}/${ventaId}`, enable: false });
