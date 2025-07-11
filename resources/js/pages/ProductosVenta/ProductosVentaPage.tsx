import { PageWrapper } from '@/components/layout/PageWrapper';
import { DatatableWithFilter } from '@/components/tables/DatatableWithFilter';
import ShoppingCartButton from '@/components/ui/shoppingProductosbutton/ShoppingCartButton';
import { useParams } from 'react-router';
import { FiltrosProductos } from '../Productos/partials/FiltrosProductos';
import { DetalleVenta } from '../Venta/partials/DetalleVenta';
import { AgregarProductoVenta } from './partials/AgregarProductoVenta';
import { useProductosVentaPage } from './useProductosVentaPage';

export default function ProductosVentaPage() {
    const { id } = useParams();
    const ventaId = id ? Number(id) : 0;
    const {
        filters,
        openModal,
        isOpen,
        closeModal,
        selectedProduct,
        renderersMap,
        initialValues,
        useServiceIndexProductos,
        refetchCart,
        setRefetchCart,
        venta,
        breadcrumbArray,
    } = useProductosVentaPage({ ventaId });

    return (
        <PageWrapper breadcrumbArray={breadcrumbArray} pageTitle="Listado de productos para venta">
            <div className="mb-3 grid grid-cols-12">
                <div className="col-span-10">{venta && <DetalleVenta venta={venta} />}</div>
                <div className="col-span-2 flex justify-end">
                    <ShoppingCartButton refetchNumber={refetchCart} />
                </div>
            </div>
            <DatatableWithFilter
                propertyInputSearch={`nombre`}
                renderersMap={renderersMap}
                initialValues={initialValues}
                filters={filters}
                onClickNew={openModal}
                refreshFlag={true}
                disableNewButton={true}
                service={useServiceIndexProductos}
            >
                {(formik) => <FiltrosProductos formik={formik} />}
            </DatatableWithFilter>
            <AgregarProductoVenta
                ventaId={ventaId}
                productoId={selectedProduct}
                closeModal={closeModal}
                refetchShoppingCar={refetchCart}
                setRefetchShoppingCar={setRefetchCart}
                isOpen={isOpen}
            />
        </PageWrapper>
    );
}
