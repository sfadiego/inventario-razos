import React from 'react';
import { ButtonTypeEnum } from '../enums/buttonType.enum';
import { buttonVariant } from '../enums/buttonVariant';
import { buttonSize } from '../types/buttonSize';

export interface IButtonProps {
    type?: ButtonTypeEnum;
    variant?: buttonVariant;
    children: React.ReactNode;
    loading?: boolean;
    color?: string;
    className?: string;
    onClick?: () => unknown;
    disabled?: boolean;
    size?: buttonSize;
}
