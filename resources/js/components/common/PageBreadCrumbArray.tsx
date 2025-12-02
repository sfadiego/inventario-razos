import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router';
import { BreadcrumbArrayProps } from './breadcrum';

interface BreadcrumbProps {
  pageTitle: string;
  breadcrumbArray: Array<BreadcrumbArrayProps>;
}

const PageBreadCrumbArray: React.FC<BreadcrumbProps> = ({ pageTitle, breadcrumbArray }) => {
  return (
    <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white/90" x-text="pageName">
        {pageTitle}
      </h2>
      <nav>
        <ol className="flex items-center gap-1.5">
          {breadcrumbArray.map((breadcrumb, index) => (
            <li key={index}>
              {!breadcrumb.isActive ? (
                <span className="text-sm text-gray-800 dark:text-white/90">{breadcrumb.name}</span>
              ) : (
                <Link
                  to={breadcrumb.path}
                  className={
                    index == 0
                      ? 'inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400'
                      : 'text-sm text-gray-800 dark:text-white/90'
                  }
                >
                  {breadcrumb.name}
                  {index < breadcrumbArray.length - 1 && <ChevronRight />}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
};

export default PageBreadCrumbArray;
