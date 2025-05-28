import { IFilterItem } from '@/components/form/select/interfaces/IFilter';
import { SelectCategorias } from '@/components/select/categorias/SelectCategorias';
import { SelectProovedores } from '@/components/select/proovedores/SelectProovedores';
import Button from '@/components/ui/button/Button';
import { ButtonTypeEnum } from '@/components/ui/button/enums/buttonType.enum';
import { Modal } from '@/components/ui/modal';
import { Form, Formik } from 'formik';
import { Search } from 'lucide-react';
import { useFiltrosProductos } from './useFiltrosProductos';

interface IFiltrosProductosProps {
    closeModal: () => void;
    isOpen: boolean;
    onFilter: (filters: IFilterItem[]) => void;
}
export const FiltrosProductos = (props: IFiltrosProductosProps) => {
    const { isOpen, closeModal } = props;
    const { initialValues, validationSchema, onSubmit } = useFiltrosProductos(props);
    return (
        <Modal isOpen={isOpen} onClose={closeModal} className="m-4 max-w-[700px]">
            <div className="no-scrollbar relative w-full overflow-y-auto rounded-3xl bg-white p-4 lg:p-11 dark:bg-gray-900">
                <div className="px-2 pr-14">
                    <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">Filtrar Productos</h4>
                    <p className="mb-6 text-sm text-gray-500 lg:mb-7 dark:text-gray-400">Busca un producto existente</p>
                </div>
                <Formik enableReinitialize initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                    {(formik) => (
                        <Form className={`grid grid-cols-12 gap-3`}>
                            <div className="col-span-12">
                                <SelectCategorias formik={formik} />
                            </div>
                            <div className="col-span-12">
                                <SelectProovedores formik={formik} />
                            </div>
                            <div className="col-span-12 mt-4"></div>
                            <Button size="sm" variant="outline" className="col-span-6" onClick={() => closeModal()}>
                                Cerrar
                            </Button>
                            <Button size="sm" type={ButtonTypeEnum.Submit} className="col-span-6">
                                <Search /> Buscar
                            </Button>
                        </Form>
                    )}
                </Formik>
            </div>
        </Modal>
    );
};
