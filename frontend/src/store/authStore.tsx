import { create } from "zustand";

interface AuthState {
    isAuthenticated: boolean;
    token: string | null;
    login: (token: string) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  // On app loading we check have or not browser token
  isAuthenticated: !!localStorage.getItem('token'),
  token: localStorage.getItem('token'),

  // def login/singup
  login: (token: string) => {
    localStorage.setItem('token', token);
    set({ isAuthenticated: true, token });
  },

  // def exit
  logout: () => {
    localStorage.removeItem('token');
    set({ isAuthenticated: false, token: null });
  },
}));