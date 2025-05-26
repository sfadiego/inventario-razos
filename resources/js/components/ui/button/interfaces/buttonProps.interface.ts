import React from 'react'
import { IRoutes } from '@/router/routes.interface'
import { ButtonVariantEnum } from '../enums/buttonVariant.enum'
import { ButtonTypeEnum } from '../enums/buttonType.enum'

export interface IButtonProps {
  type?: ButtonTypeEnum
  variant?: ButtonVariantEnum
  children: React.ReactNode
  loading?: boolean
  to?: IRoutes
  color?: string
  className?: string
  onClick?: () => unknown
  disabled?: boolean
}
