import { IVenta } from '@/models/venta.interface';
import { create } from 'zustand';

interface IuseVentasStore {
    venta: IVenta | null;
    setVenta: (prop?: IVenta | null) => void;
}

export const useVentasStore = create<IuseVentasStore>((set) => ({
    venta: null,
    setVenta: (data?: IVenta | null) => set(() => ({ venta: data ? data : null })),
}));
