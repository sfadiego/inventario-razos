import { PageWrapper } from '@/components/layout/PageWrapper';
import Button from '@/components/ui/button/Button';
import { Banknote } from 'lucide-react';

export default function VentasPage() {
    const nuevaVenta = () => {};
    return (
        <PageWrapper pageTitle="Ventas">
            <>
                <div className="grid grid-cols-12 gap-2 pb-5">
                    <div className="col-span-10"></div>
                    <div className="col-span-2">
                        <Button onClick={nuevaVenta} className="w-full">
                            <Banknote /> Nueva venta
                        </Button>
                    </div>
                </div>
                <div className="grid grid-cols-12 gap-2 pb-5">
                    <div className="col-span-12"></div>
                    <div className="col-span-12"></div>
                </div>
            </>
        </PageWrapper>
    );
}
