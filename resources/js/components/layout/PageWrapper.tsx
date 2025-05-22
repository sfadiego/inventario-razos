import { ReactNode } from 'react';
import PageBreadcrumb from '../common/PageBreadCrumb';
import PageMeta from '../common/PageMeta';

interface IPageWrapper {
    pageTitle: string;
    children: ReactNode;
    blankWrapper?: boolean;
    className?: string;
}
export const PageWrapper = ({ pageTitle, children, className = '', blankWrapper = false }: IPageWrapper) => {
    const title = import.meta.env.VITE_APP_NAME;
    return (
        <div>
            <PageMeta title={title} description={title} />
            <PageBreadcrumb pageTitle={pageTitle} />
            {blankWrapper ? (
                <div className={`${className}`}>{children}</div>
            ) : (
                <div className="min-h-screen rounded-2xl border border-gray-200 bg-white px-5 py-7 xl:px-10 xl:py-12 dark:border-gray-800 dark:bg-white/[0.03]">
                    <div className="mx-auto w-full max-w-[630px] text-center">{children}</div>
                </div>
            )}
        </div>
    );
};
