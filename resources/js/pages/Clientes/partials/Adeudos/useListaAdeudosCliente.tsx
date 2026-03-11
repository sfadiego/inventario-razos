import { AlertSwal } from '@/components/alertSwal/AlertSwal';
import { AlertTypeEnum } from '@/enums/AlertTypeEnum';
import { useOnSubmit } from '@/hooks/useOnSubmit';
import { ApiRoutes } from '@/router/modules/admin.routes';
import { useServiceAdeudoCliente } from '@/Services/clientes/useServiceClientes';
import { useServiceLiquidarAdeudos } from '@/Services/clientes/useServiceLiquidarAdeudos';
import { useQueryClient } from '@tanstack/react-query';

interface IUseListaAdeudosClienteProps {
  clienteId: number;
  closeModal: () => void;
}
export const useListaAdeudosCliente = (props: IUseListaAdeudosClienteProps) => {
  const { clienteId = 0, closeModal } = props;
  const { isLoading, data, refetch } = useServiceAdeudoCliente(clienteId);

  const queryClient = useQueryClient();
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

  const handleUpdateAll = () => {
    closeModal();
    AlertSwal({
      title: '¿Estás seguro?',
      text: '¿Deseas liquidar todos los adeudos?',
      type: AlertTypeEnum.Confirm,
      onConfirm: (result) => {
        if (result.isConfirmed) {
          onSubmitAll({}, {});
        }
      },
    });
  };

  return {
    isLoading,
    data: !isLoading && data ? data : [],
    handleUpdateAll,
    isLoadingAll: mutateUpdateAll.isPending,
  };
};
