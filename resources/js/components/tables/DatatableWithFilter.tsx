import { FormikValues } from 'formik';
import { Filter, Plus } from 'lucide-react';
import { DataTable } from 'mantine-datatable';
import { ModalFilter } from '../filters/modalFilter/ModalFilter';
import { InputWithIcon } from '../form/input/InputWithIcon';
import Button from '../ui/button/Button';
import { IDatatableWithFilterProps } from './IDatatableFilter';
import { useDatatableFilters } from './useDatatableFilters';

export const DatatableWithFilter = <Values extends FormikValues>(props: IDatatableWithFilterProps<Values>) => {
  const { disableNewButton = false, newButtonText } = props;
  const { isOpen, search, filters, dataTableProps, children, openModal, closeModal, onFilter, setSearch, onClickNew, rowExpansion } =
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
              <Plus /> {newButtonText ? newButtonText : `Nuevo`}
            </Button>
          </div>
        )}
      </div>
      <div className="col-span-12 h-9/10 overflow-auto">
        <DataTable {...dataTableProps} rowExpansion={rowExpansion} />
      </div>
      <ModalFilter<Values> filters={filters} close={closeModal} isOpen={isOpen} onSubmit={onFilter}>
        {(formik) => <>{typeof children === 'function' ? children(formik) : children}</>}
      </ModalFilter>
    </>
  );
};
