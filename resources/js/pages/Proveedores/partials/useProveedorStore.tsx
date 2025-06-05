import { IProveedor } from '@/models/proveedor.interface';
import { create } from 'zustand';

interface IuseProveedoresStore {
    refreshProveedorFlag: boolean;
    proveedor: IProveedor | null;
    setRefreshFlag: () => void;
    setSelectedProveedor: (prop?: IProveedor | null) => void;
}

export const useProveedorStore = create<IuseProveedoresStore>((set) => ({
    refreshProveedorFlag: false,
    setRefreshFlag: () => set((state) => ({ refreshProveedorFlag: !state.refreshProveedorFlag })),
    proveedor: null,
    setSelectedProveedor: (data?: IProveedor | null) => set(() => ({ proveedor: data ? data : null })),
}));
