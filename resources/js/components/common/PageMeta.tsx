import { PropsWithChildren } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';

const PageMeta = ({ title, description }: { title: string; description: string }) => (
    <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
    </Helmet>
);

export const AppWrapper = ({ children }: PropsWithChildren) => <HelmetProvider>{children}</HelmetProvider>;

export default PageMeta;
