import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface UserStore {
  logout: () => void;
  accessToken: null | string;
  refreshToken: null | string;
  setTokens: (accessToken: string, refreshToken: string) => void;
  setAccessToken: (accessToken: string) => void;
}

export const useUserStore = create(
  persist<UserStore>(
    (set) => ({
      accessToken: null,
      refreshToken: null,
      setTokens: (accessToken, refreshToken) => {
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        set(() => ({ accessToken, refreshToken }));
      },
      logout: () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        set(() => ({ accessToken: null, refreshToken: null }));
      },
      setAccessToken: (accessToken) => {
        localStorage.setItem('accessToken', accessToken);
        set(() => ({ accessToken }));
      },
    }),
    {
      name: '@user',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
