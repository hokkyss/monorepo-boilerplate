import { create } from 'zustand';

type SidebarStore = {
  isExpanded: boolean;
  toggle: () => void;
};

const useSidebarStore = create<SidebarStore>((set) => ({
  isExpanded: false,
  toggle: () => set((state) => ({ isExpanded: !state.isExpanded })),
}));

export default useSidebarStore;
