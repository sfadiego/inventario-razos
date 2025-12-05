import { useGET } from '@/hooks/useApi';
import { ApiRoutes } from '@/router/modules/admin.routes';

const url = ApiRoutes.PDF;
export const useServiceCatalogoProductosPdf = () => useGET<Blob>({ url: `${url}/catalogo-productos`, responseType: 'blob' });
