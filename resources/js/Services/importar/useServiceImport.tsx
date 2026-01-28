import { usePOST } from '@/hooks/useApi';
import { IImportResponse } from '@/interfaces/IImportResponse';
import { ApiRoutes } from '@/router/modules/admin.routes';

const url = ApiRoutes.Importar;
export const useServiceImportProducts = () => usePOST<IImportResponse>({ url, isFile: true });
export const useServiceImportProductImages = () => usePOST({ url: `${url}/images`, isFile: true });
