import ComponentCard from '@/components/common/ComponentCard';
import Switch from '@/components/form/switch/Switch';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { useState } from 'react';
import { FormCliente } from '../Clientes/partials/FormCliente';
import { FormVenta } from './partials/FormVenta';

export default function VentasPage() {
    const [nuevocliente, setNuevocliente] = useState(true);
    return (
        <PageWrapper pageTitle="Ventas">
            <>
                <div className="grid grid-cols-12 gap-6 xl:grid-cols-12">
                    <ComponentCard className="col-span-12" title={'Venta de producto'}>
                        <Switch label="Cliente nuevo" defaultChecked={true} onChange={setNuevocliente} />
                        {nuevocliente && <FormCliente />}
                        <FormVenta nuevocliente={nuevocliente} />
                    </ComponentCard>
                </div>
            </>
        </PageWrapper>
    );
}
