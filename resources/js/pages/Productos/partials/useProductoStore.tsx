import { IProducto } from '@/models/producto.interface';
import { create } from 'zustand';

interface IuseRefreshProducto {
    refreshProductTableFlag: boolean;
    producto: IProducto | null;
    setRefreshFlag: () => void;
    setSelectedProducto: (prop?: IProducto | null) => void;
}

export const useStoreProducto = create<IuseRefreshProducto>((set) => ({
    refreshProductTableFlag: false,
    setRefreshFlag: () => set((state) => ({ refreshProductTableFlag: !state.refreshProductTableFlag })),
    producto: null,
    setSelectedProducto: (data?: IProducto | null) => set(() => ({ producto: data ? data : null })),
}));

export const useStoreProductoActions = () => {
    const { refreshProductTableFlag, setRefreshFlag, setSelectedProducto, producto } = useStoreProducto();
    return {
        refreshProductTableFlag,
        setRefreshFlag,
        setSelectedProducto,
        producto,
    };
};
