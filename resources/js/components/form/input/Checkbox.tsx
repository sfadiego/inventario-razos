import { FormikProps } from 'formik';
import { Check } from 'lucide-react';

interface CheckboxProps<T> {
  label?: string;
  checked: boolean;
  className?: string;
  id?: string;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  formik: FormikProps<T>;
}

const Checkbox = <T extends object>({ label, formik, checked, id, onChange, className = '', disabled = false }: CheckboxProps<T>) => {
  const handleChange = (checked: boolean) => {
    onChange(checked);
    formik.setFieldValue(id!, checked);
  };
  return (
    <label className={`group flex cursor-pointer items-center space-x-3 ${disabled ? 'cursor-not-allowed opacity-60' : ''}`}>
      <div className="relative h-5 w-5">
        <input
          id={id}
          name={id}
          type="checkbox"
          className={`checked:bg-brand-500 h-5 w-5 cursor-pointer appearance-none rounded-md border border-gray-300 checked:border-transparent disabled:opacity-60 dark:border-gray-700 ${className}`}
          checked={checked}
          onChange={(e) => handleChange(e.target.checked)}
          disabled={disabled}
        />
        {checked && (
          <Check
            width="14"
            height="14"
            fill="none"
            className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform stroke-white"
          />
        )}
        {disabled && (
          <Check
            width="14"
            height="14"
            fill="none"
            className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform"
          />
        )}
      </div>
      {label && <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{label}</span>}
    </label>
  );
};

export default Checkbox;
