import { create } from "zustand";

interface QuestionPageState {
  currentPage: "Picker" | "AddQuestion" | "GetAllQuestions" | "GetQuestionById" | "UpdateQuestion" | "DeleteQuestion" | "DeleteAllQuestions" | "CreateAdmin";
  setCurrentPage: (page: QuestionPageState["currentPage"]) => void;
}

const superAdminPageStore = create<QuestionPageState>((set) => ({
  currentPage: "Picker",
  setCurrentPage: (page) => set({ currentPage: page }),
}));

export default superAdminPageStore;