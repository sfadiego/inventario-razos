import { IProducto } from '@/models/producto.interface';
import { create } from 'zustand';

interface IuseStoreProducto {
    refreshTableFlag: boolean;
    producto: IProducto | null;
    setRefreshFlag: () => void;
    setSelectedProducto: (prop?: IProducto | null) => void;
}

export const useProductoStore = create<IuseStoreProducto>((set) => ({
    refreshTableFlag: false,
    setRefreshFlag: () => set((state) => ({ refreshTableFlag: !state.refreshTableFlag })),
    producto: null,
    setSelectedProducto: (data?: IProducto | null) => set(() => ({ producto: data ? data : null })),
}));
