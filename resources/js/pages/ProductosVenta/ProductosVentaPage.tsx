import { PageWrapper } from '@/components/layout/PageWrapper';
import { DatatableWithFilter } from '@/components/tables/DatatableWithFilter';
import ShoppingCartButton from '@/components/ui/shoppingProductosbutton/ShoppingCartButton';
import { IVentaProducto } from '@/models/ventaProducto.interface';
import { DataTable } from 'mantine-datatable';
import { FiltrosProductos } from '../Productos/partials/FiltrosProductos';
import { DetalleVenta } from '../Venta/partials/DetalleVenta';
import { AgregarProductoVenta } from './partials/AgregarProductoVenta';
import { useProductosVentaPage } from './useProductosVentaPage';

export default function ProductosVentaPage() {
  const {
    filters,
    openModal,
    isOpen,
    closeModal,
    productId,
    renderersMap,
    useServiceIndexProductos,
    venta,
    breadcrumb,
    rowExpansion,
    columnProperties,
    finished,
    dataTableProps,
    callbackReadCode,
    automaticAdd,
    toggleAutomaticAdd,
  } = useProductosVentaPage();

  return (
    <PageWrapper breadcrumbArray={breadcrumb} pageTitle={`${finished ? 'Detalles de venta' : 'Listado de productos para venta'}`}>
      <div className="mb-3 grid grid-cols-12">
        <div className="col-span-10">{venta && <DetalleVenta venta={venta} />}</div>
        <div className="col-span-2 flex justify-end">
          <ShoppingCartButton />
        </div>
        <div className="col-span-12 mt-2 flex items-center gap-2">
          <input type="checkbox" name="enable_fast_add" id="enable_fast_add" checked={automaticAdd} onChange={toggleAutomaticAdd} />
          <span className="text-sm font-medium text-gray-800 dark:text-gray-200">Habilitar agregar automatico</span>
        </div>
      </div>
      {!finished ? (
        <>
          <DatatableWithFilter
            renderersMap={renderersMap}
            filters={filters}
            inputPlaceholder="Busca por nombre, código de Barras"
            onClickNew={() => openModal}
            disableNewButton={true}
            service={useServiceIndexProductos}
            rowExpansion={rowExpansion}
            columnProperties={columnProperties}
            customCallbackSearch={automaticAdd ? callbackReadCode : undefined}
          >
            {(formik) => <FiltrosProductos formik={formik} />}
          </DatatableWithFilter>
          <AgregarProductoVenta productoId={productId} closeModal={closeModal} isOpen={isOpen} />
        </>
      ) : (
        <div className="mt-2">
          <DataTable<IVentaProducto> {...dataTableProps} idAccessor="id" />
        </div>
      )}
    </PageWrapper>
  );
}
