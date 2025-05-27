import { Field, FormikProps } from 'formik';
import Label from '../Label';
import { InputTypeEnum } from './enum/InputType.enum';

interface InputProps<T> {
    type?: InputTypeEnum;
    name: Extract<keyof T, string>;
    placeholder?: string;
    className?: string;
    disabled?: boolean;
    success?: boolean;
    error?: boolean;
    formik: FormikProps<T>;
    showPassword?: boolean;
    label?: string;
    hint?: string;
}

type InputVariant = 'default' | 'disabled' | 'error' | 'success';
const useInputVariant = (variant: InputVariant): string => {
    const variants = {
        disabled:
            'text-gray-500 border-gray-300 opacity-40 bg-gray-100 cursor-not-allowed dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700 opacity-40',
        error: 'border-error-500 focus:border-error-300 focus:ring-error-500/20 dark:text-error-400 dark:border-error-500 dark:focus:border-error-800',
        success:
            'border-success-500 focus:border-success-300 focus:ring-success-500/20 dark:text-success-400 dark:border-success-500 dark:focus:border-success-800',
        default:
            'bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-brand-500/20 dark:border-gray-700 dark:text-white/90 dark:focus:border-brand-800',
    };

    return `h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3  dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 ${variants[variant] || variants.default}`;
};

const Input = <T extends object>(props: InputProps<T>) => {
    const { type = InputTypeEnum.Text, hint, name, placeholder, disabled = false, success = false, formik, showPassword = false, label = '' } = props;

    const variant = formik.errors[name] ? 'error' : disabled ? 'disabled' : success ? 'success' : 'default';
    const inputClasses = useInputVariant(variant);

    return (
        <>
            {label ? <Label>{label}</Label> : ''}
            <Field
                as={'input'}
                disabled={disabled}
                name={name}
                type={type === InputTypeEnum.Password && showPassword ? InputTypeEnum.Text : type}
                id={name}
                placeholder={placeholder}
                className={inputClasses}
            />
            {formik.submitCount ? formik.errors[name] ? <span className={`text-error-500 mt-1.5`}>{String(formik.errors[name])}</span> : '' : ''}
            {hint && <span className="text-sm text-gray-500">{hint}</span>}
        </>
    );
};

export default Input;
