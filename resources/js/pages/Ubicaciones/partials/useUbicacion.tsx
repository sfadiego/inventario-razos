import { AlertSwal } from '@/components/alertSwal/AlertSwal';
import { AlertTypeEnum } from '@/enums/AlertTypeEnum';
import { useOnSubmit } from '@/hooks/useOnSubmit';
import { IUbicacion } from '@/models/ubicacion.interface';
import { ApiRoutes } from '@/router/modules/admin.routes';
import { useServiceStoreUbicacion, useServiceUpdateUbicacion } from '@/Services/ubicaciones/useServiceUbicaciones';
import { useQueryClient } from '@tanstack/react-query';
import * as Yup from 'yup';
import { useUbicacionStore } from './useUbicacionStore';

export interface IFiltrosUbicacion {
  nombre: string;
}
interface IuseUbicacionProps {
  closeModal?: () => void;
}

export const useUbicacion = ({ closeModal }: IuseUbicacionProps) => {
  const { ubicacion } = useUbicacionStore();
  const initialValues: IUbicacion = {
    nombre: ubicacion?.nombre ?? '',
  };

  const validationSchema = Yup.object().shape({
    nombre: Yup.string().required('La ubicacion es obligatorio'),
  });

  const queryClient = useQueryClient();
  const mutator = useServiceStoreUbicacion();
  const mutatorUpdate = useServiceUpdateUbicacion(ubicacion?.id ?? 0);
  const { onSubmit } = useOnSubmit<IUbicacion>({
    mutateAsync: ubicacion?.id ? mutatorUpdate.mutateAsync : mutator.mutateAsync,
    onSuccess: async () => handleSuccess(),
  });
  const handleSuccess = () => {
    if (closeModal) {
      closeModal();
    }
    AlertSwal({
      type: AlertTypeEnum.Success,
      title: `Exito`,
      text: `Ubicacion guardada correctamente`,
    });

    queryClient.invalidateQueries({ queryKey: [ApiRoutes.Ubicaciones] });
  };

  const formikProps = {
    initialValues,
    validationSchema,
    onSubmit,
  };
  return { formikProps };
};
