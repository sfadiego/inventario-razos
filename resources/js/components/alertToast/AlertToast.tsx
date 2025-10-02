import { toast, ToastOptions } from 'react-toastify';

type ToastType = 'success' | 'error' | 'info' | 'warning';
const defaultToastOptions: ToastOptions = {
  position: 'top-right',
  autoClose: 3000,
};
interface IAlertToastOptions {
  type: ToastType;
  message: string;
  options?: ToastOptions;
}

export const AlertToast = ({ type, message, options = {} }: IAlertToastOptions) => {
  const toastOptions: ToastOptions = { ...defaultToastOptions, ...options };
  return toast[type](message, toastOptions);
};
