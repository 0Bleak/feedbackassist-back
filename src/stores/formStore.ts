import { create } from "zustand";

// Define the interface for the form state
interface FormState {
  email: string;
  password: string;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
}

// Create the Zustand store
const useFormStore = create<FormState>((set) => ({
  email: "",
  password: "",
  setEmail: (email) => set({ email }),
  setPassword: (password) => set({ password }),
}));

export default useFormStore;
