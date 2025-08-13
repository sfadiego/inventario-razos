interface PageMetaProps {
    title: string;
    description: string;
}

const PageMeta = ({ title, description }: PageMetaProps) => (
    <>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="author" href="Diego silva" />
    </>
);

export default PageMeta;
