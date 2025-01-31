import { UserInfo } from "firebase/auth";
import { create } from "zustand";

interface UserState {
  user: UserInfo | null;
  login: (user: UserInfo) => void;
  logout: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  login: (user) => set(() => ({ user })),
  logout: () => set({ user: null }),
}));
