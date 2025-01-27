import { create } from "zustand";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

interface AuthState {
  accessToken: string | null;
  role: string | null;
  setAuth: (auth: { accessToken: string; role: string }) => void;
  clearAuth: () => void;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoggedIn: () => boolean;
  isAdmin: () => boolean;
  isSuperAdmin: () => boolean;
}

const useAuthStore = create<AuthState>((set, get) => ({
  accessToken: localStorage.getItem("accessToken") || null,
  role: localStorage.getItem("role") || null,

  setAuth: (auth) => {
    localStorage.setItem("accessToken", auth.accessToken);
    localStorage.setItem("role", auth.role);
    set({ accessToken: auth.accessToken, role: auth.role });
  },

  clearAuth: () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("role");
    set({ accessToken: null, role: null });
  },

  login: async (email, password) => {
    try {
      const response = await axios.post(
        "http://localhost:5555/api/auth/login",
        { email, password },
        { withCredentials: true }
      );

      const { accessToken, role } = response.data;

      if (accessToken && role) {
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("role", role);
        set({ accessToken, role });
      } else {
        throw new Error("Access token or role missing in response");
      }
    } catch (error) {
      console.error("Login error:", error);
      throw new Error("Login failed. Please check your credentials.");
    }
  },

  logout: () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("role");
    set({ accessToken: null, role: null });
  },

  isLoggedIn: () => {
    const state = get();
    const accessToken = state.accessToken;
    if (!accessToken) return false;

    try {
      const decoded = jwtDecode(accessToken);
      if (!decoded) return false;

      const expirationTime = (decoded as { exp?: number })?.exp ?? 0;
      const currentTime = Date.now() / 1000;

      return expirationTime > currentTime;
    } catch (error) {
      console.error("Error decoding token:", error);
      return false;
    }
  },

  isAdmin: () => {
    const state = get();
    return state.role === "admin";
  },

  isSuperAdmin: () => {
    const state = get();
    return state.role === "superadmin";
  },
}));

export default useAuthStore;