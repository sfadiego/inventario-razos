import { Form, Formik } from 'formik';
import { ReactNode } from 'react';
import Button from '../ui/button/Button';

interface IFormProps {
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
    initialValues: any;
    validationSchema: any;
    children: ReactNode;
    className?: string;
}

const FormComponent = ({ children, initialValues, validationSchema, className = '', onSubmit }: IFormProps) => {
    return (
        // <Form
        // iniitialValues={{}}
        // validationSchema={null}
        //  onSubmit={onSubmit} className={`${className}`}>

        //     {children}
        // </Form>
        <Formik enableReinitialize initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            {(formik) => (
                <Form className={`${className}`}>
                    {children}
                    <Button size="sm" variant="outline">
                        Close
                    </Button>
                    <Button size="sm" onClick={() => null}>
                        Guardar
                    </Button>
                </Form>
            )}
        </Formik>
    );
};
export default FormComponent;
