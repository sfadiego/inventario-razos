import { useGET } from '@/hooks/useApi';
import { ApiRoutes } from '@/router/modules/admin.routes';

const url = ApiRoutes.Barcode;
export const useServiceBarcode = (productId: number) =>
  useGET<Blob>({ url: `${url}/generate/${productId}`, responseType: 'blob', enable: !!productId });
