import ComponentCard from '@/components/common/ComponentCard';
import Switch from '@/components/form/switch/Switch';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { useState } from 'react';
import { FormCliente } from '../Clientes/partials/FormCliente';
import { FormVenta } from './partials/FormVenta';
import { useVentasStore } from './partials/useVentasStore';

export default function VentasPage() {
    const [nuevocliente, setNuevocliente] = useState(false);
    const { venta } = useVentasStore();
    return (
        <PageWrapper pageTitle="Ventas">
            <>
                <div className="grid grid-cols-12 gap-6 xl:grid-cols-12">
                    <ComponentCard className="col-span-12" title={'Venta de producto'}>
                        <Switch disabled={!!venta?.id} label="Cliente nuevo" defaultChecked={nuevocliente} onChange={setNuevocliente} />
                        <FormVenta nuevocliente={nuevocliente} />
                        {nuevocliente && (
                            <>
                                <hr></hr>
                                <FormCliente />
                            </>
                        )}
                    </ComponentCard>
                </div>
            </>
        </PageWrapper>
    );
}
