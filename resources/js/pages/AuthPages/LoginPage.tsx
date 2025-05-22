import SignInForm from '@/components/auth/SignInForm';
import PageMeta from '@/components/common/PageMeta';
import AuthLayout from './AuthPageLayout';

export default function LoginPage() {
    const title = import.meta.env.VITE_APP_NAME
    return (
        <>
            <PageMeta
                title={title}
                description={title}
            />
            <AuthLayout>
                <SignInForm />
            </AuthLayout>
        </>
    );
}
