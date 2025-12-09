import { useGET } from '@/hooks/useApi';
import { ApiRoutes } from '@/router/modules/admin.routes';

const url = ApiRoutes.Descargables;
export const useServiceTemplateImport = () => useGET<Blob>({ url: `${url}/template`, responseType: 'blob', enable: false });
