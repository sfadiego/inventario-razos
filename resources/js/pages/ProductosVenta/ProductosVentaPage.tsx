import { BreadcrumbArrayProps } from '@/components/common/breadcrum';
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
    const breadcrumbArray: Array<BreadcrumbArrayProps> = [
        { name: 'Ventas', path: AdminRoutes.Venta },
        { name: 'Productos', path: `/venta/${id}/productos` },
    ];
    const { filters, openModal, isOpen, closeModal, selectedProduct, renderersMap, initialValues, useServiceIndexProductos } =
        useProductosVentaPage();
    return (
        <PageWrapper breadcrumbArray={breadcrumbArray} pageTitle="Listado de productos para venta" >
            <div className="mb-3 grid grid-cols-12">
                <div className="col-span-12 flex justify-end">
                    <ShoppingCartButton />
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
            <AgregarProductoVenta ventaId={id ? Number(id) : undefined} productoId={selectedProduct} closeModal={closeModal} isOpen={isOpen}></AgregarProductoVenta>
        </PageWrapper>
    );
}
