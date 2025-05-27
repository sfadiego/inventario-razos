import { memo } from 'react';
import { ButtonTypeEnum } from './enums/buttonType.enum';
import { IButtonProps } from './interfaces/buttonProps.interface';
import { useButton } from './useButton';

const Button = ({
    disabled = false,
    type = ButtonTypeEnum.Button,
    variant = 'primary',
    children,
    className,
    loading = false,
    onClick,
}: IButtonProps) => {
    const {
        Component,
        componentProps,
        children: renderedChildren,
    } = useButton({
        variant,
        type,
        className,
        loading,
        children,
        disabled,
    });

    return (
        <Component {...componentProps} onClick={onClick}>
            {renderedChildren}
        </Component>
    );
};

export default memo(Button);
