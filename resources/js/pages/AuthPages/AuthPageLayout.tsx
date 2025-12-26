import { Truck } from 'lucide-react';
import { PropsWithChildren } from 'react';
import { Link } from 'react-router';
import GridShape from '../../components/common/GridShape';
import ThemeTogglerTwo from '../../components/common/ThemeTogglerTwo';

export default function AuthLayout({ children }: PropsWithChildren) {
  const { VITE_APP_FULL_TITLE } = import.meta.env;
  return (
    <div className="relative z-1 bg-white p-6 sm:p-0 dark:bg-gray-900">
      <div className="relative flex h-screen w-full flex-col justify-center sm:p-0 lg:flex-row dark:bg-gray-900">
        {children}
        <div className="bg-brand-950 hidden h-full w-full items-center lg:grid lg:w-1/2 dark:bg-white/5">
          <div className="relative z-1 flex items-center justify-center">
            <GridShape />
            <div className="flex max-w-xs flex-col items-center">
              <Link to="/" className="mb-4 block">
                <div className="flex items-center gap-2">
                  <Truck className="h-16 w-16 text-white dark:text-white" />
                  <p className="text-center text-2xl text-white/60">{VITE_APP_FULL_TITLE || 'SIN TITULO'}</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
        <div className="fixed right-6 bottom-6 z-50 hidden sm:block">
          <ThemeTogglerTwo />
        </div>
      </div>
    </div>
  );
}
