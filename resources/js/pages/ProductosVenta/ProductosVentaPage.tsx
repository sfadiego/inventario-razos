import { PageWrapper } from '@/components/layout/PageWrapper';
import { DatatableWithFilter } from '@/components/tables/DatatableWithFilter';
import ShoppingCartButton from '@/components/ui/shoppingProductosbutton/ShoppingCartButton';
import { FiltrosProductos } from '../Productos/partials/FiltrosProductos';
import { DetalleVenta } from '../Venta/partials/DetalleVenta';
import { AgregarProductoVenta } from './partials/AgregarProductoVenta';
import { useProductosVentaPage } from './useProductosVentaPage';

export default function ProductosVentaPage() {
  const { filters, openModal, isOpen, closeModal, productId, renderersMap, useServiceIndexProductos, venta, breadcrumb, rowExpansion } =
    useProductosVentaPage();
  return (
    <PageWrapper breadcrumbArray={breadcrumb} pageTitle="Listado de productos para venta">
      <div className="mb-3 grid grid-cols-12">
        <div className="col-span-10">{venta && <DetalleVenta venta={venta} />}</div>
        <div className="col-span-2 flex justify-end">
          <ShoppingCartButton />
        </div>
      </div>
      <DatatableWithFilter
        propertyInputSearch={`nombre`}
        renderersMap={renderersMap}
        filters={filters}
        onClickNew={() => openModal}
        disableNewButton={true}
        service={useServiceIndexProductos}
        rowExpansion={rowExpansion}
      >
        {(formik) => <FiltrosProductos formik={formik} />}
      </DatatableWithFilter>
      <AgregarProductoVenta productoId={productId} closeModal={closeModal} isOpen={isOpen} />
    </PageWrapper>
  );
}
