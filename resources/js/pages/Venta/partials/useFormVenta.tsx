import { IOptions } from '@/components/form/select/interfaces/IOptions';
import { StatusVentaEnum } from '@/enums/StatusVentaEnum';
import { useOnSubmit } from '@/hooks/useOnSubmit';
import { ICliente } from '@/models/cliente.interface';
import { IVenta } from '@/models/venta.interface';
import { AdminRoutes } from '@/router/modules/admin.routes';
import { useServiceShowCliente } from '@/Services/clientes/useServiceClientes';
import { useServiceStoreVenta } from '@/Services/ventas/useServiceVenta';
import { useSelectedItemStore } from '@/store/useSelectedItemStore';
import { TipoVentaEnum } from '@/types/TipoVentaTypes';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import { MultiValue, SingleValue } from 'react-select';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  venta_total: Yup.number(),
  folio: Yup.string(),
  nombre_venta: Yup.string().max(100, 'El nombre no puede exceder 100 caracteres'),
  cliente_id: Yup.number().nullable(),
  tipo_compra: Yup.string()
    .oneOf([TipoVentaEnum.CONTADO, TipoVentaEnum.CREDITO], 'Tipo de compra es inválido')
    .required('El tipo de compra es obligatorio'),
  status_venta: Yup.string()
    .oneOf([StatusVentaEnum.ACTIVA, StatusVentaEnum.FINALIZADA], 'Estatus de compra inválido')
    .required('El estatus de compra es obligatorio'),
});

export const useFormVenta = () => {
  const navigate = useNavigate();
  const { getItem, setItem, clearItem } = useSelectedItemStore();

  const venta = getItem('venta') as IVenta;
  const cliente = getItem('cliente') as ICliente;

  const [esNuevocliente, setEsNuevocliente] = useState(true);
  const [clienteSeleccionado, setClienteSeleccionado] = useState<number>(0);

  const toggleClient = useCallback(
    (formik: any) => {
      setEsNuevocliente((prev) => {
        const newValue = !prev;
        if (!newValue) {
          clearItem('cliente');
          setClienteSeleccionado(0);
          formik.setFieldValue('cliente_id', null);
        }
        return newValue;
      });
    },
    [clearItem],
  );

  const resetVenta = useCallback(() => {
    clearItem('venta');
    clearItem('cliente');
    setClienteSeleccionado(0);
    setEsNuevocliente(true);
  }, [clearItem]);

  const redirectNewCliente = useCallback(() => navigate(AdminRoutes.Clientes), [navigate]);

  const handleSuccess = useCallback(
    (venta: IVenta) => {
      setItem('venta', venta);
      navigate(`/venta/${venta?.id}/productos`);
    },
    [navigate, setItem],
  );

  const clienteId = venta?.cliente_id && !esNuevocliente ? venta?.cliente_id : null;
  const initialValues: IVenta = {
    id: venta?.id ?? 0,
    venta_total: venta?.venta_total ?? 0,
    folio: venta?.folio ?? '',
    nombre_venta: venta?.nombre_venta ?? '',
    cliente_id: clienteId,
    tipo_compra: venta?.tipo_compra ?? TipoVentaEnum.CONTADO,
    status_venta: venta?.status_venta ?? StatusVentaEnum.ACTIVA,
  };

  const mutator = useServiceStoreVenta();
  const { onSubmit } = useOnSubmit<IVenta>({
    mutateAsync: mutator.mutateAsync,
    onSuccess: handleSuccess,
  });

  /** Cliente seleccionado */
  const { data, isLoading } = useServiceShowCliente(clienteSeleccionado ?? 0);

  useEffect(() => {
    if (clienteSeleccionado > 0 && data) {
      setItem('cliente', data);
    } else if (clienteSeleccionado === 0) {
      clearItem('cliente');
    }
  }, [data, clienteSeleccionado, setItem, clearItem]);

  const confiable = cliente?.confiable;
  const adeudo = cliente?.adeudo || 0;
  const msgAdeudo = adeudo === 0 ? '' : ` Este cliente tiene un adeudo de ${adeudo}`;

  const isValidClient = useMemo(() => (!isLoading && confiable && adeudo === 0) || esNuevocliente, [isLoading, confiable, adeudo, esNuevocliente]);

  const onChangeValidateCliente = useCallback((option: SingleValue<IOptions> | MultiValue<IOptions>) => {
    if (option && !Array.isArray(option) && 'value' in option) {
      setClienteSeleccionado(option.value as number);
    }
  }, []);

  const formikProps = {
    initialValues,
    validationSchema,
    onSubmit,
  };

  return {
    formikProps,
    isPending: mutator.isPending,
    ventaActual: venta,
    title: venta?.id ? `Venta: ${venta.folio}` : 'Crear Venta',
    total: venta?.venta_total ?? null,
    disabled: !!venta?.id,
    resetVenta,
    esNuevocliente,
    toggleClient,
    redirectNewCliente,
    onChangeValidateCliente,
    isValidClient,
    adeudo,
    msgAdeudo,
  };
};
