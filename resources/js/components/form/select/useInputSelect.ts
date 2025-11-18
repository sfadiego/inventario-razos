import { FormikProps } from 'formik';
import { useEffect, useState } from 'react';
import { MultiValue, SingleValue } from 'react-select';
import { IOptions } from './interfaces/IOptions';

export const useInputSelect = <T extends object>({
  name,
  formik,
  options = [],
  isMulti = false,
  defaultValue = [],
  onChange,
}: {
  name: Extract<keyof T, string>;
  formik: FormikProps<T>;
  options: IOptions[];
  isMulti?: boolean;
  defaultValue?: Array<IOptions> | IOptions | null;
  onChange?: (newValue: SingleValue<IOptions> | MultiValue<IOptions>) => void;
}) => {
  const [selectedValue, setSelectedValue] = useState<Array<IOptions> | IOptions | null>(defaultValue);

  useEffect(() => {
    const formikValue = formik.values[name as keyof typeof formik.values];
    if (formikValue === undefined || formikValue === null || (Array.isArray(formikValue) && formikValue.length === 0)) {
      setSelectedValue(isMulti ? [] : (null as any));
      return;
    }

    if (isMulti && Array.isArray(formikValue)) {
      const selectedOptions = options.filter((option) => formikValue.includes(option.value));
      setSelectedValue(selectedOptions);
    } else {
      const selectedOption = options.find((option) => option.value === formikValue);
      setSelectedValue(selectedOption || null);
    }
  }, [formik.values, name, options, isMulti, formik]);

  const handleOnChange = async (newValue: SingleValue<IOptions> | MultiValue<IOptions>) => {
    if (isMulti) {
      const values = (newValue as MultiValue<IOptions>).map((option) => option.value);
      await formik.setFieldValue(name, values);
    } else {
      if (newValue) {
        await formik.setFieldValue(name, (newValue as SingleValue<IOptions>)?.value);
      } else {
        await formik.setFieldValue(name, null);
      }
    }

    if (onChange) {
      console.log({ onchange: newValue });
      onChange(newValue);
    }
  };

  return {
    selectedValue,
    handleOnChange,
  };
};
