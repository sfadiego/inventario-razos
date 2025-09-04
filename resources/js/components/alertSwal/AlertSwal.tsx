import { AlertTypeEnum } from '@/enums/AlertTypeEnum';
import Swal from 'sweetalert2';
import { IAlertSwalProps } from './IAlertSwalProps';

export const AlertSwal = ({ type = AlertTypeEnum.Success, title, text, options = {} }: IAlertSwalProps) => {
  const optionAlert = {
    success: {
      title: title || 'Bien',
      text: text || 'Proceso completado correctamente.',
      icon: 'success',
      ...options,
    },
    error: {
      title: title || 'Error',
      text: text || 'Something went wrong.',
      icon: 'error',
      ...options,
    },
    confirm: {
      title: title || '¿Está seguro que desea realizar este proceso?',
      text: text || 'No podrás revertir este proceso!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: 'Cancelar',
      ...options,
    },
  };
  Swal.fire(optionAlert[type] as import('sweetalert2').SweetAlertOptions);
};
