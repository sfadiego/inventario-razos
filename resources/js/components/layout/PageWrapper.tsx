import { ReactNode } from 'react';
import PageBreadcrumb from '../common/PageBreadCrumb';
import PageMeta from '../common/PageMeta';

interface IPageWrapper {
    pageTitle: string;
    children: ReactNode;
}
export const PageWrapper = ({ pageTitle, children}: IPageWrapper) => {
    const title = import.meta.env.VITE_APP_NAME;
    return (
        <>
            <PageMeta title={title} description={title} />
            <PageBreadcrumb pageTitle={pageTitle} />
            {children}
        </>
    );
};
