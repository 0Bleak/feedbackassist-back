import { create } from "zustand";

interface Question {
  _id: string;
  label: string;
  options: { value: string; url?: string }[];
}

interface Topic {
  _id: string;
  name: string;
  description: string;
  questions: Question[];
}

export interface GuestPageState {
  currentPage: "PickTopic" | "UserInfo" | "Questionnaire" | "ConsentForm" | "Results";
  selectedTopicId: string | null;
  userInfo: { email: string; firstName: string; lastName: string };
  responses: { [key: string]: string };
  topic: Topic | null;
  setCurrentPage: (page: GuestPageState["currentPage"]) => void;
  setSelectedTopicId: (topicId: string | null) => void;
  setUserInfo: (info: { email: string; firstName: string; lastName: string }) => void;
  setResponses: (responses: { [key: string]: string }) => void;
  setTopic: (topic: Topic | null) => void;
}

const useGuestPageStore = create<GuestPageState>((set) => ({
  currentPage: "PickTopic",
  selectedTopicId: null,
  userInfo: { email: "", firstName: "", lastName: "" },
  responses: {},
  topic: null,
  setCurrentPage: (page) => set({ currentPage: page }),
  setSelectedTopicId: (topicId) => set({ selectedTopicId: topicId }),
  setUserInfo: (info) => set({ userInfo: info }),
  setResponses: (responses) => set({ responses }),
  setTopic: (topic) => set({ topic }),
}));

export default useGuestPageStore;