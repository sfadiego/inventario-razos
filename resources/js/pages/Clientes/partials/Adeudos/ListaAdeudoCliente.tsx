import Badge from '@/components/ui/badge/Badge';
import { formatDate } from '@/helper/dates';
import { IAdeudo } from '@/interfaces/IAdeudo';
import { ICliente } from '@/models/cliente.interface';
import { useSelectedItemStore } from '@/store/useSelectedItemStore';
import { Link } from 'react-router';
import { useListaAdeudosCliente } from './useListaAdeudosCliente';

interface IListaAdeudoClienteProps {
  closeModal: () => void;
  handleUpdateAdeudo?: (adeudoId: number) => void;
}
export const ListaAdeudoCliente = ({ closeModal, handleUpdateAdeudo }: IListaAdeudoClienteProps) => {
  const { getItem } = useSelectedItemStore();
  const cliente = getItem('cliente') as ICliente;
  const clienteId = cliente.id ?? 0;
  const { isLoading, data, handleUpdateAll, isLoadingAll } = useListaAdeudosCliente({ clienteId, closeModal });
  return (
    <div className="col-span-12 mb-3 lg:col-span-12">
      {!isLoading && data && data.length > 0 && (
        <>
          <h3 className="mb-2 font-semibold">
            Adedudos
            <button disabled={isLoadingAll} className="ml-4 text-blue-600 hover:underline" type="button" onClick={handleUpdateAll}>
              Liquidar Todos
            </button>
          </h3>
          {data?.map((adeudo: IAdeudo) => (
            <div key={adeudo.id} className="mb-1">
              <Badge size="sm" color="warning">
                <span className="font-bold">Folio:</span> {adeudo?.venta.folio} - <span className="font-bold">Importe:</span> ${adeudo.total_adeudo} -{' '}
                <span className="font-bold">Fecha: </span>
                {formatDate(adeudo.created_at, 'letters', '-')}
              </Badge>
              <div className="flex items-center">
                <Link to={`/venta/${adeudo.id}/productos`} className="mr-2 ml-2 text-blue-600 hover:underline">
                  Detalle
                </Link>

                <button className="text-blue-600 hover:underline" type="button" onClick={() => handleUpdateAdeudo?.(adeudo.id)}>
                  Liquidar adeudo
                </button>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};
