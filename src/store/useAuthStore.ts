import { User } from "@/types";
import { create } from "zustand";

interface AuthStore {
  user: User | null;
  setUser: (user: Partial<User>) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>()((set) => ({
  user: null,
  setUser: (userData) =>
    set((state) => ({
      user: state.user
        ? { ...state.user, ...userData }
        : (userData as User),
    })),
  logout: () => set({ user: null }),
}));