import { create } from "zustand";

interface User {
  id: string;
  name: string | null;
  email: string | null;
  emailVerified: Date | null;
  image: string | null;
  hashedPassword: string | null;
  roomIds: string[];
  createdAt: Date;
  updatedAt: Date;
  status: string;
}

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