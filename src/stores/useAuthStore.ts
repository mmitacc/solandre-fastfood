import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface UsuarioAutenticado {
  id: number;
  username: string;
  email: string;
  role: string;
}

interface AuthState {
  token: string | null;
  user: UsuarioAutenticado | null; // ◄ Cambiado de 'usuario' a 'user' para hacer match con MainLayout
  isAuthenticated: boolean;
  login: (token: string, user: UsuarioAutenticado) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      isAuthenticated: false,
      login: (token, user) => set({ token, user, isAuthenticated: true }),
      logout: () => set({ token: null, user: null, isAuthenticated: false }),
    }),
    {
      name: "auth-storage", // Se guarda automáticamente en localStorage
    },
  ),
);
