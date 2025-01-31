import { create } from "zustand";

export interface QuestionPageState {
  currentPage:
    | "Picker"
    | "AddQuestion"
    | "GetAllQuestions"
    | "GetQuestionById"
    | "UpdateQuestion"
    | "DeleteQuestion"
    | "DeleteAllQuestions"
    | "CreateAdmin"
    | "UpdateTopic"
    | "GetAllTopics"
    | "GetTopicById"
    | "DeleteTopic"
    | "AddTopic"
    | "AddQuestionToTopic"
    | "ViewUserResponses";  // Added ViewUserResponses page for superadmin
  setCurrentPage: (page: QuestionPageState["currentPage"]) => void;
}

const useSuperAdminPageStore = create<QuestionPageState>((set) => ({
  currentPage: "Picker",
  setCurrentPage: (page) => set({ currentPage: page }),
}));

export default useSuperAdminPageStore;
