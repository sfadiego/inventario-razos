import { useGET } from '@/hooks/useApi';
import { ApiRoutes } from '@/router/modules/admin.routes';

const url = ApiRoutes.Images;
export const useServiceShowProductoImagen = (folder?: string, name?: string) =>
  useGET<Blob>({ url: `${url}/${folder}/${name}`, responseType: 'blob', enable: !!(folder && name) });
