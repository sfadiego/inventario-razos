import { AlertTypeEnum } from '@/enums/AlertTypeEnum';

export interface IAlertSwalProps {
  type?: AlertTypeEnum;
  title?: string;
  text?: string;
  options?: object;
  onConfirm?: (res: any) => void;
  onCancel?: (res: any) => void;
}
