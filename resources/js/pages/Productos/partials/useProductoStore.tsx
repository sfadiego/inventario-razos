import { create } from 'zustand';

interface IuseRefreshProducto {
    refreshProductTableFlag: boolean;
    setRefreshFlag: () => void;
}

export const useStoreProducto = create<IuseRefreshProducto>((set) => ({
    refreshProductTableFlag: false,
    setRefreshFlag: () => set((state) => ({ refreshProductTableFlag: !state.refreshProductTableFlag })),
}));

export const useStoreProductoActions = () => {
    const { refreshProductTableFlag, setRefreshFlag } = useStoreProducto();
    return {
        refreshProductTableFlag,
        setRefreshFlag,
    };
};
