import { create } from 'zustand';

export const useUIStore = create((set) => ({
    isLoading: false,
    setLoading: (isLoading) => set({ isLoading }),
    isModalOpen: false,
    toggleModal: () => set((state) => ({ isModalOpen: !state.isModalOpen })),
}));
