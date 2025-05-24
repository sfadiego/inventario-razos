import { ReactNode } from 'react';
import PageBreadcrumb from '../common/PageBreadCrumb';
import PageMeta from '../common/PageMeta';

interface IPageWrapper {
    pageTitle: string;
    children: ReactNode;
    className?: string;
}
export const PageWrapper = ({ pageTitle, children, className = '' }: IPageWrapper) => {
    const title = import.meta.env.VITE_APP_NAME;
    return (
        <>
            <PageMeta title={title} description={title} />
            <PageBreadcrumb pageTitle={pageTitle} />
            {children}
        </>
    );
};
