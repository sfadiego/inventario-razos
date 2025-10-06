import React from 'react';
import { ButtonTypeEnum } from '../enums/buttonType.enum';

export interface IUseButtonProps {
  variant: string;
  type: ButtonTypeEnum;
  className?: string;
  size?: string;
  disabled?: boolean;
  loading?: boolean;
  children: React.ReactNode;
}
