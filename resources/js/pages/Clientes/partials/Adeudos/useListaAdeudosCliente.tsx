import { AlertSwal } from '@/components/alertSwal/AlertSwal';
import { useOnSubmit } from '@/hooks/useOnSubmit';
import { ApiRoutes } from '@/router/modules/admin.routes';
import { useServiceAdeudoCliente } from '@/Services/clientes/useServiceClientes';
import { useServiceLiquidarAdeudo, useServiceLiquidarAdeudos } from '@/Services/clientes/useServiceLiquidarAdeudos';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

export const useListaAdeudosCliente = ({ clienteId = 0, closeModal }: { clienteId: number; closeModal: () => void }) => {
  const { isLoading, data, refetch } = useServiceAdeudoCliente(clienteId);
  const [adeudoId, setadeudoId] = useState(0);

  const queryClient = useQueryClient();
  const mutateUpdate = useServiceLiquidarAdeudo(adeudoId);
  const { onSubmit } = useOnSubmit({
    mutateAsync: mutateUpdate.mutateAsync,
    onSuccess: async () => {
      closeModal();
      refetch();
      AlertSwal({
        title: `Exito`,
        text: `Adeudo pagado`,
      });

      queryClient.invalidateQueries({
        queryKey: [`${ApiRoutes.Clientes}`],
      });
    },
  });

  const handleUpdate = (adeudoId: number) => {
    setadeudoId(adeudoId);
    onSubmit({}, {});
  };

  const mutateUpdateAll = useServiceLiquidarAdeudos(clienteId);
  const { onSubmit: onSubmitAll } = useOnSubmit({
    mutateAsync: mutateUpdateAll.mutateAsync,
    onSuccess: async () => {
      closeModal();
      refetch();
      AlertSwal({
        title: `Exito`,
        text: `Adeudos liquidados`,
      });
      queryClient.invalidateQueries({
        queryKey: [`${ApiRoutes.Clientes}`],
      });
    },
  });

  const handleUpdateAll = () => onSubmitAll({}, {});

  return {
    isLoading,
    data: !isLoading && data ? data : [],
    pagando: mutateUpdate.isPending,
    handleUpdate,
    handleUpdateAll,
    isLoadingAll: mutateUpdateAll.isPending,
  };
};
