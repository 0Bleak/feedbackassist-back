import { create } from "zustand";

export interface GuestPageState {
  currentPage: "Picker" | "ConcentForm" | "Questionnaire" | "PickTopic";
  setCurrentPage: (page: GuestPageState["currentPage"]) => void;
}

const useGuestPageStore = create<GuestPageState>((set) => ({
  currentPage: "Picker",
  setCurrentPage: (page) => set({ currentPage: page }),
}));

export default useGuestPageStore;
