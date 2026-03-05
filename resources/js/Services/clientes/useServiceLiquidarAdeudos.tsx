import { usePUT } from '@/hooks/useApi';
import { ApiRoutes } from '@/router/modules/admin.routes';

const url = ApiRoutes.Adeudos;

export const useServiceLiquidarAdeudos = (idCliente?: number) => usePUT({ url: `${url}/${idCliente}/liquidar-todos` });
export const useServiceLiquidarAdeudo = (idAdeudo?: number) => usePUT({ url: `${url}/${idAdeudo}/liquidar` });
