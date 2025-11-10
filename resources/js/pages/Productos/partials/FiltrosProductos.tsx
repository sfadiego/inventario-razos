import { SelectCategorias } from '@/components/select/categorias/SelectCategorias';
import { SelectProveedores } from '@/components/select/proveedores/SelectProveedores';
import { FormikProps } from 'formik';
import { IFiltroProducto } from '../useProductosPage';
import { SelectMarcas } from '@/components/select/marcas/SelectMarcas';

interface IFiltrosProductoProps {
  formik: FormikProps<IFiltroProducto>;
}
export const FiltrosProductos = ({ formik }: IFiltrosProductoProps) => {
  return (
    <>
      <div className="col-span-12">
        <SelectCategorias formik={formik} />
      </div>
      <div className="col-span-12">
        <SelectProveedores formik={formik} />
      </div>
      <div className="col-span-12">
        <SelectMarcas formik={formik} />
      </div>
    </>
  );
};
