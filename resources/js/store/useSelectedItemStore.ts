import { create } from 'zustand';

interface IuseSelectedItemStore {
  item: Record<string, any>;
  setItem: (key: string, data: Record<string, any>) => void;
  getItem: (key: string) => Record<string, any>;
  clearItem: (key: string) => void;
  clearAll: () => void;
}

export const useSelectedItemStore = create<IuseSelectedItemStore>((set, get) => ({
  item: {},
  setItem: (key: string, data: Record<string, any>) => set(() => ({ item: { ...get().item, [key]: data } })),
  getItem: (key: string) => get().item[key] || {},
  clearItem: (key: string) =>
    set((state) => {
      const newItem = { ...state.item };
      delete newItem[key];
      return { item: newItem };
    }),
  clearAll: () => set({ item: {} }),
}));
