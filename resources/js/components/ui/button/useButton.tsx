import { useMemo } from 'react';
import { buttonClassEnum } from './enums/buttonClass.enum';
import { ButtonTypeEnum } from './enums/buttonType.enum';
import { buttonVariant } from './enums/buttonVariant';
import { IUseButtonProps } from './interfaces/useButtonProps.interface';
import { buttonSize } from './types/buttonSize';

const SIZE_CLASSES: Record<buttonSize, string> = {
    sm: 'px-4 py-3 text-sm',
    md: 'px-5 py-3.5 text-sm',
};

const VARIANT_CLASSES: Record<buttonVariant, string> = {
    primary: buttonClassEnum.Primary,
    outline: buttonClassEnum.Outline,
    error: buttonClassEnum.Error,
};

export const useButton = ({ variant = 'primary', size = 'sm', type, className = '', disabled, loading, children }: IUseButtonProps) => {
    const isDisabled = disabled || loading;

    const baseClass = useMemo(
        () =>
            `inline-flex items-center justify-center gap-2 rounded-lg transition ${className ?? ''} ${SIZE_CLASSES[size as buttonSize] || ''} ${VARIANT_CLASSES[variant as buttonVariant]} ${
                isDisabled ? 'cursor-not-allowed opacity-50' : ''
            }`,
        [className, size, variant, isDisabled],
    );

    const Component = ButtonTypeEnum.Button as const;
    const componentProps: React.ButtonHTMLAttributes<HTMLButtonElement> = useMemo(
        () => ({
            type: (type === ButtonTypeEnum.Submit ? 'submit' : 'button') as 'submit' | 'button',
            className: baseClass,
            disabled: isDisabled,
        }),
        [baseClass, isDisabled, type],
    );

    const spinner = <span className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-white border-l-transparent align-middle" />;
    const renderedChildren = loading ? spinner : children;

    return {
        Component,
        componentProps,
        children: renderedChildren,
    };
};
