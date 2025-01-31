import { create } from "zustand";

export interface AdminPageState {
  currentPage:
    | "Picker"
    | "AddQuestion"
    | "DeleteQuestion"
    | "GetAllQuestions"
    | "GetQuestionById"
    | "UpdateQuestion"
    | "TopicDetails"
    | "GetAllTopics"
    | "ViewUserResponses"; // Added here
  setCurrentPage: (page: AdminPageState["currentPage"]) => void;
}
const useAdminPageStore = create<AdminPageState>((set) => ({
  currentPage: "Picker",
  setCurrentPage: (page) => set({ currentPage: page }),
}));

export default useAdminPageStore;
