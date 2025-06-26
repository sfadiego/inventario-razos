import { ReactNode } from 'react';
import { BreadcrumbArrayProps } from '../common/breadcrum';
import PageBreadcrumb from '../common/PageBreadCrumb';
import PageBreadCrumbArray from '../common/PageBreadCrumbArray';
import PageMeta from '../common/PageMeta';

interface IPageWrapper {
    pageTitle: string;
    breadcrumbArray?: Array<BreadcrumbArrayProps>;
    children: ReactNode;
}
export const PageWrapper = ({ pageTitle, children, breadcrumbArray = [] }: IPageWrapper) => {
    const title = import.meta.env.VITE_APP_NAME;
    return (
        <>
            <PageMeta title={title} description={title} />
            {breadcrumbArray.length ? (
                <PageBreadCrumbArray breadcrumbArray={breadcrumbArray} pageTitle={pageTitle} />
            ) : (
                <PageBreadcrumb pageTitle={pageTitle} />
            )}
            {children}
        </>
    );
};
