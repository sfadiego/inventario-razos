import { Field } from 'formik';
import Select from 'react-select';
import Label from '../Label';
import { ISelect } from './interfaces/ISelect';

const InputSelect = <T extends object>(props: ISelect<T>) => {
    const { label = '', name, formik, disabled = false, options = [], isMulti = false, defaultValue = [], onChange, className = '' } = props;
    return (
        <>
            {label ? <Label>{label}</Label> : ''}
            <Field disabled={disabled} name={name} id={name}>
                {() => <Select options={options} isSearchable={true} isMulti={isMulti} isDisabled={disabled} />}
            </Field>
            {formik.submitCount ? formik.errors[name] ? <p className={`text-error-500 mt-1.5`}>{String(formik.errors[name])}</p> : '' : ''}
        </>
    );
};

export default InputSelect;
