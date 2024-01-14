import { create } from 'zustand';

interface ModalStore {
  show: boolean;
  setShow: (show: boolean) => void;
}

export const useModalStore = create<ModalStore>((set) => ({
  show: false,
  setShow: (show) => set(() => ({ show })),
}));
