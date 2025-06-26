import { BreadcrumbArrayProps } from '@/components/common/breadcrum';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { useDataTable } from '@/hooks/useDatatable';
import { AdminRoutes } from '@/router/modules/admin.routes';
import { useServiceVentaProductoDetalle } from '@/Services/ventaProducto/useServiceVentaProducto';
import { DataTable } from 'mantine-datatable';
import { useParams } from 'react-router';

export default function ProductosVentaPage() {
    const { id } = useParams();
    const breadcrumbArray: Array<BreadcrumbArrayProps> = [
        { name: 'Ventas', path: AdminRoutes.Venta },
        { name: 'Productos', path: `/venta/${id}/productos` },
    ];

    const { dataTableProps } = useDataTable({
        service: useServiceVentaProductoDetalle,
        payload: {
            serviceParamId: id,
        },
    });
    console.log(dataTableProps);
    return (
        <PageWrapper breadcrumbArray={breadcrumbArray} pageTitle="Agregar Productos">
            {/* <DatatableWithFilter
                propertyInputSearch={`nombre`}
                renderersMap={renderersMap}
                initialValues={initialValues}
                filters={filters}
                disableNewButton={true}
                // onClickNew={() => {}}
                refreshFlag={false}
                service={useServiceIndexProductos}
            >
                {(formik) => <FiltrosProductos formik={formik} />}
            </DatatableWithFilter> */}
            <DataTable {...dataTableProps} />
        </PageWrapper>
    );
}
