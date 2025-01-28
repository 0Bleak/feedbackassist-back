import { create } from "zustand";

interface QuestionPageState {
  currentPage: "Picker" | "AddQuestion" | "GetAllQuestions" | "GetQuestionById" | "UpdateQuestion" | "DeleteQuestion" | "DeleteAllQuestions";
  setCurrentPage: (page: QuestionPageState["currentPage"]) => void;
}

const useQuestionPageStore = create<QuestionPageState>((set) => ({
  currentPage: "Picker",
  setCurrentPage: (page) => set({ currentPage: page }),
}));

export default useQuestionPageStore;