import { useServiceLogin } from '@/Services/auth/useServiceAuth';
import { useAxios } from '@/hooks/useAxios';
import { useOnSubmit } from '@/hooks/useOnSubmit';
import { IAuthResponse, ISignInForm } from '@/interfaces/auth';
import { AdminRoutes } from '@/router/modules/admin.routes';
import { Form, Formik } from 'formik';
import { LogIn } from 'lucide-react';
import { useNavigate } from 'react-router';
import * as Yup from 'yup';
import Input from '../form/input/InputField';
import { InputTypeEnum } from '../form/input/enum/InputType.enum';
import Button from '../ui/button/Button';
import { ButtonTypeEnum } from '../ui/button/enums/buttonType.enum';

export default function SignInForm() {
  const navigate = useNavigate();
  const { saveAuth } = useAxios();
  const initialValues: ISignInForm = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().required('El correo electrónico es obligatorio'),
    password: Yup.string().required('La contraseña es obligatoria'),
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
            <img src="/images/refacciones.png" alt="Logo" className="mx-auto mb-3" />
          </div>
          <div>
            <Formik<ISignInForm> enableReinitialize {...formikProps}>
              {(formik) => (
                <Form>
                  <div className="space-y-6">
                    <div>
                      <Input<ISignInForm> label={`Correo Electrónico`} name="email" formik={formik} type={InputTypeEnum.Text} />
                    </div>
                    <div>
                      <Input<ISignInForm> label={`Contraseña`} name="password" formik={formik} type={InputTypeEnum.Password} />
                    </div>
                    <div>
                      <Button type={ButtonTypeEnum.Submit} className="w-full" size="sm">
                        <LogIn /> Iniciar Sesión
                      </Button>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
}
