import { create } from "zustand";

interface AuthState {
  accessToken: string | null;
  role: string | null;
  setAuth: (auth: { accessToken: string; role: string }) => void;
  clearAuth: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  role: null,
  setAuth: (auth) => set({ accessToken: auth.accessToken, role: auth.role }),
  clearAuth: () => set({ accessToken: null, role: null }),
}));

export default useAuthStore;