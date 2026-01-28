import BestSellerList from '@/components/dashboard/BestSellerList/BestSellerList';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { CategoriasEnum } from '@/enums/CategoriasEnum';
import EcommerceMetrics from '../../components/dashboard/EcommerceMetrics';
import MonthlySalesChart from '../../components/dashboard/MonthlySalesChart';

export default function Home() {
  return (
    <>
      <PageWrapper pageTitle="">
        <div className="mb-4 grid grid-cols-12 gap-4 md:gap-6">
          <div className="col-span-12 space-y-6 xl:col-span-7">
            <EcommerceMetrics />
          </div>
          <div className="col-span-12 xl:col-span-5">
            <MonthlySalesChart />
          </div>
          <div className="col-span-12 mb-2 sm:col-span-6">
            <BestSellerList title="Mas vendidos (Luces)" categoriaId={CategoriasEnum.Luces} />
          </div>
          <div className="col-span-12 mb-2 sm:col-span-6">
            <BestSellerList title="Mas vendidos (Piezas)" categoriaId={CategoriasEnum.Refacciones} />
          </div>
        </div>
      </PageWrapper>
    </>
  );
}
