import { IUbicacion } from '@/models/ubicacion.interface';
import { create } from 'zustand';

interface IuseStoreUbicacion {
    refreshUbicacionFlag: boolean;
    ubicacion: IUbicacion | null;
    setRefreshFlag: () => void;
    setSelectedUbicacion: (prop?: IUbicacion | null) => void;
}

export const useUbicacionStore = create<IuseStoreUbicacion>((set) => ({
    refreshUbicacionFlag: false,
    setRefreshFlag: () => set((state) => ({ refreshUbicacionFlag: !state.refreshUbicacionFlag })),
    ubicacion: null,
    setSelectedUbicacion: (data?: IUbicacion | null) => set(() => ({ ubicacion: data ? data : null })),
}));
