import { useServiceLogin } from '@/Services/auth/useServiceAuth';
import { useAxios } from '@/hooks/useAxios';
import { useOnSubmit } from '@/hooks/useOnSubmit';
import { IAuthResponse, ISignInForm } from '@/interfaces/auth';
import { AdminRoutes } from '@/router/modules/admin.routes';
import { Form, Formik } from 'formik';
import { LogIn } from 'lucide-react';
import { Link, useNavigate } from 'react-router';
import * as Yup from 'yup';
import Input from '../form/input/InputField';
import { InputTypeEnum } from '../form/input/enum/InputType.enum';
import Button from '../ui/button/Button';
import { ButtonTypeEnum } from '../ui/button/enums/buttonType.enum';

export default function SignInForm() {
    const title = import.meta.env.VITE_APP_FULL_TITLE;
    const navigate = useNavigate();
    const { saveAuth } = useAxios();
    const initialValues: ISignInForm = {
        email: '',
        password: '',
    };

    const validationSchema = Yup.object().shape({
        email: Yup.string().required('El nombre es obligatorio'),
        password: Yup.string().required('El password es obligatorio'),
    });

    const handleSuccess = (data: IAuthResponse) => {
        const { user, access_token } = data;
        saveAuth(access_token, user);
        navigate(AdminRoutes.Dashboard);
    };
    const mutator = useServiceLogin();
    const { onSubmit } = useOnSubmit<ISignInForm>({
        mutateAsync: mutator.mutateAsync,
        onSuccess: async (data) => handleSuccess(data),
    });

    const formikProps = {
        initialValues,
        validationSchema,
        onSubmit,
    };
    return (
        <div className="flex flex-1 flex-col">
            <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center">
                <div>
                    <div className="mb-5 sm:mb-8">
                        <h1 className="text-title-sm sm:text-title-md mb-2 font-semibold text-gray-800 dark:text-white/90">{title}</h1>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Ingresa tu correo y contraseña para ingresar!</p>
                    </div>
                    <div>
                        <Formik<ISignInForm> enableReinitialize {...formikProps}>
                            {(formik) => (
                                <Form>
                                    <div className="space-y-6">
                                        <div>
                                            <Input<ISignInForm> label={`Email`} name="email" formik={formik} type={InputTypeEnum.Text} />
                                        </div>
                                        <div>
                                            <Input<ISignInForm> label={`Password`} name="password" formik={formik} type={InputTypeEnum.Password} />
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <Link to="/reset-password" className="text-brand-500 hover:text-brand-600 dark:text-brand-400 text-sm">
                                                Olvidaste el password?
                                            </Link>
                                        </div>
                                        <div>
                                            <Button type={ButtonTypeEnum.Submit} className="w-full" size="sm">
                                                <LogIn /> Login
                                            </Button>
                                        </div>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                        <div className="mt-5">
                            <p className="text-center text-sm font-normal text-gray-700 sm:text-start dark:text-gray-400">
                                No tienes cuenta?
                                <Link to="/signup" className="text-brand-500 hover:text-brand-600 dark:text-brand-400 ml-2">
                                    Registrarse
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
