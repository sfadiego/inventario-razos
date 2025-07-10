import { BreadcrumbArrayProps } from '@/components/common/breadcrum';
import { Headers } from '@/components/layout/Headers';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { DatatableWithFilter } from '@/components/tables/DatatableWithFilter';
import ShoppingCartButton from '@/components/ui/shoppingProductosbutton/ShoppingCartButton';
import { AdminRoutes } from '@/router/modules/admin.routes';
import { useParams } from 'react-router';
import { FiltrosProductos } from '../Productos/partials/FiltrosProductos';
import { AgregarProductoVenta } from './partials/AgregarProductoVenta';
import { useProductosVentaPage } from './useProductosVentaPage';

export default function ProductosVentaPage() {
    const { id } = useParams();
    const ventaId = id ? Number(id) : 0;
    const breadcrumbArray: Array<BreadcrumbArrayProps> = [
        { name: 'Ventas', path: AdminRoutes.Venta },
        { name: 'Productos', path: `/venta/${id}/productos` },
    ];
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
    } = useProductosVentaPage({ ventaId });
    const folio = venta?.folio ?? ' --- ';
    const venta_total = venta?.venta_total ?? '---';
    const nombreCliente = venta?.cliente?.nombre ?? '---';
    return (
        <PageWrapper breadcrumbArray={breadcrumbArray} pageTitle="Listado de productos para venta">
            <div className="mb-3 grid grid-cols-12">
                <div className="col-span-10">
                    <Headers size="sm" type={`h1`}>
                        Folio: {folio}
                    </Headers>
                    <Headers size="sm" type={`h2`}>
                        Total: ${venta_total}
                    </Headers>
                    {venta?.cliente?.nombre && (
                        <Headers size="sm" type={`h3`}>
                            Cliente: {nombreCliente}
                        </Headers>
                    )}
                </div>
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
