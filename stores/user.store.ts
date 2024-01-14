import { User } from '@/interfaces/user.interface';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface UserStore {
  user: null | User;
  logout: () => void;
  accessToken: null | string;
  refreshToken: null | string;
  setTokens: (accessToken: string, refreshToken: string) => void;
}

export const useUserStore = create(
  persist<UserStore>(
    (set) => ({
      accessToken: null,
      refreshToken: null,
      user: null,
      setTokens: (accessToken, refreshToken) => set(() => ({ accessToken, refreshToken })),
      logout: () => set(() => ({ accessToken: null, refreshToken: null })),
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
