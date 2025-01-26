import { create } from "zustand";
import axios from "axios";

interface AuthState {
  accessToken: string | null;
  role: string | null;
  setAuth: (auth: { accessToken: string; role: string }) => void;
  clearAuth: () => void;
  login: (email: string, password: string) => Promise<void>; // Add login method
}

const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  role: null,
  setAuth: (auth) => set({ accessToken: auth.accessToken, role: auth.role }),
  clearAuth: () => set({ accessToken: null, role: null }),
  login: async (email, password) => {
    try {
      const response = await axios.post(
        "http://localhost:5555/api/auth/login",
        { email, password },
        { withCredentials: true }
      );

      const { accessToken, role } = response.data;

      if (accessToken && role) {
        set({ accessToken, role }); // Update Zustand state
      } else {
        throw new Error("Access token or role missing in response");
      }
    } catch (error) {
      console.error("Login error:", error);
      throw new Error("Login failed. Please check your credentials.");
    }
  },
}));

export default useAuthStore;