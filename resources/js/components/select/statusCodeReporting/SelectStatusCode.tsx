import InputSelect from '@/components/form/select/InputSelect';
import { FormikProps } from 'formik';

interface ISelectStatusCode {
  disabled?: boolean;
  formik: FormikProps<any>;
}

export const SelectStatusCode = (props: ISelectStatusCode) => {
  const options = [
    { value: '500', label: `internal server error 500` },
    { value: '503', label: `service unavailable 503` },
    { value: '504', label: `gateway timeout 504` },
    { value: '400', label: `bad request 400` },
    { value: '404', label: `not found 404` },
    { value: '401', label: `unauthorized 401` },
    { value: '403', label: `forbidden 403` },
    { value: '409', label: `conflict 409` },
    { value: '422', label: `unprocessable entity 422` },
  ];
  return <InputSelect {...props} label={`Status code`} name={'status_code'} options={options} />;
};
