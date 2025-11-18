import { IOptions } from '@/components/form/select/interfaces/IOptions';
import { useOnSubmit } from '@/hooks/useOnSubmit';
import { ICliente } from '@/models/cliente.interface';
import { IVenta } from '@/models/venta.interface';
import { AdminRoutes } from '@/router/modules/admin.routes';
import { useServiceShowCliente } from '@/Services/clientes/useServiceClientes';
import { useServiceStoreVenta } from '@/Services/ventas/useServiceVenta';
import { useSelectedItemStore } from '@/store/useSelectedItemStore';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import { SingleValue } from 'react-select';
import * as Yup from 'yup';
const validationSchema = Yup.object().shape({
  venta_total: Yup.number(),
  folio: Yup.string(),
  nombre_venta: Yup.string().max(100, 'El nombre no puede exceder 100 caracteres'),
  cliente_id: Yup.number().nullable(),
  tipo_compra: Yup.string().oneOf(['contado', 'credito'], 'Tipo de compra inválido').required('El tipo de compra es obligatorio'),
  status_venta: Yup.string().oneOf(['activa', 'finalizada'], 'Estatus de compra inválido').required('El estatus de compra es obligatorio'),
});

export const useFormVenta = () => {
  const navigate = useNavigate();
  const { getItem, setItem, clearItem } = useSelectedItemStore();
  const venta = getItem('venta') as IVenta;
  const cliente = getItem('cliente') as ICliente;
  const [nuevocliente, setNuevocliente] = useState(false);

  const [clienteSeleccionado, setClienteSeleccionado] = useState<number>(0);
  const toggleClient = () => setNuevocliente(!nuevocliente);
  const title = venta?.id ? `Venta: ${venta.folio}` : 'Crear Venta';
  const total = venta?.venta_total ?? null;

  const initialValues: IVenta = {
    id: venta?.id ?? 0,
    venta_total: venta?.venta_total ?? 0,
    folio: venta?.folio ?? '',
    nombre_venta: venta?.nombre_venta ?? '',
    cliente_id: cliente?.id ?? venta?.cliente_id ?? null,
    tipo_compra: venta?.tipo_compra ?? 'contado',
    status_venta: venta?.status_venta ?? 'activa',
  };
  const redirectNewCliente = () => navigate(AdminRoutes.Clientes);
  const handleSuccess = (venta: IVenta) => {
    setItem('venta', venta);
    navigate(`/venta/${venta?.id}/productos`);
  };
  const mutator = useServiceStoreVenta();
  const { onSubmit } = useOnSubmit<IVenta>({
    mutateAsync: mutator.mutateAsync,
    onSuccess: async (data: IVenta) => handleSuccess(data),
  });

  const { data, isLoading } = useServiceShowCliente(clienteSeleccionado ?? 0);
  const confiable = data?.confiable;
  const adeudo = data?.adeudo || 0;

  const isValidClient = useMemo(() => !isLoading && confiable && adeudo === 0, [isLoading, confiable, adeudo]);
  const onChangeValidateCliente = (option: SingleValue<IOptions>) => {
    if (option) {
      setClienteSeleccionado(option.value as number);
    }
  };

  const formikProps = {
    initialValues,
    validationSchema,
    onSubmit,
  };
  return {
    formikProps,
    isPending: mutator.isPending,
    ventaActual: venta,
    title,
    total,
    disabled: !!venta?.id,
    resetVenta: () => clearItem('venta'),
    nuevocliente,
    toggleClient,
    redirectNewCliente,
    onChangeValidateCliente,
    isValidClient,
    adeudo,
  };
};
