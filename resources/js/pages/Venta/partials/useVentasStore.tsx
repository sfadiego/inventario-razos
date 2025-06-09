import { IVenta } from '@/models/venta.interface';
import { create } from 'zustand';

interface IuseVentasStore {
    venta: IVenta | null;
    cliente_id: IVenta | null;
    setVenta: (prop?: IVenta | null) => void;
}

export const useVentasStore = create<IuseVentasStore>((set) => ({
    venta: null,
    cliente_id: null,
    setVenta: (data?: IVenta | null) => set(() => ({ venta: data ? data : null })),
}));
