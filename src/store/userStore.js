import { create } from "zustand";

const useUserStore = create((set) => ({
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
}));

export default useUserStore;
