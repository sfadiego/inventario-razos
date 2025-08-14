import StatisticsChart from '@/components/dashboard/StatisticsChart';
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
                        <MonthlySalesChart />
                    </div>
                    <div className="col-span-12 xl:col-span-5">
                        <StatisticsChart />
                    </div>
                </div>
            </PageWrapper>
        </>
    );
}
