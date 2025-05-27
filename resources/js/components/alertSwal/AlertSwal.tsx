import { AlertTypeEnum } from '@/enums/AlertTypeEnum';
import Swal from 'sweetalert2';
import { IAlertSwalProps } from './IAlertSwalProps';

export const AlertSwal = ({ type, title, text }: IAlertSwalProps) => {
    switch (type) {
        case AlertTypeEnum.Success:
            Swal.fire({
                title: title || 'Bien',
                text: text || 'Proceso completado correctamente.',
                icon: 'success',
            });
            break;
        case AlertTypeEnum.Error:
            Swal.fire({
                title: title || 'Error',
                text: text || 'Something went wrong.',
                icon: 'error',
            });
            break;
        case AlertTypeEnum.Confirm:
            return Swal.fire({
                title: title || '¿Está seguro que desea realizar este proceso?',
                text: text || 'No podrás revertir este proceso!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si',
                cancelButtonText: 'Cancelar',
            });
        default:
            break;
    }
};
