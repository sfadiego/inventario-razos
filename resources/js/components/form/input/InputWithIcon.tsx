import React from 'react';
import { InputTypeEnum } from './enum/InputType.enum';
interface IInputWithIconProps<T> {
  name: Extract<keyof T, string>;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  inputClassName?: string;
  value?: string;
  wrapperClassName?: string;
  IconComponent?: React.ComponentType;
  inputCallback?: (props: any) => void;
}

export const InputWithIcon = <T extends object>(props: IInputWithIconProps<T>) => {
  const { label, name, placeholder, disabled = false, inputClassName, wrapperClassName, IconComponent, value, inputCallback } = props;

  const defaultClass = 'flex items-center border p-2 rounded';
  const defaultInputClass = 'flex-1 outline-none';
  return (
    <>
      {label && <label>{label}</label>}
      <div className={`${!wrapperClassName ? defaultClass : wrapperClassName}`}>
        <input
          onChange={inputCallback ? (e) => inputCallback(e) : undefined}
          value={value}
          name={name}
          type={InputTypeEnum.Text}
          placeholder={`${placeholder}`}
          className={`${inputClassName ? inputClassName : defaultInputClass}`}
          disabled={disabled}
        />
        {IconComponent && <IconComponent />}
      </div>
    </>
  );
};
