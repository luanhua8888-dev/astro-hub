import { create } from 'zustand';

export const useZodiacStore = create((set) => ({
    selectedSign: null,
    setSelectedSign: (sign) => set({ selectedSign: sign }),
}));
