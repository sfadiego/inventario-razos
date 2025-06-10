import ComponentCard from '@/components/common/ComponentCard';
import Switch from '@/components/form/switch/Switch';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { useEffect, useState } from 'react';
import { FormCliente } from '../Clientes/partials/FormCliente';
import { useClienteStore } from '../Clientes/partials/useClienteStore';
import { FormVenta } from './partials/FormVenta';
import { useVentasStore } from './partials/useVentasStore';

export default function VentasPage() {
    const [nuevocliente, setNuevocliente] = useState(false);
    const { venta } = useVentasStore();
    const { cliente } = useClienteStore();
    useEffect(() => {
        if (cliente?.id) {
            setNuevocliente(false);
        }
    }, [cliente]);

    return (
        <PageWrapper pageTitle="Ventas">
            <>
                <div className="grid grid-cols-12 gap-6 xl:grid-cols-12">
                    <ComponentCard className="col-span-12" title={'Venta de producto'}>
                        <Switch disabled={!!venta?.id} label="Cliente nuevo" defaultChecked={nuevocliente} onChange={setNuevocliente} />
                        <FormVenta nuevocliente={nuevocliente} />
                        {nuevocliente && <FormCliente />}
                    </ComponentCard>
                </div>
            </>
        </PageWrapper>
    );
}
