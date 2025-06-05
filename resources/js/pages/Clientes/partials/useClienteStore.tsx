import { ICliente } from '@/models/cliente.interface';
import { create } from 'zustand';

interface IuseClienteStore {
    refreshClienteFlag: boolean;
    cliente: ICliente | null;
    setRefreshFlag: () => void;
    setSelectedCliente: (prop?: ICliente | null) => void;
}

export const useClienteStore = create<IuseClienteStore>((set) => ({
    refreshClienteFlag: false,
    setRefreshFlag: () => set((state) => ({ refreshClienteFlag: !state.refreshClienteFlag })),
    cliente: null,
    setSelectedCliente: (data?: ICliente | null) => set(() => ({ cliente: data ? data : null })),
}));
