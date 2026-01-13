import { IImagenProducto } from '@/models/imagenProducto.interface';
import { useServiceDashboardMasVendidos } from '@/Services/dashboard/useServiceDashboard';
import { Image } from '../images/Image';
import { useGetImagen } from '../images/useGetImagen';
import Badge from '../ui/badge/Badge';
import { Table, TableBody, TableCell, TableHeader, TableRow } from '../ui/table';

const useBestSellers = () => {
  const { isLoading, data } = useServiceDashboardMasVendidos();
  return {
    isLoading,
    data,
  };
};

const ProductImage = ({ image }: { image: IImagenProducto }) => {
  const { image: imgSrc } = useGetImagen(image);
  return imgSrc ? <Image image={imgSrc} /> : null;
};

export default function BestSellers() {
  const { isLoading, data } = useBestSellers();
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pt-4 pb-3 sm:px-6 dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">Mas vendidos</h3>
        </div>
      </div>
      <div className="max-w-full overflow-x-auto">
        <Table>
          <TableHeader className="border-y border-gray-100 dark:border-gray-800">
            <TableRow>
              <TableCell isHeader className="text-theme-xs py-3 text-start font-medium text-gray-500 dark:text-gray-400">
                Producto
              </TableCell>
              <TableCell isHeader className="text-theme-xs py-3 text-start font-medium text-gray-500 dark:text-gray-400">
                Subcategoria
              </TableCell>
              <TableCell isHeader className="text-theme-xs py-3 text-start font-medium text-gray-500 dark:text-gray-400">
                Cantidad
              </TableCell>
            </TableRow>
          </TableHeader>

          <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
            {
              !isLoading && data?.length == 0 && (
                <TableRow>
                  <TableCell className="py-3">
                    <p className="text-theme-sm font-medium text-gray-800 dark:text-white/90">No hay datos</p>
                  </TableCell>
                </TableRow>
              )
            }
            {!isLoading &&
              data &&
              data.map((product, key) => (
                <TableRow key={key} className="">
                  <TableCell className="py-3">
                    <div className="flex items-center gap-3">
                      <div className="h-[50px] w-[50px] overflow-hidden rounded-md">{product.image && <ProductImage image={product.image} />}</div>
                      <div>
                        <p className="text-theme-sm font-medium text-gray-800 dark:text-white/90">{product.producto}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-theme-sm py-3 text-gray-500 dark:text-gray-400">
                    <Badge size="sm" color="success">
                      {product.subcategoria}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-theme-sm py-3 text-gray-500 dark:text-gray-400">
                    <Badge size="sm" color="success">
                      {product.cantidad}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
