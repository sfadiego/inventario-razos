import RecentOrders from '@/components/dashboard/BestSellers';
import { PageWrapper } from '@/components/layout/PageWrapper';
import EcommerceMetrics from '../../components/dashboard/EcommerceMetrics';
import MonthlySalesChart from '../../components/dashboard/MonthlySalesChart';

export default function Home() {
  return (
    <>
      <PageWrapper pageTitle="">
        <div className="grid grid-cols-12 gap-4 md:gap-6">
          <div className="col-span-12 space-y-6 xl:col-span-7">
            <EcommerceMetrics />
          </div>
          <div className="col-span-12 xl:col-span-5">
            <MonthlySalesChart />
          </div>
          <div className="col-span-12 mb-6 xl:col-span-7">
            <RecentOrders />
          </div>
        </div>
      </PageWrapper>
    </>
  );
}
