import { create } from "zustand";
import { persist } from "zustand/middleware";

const useUserStore = create(
  persist(
    (set) => ({
      user: {
        id: null,
        username: "",
        password: "",
        isLogin: false,
        isAdmin: false,
        token: "",
      },
      changeUsername: (username) =>
        set((state) => ({
          user: {
            ...state.user,
            username,
          },
        })),
      changePassword: (password) =>
        set((state) => ({
          user: {
            ...state.user,
            password,
          },
        })),
      loginUser: ({ id, isAdmin, token }) =>
        set((state) => ({
          user: {
            ...state.user,
            token,
            id,
            isAdmin,
            isLogin: true,
          },
        })),
      attendUser: () =>
        set((state) => ({
          user: {
            ...state.user,
            isAttend: true,
          },
        })),
      logoutUser: () =>
        set((state) => ({
          user: {
            id: null,
            username: "",
            password: "",
            isLogin: false,
            isAdmin: false,
            token: "",
          },
        })),
    }),
    {
      // 로컬 스토리지에 user state 저장
      name: "user_storage",
    }
  )
);

export default useUserStore;
