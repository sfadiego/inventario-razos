import { UseMutateAsyncFunction } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { toast } from 'react-toastify';

export const useOnSubmit = <Request = any, Response = any>({
    mutateAsync,
    onSuccess,
    onError,
}: {
    mutateAsync: UseMutateAsyncFunction<AxiosResponse<any, any>, Error, unknown, unknown>;
    onSuccess: (data: Response) => void;
    onError?: (data: Error) => void;
}) => {
    const onSubmit = async (data: Request, { setErrors }: any) => {
        try {
            const res = await mutateAsync(data);
            onSuccess(res.data);
        } catch (error: any) {
            if (error.response?.data?.data != null) {
                setErrors(error.response.data.data);
            }

            if (onError) {
                onError(error);
            } else {
                console.log(error.response?.data.message);
                toast.error(error.response?.data.message || 'Ha ocurrido un error procesando la solicitud.');
            }
        }
    };

    return {
        onSubmit,
    };
};
