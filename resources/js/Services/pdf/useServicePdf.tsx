import { useGET } from '@/hooks/useApi';

//TODO: cambiar a ruta original
const url = '/api/productos/pdf/print';
export const useServicePdf = () => useGET<Blob>({ url, responseType: 'blob' });
