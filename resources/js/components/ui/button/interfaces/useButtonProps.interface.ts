import { IRoutes } from '@/router/routes.interface';
import React from 'react';
import { ButtonTypeEnum } from '../enums/buttonType.enum';
import { ButtonVariantEnum } from '../enums/buttonVariant.enum';

export interface IUseButtonProps {
    variant: ButtonVariantEnum;
    color?: string;
    type: ButtonTypeEnum;
    className?: string;
    to?: IRoutes;
    disabled?: boolean;
    loading?: boolean;
    children: React.ReactNode;
}
