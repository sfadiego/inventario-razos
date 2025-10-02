import { Field } from 'formik';
import Select from 'react-select';
import Label from '../Label';
import { ISelect } from './interfaces/ISelect';
import { useInputSelect } from './useInputSelect';

const InputSelect = <T extends object>(props: ISelect<T>) => {
  const { label = '', name, formik, disabled = false, options = [], isMulti = false, defaultValue = [], onChange } = props;

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
      <Field disabled={disabled} name={name} id={name}>
        {() => (
          <Select value={selectedValue} onChange={handleOnChange} options={options} isSearchable={true} isMulti={isMulti} isDisabled={disabled} />
        )}
      </Field>
      {formik.submitCount ? formik.errors[name] ? <span className={`text-error-500 mt-1.5`}>{String(formik.errors[name])}</span> : '' : ''}
    </>
  );
};

export default InputSelect;
