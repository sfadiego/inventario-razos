import { Filter, Plus } from 'lucide-react';
import { DataTable } from 'mantine-datatable';
import { ModalFilter } from '../filters/modalFilter/ModalFilter';
import { InputWithIcon } from '../form/input/InputWithIcon';
import Button from '../ui/button/Button';
import { IDatatableWithFilterProps } from './IDatatableFilter';
import { useDatatableFilters } from './useDatatableFilters';

export const DatatableWithFilter = (props: IDatatableWithFilterProps) => {
    const { disableNewButton = false } = props;
    const { initialValues, isOpen, search, dataTableProps, children, openModal, closeModal, onFilter, setSearch, onClickNew } =
        useDatatableFilters(props);

    return (
        <>
            <div className="grid grid-cols-12 gap-2 pb-5">
                <div className={`${!disableNewButton ? 'col-span-12 md:col-span-10' : 'col-span-12 md:col-span-12'}`}>
                    <InputWithIcon
                        name={`search`}
                        value={search}
                        placeholder={`Buscar ...`}
                        inputCallback={(e) => setSearch(e.target.value)}
                        IconComponent={() => <Filter className="text-gray-500" onClick={openModal} />}
                    />
                </div>
                {!disableNewButton && (
                    <div className="col-span-12 md:col-span-2">
                        <Button onClick={onClickNew} className="w-full">
                            <Plus /> Nuevo
                        </Button>
                    </div>
                )}
            </div>
            <div className="col-span-12 h-9/10 overflow-auto">
                <DataTable {...dataTableProps} />
            </div>
            <ModalFilter initialValues={initialValues} close={closeModal} isOpen={isOpen} onSubmit={onFilter}>
                {(formik) => <>{typeof children === 'function' ? children(formik) : children}</>}
            </ModalFilter>
        </>
    );
};
