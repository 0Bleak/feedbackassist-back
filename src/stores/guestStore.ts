import { create } from "zustand";

export interface GuestPageState {
  currentPage: "Picker" | "ConcentForm" | "Questionnaire" | "PickTopic";
  selectedTopicId: string | null;
  setCurrentPage: (page: GuestPageState["currentPage"]) => void;
  setSelectedTopicId: (topicId: string | null) => void;
}

const useGuestPageStore = create<GuestPageState>((set) => ({
  currentPage: "PickTopic",
  selectedTopicId: null,
  setCurrentPage: (page) => set({ currentPage: page }),
  setSelectedTopicId: (topicId) => set({ selectedTopicId: topicId }),
}));

export default useGuestPageStore;