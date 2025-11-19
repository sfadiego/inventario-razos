import { Field } from 'formik';
import Select from 'react-select';
import Label from '../Label';
import { ISelect } from './interfaces/ISelect';
import { useInputSelect } from './useInputSelect';

const InputSelect = <T extends object>(props: ISelect<T>) => {
  const {
    label = '',
    name,
    formik,
    disabled = false,
    options = [],
    isMulti = false,
    defaultValue = [],
    onChange,
    onInputChange,
    className = '',
    isSearchable = true,
    filterOption = null,
    isClearable = true,
  } = props;

  const { selectedValue, handleOnChange } = useInputSelect({
    name,
    formik,
    options,
    isMulti,
    defaultValue,
    onChange,
  });

  return (
    <>
      {label ? <Label>{label}</Label> : ''}
      <Field className={className} disabled={disabled} name={name} id={name}>
        {() => (
          <Select
            value={selectedValue}
            onChange={handleOnChange}
            onInputChange={onInputChange}
            options={options}
            isSearchable={isSearchable}
            isMulti={isMulti}
            isClearable={isClearable}
            filterOption={filterOption !== null ? (typeof filterOption === 'function' ? filterOption : () => filterOption as boolean) : undefined}
            isDisabled={disabled}
          />
        )}
      </Field>
      {formik.submitCount ? formik.errors[name] ? <span className={`text-error-500 mt-1.5`}>{String(formik.errors[name])}</span> : '' : ''}
    </>
  );
};

export default InputSelect;
