import { AlertTypeEnum } from "@/enums/AlertTypeEnum"

export interface IAlertSwalProps {
  type: AlertTypeEnum
  title?: string
  text?: string
}
